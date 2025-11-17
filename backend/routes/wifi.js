const express = require('express');
const router = express.Router();
const wifiController = require('../controllers/wifiController');

router.get('/scan', wifiController.scanNetworks);

module.exports = router;
