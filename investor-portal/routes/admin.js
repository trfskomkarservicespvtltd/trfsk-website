const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { read, update } = require('../db/store');
const { computeStats } = require('../db/stats');
const { requireAdmin } = require('../middleware/auth');
const { buildAgreementHtml } = require('../db/agreement');
const { buildExportCsv } = require('../db/export');
const { sendWhatsApp, payoutMessage } = require('../db/whatsapp');

const router = express.Router();
router.use(requireAdmin);

function genTempPassword() {
  return crypto.randomBytes(5).toString('hex'); // e.g. "a1b2c3d4e5"
}

// ---- Investors ----
router.get('/investors', (req, res) => {
  const data = read();
  const list = data.investors.map(inv => {
    const stats = computeStats(inv, data.transactions);
    const { password_hash, ...safe } = inv;
    return { ...safe, stats };
  });
  res.json({ investors: list });
});

router.post('/investors', async (req, res) => {
  const { name, phone, altPhone, capital, rate, rateType, kyc, notes, startDate, dueDay } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });

  const tempPassword = genTempPassword();
  const password_hash = bcrypt.hashSync(tempPassword, 10);

  const investor = {
    id: 'inv_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name, phone,
    alt_phone: altPhone || '',
    capital: Number(capital) || 0,
    rate: Number(rate) || 0,
    rate_type: rateType === 'annual' ? 'annual' : 'monthly',
    kyc: !!kyc,
    notes: notes || '',
    start_date: startDate || new Date().toISOString().slice(0, 10),
    due_day: Number(dueDay) || 10,
    password_hash,
    created_at: new Date().toISOString(),
  };

  await update((data) => { data.investors.push(investor); });

  const { password_hash: _, ...safe } = investor;
  // Temp password is returned once, here, so admin can share it with the investor securely.
  // It is never retrievable again — use the reset-password endpoint if it's lost.
  res.json({ investor: safe, tempPassword });
});

router.patch('/investors/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  let updated = null;
  await update((data) => {
    const inv = data.investors.find(i => i.id === id);
    if (!inv) return;
    const editable = ['name','phone','alt_phone','capital','rate','rate_type','kyc','notes','start_date','due_day',
      'address','city','state','pincode','pan','aadhaar','bank_name','bank_account_name','bank_account_no','ifsc'];
    editable.forEach(key => {
      const bodyKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase()); // altPhone, rateType, etc.
      if (updates[bodyKey] !== undefined) inv[key] = updates[bodyKey];
      if (updates[key] !== undefined) inv[key] = updates[key];
    });
    updated = inv;
  });
  if (!updated) return res.status(404).json({ error: 'Investor not found' });
  const { password_hash, ...safe } = updated;
  res.json({ investor: safe });
});

router.post('/investors/:id/reset-password', async (req, res) => {
  const { id } = req.params;
  const tempPassword = genTempPassword();
  let found = false;
  await update((data) => {
    const inv = data.investors.find(i => i.id === id);
    if (!inv) return;
    inv.password_hash = bcrypt.hashSync(tempPassword, 10);
    found = true;
  });
  if (!found) return res.status(404).json({ error: 'Investor not found' });
  res.json({ tempPassword });
});

router.post('/send-password-whatsapp', async (req, res) => {
  const { phone, message } = req.body;
  if (!phone || !message) return res.status(400).json({ error: 'Phone and message required' });
  const result = await sendWhatsApp(phone, message);
  res.json(result);
});

router.get('/investors/:id/agreement', (req, res) => {
  const data = read();
  const inv = data.investors.find(i => i.id === req.params.id);
  if (!inv) return res.status(404).json({ error: 'Investor not found' });
  const html = buildAgreementHtml(inv);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Disposition', `attachment; filename="Agreement-${inv.name.replace(/\s+/g, '_')}.html"`);
  res.send(html);
});

// ---- KYC document viewing (admin review) ----
router.get('/investors/:id/documents/:type', (req, res) => {
  const path = require('path');
  const { UPLOAD_DIR } = require('../middleware/upload');
  const data = read();
  const inv = data.investors.find(i => i.id === req.params.id);
  if (!inv) return res.status(404).json({ error: 'Investor not found' });
  const field = req.params.type === 'aadhaar' ? 'aadhaar_doc_file' : 'pan_doc_file';
  const filename = inv[field];
  if (!filename) return res.status(404).json({ error: 'No document uploaded' });
  res.sendFile(path.join(UPLOAD_DIR, filename));
});

// ---- Transactions ----
router.get('/investors/:id/transactions', (req, res) => {
  const data = read();
  const txns = data.transactions
    .filter(t => t.investor_id === req.params.id)
    .sort((a, b) => (a.month < b.month ? 1 : -1));
  res.json({ transactions: txns });
});

router.post('/transactions', async (req, res) => {
  const { investorId, type, month, amount, txnNumber, dueDate, status, note, notifyWhatsApp } = req.body;
  if (!investorId || !amount || !type) return res.status(400).json({ error: 'investorId, type and amount are required' });

  const txn = {
    id: 'txn_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    investor_id: investorId,
    type, // 'profit' | 'repay' | 'addcap'
    month: month || new Date().toISOString().slice(0, 7),
    amount: Number(amount),
    txn_number: txnNumber || '',
    due_date: dueDate || '',
    status: status || 'paid', // 'paid' | 'pending' | 'late'
    note: note || '',
    created_at: new Date().toISOString(),
  };

  let investor = null;
  await update((data) => {
    investor = data.investors.find(i => i.id === investorId);
    if (investor) data.transactions.push(txn);
  });
  if (!investor) return res.status(404).json({ error: 'Investor not found' });

  let whatsapp = { sent: false, reason: 'Not requested' };
  if (notifyWhatsApp && investor.phone) {
    const message = payoutMessage({
      investorName: investor.name,
      type: txn.type,
      amount: txn.amount,
      month: txn.month,
      companyName: process.env.COMPANY_NAME,
    });
    whatsapp = await sendWhatsApp(investor.phone, message);
  }

  res.json({ transaction: txn, whatsapp });
});

// ---- Edit a transaction ----
router.patch('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  let updated = null;
  await update((data) => {
    const txn = data.transactions.find(t => t.id === id);
    if (!txn) return;
    const editable = { type:'type', month:'month', amount:'amount', txnNumber:'txn_number', dueDate:'due_date', status:'status', note:'note' };
    Object.entries(editable).forEach(([bodyKey, dbKey]) => {
      if (updates[bodyKey] !== undefined) txn[dbKey] = bodyKey === 'amount' ? Number(updates[bodyKey]) : updates[bodyKey];
    });
    updated = txn;
  });
  if (!updated) return res.status(404).json({ error: 'Transaction not found' });
  res.json({ transaction: updated });
});

// ---- Delete a transaction ----
router.delete('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  let removed = false;
  await update((data) => {
    const idx = data.transactions.findIndex(t => t.id === id);
    if (idx === -1) return;
    data.transactions.splice(idx, 1);
    removed = true;
  });
  if (!removed) return res.status(404).json({ error: 'Transaction not found' });
  res.json({ ok: true });
});

// ---- Export ----
router.get('/export/investors.csv', (req, res) => {
  const data = read();
  const { investorsCsv } = buildExportCsv(data.investors, data.transactions);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="investors-${new Date().toISOString().slice(0,10)}.csv"`);
  res.send(investorsCsv);
});

router.get('/export/transactions.csv', (req, res) => {
  const data = read();
  const { transactionsCsv } = buildExportCsv(data.investors, data.transactions);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="transactions-${new Date().toISOString().slice(0,10)}.csv"`);
  res.send(transactionsCsv);
});

module.exports = router;
