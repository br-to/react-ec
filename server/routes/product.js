const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create, list } = require('../controllers/product');

// route
router.post('/product', authCheck, adminCheck, create);
router.get('/products', list);

module.exports = router;
