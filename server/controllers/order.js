const Order = require('../models/order');

// create, remove, list

exports.adminGetOrders = async (req, res) => {
  res.json(await Order.find({}).sort({ createdAt: -1 }).populate('products.product').exec());
};

exports.adminOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true }).exec();

  res.json(updated);
};
