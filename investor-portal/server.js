require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/auth');
const partnerRoutes = require('./routes/partner');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
  console.error('\nMissing JWT_SECRET in your .env file. Copy .env.example to .env and fill it in before starting.\n');
  process.exit(1);
}

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/admin', adminRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Partner portal running at http://localhost:${PORT}`);
  console.log(`  Partner login:    http://localhost:${PORT}/login.html`);
  console.log(`  Admin login:      http://localhost:${PORT}/admin/login.html`);
});
