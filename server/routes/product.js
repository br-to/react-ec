const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create, allList, read, update, remove } = require('../controllers/product');

// route
router.post('/product', authCheck, adminCheck, create);
// count: 取得するproduct情報の上限
router.get('/products/:count', allList);
// 商品情報取得
router.get('/product/:slug', read);
// 商品編集
router.put('/product/:slug', authCheck, adminCheck, update);
// 商品削除
router.delete('/product/:slug', authCheck, adminCheck, remove);

module.exports = router;
