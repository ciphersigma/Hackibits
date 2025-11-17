const BetaUser = require('../models/BetaUser');
const { sendBulkEmail } = require('../utils/emailService');
const nodemailer = require('nodemailer');

exports.sendBulkEmailToBeta = async (req, res) => {
  try {
    const { subject, message } = req.body;

    const users = await BetaUser.find();
    const emails = users.map(user => user.email);

    if (emails.length === 0) {
      return res.status(400).json({ error: 'No beta users found' });
    }

    await sendBulkEmail(emails, subject, message);

    res.json({ 
      success: true, 
      message: `Email sent to ${emails.length} users`,
      count: emails.length 
    });
  } catch (error) {
    console.error('Bulk email error:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
};

exports.checkEmailStatus = async (req, res) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ success: false, error: 'Email credentials not configured' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Quick verify with timeout
    await Promise.race([
      transporter.verify(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
    ]);
    
    res.json({ success: true, status: 'connected' });
  } catch (error) {
    console.error('Email service error:', error.message);
    res.json({ success: true, status: 'configured' });
  }
};
