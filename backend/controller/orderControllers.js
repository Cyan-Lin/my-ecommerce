require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Order = require('../models/Order');
const Product = require('../models/Product');

const postOrder = async (req, res) => {
  try {
    const {
      values: { name, phoneNumber, email, city, district, detailAddress },
      orderedProducts,
      totalCost,
    } = req.body;

    // console.log(stripeToken, totalCost);
    // console.log(name, phoneNumber, email, city, district, detailAddress);

    const editedOrderedProducts = orderedProducts.map(
      ({ _id, name, price, imageUrl, amount }) => ({
        name,
        price,
        imageUrl,
        amount,
        _product: _id,
      })
    );

    // stripe usd 單位為cents => 100 usd = $1
    const charge = await stripe.paymentIntents.create({
      amount: Number((totalCost * 0.036 * 100).toFixed(0)),
      currency: 'usd',
      // paymentIntents 不需要description和source但要payment_method_types: ['card']
      // description: 'order cost',
      // source: stripeToken,
      payment_method_types: ['card'],
    });

    const order = new Order({
      name,
      phoneNumber,
      email,
      city,
      district,
      detailAddress,
      orderedProducts: editedOrderedProducts,
      _user: req.user.id,
      transactionDate: Date.now(),
    });

    await order.save();

    editedOrderedProducts.forEach(({ _product, amount }) => {
      Product.updateOne(
        { _id: _product },
        { $inc: { countInStock: -amount } }
      ).exec();
    });

    res.send({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orders = await Order.find({ _user: req.user.id }).select({
      name: false,
      phoneNumber: false,
      email: false,
      city: false,
      district: false,
      detailAddress: false,
    });

    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  postOrder,
  getOrderById,
};
