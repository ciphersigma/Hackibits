const sgMail = require('@sendgrid/mail');

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

exports.sendBulkEmail = async (recipients, subject, htmlContent) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('SendGrid not configured. Email would be sent to:', recipients.length, 'recipients');
      return { success: true, messageId: 'no-api-key' };
    }

    const msg = {
      to: recipients,
      from: process.env.EMAIL_USER || 'hackibits@gmail.com',
      subject: subject,
      html: htmlContent
    };

    await sgMail.sendMultiple(msg);
    return { success: true, messageId: 'sg-' + Date.now() };
  } catch (error) {
    console.error('SendGrid error:', error.response?.body || error);
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

  if (!process.env.SENDGRID_API_KEY) {
    console.log('Welcome email would be sent to:', email);
    return { accepted: [email] };
  }

  const msg = {
    to: email,
    from: process.env.EMAIL_USER || 'hackibits@gmail.com',
    subject: 'Welcome to HackiBits Beta Program!',
    html: htmlContent
  };

  return await sgMail.send(msg);
};
