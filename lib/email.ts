import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendContactEmailParams {
  fromName: string;
  fromEmail: string;
  message: string;
}

export async function sendContactEmail({
  fromName,
  fromEmail,
  message,
}: SendContactEmailParams) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: #1A1A1A; padding: 24px; border-radius: 8px;">
        <h2 style="color: #D4A843; margin: 0 0 16px;">📩 Nouveau message — Portfolio CV</h2>
        <div style="background: #222; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
          <p style="color: #999; margin: 0 0 4px; font-size: 12px;">DE</p>
          <p style="color: #fff; margin: 0; font-size: 16px; font-weight: bold;">${fromName}</p>
          <p style="color: #D4A843; margin: 4px 0 0;">${fromEmail}</p>
        </div>
        <div style="background: #222; padding: 16px; border-radius: 6px;">
          <p style="color: #999; margin: 0 0 8px; font-size: 12px;">MESSAGE</p>
          <p style="color: #e0e0e0; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #555; font-size: 11px; margin-top: 16px; text-align: right;">
          Envoyé via talaboulmaroumaissa.vercel.app
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Portfolio CV" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO || "talaromaissa@gmail.com",
    replyTo: fromEmail,
    subject: `💌 Message de ${fromName} — Portfolio`,
    html,
    text: `De: ${fromName} (${fromEmail})\n\n${message}`,
  });
}
