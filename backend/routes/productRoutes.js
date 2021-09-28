const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductById,
} = require('../controller/productControllers');

// get all products from db
router.get('/', getAllProducts);

// get a product by id from db
router.get('/:id', getProductById);

module.exports = router;
