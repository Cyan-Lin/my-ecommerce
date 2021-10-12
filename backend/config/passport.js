const passport = require('passport');
// passport-google-oauth20 => Passport strategy for authenticating with Google using the OAuth 2.0 API
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');

// 可設定要將哪些 user 資訊，儲存在 Session 中的 passport.user,
// the 'user' here is the user object from #3, set user.id store in session(here is cookie-session, which will encrypt user.id and store in session)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 可藉由從 Session 中獲得的資訊去撈該 user 的資料
// take the id Decrypted from cookie-session, and we take the id to find the user instance then use (done()) to put the founded object into req object
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// #1 set up Google Authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // 重新導向 URI => 使用者完成 Google 驗證程序之後，系統就會將他們重新導向這個路徑。這個路徑會附加用於存取的授權碼
      callbackURL: '/auth/google/callback',
      // if no 'proxy: true', in prod mode, the callback will become http, not https
      proxy: true,
    },
    /**
     * #3 after google send user back to callbackURL, this will be run
     * @param {*} accessToken 要執行需要對方認證的動作時，所需要的通行證
     * @param {*} refreshToken 用來獲取新的access token
     * @param {*} profile contains the authenticated user's Google profile
     * @param {*} done The verify callback must call (done) providing a user to complete authentication; first param is error
     * @returns #4
     * @existingUser {Object | undefined} // find({}) return {Object[]} (an array of objects)
     */
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      // if found a user in mongoDB, then complete authentication directly to #4
      if (existingUser) {
        return done(null, existingUser);
      }

      // if not, create a new instance of user model and save it to database, then to #4
      const user = await new User({
        googleId: profile.id,
        email: profile.emails[0].value,
      }).save();
      done(null, user);
    }
  )
);
