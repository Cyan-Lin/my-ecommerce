const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema => 綱要
const userSchema = new Schema({
  googleId: String,
  email: String,
});

// mongoose.model('單數名稱(首字母大寫)', 此模型的綱要) 創建模型
const User = mongoose.model('User', userSchema);

module.exports = User;
