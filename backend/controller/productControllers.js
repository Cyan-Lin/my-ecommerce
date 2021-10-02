const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    // console.log(products);

    res.send(products);
    // res.send(products)
  } catch (error) {
    console.error(error);
    // HTTP 500 Internal Server Error
    res.status(500).send({ message: 'Server Error' });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
    // res.send(products)
  } catch (error) {
    console.error(error);
    // HTTP 500 Internal Server Error
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
