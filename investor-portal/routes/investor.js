const express = require('express');
const path = require('path');
const fs = require('fs');
const { read, update } = require('../db/store');
const { computeStats } = require('../db/stats');
const { requireInvestor } = require('../middleware/auth');
const { buildAgreementHtml } = require('../db/agreement');
const { upload, UPLOAD_DIR } = require('../middleware/upload');

const router = express.Router();
router.use(requireInvestor);

function loadSelf(req, res) {
  const data = read();
  const investor = data.investors.find(i => i.id === req.investor.id);
  if (!investor) {
    res.status(404).json({ error: 'Investor record not found' });
    return null;
  }
  return { data, investor };
}

router.get('/me', (req, res) => {
  const ctx = loadSelf(req, res);
  if (!ctx) return;
  const { data, investor } = ctx;
  const stats = computeStats(investor, data.transactions);
  const { password_hash, ...safeInvestor } = investor;
  res.json({ investor: safeInvestor, stats });
});

router.get('/transactions', (req, res) => {
  const ctx = loadSelf(req, res);
  if (!ctx) return;
  const { data, investor } = ctx;
  const txns = data.transactions
    .filter(t => t.investor_id === investor.id)
    .sort((a, b) => (a.month < b.month ? 1 : -1));
  res.json({ transactions: txns });
});

// ---- Self-service KYC intake ----
// Investor submits their own details for admin to review. This does NOT verify
// KYC, generate an agreement, or activate anything automatically — it just
// saves what they entered as "submitted" and flags it for you to check by hand.
router.patch('/kyc', async (req, res) => {
  const ctx = loadSelf(req, res);
  if (!ctx) return;
  const { investor } = ctx;
  const { address, city, state, pincode, pan, aadhaar, bankName, bankAccountName, bankAccountNo, ifsc } = req.body;

  let updated = null;
  await update((data) => {
    const inv = data.investors.find(i => i.id === investor.id);
    if (!inv) return;
    Object.assign(inv, {
      address: address ?? inv.address ?? '',
      city: city ?? inv.city ?? '',
      state: state ?? inv.state ?? '',
      pincode: pincode ?? inv.pincode ?? '',
      pan: pan ?? inv.pan ?? '',
      aadhaar: aadhaar ?? inv.aadhaar ?? '',
      bank_name: bankName ?? inv.bank_name ?? '',
      bank_account_name: bankAccountName ?? inv.bank_account_name ?? '',
      bank_account_no: bankAccountNo ?? inv.bank_account_no ?? '',
      ifsc: ifsc ?? inv.ifsc ?? '',
      kyc_submitted_at: new Date().toISOString(),
    });
    updated = inv;
  });
  if (!updated) return res.status(404).json({ error: 'Investor not found' });
  const { password_hash, ...safe } = updated;
  res.json({ investor: safe });
});

// Upload a KYC document (PAN card, Aadhaar card, etc.) — stored privately,
// never served publicly. Only the investor themself or an admin can retrieve it.
router.post('/kyc/documents', upload.single('document'), async (req, res) => {
  const ctx = loadSelf(req, res);
  if (!ctx) return;
  const { investor } = ctx;
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const docType = req.body.docType === 'aadhaar' ? 'aadhaar' : 'pan'; // 'pan' | 'aadhaar'

  let updated = null;
  await update((data) => {
    const inv = data.investors.find(i => i.id === investor.id);
    if (!inv) return;
    const field = docType === 'aadhaar' ? 'aadhaar_doc_file' : 'pan_doc_file';
    if (inv[field]) {
      const oldPath = path.join(UPLOAD_DIR, inv[field]);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    inv[field] = req.file.filename;
    updated = inv;
  });
  if (!updated) return res.status(404).json({ error: 'Investor not found' });
  res.json({ ok: true, docType });
});

// Retrieve your own uploaded document
router.get('/kyc/documents/:type', (req, res) => {
  const ctx = loadSelf(req, res);
  if (!ctx) return;
  const { investor } = ctx;
  const field = req.params.type === 'aadhaar' ? 'aadhaar_doc_file' : 'pan_doc_file';
  const filename = investor[field];
  if (!filename) return res.status(404).json({ error: 'No document uploaded' });
  res.sendFile(path.join(UPLOAD_DIR, filename));
});

router.get('/agreement', (req, res) => {
  const ctx = loadSelf(req, res);
  if (!ctx) return;
  const { investor } = ctx;
  const html = buildAgreementHtml(investor);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Disposition', `attachment; filename="Agreement-${investor.name.replace(/\s+/g, '_')}.html"`);
  res.send(html);
});

module.exports = router;
