const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/visitors', require('./routes/visitors'));
app.use('/api/wifi', require('./routes/wifi'));
app.use('/api/beta', require('./routes/beta'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'HackiBits API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Keep-alive ping to prevent server from sleeping (for free hosting)
if (process.env.NODE_ENV === 'production') {
  const https = require('https');
  
  setInterval(() => {
    https.get('https://hackibits.onrender.com/api/health', (res) => {
      console.log(`Keep-alive ping: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error('Keep-alive error:', err.message);
    });
  }, 5 * 60 * 1000); // Ping every 5 minutes
}
