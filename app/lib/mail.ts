import nodemailer from "nodemailer";
import { adminTemplate } from "./emailTemplates";
import { ContactEmailData } from "./emailTypes";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log("✅ Zoho SMTP Connected");
  } catch (error) {
    console.error("SMTP Error:", error);
  }
}

/* ===========================================================
   CONTACT FORM EMAIL TO COMPANY
=========================================================== */

export async function sendContactEmail(data: ContactEmailData) {
  return transporter.sendMail({
    from: `"TRFSK Website" <${process.env.SMTP_USER}>`,

    to: process.env.CARE_EMAIL,

    replyTo: data.email,

    subject:
      data.subject ||
      `New Website Enquiry - ${data.name}`,

    html: adminTemplate(data),
  });
}

/* ===========================================================
   AUTO REPLY TO CONTACT FORM USER
=========================================================== */

export async function sendAutoReply(data: ContactEmailData) {
  return transporter.sendMail({
    from: `"TRFSK OMKAR SERVICES PVT LTD" <${process.env.SMTP_USER}>`,

    to: data.email,

    subject:
      "Thank you for contacting TRFSK OMKAR SERVICES PVT LTD",

    html: `
<!DOCTYPE html>

<html>

<body style="font-family:Arial;background:#f8fafc;padding:40px;">

<div style="max-width:700px;margin:auto;background:white;border-radius:12px;padding:40px;border:1px solid #ddd;">

<h2 style="color:#2563eb;">
Thank you, ${data.name}
</h2>

<p>
We have successfully received your enquiry.
</p>

<p>
One of our team members will review your request and contact you shortly.
</p>

<hr>

<p><strong>Reference</strong></p>

<p>Name : ${data.name}</p>

<p>Email : ${data.email}</p>

<p>Subject : ${data.subject || "General Enquiry"}</p>

<p>
Thank you for choosing
<strong>TRFSK OMKAR SERVICES PVT LTD</strong>.
</p>

</div>

</body>

</html>
`,
  });
}

/* ===========================================================
   NEWSLETTER WELCOME EMAIL
=========================================================== */

export async function sendNewsletterWelcome(email: string) {
  await transporter.sendMail({
    from: `"TRFSK Newsletter" <${process.env.SMTP_USER}>`,

    to: email,

    subject:
      "Welcome to TRFSK OMKAR SERVICES PVT LTD",

    html: `
<!DOCTYPE html>

<html>

<body style="font-family:Arial;background:#f8fafc;padding:40px;">

<div style="max-width:700px;margin:auto;background:white;border-radius:12px;padding:40px;border:1px solid #ddd;">

<h2 style="color:#2563eb;">
Welcome to TRFSK
</h2>

<p>
Thank you for subscribing to our newsletter.
</p>

<p>
You will now receive:
</p>

<ul>

<li>Business Updates</li>

<li>Financial Awareness Articles</li>

<li>Educational Resources</li>

<li>New Partnership Opportunities</li>

<li>Important Company Announcements</li>

</ul>

<br>

<p>
We appreciate your interest.
</p>

<p>

<strong>
TRFSK OMKAR SERVICES PVT LTD
</strong>

</p>

</div>

</body>

</html>
`,
  });

  await transporter.sendMail({
    from: `"TRFSK Website" <${process.env.SMTP_USER}>`,

    to: process.env.SUBSCRIBER_EMAIL,

    subject: "New Newsletter Subscriber",

    html: `
<h2>New Newsletter Subscriber</h2>

<p><strong>Email :</strong> ${email}</p>

<p>
This subscriber joined through the website newsletter form.
</p>
`,
  });
}