# Partner Portal

A private login portal for your partners, plus an admin dashboard to manage partners, log monthly transactions, track KYC, and generate agreement drafts.

- **Admin dashboard** (`/admin/login.html`) — add partners, record profit payouts / capital repayments / additional capital, toggle KYC, download agreements, reset partner passwords.
- **Partner dashboard** (`/login.html`) — each partner logs in and sees *only their own* position, payout history, repayment history, rate, KYC status, and can download their agreement.

Tested and working locally before delivery — see "How it was verified" below.

## Quick Start (local)

```bash
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `JWT_SECRET` — generate one with: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — your first admin login
- `COMPANY_NAME` — appears on generated agreement documents

Then:

```bash
npm run seed     # creates your first admin account (run once)
npm start         # starts the server
```

Visit:
- `http://localhost:3000/admin/login.html` — log in with your seeded admin credentials
- `http://localhost:3000/login.html` — partner login (create a partner from the admin dashboard first; it will show you a one-time temporary password to share with them)

## What's new since the first version

**Edit / delete transactions** — On the admin dashboard, open an investor's "View Ledger," and every transaction row now has Edit and Delete buttons. Deleting asks for confirmation first.

**Export to Excel** — Two buttons in the admin header: "Export Investors" and "Export Transactions." These download as `.csv`, which opens directly in Excel, Google Sheets, or Numbers — no special software needed.

**WhatsApp payout notifications** — When recording a transaction, there's a checkbox (checked by default) to notify the investor via WhatsApp. This uses Twilio's WhatsApp API:
1. Sign up at twilio.com and enable WhatsApp in the Twilio Console (their sandbox is free for testing; a real WhatsApp Business sender is needed for production use).
2. Add `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_WHATSAPP_FROM` to your `.env`.
3. Until those are set, the app just logs "would have sent" to the console instead of failing — so everything else keeps working.

**Investor self-service KYC** — Each investor's dashboard now has a "My KYC Details" section where they can enter their address, PAN, Aadhaar number, and bank details, and upload photos/PDFs of their PAN and Aadhaar cards. This **only saves what they submit** — it does not verify KYC, generate any agreement, or activate anything automatically. You review it under "View Ledger" on the admin side and mark KYC verified yourself, the same way as before.

## How data is stored

This ships with a simple JSON-file database (`data/db.json`) — no separate database server to set up, so it runs anywhere Node.js runs. It's fine for a business with tens to low-thousands of investor records.

If you outgrow it later, only `db/store.js` needs to be replaced with a real database client (Postgres, MySQL, etc.) — the rest of the app (routes, auth, frontend) doesn't need to change, since they all go through the same `read()` / `update()` functions.

**Back up `data/db.json` regularly** — it's the only copy of your data unless you're also backing it up elsewhere.

## Deploying it

This is a standard Node/Express app, so it deploys to any of these with no code changes:

**Render.com (recommended, has a free tier)**
1. Push this repo to GitHub (see below).
2. On Render: New → Web Service → connect your GitHub repo.
3. Build command: `npm install`. Start command: `npm start`.
4. Add your `.env` values under Render's "Environment" tab (do this instead of committing `.env`).
5. Add a "Persistent Disk" mounted at `/opt/render/project/src/data` so `db.json` survives restarts/redeploys.
6. After first deploy, use Render's shell (or a one-off job) to run `npm run seed`.

**Railway.app** — same idea: connect repo, set env vars, add a volume for the `data/` folder, run `npm run seed` once via their console.

**A basic VPS (DigitalOcean, etc.)** — `git clone`, `npm install`, set up `.env`, run with `pm2 start server.js` or a systemd service so it stays running, put Nginx in front of it for HTTPS.

⚠️ Whichever host you choose, make sure `data/` is on **persistent storage** — some platforms wipe the filesystem on every deploy, which would delete your investor data.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial investor portal"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Your `.gitignore` already excludes `.env` and `data/db.json`, so secrets and investor data won't end up in the repo.

## Security notes

- Sessions use HTTP-only cookies (not readable by JavaScript, reduces XSS risk).
- Passwords are hashed with bcrypt — never stored in plain text.
- Login attempts are rate-limited (10 per 15 minutes per IP) to slow down brute-force attempts.
- Every investor-facing API route re-checks that the logged-in investor's ID matches the data being requested — an investor can never query another investor's record, even by guessing IDs.
- Set `NODE_ENV=production` in your deployed environment so cookies require HTTPS.
- Investor phone numbers double as their login username — make sure each investor's phone number in the system is unique.
- Uploaded KYC documents are stored in `data/uploads/` (also excluded from git) and are only ever served through authenticated routes — an investor can only fetch their own documents, and only an admin session can fetch any investor's documents directly.
- File uploads are limited to JPG/PNG/WEBP/PDF, max 8MB, and are renamed to random filenames on disk so uploaded filenames never leak information.

## How it was verified before delivery (updated)

In addition to the original login/data-scoping tests, this round was also run end-to-end:
record transaction → edit its amount → confirm the investor's profit total updates → delete it → confirm the total reverts → export both CSVs and confirm the data is correct → investor submits KYC details and uploads a document → admin sees the same data and can fetch the document → confirms an investor cannot fetch another investor's document without being logged in.

## How it was verified before delivery

Before handing this off, the full flow was run end-to-end in a test environment:
admin login → investor creation (temp password generated) → transaction logged → admin investor list reflects correct totals → investor logs in with their temp password → investor sees only their own record and stats → wrong password rejected (401) → unauthenticated request to investor data rejected (401).

## Legal note

The generated agreement is a **draft template**, not a substitute for legal review. Have a lawyer review your agreement terms (interest rates, repayment terms, liability clauses) before using them with real investors.
