require('dotenv').config();
const bcrypt = require('bcryptjs');
const { update } = require('./store');

const email = process.env.SEED_ADMIN_EMAIL;
const password = process.env.SEED_ADMIN_PASSWORD;
const name = process.env.SEED_ADMIN_NAME || 'Admin';

if (!email || !password) {
  console.error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in your .env file before seeding.');
  process.exit(1);
}

update((data) => {
  const exists = data.admins.find(
    (a) => a.email.toLowerCase() === email.toLowerCase()
  );

  const password_hash = bcrypt.hashSync(password, 10);

  if (exists) {
    exists.name = name;
    exists.password_hash = password_hash;

    console.log(`✅ Admin password updated for ${email}.`);
    return;
  }

  data.admins.push({
    id: 'adm_' + Date.now().toString(36),
    email,
    name,
    password_hash,
    created_at: new Date().toISOString(),
  });

  console.log(`✅ Admin account created for ${email}.`);
})
.then(() => process.exit(0))
.catch((err) => {
  console.error(err);
  process.exit(1);
});