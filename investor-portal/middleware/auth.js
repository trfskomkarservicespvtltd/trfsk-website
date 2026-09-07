const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error('JWT_SECRET is not set. Add it to your .env file before starting the server.');
}

function sign(payload, expiresIn = '7d') {
  return jwt.sign(payload, SECRET, { expiresIn });
}

function requireAdmin(req, res, next) {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ error: 'Not logged in' });
  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.role !== 'admin') throw new Error('wrong role');
    req.admin = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }
}

function requirePartner(req, res, next) {
  const token = req.cookies.partner_token;
  if (!token) return res.status(401).json({ error: 'Not logged in' });
  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.role !== 'partner') throw new Error('wrong role');
    req.partner = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }
}

module.exports = { sign, requireAdmin, requirePartner };
