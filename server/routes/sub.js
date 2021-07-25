const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create, read, update, remove, list } = require('../controllers/sub');

// route
router.post('/sub/create', authCheck, adminCheck, create);
router.get('/categories', list);
router.get('/sub/:slug', read);
router.put('/sub/:slug', authCheck, adminCheck, update);
router.delete('/sub/:slug', authCheck, adminCheck, remove);


module.exports = router;
