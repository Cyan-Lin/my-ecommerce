const express = require('express');
const router = express.Router();

const { postOrder, getOrderById } = require('../controller/orderControllers');

router.post('/', postOrder);

router.get('/', getOrderById);

module.exports = router;
