// dotenv => a json package that loads environment variables from a .env file into process.env
require('dotenv').config();
// express => a node.js framework
const express = require('express');
// cookie-session => stores the session data on the client within a cookie
const cookieSession = require('cookie-session');
// passport => an Express-compatible authentication middleware for Node.js
const passport = require('passport');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('./config/passport');

// mongoose init
connectDB();

// The app object conventionally denotes(表示) the Express application
const app = express();

// Each app.use(middleware) is called every time a request is sent to the server
app.use(express.json());

// maxAge => a number representing the milliseconds for expiry (here is 30 days)
// keys => The list of keys to use to sign & verify cookie values(encrypt)
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
// 確認 passport.user 是否已存在，若沒有則初始化一個空的
// To use Passport in an Express or Connect-based application, configure(配置) it with the required passport.initialize() middleware
app.use(passport.initialize());
// 用以處理 Session。若有找到 passport.user，則判定其通過驗證，並呼叫 deserializeUser()
// If your application uses persistent login sessions (recommended, but not required)
app.use(passport.session());

// route handler
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// prod mode
// At first, the client does not have any JS code loaded yet. So the very first request will always be to the server. That will then return a page that contains the needed script tags to load React and React Router etc.
// if you copy-paste the URL in the address bar(or just refresh). The browser has not loaded your website yet. In other words, No React Router is running on machine yet. So the browser will make a server request to (http://example.com/about) and get NOT FOUND 404
if (process.env.NODE_ENV === 'production') {
  // a build-in package of node.js
  const path = require('path');

  // 如果要提供影像、CSS 檔案和 JavaScript 檔案等之類的靜態檔案，請使用 Express 中的 express.static 內建中介軟體函數
  // path.join(第一個參數會算在內), 預設不包含此檔案的路徑, 所以第一個參數就需要__dirname(此檔案之路徑)
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

  // res.sendFile()函數本質上在給定路徑上傳輸文件
  app.get('*', (req, res) => {
    // __dirname => 從此(index.js)資料夾
    // '..'從此資料夾往上一層
    // path.resolve(第一個參數不重要 會被省略,), 預設就是包含此檔案的路徑/backend
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')
    );
  });
}

// heroku 會提供此環境變數, 如果沒有process.env.PORT(dev mode), 則run on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
