const express = require('express');

const router = express.Router();

const { authCheck } = require('../middlewares/auth');

const { userCart, getUserCart, removeUserCart, postUserAddress, saveCoupon } = require('../controllers/user');

router.post('/user/cart', authCheck, userCart); // save cart
router.get('/user/cart', authCheck, getUserCart); // get cart
router.delete('/user/cart', authCheck, removeUserCart); // get cart
router.post('/user/address', authCheck, postUserAddress); // save address

// coupon
router.post('/user/cart/coupon', authCheck, saveCoupon)

module.exports = router;
