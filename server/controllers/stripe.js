const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  const { couponApplied } = req.body;
  const user = await User.findOne({ email: req.user.email }).exec();

  const { cartTotal, totalAfterDiscount } = await Cart.findOne({ orderdBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount;
  } else {
    finalAmount = cartTotal;
  }


  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: 'jpy',
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};


