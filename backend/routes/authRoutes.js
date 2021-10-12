const passport = require('passport');
const express = require('express');
// 讓內部的路由撰寫更方便
const router = express.Router();

// #2 網址輸入 /auth/google 使用者進入Google authentication
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// #4 after user completed Google authentication, google will kick them back to this route
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/products');
});

// logout function is in req cause of passport
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// passport.deserializeUser decripted id from cookie-session then store in req object
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
