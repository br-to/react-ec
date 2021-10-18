const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { adminGetOrders, adminOrderStatus } = require('../controllers/order');

// route
router.get('/admin/orders', authCheck, adminCheck, adminGetOrders);
router.put('/admin/order-status', authCheck, adminCheck, adminOrderStatus);

module.exports = router;
