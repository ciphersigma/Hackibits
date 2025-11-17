const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginAttempts = new Map();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ip = req.ip;
    const now = Date.now();
    
    const attempts = loginAttempts.get(ip) || { count: 0, lockUntil: 0, firstFailTime: 0 };
    
    const admin = await Admin.findOne({ email });
    const isCorrectPassword = admin && admin.password === password;
    
    if (attempts.lockUntil > now) {
      const timeSinceFirstFail = now - attempts.firstFailTime;
      
      if (isCorrectPassword && timeSinceFirstFail >= 30 * 1000) {
        loginAttempts.delete(ip);
        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.json({ success: true, token, data: { email: admin.email } });
      }
      
      const remainingTime = Math.ceil((attempts.lockUntil - now) / 1000);
      return res.status(429).json({ 
        success: false, 
        message: `Too many failed attempts. Try again in ${remainingTime} seconds.` 
      });
    }
    
    if (!isCorrectPassword) {
      attempts.count++;
      
      if (attempts.count === 1) {
        attempts.firstFailTime = now;
      }
      
      if (attempts.count >= 5) {
        attempts.lockUntil = now + (15 * 60 * 1000);
      }
      
      loginAttempts.set(ip, attempts);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    loginAttempts.delete(ip);
    
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ success: true, token, data: { email: admin.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = new Admin({ email, password });
    await admin.save();
    res.json({ success: true, message: 'Admin created' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
