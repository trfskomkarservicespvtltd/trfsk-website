// Sends a WhatsApp message via Twilio's WhatsApp Business API.
// If Twilio credentials aren't set in .env, this quietly logs to the console
// instead of failing — so the rest of the app keeps working before you've
// set up WhatsApp, and you can turn it on later just by adding the env vars.
//
// To enable for real:
//   1. Sign up for Twilio (twilio.com) and enable WhatsApp in the Twilio Console
//      (sandbox for testing, or apply for a real WhatsApp Business sender for production)
//   2. Add to your .env:
//        TWILIO_ACCOUNT_SID=xxxx
//        TWILIO_AUTH_TOKEN=xxxx
//        TWILIO_WHATSAPP_FROM=whatsapp:+14155238886   (Twilio's sandbox number, or your approved sender)
//   3. Investor phone numbers should include country code (e.g. 91XXXXXXXXXX for India)
//      for messages to actually deliver — plain 10-digit numbers will fail silently.

async function sendWhatsApp(toPhone, message) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM } = process.env;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM) {
    console.log(`[WhatsApp not configured] Would have sent to ${toPhone}: ${message}`);
    return { sent: false, reason: 'Twilio credentials not set in .env' };
  }

  const toNumber = toPhone.startsWith('+') ? toPhone : `+91${toPhone.replace(/\D/g, '')}`;
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');

  const body = new URLSearchParams({
    From: TWILIO_WHATSAPP_FROM,
    To: `whatsapp:${toNumber}`,
    Body: message,
  });

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    const data = await res.json();
    if (!res.ok) {
      console.error('WhatsApp send failed:', data.message || data);
      return { sent: false, reason: data.message || 'Twilio API error' };
    }
    return { sent: true, sid: data.sid };
  } catch (err) {
    console.error('WhatsApp send error:', err.message);
    return { sent: false, reason: err.message };
  }
}

function payoutMessage({ investorName, type, amount, month, companyName }) {
  const typeLabel = { profit: 'interest/profit payout', repay: 'capital repayment', addcap: 'additional capital received' }[type] || 'transaction';
  const fmt = n => '₹' + Number(n || 0).toLocaleString('en-IN');
  return `Hello ${investorName}, this is to confirm your ${typeLabel} of ${fmt(amount)} for ${month} has been recorded by ${companyName || 'us'}. You can view full details anytime by logging into your investor portal. Thank you.`;
}

module.exports = { sendWhatsApp, payoutMessage };
