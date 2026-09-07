// Simple, dependency-free JSON file datastore.
// Fine for a small/medium investor base (tens to low thousands of records).
// If you outgrow this, swap this module for a real database (Postgres/MySQL)
// without touching the routes — just keep the same function signatures.

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const FILE = path.join(DATA_DIR, 'db.json');

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify({ admins: [], investors: [], transactions: [] }, null, 2));
  }
}

function read() {
  ensureFile();
  return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
}

function write(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// very small write-lock to avoid interleaved writes under concurrent requests
let writing = Promise.resolve();
function update(mutator) {
  writing = writing.then(() => {
    const data = read();
    const result = mutator(data);
    write(data);
    return result;
  });
  return writing;
}

module.exports = { read, write, update };
