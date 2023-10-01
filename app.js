const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const nunjucks = require("nunjucks");
const path = require("path");
const auth = require("./middleware/auth.js");

const app = express();

// 기본 설정
app.set("port", 3000);
app.set("view engine", "html");

// 정적 파일 경로 처리
app.use(express.static(path.join(__dirname, "public")));

// 세션 설정
app.use(
  session({
    secret: "magic-secret-key-abc", // 세션 암호화를 위한 비밀 키
    resave: false,
    saveUninitialized: false,
  }),
);

// express-flash 설정
app.use(flash());

// body-parser 설정
app.use(bodyParser.urlencoded({ extended: false }));

// body 파서 미들웨어 사용
app.use(express.json());

// Passport 초기화 및 세션 설정
app.use(passport.initialize());
app.use(passport.session());

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
  console.log("serializeUser - user.accessToken", user.accessToken);
  done(null, user.accessToken);
});

// Passport 역직렬화 설정
passport.deserializeUser(async (accessToken, done) => {
  const responseData = await auth.getUserInfo(accessToken);
  const user = responseData.result;
  user.accessToken = accessToken;
  console.log("deserializeUser - user", user);
  done(null, user);
});

const pageRouter = require("./routes/page");
app.use("/", pageRouter);

nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
  // res.render();
});
