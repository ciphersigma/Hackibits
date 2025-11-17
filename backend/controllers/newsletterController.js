exports.subscribe = (req, res) => {
  const { email } = req.body;
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email required' });
  }
  
  res.json({ success: true, message: 'Successfully subscribed to newsletter' });
};
