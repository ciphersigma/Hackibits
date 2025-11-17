const BetaUser = require('../models/BetaUser');
const { sendWelcomeEmail } = require('../utils/emailService');

exports.joinBeta = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const existingUser = await BetaUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const betaUser = new BetaUser({ name, email, phone });
    await betaUser.save();

    try {
      await sendWelcomeEmail(email, name);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
    }

    res.status(201).json({ message: 'Successfully joined beta program', user: betaUser });
  } catch (error) {
    console.error('Beta signup error:', error);
    res.status(500).json({ error: 'Failed to join beta program' });
  }
};

exports.getAllBetaUsers = async (req, res) => {
  try {
    const users = await BetaUser.find().sort({ createdAt: -1 });
    res.json({ users, count: users.length });
  } catch (error) {
    console.error('Error fetching beta users:', error);
    res.status(500).json({ error: 'Failed to fetch beta users' });
  }
};
