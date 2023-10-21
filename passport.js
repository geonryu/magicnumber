const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const auth = require("./middleware/auth.js");

// Passport 로그인 전략 설정
passport.use(
  new LocalStrategy(
    {
      usernameField: "userId",
      passwordField: "userPw",
    },
    async (username, password, done) => {
      const params = {
        email: username,
        password: password,
      };

      const responseData = await auth.getAccessToken(params);

      if (responseData.code === 200 && responseData.status === "success") {
        return done(null, { accessToken: responseData.result });
      } else {
        return done(null, false, { message: responseData.message });
      }
    },
  ),
);

// Passport 직렬화 설정
passport.serializeUser((user, done) => {
  // console.log("serializeUser - user.accessToken", user.accessToken);
  done(null, user.accessToken);
});

// Passport 역직렬화 설정
passport.deserializeUser(async (accessToken, done) => {
  const responseData = await auth.getUserInfo(accessToken);
  const user = responseData.result;
  user.accessToken = accessToken;
  // console.log("deserializeUser - user", user);
  done(null, user);
});