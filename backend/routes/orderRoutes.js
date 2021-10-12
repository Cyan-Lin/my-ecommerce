const express = require('express');
const router = express.Router();

const { postOrder, getOrderById } = require('../controller/orderControllers');
// verify if user is login(middleware)
const requireLogin = require('../middlewares/requireLogin');

// create new order from checkoutFormReview.js
router.post('/', requireLogin, postOrder);

// get all order of a specific user in App.js
router.get('/', requireLogin, getOrderById);

module.exports = router;
