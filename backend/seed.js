const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    
    await Product.deleteMany({});
    
    const products = [
      {
        name: 'RFID/NFC Cloner',
        price: 2999,
        description: 'Clone, read, and analyze RFID/NFC cards.',
        features: ['125kHz & 13.56MHz support', 'Read/Write capability', 'Portable design', 'USB powered'],
        category: 'Hardware',
        inStock: true,
        stock: 50
      },
      {
        name: 'WiFi Scanner',
        price: 3499,
        description: 'Network analysis and WiFi security testing toolkit.',
        features: ['2.4GHz & 5GHz bands', 'Packet capture', 'Deauth testing', 'Monitor mode'],
        category: 'Hardware',
        inStock: true,
        stock: 30
      },
      {
        name: 'IR Signal Blaster',
        price: 1999,
        description: 'Capture and replay infrared signals.',
        features: ['Universal IR support', 'Signal recording', 'Database of 1000+ devices', 'Compact form'],
        category: 'Hardware',
        inStock: true,
        stock: 100
      }
    ];
    
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
