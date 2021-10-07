const express = require('express');
const router = express.Router();

const { postOrder, getOrderById } = require('../controller/orderControllers');
const requireLogin = require('../middlewares/requireLogin');

router.post('/', requireLogin, postOrder);

router.get('/', requireLogin, getOrderById);

module.exports = router;
