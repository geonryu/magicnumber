const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const NaverStrategy = require("passport-naver").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const auth = require("./middleware/auth.js");
const user = require("./middleware/user.js");

// Passport 로그인 전략 설정
passport.use(
  new LocalStrategy(
    {
      usernameField: "userId",
      passwordField: "userPw",
    },
    async (username, password, done) => {
      console.log("LocalStrategy", username, password);
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

passport.use(new NaverStrategy({
    clientID: 'fYAEco2bHd_RTuHRgpV6',
    clientSecret: 'nHMaEFowPa',
    callbackURL: '/auth/naver/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("NaverStrategy - accessToken: ", accessToken);
    console.log("NaverStrategy - refreshToken: ", refreshToken);
    console.log("NaverStrategy - profile: ", profile);
    return done(null, profile);
  })
);

passport.use(new GoogleStrategy({
    clientID: '889415943636-92levfe9b44329v3fotcr2oscnhccd60.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("GoogleStrategy - accessToken: ", accessToken);
    console.log("GoogleStrategy - refreshToken: ", refreshToken);
    console.log("GoogleStrategy - profile: ", profile);
    return done(null, profile);
  }
));

passport.use(new KakaoStrategy({
    clientID: 'f30507c63cdefddd119d0b1197c8eaa7',
    clientSecret: 'FGSKKs5npdwCXx5k6l6zlQkwSNNetn1v',
    callbackURL: '/auth/kakao/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("KakaoStrategy - accessToken: ", accessToken);
    console.log("KakaoStrategy - refreshToken: ", refreshToken);
    console.log("KakaoStrategy - profile: ", profile);
    return done(null, profile);
  }
));

// Passport 직렬화 설정
passport.serializeUser((user, done) => {
  if(user.accessToken){
    console.log("serializeUser - user.accessToken", user.accessToken);
    done(null, user.accessToken);
  }else{
    console.log("serializeUser - user.id", user.id);
    done(null, user.id);
  }
});

// Passport 역직렬화 설정
passport.deserializeUser(async (accessToken, done) => {
  const responseData = await auth.getUserInfo(accessToken);
  const user = responseData.result;
  user.accessToken = accessToken;
  console.log("deserializeUser - user", user);
  done(null, user);
});

// // Passport 직렬화 설정
// passport.serializeUser((user, done) => {
//   console.log("serializeUser - user.accessToken", user.accessToken);
//   done(null, user.accessToken);
// });

// // Passport 역직렬화 설정
// passport.deserializeUser(async (accessToken, done) => {
//   const responseData = await auth.getUserInfo(accessToken);
//   const user = responseData.result;
//   user.accessToken = accessToken;
//   console.log("deserializeUser - user", user);
//   done(null, user);
// });