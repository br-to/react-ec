const express = require('express');
const router = express.Router();

const { createOrUpdate } = require('../controllers/auth');

// route
router.get('/create-or-update-user', createOrUpdate);

module.exports = router
