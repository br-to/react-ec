const express = require('express');

const router = express.Router();

const { authCheck } = require('../middlewares/auth');

const {
  userCart,
  getUserCart,
  removeUserCart,
  postUserAddress,
  saveCoupon,
  createOrder,
  getOrders,
  addToWishlist,
  wishlist,
  removeWishlist
} = require('../controllers/user');

router.post('/user/cart', authCheck, userCart); // save cart
router.get('/user/cart', authCheck, getUserCart); // get cart
router.delete('/user/cart', authCheck, removeUserCart); // get cart
router.post('/user/address', authCheck, postUserAddress); // save address

// coupon
router.post('/user/cart/coupon', authCheck, saveCoupon)
// order
router.post('/user/order', authCheck, createOrder);
router.get('/user/orders', authCheck, getOrders);
// wishlist
router.post('/user/wishlist', authCheck, addToWishlist);
router.get('/user/wishlist', authCheck, wishlist);
router.put('/user/wishlist/:productId', authCheck, removeWishlist);

module.exports = router;
