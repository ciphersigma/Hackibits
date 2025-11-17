const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.sendBulkEmail = async (recipients, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      bcc: recipients,
      subject: subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

exports.sendWelcomeEmail = async (email, name) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #00D084;">Welcome to HackiBits Beta!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for joining the HackiBits beta program! You're now part of an exclusive community.</p>
      <h3>Your Beta Benefits:</h3>
      <ul>
        <li>30% discount on first purchase</li>
        <li>Early access to all products</li>
        <li>Priority customer support</li>
        <li>Free shipping on first order</li>
      </ul>
      <p>We'll keep you updated on product launches and exclusive offers.</p>
      <p style="margin-top: 30px;">Best regards,<br>HackiBits Team</p>
    </div>
  `;

  return await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to HackiBits Beta Program!',
    html: htmlContent
  });
};
