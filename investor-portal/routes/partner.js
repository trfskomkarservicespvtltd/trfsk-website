const express = require('express');
const path = require('path');
const fs = require('fs');
const { read, update } = require('../db/store');
const { computeStats } = require('../db/stats');
const { requirePartner } = require('../middleware/auth');
const { buildAgreementHtml } = require('../db/agreement');
const { upload, UPLOAD_DIR } = require('../middleware/upload');

const router = express.Router();
router.use(requirePartner);

function loadSelf(req, res) {
  const data = read();
  const partner = data.investors.find(i => i.id === req.partner.id);
  if (!partner) {
    res.status(404).json({ error: 'Partner record not found' });
    return null;
  }
  return { data, partner };
}

router.get('/me', (req, res) => {
  const ctx = loadSelf(req, res);
  if (!ctx) return;
  const { data, partner } = ctx;
  const stats = computeStats(partner, data.transactions);
  const { password_hash, ...safePartner } = partner;
  res.json({ partner: safePartner, stats });
});

router.get('/transactions', (req, res) => {
  const ctx = loadSelf(req, res);
  if (!ctx) return;
  const { data, partner } = ctx;
  const txns = data.transactions
    .filter(t => t.investor_id === partner.id)
    .sort((a, b) => (a.month < b.month ? 1 : -1));
  res.json({ transactions: txns });
});

router.patch('/kyc', async (req, res) => {
  const ctx = loadSelf(req, res);
  if (!ctx) return;
  const { partner } = ctx;
  const { address, city, state, pincode, pan, aadhaar, bankName, bankAccountName, bankAccountNo, ifsc } = req.body;

  let updated = null;
  await update((data) => {
    const inv = data.investors.find(i => i.id === partner.id);
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
  if (!updated) return res.status(404).json({ error: 'Partner not found' });
  const { password_hash, ...safe } = updated;
  res.json({ partner: safe });
});

router.post('/kyc/documents', upload.single('document'), async (req, res) => {
  const ctx = loadSelf(req, res);
  if (!ctx) return;
  const { partner } = ctx;
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const docType = req.body.docType === 'aadhaar' ? 'aadhaar' : 'pan';

  let updated = null;
  await update((data) => {
    const inv = data.investors.find(i => i.id === partner.id);
    if (!inv) return;
    const field = docType === 'aadhaar' ? 'aadhaar_doc_file' : 'pan_doc_file';
    if (inv[field]) {
      const oldPath = path.join(UPLOAD_DIR, inv[field]);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    inv[field] = req.file.filename;
    updated = inv;
  });
  if (!updated) return res.status(404).json({ error: 'Partner not found' });
  res.json({ ok: true, docType });
});

router.get('/kyc/documents/:type', (req, res) => {
  const ctx = loadSelf(req, res);
  if (!ctx) return;
  const { partner } = ctx;
  const field = req.params.type === 'aadhaar' ? 'aadhaar_doc_file' : 'pan_doc_file';
  const filename = partner[field];
  if (!filename) return res.status(404).json({ error: 'No document uploaded' });
  res.sendFile(path.join(UPLOAD_DIR, filename));
});

router.get('/agreement', (req, res) => {
  const ctx = loadSelf(req, res);
  if (!ctx) return;
  const { partner } = ctx;
  const html = buildAgreementHtml(partner);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Disposition', `attachment; filename="Agreement-${partner.name.replace(/\s+/g, '_')}.html"`);
  res.send(html);
});

module.exports = router;
