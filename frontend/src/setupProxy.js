// "http-proxy-middleware": "^2.0.1"
// 處理轉址、網路請求與 Authorization
const { createProxyMiddleware } = require('http-proxy-middleware');

// /auth, /api開頭的網址 將轉換domain至http://localhost:5000
module.exports = function (app) {
  app.use(
    ['/auth', '/api'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};
