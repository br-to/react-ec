const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String, // ユーザー名
    email: {      // メールアドレス
      type: String,
      required: true,
      index: true, // 検索で使用するから
    },
    role: {        // adminかsubscriberか
      type: String,
      default: 'subscriber',
    },
    cart: {        // カート情報
      type: Array,
      default: []
    },
    address: String, // 配送先
    wishlist: [{ type: ObjectId, ref: "Product" }], // wishlist
  },
  { timestamps: true } // 時間の設定
);

module.exports = mongoose.model('User', userSchema);
