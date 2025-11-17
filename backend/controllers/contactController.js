const nodemailer = require('nodemailer');

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'hackibits@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Reply to: ${email}</small></p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};
