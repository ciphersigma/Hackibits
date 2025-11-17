const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

router.post('/create', createOrder);
router.get('/:orderId', getOrderById);
router.get('/', getAllOrders);
router.put('/:orderId/status', updateOrderStatus);

module.exports = router;
