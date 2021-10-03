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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    // __dirname 從此(index.js)資料夾 (可以省略不寫)
    // '..'從此資料夾往上一層
    res.sendFile(path.resolve('..', 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
