require('dotenv').config();
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
require('./config/passport');

connectDB();

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);

console.log(__dirname);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  // path.join(第一個參數會算在內), 預設不包含此檔案的路徑, 所以第一個參數就需要__dirname
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

  app.get('*', (req, res) => {
    // __dirname => 從此(index.js)資料夾
    // '..'從此資料夾往上一層
    // path.resolve(第一個參數不重要 會被省略,), 預設就是包含此檔案的路徑/backend
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
