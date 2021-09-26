const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create, allList, read, update, remove, list, productsCount, productStar, listRelated, searchFilter } = require('../controllers/product');

// route
router.post('/product', authCheck, adminCheck, create);
// ページネーションありの商品数取得
// こっちを先に書かないとproduct/:countの情報に変わってしまう？
router.get('/products/total', productsCount)
// count: 取得するproduct情報の上限
router.get('/products/:count', allList);
// 商品情報取得
router.get('/product/:slug', read);

// 商品編集
router.put('/product/:slug', authCheck, adminCheck, update);
// 商品削除
router.delete('/product/:slug', authCheck, adminCheck, remove);
// 商品並び替え
router.post('/products', list);
// 商品レビュー情報書き換え
router.put('/product/star/:productId', authCheck, productStar);
// 関連商品情報取得
router.get('/product/related/:productId', listRelated);
// 商品情報検索
router.post('/search/filter', searchFilter);

module.exports = router;
