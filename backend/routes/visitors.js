const express = require('express');
const router = express.Router();
const { getCount, incrementCount } = require('../controllers/visitorController');

router.get('/count', getCount);
router.post('/increment', incrementCount);

module.exports = router;
