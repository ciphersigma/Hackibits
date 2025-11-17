const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createPaymentOrder = async (req, res) => {
  try {
    const { sessionId, customer } = req.body;
    
    if (!sessionId || !customer) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    const cart = await Cart.findOne({ sessionId }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }
    
    const total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: 'INR',
      receipt: 'HB' + Date.now()
    });
    
    const items = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));
    
    const order = new Order({
      orderId: razorpayOrder.receipt,
      items,
      customer,
      total,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: 'pending'
    });
    await order.save();
    
    res.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Payment order creation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, sessionId } = req.body;
    
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');
    
    if (razorpay_signature === expectedSign) {
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { 
          paymentStatus: 'paid',
          status: 'confirmed',
          razorpayPaymentId: razorpay_payment_id
        },
        { new: true }
      );
      
      await Cart.deleteOne({ sessionId });
      
      res.json({ success: true, message: 'Payment verified', order });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
