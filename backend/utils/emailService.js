const sgMail = require('@sendgrid/mail');
const { welcomeEmail, orderConfirmation, newsletterEmail } = require('./emailTemplates');

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
  if (!process.env.SENDGRID_API_KEY) {
    console.log('Welcome email would be sent to:', email);
    return { accepted: [email] };
  }

  const msg = {
    to: email,
    from: process.env.EMAIL_USER || 'hackibits@gmail.com',
    subject: '🎉 Welcome to HackiBits Beta Program!',
    html: welcomeEmail(name)
  };

  return await sgMail.send(msg);
};

exports.sendOrderConfirmation = async (email, name, orderId, items, total) => {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('Order confirmation would be sent to:', email);
    return { accepted: [email] };
  }

  const msg = {
    to: email,
    from: process.env.EMAIL_USER || 'hackibits@gmail.com',
    subject: `✓ Order Confirmed - #${orderId}`,
    html: orderConfirmation(name, orderId, items, total)
  };

  return await sgMail.send(msg);
};

exports.sendNewsletter = async (recipients, subject, content) => {
  return await this.sendBulkEmail(recipients, subject, newsletterEmail(content));
};
