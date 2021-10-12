// fire this file in package.json "data:import": "node backend/seederScript.js"

require('dotenv').config;

const connectDB = require('./config/db');
const productsData = require('./data/products');
const Product = require('./models/Product');

connectDB();

// reset all the data
const importData = async () => {
  try {
    await Product.deleteMany({});

    await Product.insertMany(productsData);

    console.log('Data Import Success');
  } catch (e) {
    console.error('Error with data import');
  }
};

importData();
