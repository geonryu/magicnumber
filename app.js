const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const passport = require("passport");
const nunjucks = require("nunjucks");
const path = require("path");

// import passport.js
require("./passport");

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
