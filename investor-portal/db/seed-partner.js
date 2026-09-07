require('dotenv').config();
const bcrypt = require('bcryptjs');
const { update } = require('./store');

const phone = process.env.SEED_PARTNER_PHONE;
const password = process.env.SEED_PARTNER_PASSWORD;
const name = process.env.SEED_PARTNER_NAME || 'Partner';

if (!phone || !password) {
  console.error('Set SEED_PARTNER_PHONE and SEED_PARTNER_PASSWORD in your .env file before seeding.');
  console.error('Example:');
  console.error('  SEED_PARTNER_PHONE=9876543210');
  console.error('  SEED_PARTNER_PASSWORD=MySecurePassword123');
  console.error('  SEED_PARTNER_NAME=John Doe');
  process.exit(1);
}

update((data) => {
  const exists = data.investors.find(i => i.phone === phone);

  const password_hash = bcrypt.hashSync(password, 10);

  if (exists) {
    exists.name = name;
    exists.password_hash = password_hash;
    console.log(`Partner password updated for ${phone}.`);
    return;
  }

  data.investors.push({
    id: 'prt_' + Date.now().toString(36),
    phone,
    name,
    password_hash,
    created_at: new Date().toISOString(),
  });

  console.log(`Partner account created for ${phone}.`);
  console.log(`Password: ${password}`);
})
.then(() => process.exit(0))
.catch((err) => {
  console.error(err);
  process.exit(1);
});
