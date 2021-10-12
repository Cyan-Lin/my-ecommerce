require('dotenv').config();
// init stripe from backend using secret key
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Order = require('../models/Order');
const Product = require('../models/Product');

// create new order instance
const postOrder = async (req, res) => {
  try {
    // the data from frontend action creater 'submitOrder' fired in CheckoutFormReview
    const {
      values: { name, phoneNumber, email, city, district, detailAddress },
      orderedProducts,
      totalCost,
    } = req.body;

    // console.log(stripeToken, totalCost);
    // console.log(name, phoneNumber, email, city, district, detailAddress);

    // reconstruct the orderedProducts array to make is fit the Order model
    // rename product's _id to _product to fit the model
    const editedOrderedProducts = orderedProducts.map(
      ({ _id, name, price, imageUrl, amount }) => ({
        name,
        price,
        imageUrl,
        amount,
        _product: _id,
      })
    );

    // 完成付款
    // stripe usd 單位為cents => 100 usd = $1, 0.036為1新台幣轉換美元, 用usd是因為沒有twd
    const charge = await stripe.paymentIntents.create({
      amount: Number((totalCost * 0.036 * 100).toFixed(0)),
      currency: 'usd',
      // **stripe.paymentIntents.create 不需要description和source但要payment_method_types: ['card']
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

    // 儲存至mongoDB
    await order.save();

    // update Product model 商品數量-amount
    // Number改變正負都是用$inc, 最後要記得.exec()才會執行
    editedOrderedProducts.forEach(({ _product, amount }) => {
      Product.updateOne(
        { _id: _product },
        { $inc: { countInStock: -amount } }
      ).exec();
    });

    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    // Order model內都有_user(購買商品的user的id),找到所有user的orders後
    // 用select來選擇哪些資訊是不需要送到前端的,避免取出大量不必要的資訊造成負擔
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
