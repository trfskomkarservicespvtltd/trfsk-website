# TRFSK Website - Setup Guide

## 🚀 Getting Started

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

**Email Configuration:**
- `EMAIL_USER`: Your Gmail address for sending contact emails
- `EMAIL_PASS`: Gmail App-specific password (not your regular password)
- `CONTACT_RECEIVER`: Email address to receive contact form submissions

**Google Analytics 4:**
- `NEXT_PUBLIC_GA_ID`: Your GA4 Property ID (Get from Google Analytics)

### 3. Get Gmail App Password

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer" (or your device)
3. Generate app password
4. Copy the password (without spaces) to `EMAIL_PASS` in `.env.local`

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

## 📋 Available Routes

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

### API Routes
- `POST /api/contact` - Contact form submission
- `POST /api/newsletter` - Newsletter signup
- `GET /sitemap.xml` - XML sitemap for SEO

## 🎯 Features Implemented

### ✅ Phase 1: SEO & Content
- [x] Enhanced metadata for all pages
- [x] robots.txt and sitemap.xml
- [x] JSON-LD structured data
- [x] Open Graph meta tags

### ✅ Phase 2: Content Management
- [x] Blog system with 3 featured posts
- [x] Dynamic blog post routes
- [x] Blog search and filtering
- [x] Category and tag filtering

### ✅ Phase 3: Professional Pages
- [x] Team page with leadership profiles
- [x] Newsletter signup component
- [x] Enhanced contact form with validation

### ✅ Phase 4: Analytics & Optimization
- [x] Google Analytics 4 integration
- [x] Image optimization component (Next.js Image)
- [x] Form success/error notifications
- [x] Newsletter subscription system

### ✅ Phase 5: Design & UX
- [x] Responsive design (mobile, tablet, desktop)
- [x] Premium animations and transitions
- [x] Dark theme with professional colors
- [x] Accessibility features (focus states, ARIA labels)

## 🛠️ Build & Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Build Output
The build creates static pages for all routes listed above. Expected output:
- 20+ optimized routes
- All pages prerendered as static content
- Dynamic blog posts generated at build time

## 📊 Project Structure

```
app/
├── components/
│   ├── home/          # Homepage sections
│   ├── layout/        # Navbar, Footer
│   ├── forms/         # Contact, Partnership, GetStarted forms
│   └── ui/            # Reusable UI components
├── blog/              # Blog pages and dynamic routes
├── team/              # Team page
├── contact/           # Contact page
├── api/               # API routes (contact, newsletter)
├── lib/               # Utilities and helpers
│   ├── blogPosts.ts   # Blog data and functions
│   ├── schema.ts      # JSON-LD schema generators
│   ├── analytics.ts   # Google Analytics setup
│   └── mail.ts        # Email sending utilities
├── types/             # TypeScript type definitions
├── utils/             # Helper functions
├── layout.tsx         # Root layout with metadata
├── globals.css        # Global styles and animations
└── sitemap.ts         # SEO sitemap generator

public/
├── robots.txt         # Search engine crawling rules
└── images/            # Static images
```

## 🎨 Customization

### Colors & Theme
Edit `app/globals.css` root variables:
```css
:root {
  --primary: #3b82f6;
  --primary-dark: #1e40af;
  --primary-light: #60a5fa;
  /* ... more colors ... */
}
```

### Blog Posts
Edit `app/lib/blogPosts.ts` to add/modify blog content:
```typescript
export const blogPosts: BlogPost[] = [
  {
    id: 'post-slug',
    title: 'Post Title',
    excerpt: 'Brief description',
    content: 'Full content here...',
    // ... more fields
  }
];
```

### Team Members
Edit `app/team/page.tsx` to update team information.

## 📱 Responsive Design

The website uses Tailwind CSS with responsive breakpoints:
- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

All components use `clamp()` for fluid typography and spacing.

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Use strong, unique passwords/API keys
- Rotate credentials regularly
- Always use HTTPS in production
- Validate all form inputs server-side

## 📞 Support & Troubleshooting

### Common Issues

**Q: "Module not found" errors**
A: Run `npm install` to ensure all dependencies are installed

**Q: Email not sending**
A: Check that `EMAIL_USER`, `EMAIL_PASS`, and `CONTACT_RECEIVER` are correctly set in `.env.local`

**Q: Google Analytics not tracking**
A: Verify `NEXT_PUBLIC_GA_ID` is set correctly in `.env.local`

**Q: Blog posts not showing**
A: Check that blog posts are added to `app/lib/blogPosts.ts`

## 🚀 Deployment

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

## 📈 Next Steps

1. Update social media links in footer
2. Add company logo to navbar
3. Configure email service for production
4. Set up database for user data
5. Add blog admin panel
6. Implement CRM integration
7. Add payment processing (if needed)

---

**Last Updated**: July 2024
**Version**: 1.0.0
**Status**: Production Ready ✅
