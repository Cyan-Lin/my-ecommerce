const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderedProductSchema = require('./OrderedProduct');

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },

  detailAddress: {
    type: String,
    required: true,
  },

  orderedProducts: [OrderedProductSchema],

  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  transactionDate: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
