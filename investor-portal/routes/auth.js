const express = require('express');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const { read } = require('../db/store');
const { sign } = require('../middleware/auth');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
});

const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// ---- Admin login ----
router.post('/admin/login', loginLimiter, (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const data = read();
  const admin = data.admins.find(a => a.email.toLowerCase() === String(email).toLowerCase());
  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = sign({ id: admin.id, role: 'admin', name: admin.name });
  res.cookie('admin_token', token, cookieOpts);
  res.json({ ok: true, name: admin.name });
});

router.post('/admin/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ ok: true });
});

// ---- Partner login ----
router.post('/partner/login', loginLimiter, (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) return res.status(400).json({ error: 'Phone and password required' });

  const data = read();
  const partner = data.investors.find(i => i.phone === String(phone).trim());
  if (!partner || !partner.password_hash || !bcrypt.compareSync(password, partner.password_hash)) {
    return res.status(401).json({ error: 'Invalid phone number or password' });
  }
  const token = sign({ id: partner.id, role: 'partner', name: partner.name });
  res.cookie('partner_token', token, cookieOpts);
  res.json({ ok: true, name: partner.name });
});

router.post('/partner/logout', (req, res) => {
  res.clearCookie('partner_token');
  res.json({ ok: true });
});

module.exports = router;
