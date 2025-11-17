const express = require('express');
const router = express.Router();
const betaController = require('../controllers/betaController');
const emailController = require('../controllers/emailController');

router.post('/join', betaController.joinBeta);
router.get('/users', betaController.getAllBetaUsers);
router.post('/send-email', emailController.sendBulkEmailToBeta);
router.get('/email-status', emailController.checkEmailStatus);

module.exports = router;
