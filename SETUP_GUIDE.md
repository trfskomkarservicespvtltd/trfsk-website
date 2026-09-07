# TRFSK Website - Setup Guide

## Getting Started

### 1. Clone the Repository
```bash
cd trfsk-website
npm install
```

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your values:
```bash
cp .env.local.example .env.local
```

#### Required Environment Variables:

**Website:**
- `NEXT_PUBLIC_WEBSITE`: Your website URL
- `NEXT_PUBLIC_COMPANY_NAME`: Your company name

**Supabase investor platform:**
- `NEXT_PUBLIC_SUPABASE_URL`: Project URL from Supabase Project Settings → API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Publishable/anon key from Supabase Project Settings → API
- `NEXT_PUBLIC_AUTH_REDIRECT_URL`: Production callback URL, normally `https://www.trfskomkar.com/auth/callback`

Create a Supabase project, then run `supabase/migrations/202609050001_investor_platform.sql` in the SQL Editor. Enable email authentication in Authentication → Providers. After creating the first admin user through `/auth/login`, promote it once in the SQL Editor:
```sql
update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'admin@example.com');
```

In Supabase Authentication → URL Configuration, set the Site URL to the production website and add these Redirect URLs:
```text
https://www.trfskomkar.com/auth/callback
http://localhost:3000/auth/callback
```

The migration automatically creates a partner account for every new and existing profile. The admin portal at `/admin` only posts contribution, withdrawal, adjustment, and approved return entries. Partner balances are derived from those immutable entries and update through Supabase Realtime.

**Zoho SMTP Configuration:**
- `SMTP_HOST`: Zoho SMTP host (default: smtp.zoho.in)
- `SMTP_PORT`: SMTP port (default: 465)
- `SMTP_SECURE`: Use TLS (default: true)
- `SMTP_USER`: Zoho email address
- `SMTP_PASS`: Zoho app-specific password

**Zoho CRM OAuth:**
- `ZOHO_CLIENT_ID`: Zoho OAuth client ID
- `ZOHO_CLIENT_SECRET`: Zoho OAuth client secret
- `ZOHO_REDIRECT_URI`: OAuth redirect URI
- `ZOHO_REFRESH_TOKEN`: Zoho refresh token
- `ZOHO_API_DOMAIN`: Zoho API domain (default: https://www.zohoapis.in)

**Google Analytics 4:**
- `NEXT_PUBLIC_GA_ID`: Your GA4 Property ID (Get from Google Analytics)

### 3. Get Zoho App Password

1. Go to [Zoho Mail](https://mail.zoho.in)
2. Navigate to Settings → Mail Accounts → IMAP Access
3. Generate an app-specific password
4. Copy the password to `SMTP_PASS` in `.env.local`

### 4. Set Up Google Analytics 4

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new Property for your website
3. Copy the Property ID (format: G-XXXXXXXXXX)
4. Add to `NEXT_PUBLIC_GA_ID` in `.env.local`

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Routes

### Public Pages
- `/` - Home page with hero, services, testimonials
- `/about` - About us page
- `/services` - Services overview
- `/blog` - Blog with search & filter
- `/blog/[slug]` - Individual blog posts
- `/team` - Team members and leadership
- `/contact` - Contact form with notifications
- `/partnerships` - Partnership opportunities
- `/knowledge-center` - Resources and guides
- `/get-started` - Getting started guide
- `/disclaimer` - Disclaimer page
- `/privacy-policy` - Privacy policy
- `/terms-and-conditions` - Terms and conditions
- `/auth/login` - Investor sign in and account creation
- `/investor` - Protected investor dashboard
- `/investor/transactions` - Protected transaction history
- `/admin` - Protected admin control room

### API Routes
- `POST /api/contact` - Contact form submission
- `POST /api/partnership` - Partnership form submission
- `POST /api/newsletter` - Newsletter signup
- `GET /api/zoho/callback` - Admin-only Zoho OAuth callback
- `GET /api/test-crm` - Admin-only CRM connection test
- `GET /sitemap.xml` - XML sitemap for SEO

## Features

- Responsive design (mobile, tablet, desktop)
- Dark theme with professional colors
- Premium animations and transitions
- SEO optimized (metadata, JSON-LD, Open Graph, sitemap)
- Zoho CRM lead capture integration
- Zoho SMTP email notifications
- Blog with search and filtering
- Google Analytics 4 integration

## Build & Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Project Structure

```
app/
├── components/
│   ├── home/          # Homepage sections
│   ├── layout/        # Navbar, Footer
│   ├── forms/         # Contact, Partnership forms
│   └── ui/            # Reusable UI components
├── blog/              # Blog pages and dynamic routes
├── team/              # Team page
├── contact/           # Contact page
├── api/               # API routes
├── lib/               # Utilities and helpers
│   ├── blogPosts.ts   # Blog data and functions
│   ├── schema.ts      # JSON-LD schema generators
│   ├── lead.ts        # Lead generation utilities
│   ├── zoho.ts        # Zoho CRM client
│   ├── mail.ts        # Email sending utilities
│   └── database.ts    # In-memory database
├── layout.tsx         # Root layout with metadata
├── globals.css        # Global styles and animations
└── sitemap.ts         # SEO sitemap generator

public/
├── robots.txt         # Search engine crawling rules
└── images/            # Static images
```

## Security Notes

- Never commit `.env.local` to version control
- Use strong, unique passwords/API keys
- Rotate credentials regularly
- Always use HTTPS in production
- Validate all form inputs server-side

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
Connect your GitHub repository to Netlify

### Docker
```bash
docker build -t trfsk-website .
docker run -p 3000:3000 trfsk-website
```

---

**Last Updated**: August 2026
**Version**: 1.0.0
