// set up mongoose to connect with mongoDB

require('dotenv').config();
// mongoose => a MongoDB object modeling tool
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // fix mongo DeprecationWarning
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connection success!');
  } catch (error) {
    console.error('MongoDB connection FAIL');
    // process.exit(1); exit from node
  }
};

// export the mongoose init function to index.js
module.exports = connectDB;
