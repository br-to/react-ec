const express = require('express');
const router = express.Router();


// middlewares
const { authCheck } = require('../middlewares/auth');

// controller
const { createOrUpdate } = require('../controllers/auth');

const myMiddleware = (req, res, next) => {
  console.log('kobaradesu');
  next();
};

// route
//
router.post('/create-or-update-user', authCheck, createOrUpdate);

router.get('/testing', myMiddleware, (req, res) => {
  res.json({
    data: 'Hello Kobara',
  });
});


module.exports = router;
