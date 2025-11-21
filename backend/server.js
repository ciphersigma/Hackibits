const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

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
app.use('/api/payment', require('./routes/payment'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'HackiBits API is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  
  // Keep-alive: Ping server every 10 minutes to prevent Azure from sleeping
  cron.schedule('*/10 * * * *', async () => {
    try {
      const url = process.env.SERVER_URL || `http://localhost:${PORT}`;
      await axios.get(`${url}/api/health`);
      console.log('Keep-alive ping successful');
    } catch (error) {
      console.error('Keep-alive ping failed:', error.message);
    }
  });
});
