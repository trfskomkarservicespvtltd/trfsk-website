import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection (optional but useful for debugging)
export const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("✅ Gmail SMTP is ready");
  } catch (error) {
    console.error("❌ Gmail SMTP error:", error);
  }
};

// Send email to TRFSK admin (you)
export const sendContactEmail = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  return await transporter.sendMail({
    from: `"TRFSK Website" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_RECEIVER,
    subject: `📩 New Contact Inquiry from ${data.name}`,
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2 style="color:#2563eb;">New Contact Inquiry</h2>

        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>

        <h3>Message:</h3>
        <p>${data.message}</p>

        <hr />
        <p style="color:gray;font-size:12px;">
          This email was sent from TRFSK website contact form.
        </p>
      </div>
    `,
  });
};

// Auto-reply email to visitor
export const sendAutoReply = async (data: {
  name: string;
  email: string;
}) => {
  return await transporter.sendMail({
    from: `"TRFSK Team" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: "✅ We received your message - TRFSK",
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2 style="color:#2563eb;">Thank you, ${data.name}!</h2>

        <p>
          We have received your inquiry. Our team will review it
          and get back to you shortly.
        </p>

        <p>
          At TRFSK, we focus on financial awareness, business education,
          and meaningful collaboration.
        </p>

        <br />

        <p style="color:gray;font-size:12px;">
          This is an automated response. Please do not reply to this email.
        </p>
      </div>
    `,
  });
};