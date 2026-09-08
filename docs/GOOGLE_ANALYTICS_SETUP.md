# Google Analytics Setup Guide

## Step 1: Create Google Analytics Account

1. Go to [analytics.google.com](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **"Start measuring"**
4. Enter account name: `TRFSK`
5. Click **Next**

## Step 2: Create Property

1. Select **"Web"** as platform
2. Enter property name: `TRFSK Website`
3. Set timezone: `(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi`
4. Currency: `INR - Indian Rupee`
5. Click **"Create"**

## Step 3: Get Your Measurement ID

1. After creating, you'll see your **Measurement ID**
2. It looks like: `G-XXXXXXXXXX`
3. Copy this ID

## Step 4: Add to Environment Variables

Add this line to your `.env.local` file:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

## Step 5: Add to Vercel (Production)

If deploying on Vercel:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add new variable:
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: `G-XXXXXXXXXX`
   - Environment: Production, Preview, Development
4. Click **Save**
5. Redeploy your project

## Step 6: Verify Installation

1. Open your website: `https://trfskomkar.com`
2. Open browser DevTools (F12)
3. Go to **Network** tab
4. Filter by "gtag" or "collect"
5. You should see requests to `google-analytics.com`
6. Go to Google Analytics → Reports → Realtime
7. You should see active users (yourself)

## What Gets Tracked

- Page views
- Time on page
- User location
- Device type
- Traffic sources
- User navigation paths

## Important Notes

- **Privacy**: GA tracks anonymous data. No personal information is collected.
- **Consent**: Consider adding a cookie consent banner for GDPR compliance if targeting EU users.
- **Data Retention**: GA retains data for 14 months by default. You can change this in Admin → Data Settings → Data Retention.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No data in GA | Wait 24-48 hours for data to appear |
| Not tracking locally | Make sure `.env.local` has the correct ID |
| Production not tracking | Add env variable to Vercel and redeploy |
| Duplicate tracking | Check if GA code appears twice in page source |

## Next Steps

After setup:
1. Set up **Goals** in GA to track conversions (contact form submissions, signups)
2. Enable **Google Search Console** integration
3. Create **Custom Reports** for your key metrics
4. Set up **Email Reports** for weekly/monthly summaries
