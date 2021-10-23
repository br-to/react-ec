const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        count: Number,
        color: String
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: 'unprocessed',
      enum: [
        'unprocessed',
        'cashondelivery',
        'processing',
        'dispatched',
        'cancelled',
        'completed'
      ]
    },
    orderdBy: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
