const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderedProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  responded: {
    type: Boolean,
    default: false,
  },

  _product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

module.exports = orderedProductSchema;
