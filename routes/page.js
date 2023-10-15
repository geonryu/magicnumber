const express = require("express");
const auth = require("../middleware/auth.js");
const counselor = require("../middleware/counselor.js");
const etc = require("../middleware/etc.js");
const mypage = require("../middleware/mypage.js");
const payment = require("../middleware/payment.js");
const user = require("../middleware/user.js");
const passport = require("passport");

const router = express.Router();

// API 호스트 경로
const host = "http://api.magicnumber.co.kr";

router.get("/", async (req, res, next) => {
  try {
  const accessToken = (req.user) ? req.user.accessToken : "";
  let userInfo = [];
  const userData = await auth.getUserInfo("", accessToken);
  if (userData.code === 200 && userData.status === "success") {
    userInfo = userData.result;
  }

  const params = {
    page: 1,
  };
  const responseData = await counselor.getCounselor(params, "");

  const state = req.query.state;
  let counselorList = [];
  if (responseData.code === 200 && responseData.status === "success") {
    counselorList = responseData.result;
    if (state) {
      counselorList = counselorList.filter(
        (item) => item.state == state
      );
    }
  }

  const params2 = {};
  const responseData2 = await etc.getBanner(params2, "");

  if (responseData2.code === 200 && responseData2.status === "success") {
    bannerList = responseData2.result;
  }

  res.render("index", {
    title: "매직넘버",
    host: host,
    user: req.user,
    msg: req.query.msg,
    userInfo: userInfo,
    counselorList: counselorList,
    bannerList: bannerList,
    state: state,
  });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 랜딩 페이지

router.get("/login", async (req, res, next) => {
  if (req.isAuthenticated()) {
  res.redirect("/");
  } else {
  res.render("login", {
  title: "매직넘버:로그인",
  host: host,
  user: req.user,
  msg: req.query.msg,
  });
  }
}); // 로그인 라우터

router.post(
  "/login",
  passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true, // 실패할 때 플래시 메시지 사용
  })
  ); // 로그인 처리

router.get("/logout", (req, res, next) => {
  req.logout(() => {
  res.redirect("/"); // 로그아웃 후 리디렉션
}); // Passport에서 세션 제거
}); // 로그아웃 처리

router.get("/join", async (req, res, next) => {
  res.render("join", {
  title: "매직넘버:회원가입",
  host: host,
  user: req.user,
  msg: req.query.msg,
  });
}); // 회원가입라우터

router.post("/join", async (req, res, next) => {
  try {
  const params = {
  email: req.body.email,
  password: req.body.password,
  check_password: req.body.check_password,
  nick_name: req.body.nick_name,
  sns_type: req.body.sns_type,
  user_status: req.body.user_status,
  name: req.body.name,
  birth: req.body.birth,
  gender: req.body.gender,
  phone_num: req.body.phone_num,
  terms_of_service: req.body.terms_of_service,
  privacy: req.body.privacy,
  advertisement: req.body.advertisement,
  };

  const responseData = await user.signUp(params, "");
  console.log("responseData: ", responseData);

  if (responseData.code === 200 && responseData.status === "success") {
  res.redirect("/");
  } else {
  res.render("join", {
  title: "매직넘버:회원가입",
  host: host,
  user: req.user,
  msg: req.query.msg,
  });
}); // 회원가입라우터

router.post("/join", async (req, res, next) => {
  try {
  const params = {
  email: req.body.email,
  password: req.body.password,
  check_password: req.body.check_password,
  nick_name: req.body.nick_name,
  sns_type: req.body.sns_type,
  user_status: req.body.user_status,
  name: req.body.name,
  birth: req.body.birth,
  gender: req.body.gender,
  phone_num: req.body.phone_num,
  terms_of_service: req.body.terms_of_service,
  privacy: req.body.privacy,
  advertisement: req.body.advertisement,
  };

  const responseData = await user.signUp(params);
  console.log("responseData: ", responseData);

  if (responseData.code === 200 && responseData.status === "success") {
  res.redirect("/");
  } else {
  res.render("join", {
  title: "매직넘버:회원가입",
  host: host,
  user: req.user,
  msg: req.query.msg,
  message: responseData.message,
  });
  }
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 회원가입 처리

router.post("/checkNickname", async (req, res, next) => {
  try {
  const params = {
  nick_name: req.body.nick_name,
  };

  const responseData = await user.checkNickname(params, "");
  console.log("responseData: ", responseData);

  res.status(200).json(responseData);
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
  });

router.get("/forgotId", async (req, res, next) => {
  res.render("forgotId", {
  title: "매직넘버:아이디 찾기",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  });
}); // 아이디 찾기 라우터

router.post("/forgotId", async (req, res, next) => {
  try {
  const params = {
  name: req.body.name,
  birth: req.body.birth,
  phone_num: req.body.phone_num,
  };

  const responseData = await user.findId(params, "");
  console.log("responseData: ", responseData);

  if (
  responseData.code === 200 &&
  responseData.status === "success" &&
  responseData.result.email
  ) {
  res.redirect(`/forgotIdResult?email=${responseData.result.email}`);
  } else {
  res.redirect("/forgotId");
  }
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 아이디 찾기 처리

router.get("/forgotIdResult", async (req, res, next) => {
  const email = req.query.email;
  res.render("forgotIdResult", {
  title: "매직넘버:아이디 찾기",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  email: email,
  });
}); // 아이디 찾기 결과 라우터

router.get("/forgotPw", async (req, res, next) => {
  res.render("forgotPw", {
  title: "매직넘버:비밀번호 찾기",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  });
}); // 비밀번호 찾기 라우터

router.post("/forgotPw", async (req, res, next) => {
  try {
  const params = {
  email: req.body.email,
  name: req.body.name,
  birth: req.body.birth,
  phone_num: req.body.phone_num,
  };

  const responseData = await user.findPw(params, "");
  console.log("responseData: ", responseData);

  if (
  responseData.code === 200 &&
  responseData.status === "success" &&
  responseData.result
  ) {
  res.redirect(`/forgotPwResult?temp_token=${responseData.result}`);
  } else {
  res.redirect("/forgotPw");
  }
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 비밀번호 찾기 처리

router.get("/forgotPwResult", async (req, res, next) => {
  const temp_token = req.query.temp_token;
  res.render("forgotPwResult", {
  title: "매직넘버:비밀번호 찾기",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  temp_token: temp_token,
  });
}); // 비밀번호 찾기 결과 라우터

router.post("/forgotPwResult", async (req, res, next) => {
  try {
  const params = {
  temp_token: req.body.temp_token,
  password: req.body.password,
  confirm_password: req.body.confirm_password,
  };

  const responseData = await user.changeFindPw(params, "");
  console.log("responseData: ", responseData);

  if (
  responseData.code === 200 &&
  responseData.status === "success" &&
  responseData.result
  ) {
  res.redirect(`/login?msg=${responseData.result.msg}`);
  } else {
  res.redirect("/forgotPwResult");
  }
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 비밀번호 찾기 이후 비밀번호 변경 처리

router.get("/counselorInfoProfile", async (req, res, next) => {
  try {
  const accessToken = (req.user) ? req.user.accessToken : "";
  let userInfo = [];
  const userData = await auth.getUserInfo("", accessToken);
  if (userData.code === 200 && userData.status === "success") {
  userInfo = userData.result;
  }

  const csrid = req.query.csrid;
  const params = {
  csrid: csrid,
  };
  const responseData = await counselor.getCounselor(params, "");
  let counselorInfo = {};
  if (responseData.code === 200 && responseData.status === "success") {
  counselorInfo = responseData.result[0];
  }

  res.render("counselor-info-profile", {
  title: "매직넘버:상담사정보",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  counselorInfo: counselorInfo,
  });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 상담사 개별 페이지 (상담사 ui카드 클릭시 이동) - 프로필 라우터 & 프로필 랜딩 라우터

router.get("/counselorInfoReview", auth.isAuthenticated, async (req, res, next) => {
  try {
  const accessToken = (req.user) ? req.user.accessToken : "";
  let userInfo = [];
  const userData = await auth.getUserInfo("", accessToken);
  if (userData.code === 200 && userData.status === "success") {
  userInfo = userData.result;
  }
  const csrid = req.query.csrid;
  const params = {
  csrid: csrid,
  };
  const responseData = await counselor.getCounselor(params, accessToken);
  let counselorInfo = {};
  if (responseData.code === 200 && responseData.status === "success") {
  counselorInfo = responseData.result[0];
  }

  const params2 = {
  csrid: csrid,
  page: 1,
  };

  const responseData2 = await counselor.getCounselorReview(params2, accessToken);
  let reviewList = {};
  if (responseData2.code === 200 && responseData2.status === "success") {
  reviewList = responseData2.result;
  }

  res.render("counselor-info-review", {
  title: "매직넘버:상담사정보",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  counselorInfo: counselorInfo,
  reviewList: reviewList,
  });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 상담사 개별 페이지 (상담사 ui카드 클릭시 이동) - 후기

router.get("/counselorInfoQnA", async (req, res, next) => {
  res.render("counselor-info-qna", {
  title: "매직넘버:상담사정보",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  });
}); // 상담사 개별 페이지 (상담사 ui카드 클릭시 이동) - 문의하기

router.get("/mypage-user-auth", auth.isAuthenticated, async (req, res, next) => {
  try {
  res.render("mypage-user-auth", {
  title: "마이페이지:비밀번호 확인",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 마이페이지-비밀번호확인 라우터
router.post("/mypage-user-auth", auth.isAuthenticated, async (req, res, next) => {
  try {
  const accessToken = (req.user) ? req.user.accessToken : "";
  let userInfo = [];
  const userData = await auth.getUserInfo("", accessToken);
  if (userData.code === 200 && userData.status === "success") {
  userInfo = userData.result;
  }

  const params = {
  password: req.body.password,
  };

  const responseData = await mypage.confirmPassword(params, accessToken);
  console.log("responseData: ", responseData);

  if (responseData.code === 200 && responseData.status === "success") {
  res.redirect("/mypage");
  }else{
  const msg = responseData.message;
  res.redirect(`/mypage-user-auth?msg=${msg}`);
  }
  ); // 마이페이지-비밀번호확인 라우터
router.post(
  "/mypage-user-auth",
  auth.isAuthenticated,
  async (req, res, next) => {
  try {
  const accessToken = req.user.accessToken;

  const params = {
  password: req.body.password,
  };

  const responseData = await mypage.confirmPassword(
  params,
  accessToken
  );
  console.log("responseData: ", responseData);

  if (
  responseData.code === 200 &&
  responseData.status === "success"
  ) {
  res.redirect("/mypage");
  } else {
  const msg = responseData.message;
  res.redirect(`/mypage-user-auth?msg=${msg}`);
  }
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
  }
  ); // 마이페이지-비밀번호확인 처리

router.get("/mypage", auth.isAuthenticated, async (req, res, next) => {
  try {
  const accessToken = (req.user) ? req.user.accessToken : "";
  let userInfo = [];
  const userData = await auth.getUserInfo("", accessToken);
  if (userData.code === 200 && userData.status === "success") {
  userInfo = userData.result;
  }
  const params = {};

  const responseData = await mypage.getMypage(params, accessToken);
  // console.log("responseData: ", responseData)

  // 내 정보
  let mypageInfo = {};
  if (responseData.code === 200 && responseData.status === "success") {
  mypageInfo = responseData.result;
  }
  const params2 = {};

  const responseData2 = await mypage.getMypoint(params2, accessToken);
  console.log("responseData2: ", responseData2);

  // 내 포인트
  let mypoint = {};
  if (responseData2.code === 200 && responseData2.status === "success") {
  mypoint = responseData2.result;
  }

  // 지역화된 숫자 서식 처리 - 3자리마다 콤마(,)
  mypoint = new Intl.NumberFormat().format(mypoint);

  const params3 = {
  page: 1,
  };

  const responseData3 = await counselor.getMyCounselingHistory(
  params3,
  accessToken
  );
  console.log("responseData3: ", responseData3);

  // 내 상담내역
  let counselingHistory = {};
  if (responseData3.code === 200 && responseData3.status === "success") {
  counselingHistory = responseData3.result;
  }

  res.render("mypage-basic-info", {
  title: "매직넘버:마이페이지",
  host: host,
  user: req.user,
  msg: req.query.msg,
  mypageInfo: mypageInfo,
  mypoint: mypoint,
  counselingHistory: counselingHistory,
  });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
  const params2 = {};

  const responseData2 = await mypage.getMypoint(params2, accessToken);
  console.log("responseData2: ", responseData2)

  // 내 포인트
  let mypoint = {};
  if (responseData2.code === 200 && responseData2.status === "success") {
  mypoint = responseData2.result;
  }

  // 지역화된 숫자 서식 처리 - 3자리마다 콤마(,)
  mypoint = new Intl.NumberFormat().format(mypoint);

  const params3 = {
  page: 1,
  };

  const responseData3 = await counselor.getMyCounselingHistory(params3, accessToken);
  console.log("responseData3: ", responseData3)

  // 내 상담내역
  let counselingHistory = {};
  if (responseData3.code === 200 && responseData3.status === "success") {
  counselingHistory = responseData3.result;
  }

  res.render("mypage-basic-info", {
  title: "매직넘버:마이페이지",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  mypageInfo: mypageInfo,
  mypoint: mypoint,
  counselingHistory: counselingHistory,
  });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 마이페이지-기본정보 라우터

router.get("/mypage-info", auth.isAuthenticated, async (req, res, next) => {
  try {
  const accessToken = (req.user) ? req.user.accessToken : "";
  let userInfo = [];
  const userData = await auth.getUserInfo("", accessToken);
  if (userData.code === 200 && userData.status === "success") {
  userInfo = userData.result;
  }
  const params = {};

  const responseData = await mypage.getMypage(params, accessToken);
  // console.log("responseData: ", responseData)

  // 내 정보
  let mypageInfo = {};
  if (responseData.code === 200 && responseData.status === "success") {
  mypageInfo = responseData.result;
  }

  res.render("mypage-user-info", {
  title: "매직넘버:마이페이지",
  host: host,
  user: req.user,
  msg: req.query.msg,
  mypageInfo: mypageInfo,
  });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }

  res.render("mypage-user-info", {
  title: "매직넘버:마이페이지",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  mypageInfo: mypageInfo,
  });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 마이페이지-회원정보 라우터

router.post("/mypage-info", auth.isAuthenticated, async (req, res, next) => {
  try {
  const accessToken = (req.user) ? req.user.accessToken : "";
  let userInfo = [];
  const userData = await auth.getUserInfo("", accessToken);
  if (userData.code === 200 && userData.status === "success") {
  userInfo = userData.result;
  }

  const params = {
  nick_name: req.body.nick_name,
  birth: req.body.birth,
  };

  console.log("params: ", params, accessToken);

  const responseData = await mypage.changeUserInfo(params, accessToken);
  console.log("responseData: ", responseData);

  if (responseData.code === 200 && responseData.status === "success") {
  const msg = responseData.message;
  res.redirect(`/mypage-info?msg=${msg}`);
  } else {
  const msg = responseData.message;
  res.redirect(`/mypage-info?msg=${msg}`);
  }
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 마이페이지-회원정보수정 처리

router.get("/pwChange", async (req, res, next) => {
  res.render("pwChange", {
  title: "매직넘버:마이페이지",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  });
}); // 마이페이지-회원정보 - 비밀번호 변경 라우터

router.post("/pwChange", auth.isAuthenticated, async (req, res, next) => {
  try {
  const accessToken = (req.user) ? req.user.accessToken : "";
  let userInfo = [];
  const userData = await auth.getUserInfo("", accessToken);
  if (userData.code === 200 && userData.status === "success") {
  userInfo = userData.result;
  }

  const params = {
  password: req.body.password,
  new_password: req.body.new_password,
  confirm_new_password: req.body.confirm_new_password,
  };

  const responseData = await mypage.changePassword(params, accessToken);
  console.log("responseData: ", responseData);

  if (responseData.code === 200 && responseData.status === "success") {
  const msg = "비밀번호 변경이 완료되었습니다.";
  res.redirect(`/mypage?msg=${msg}`);
  } else {
  const msg = responseData.message;
  res.redirect(`/pwChange?msg=${msg}`);
  }
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 마이페이지-회원정보 - 비밀번호 변경 처리

router.get("/mypage-coin", async (req, res, next) => {
  res.render("mypage-coin", {
  title: "매직넘버:마이페이지",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  });
}); // 마이페이지-코인정보 라우터

router.get("/mypage-history", auth.isAuthenticated, async (req, res, next) => {
  try {
  const accessToken = (req.user) ? req.user.accessToken : "";
  let userInfo = [];
  const userData = await auth.getUserInfo("", accessToken);
  if (userData.code === 200 && userData.status === "success") {
  userInfo = userData.result;
  }

  const params3 = {
  page: 1,
  };

  const responseData3 = await counselor.getMyCounselingHistory(
  params3,
  accessToken
  );
  console.log("responseData3: ", responseData3);

  // 내 상담내역
  let counselingHistory = {};
  if (responseData3.code === 200 && responseData3.status === "success") {
  counselingHistory = responseData3.result;
  }

  res.render("mypage-history", {
  title: "매직넘버:마이페이지",
  host: host,
  user: req.user,
  msg: req.query.msg,
  counselingHistory: counselingHistory,
  });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }

  res.render("mypage-history", {
  title: "매직넘버:마이페이지",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  counselingHistory: counselingHistory,
  });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 마이페이지-상담내역 라우터

router.post("/review", auth.isAuthenticated, async (req, res, next) => {
  try {
  const accessToken = (req.user) ? req.user.accessToken : "";
  let userInfo = [];
  const userData = await auth.getUserInfo("", accessToken);
  if (userData.code === 200 && userData.status === "success") {
  userInfo = userData.result;
  }

  const params = {
  counsel_num: req.body.counsel_num,
  contents: req.body.contents,
  score: req.body.score,
  };
  console.log("params: ", params, accessToken);

  const responseData = await counselor.createReview(params, accessToken);
  console.log("responseData: ", responseData);

  // if (responseData.code === 200 && responseData.status === "success" && responseData.result) {
  //   res.redirect(`/forgotPwResult?temp_token=${responseData.result}`);
  // }else{
  //   res.redirect("/forgotPw");
  // }
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 비밀번호 찾기 처리

router.get("/charge", async (req, res, next) => {
  res.render("charge", {
  title: "매직넘버:마이페이지",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  });
}); // 코인충전 라우터

router.get("/howToUse", async (req, res, next) => {
  res.render("how-to-use", {
  title: "매직넘버:이용방법 안내",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  });
}); // 이용방법안내 라우터

router.get("/notice", async (req, res, next) => {
  res.render("notice", {
  title: "매직넘버:공지사항",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  });
}); // 게시판(공지사항) 라우터

router.get("/notice-post", async (req, res, next) => {
  res.render("notice-post", {
  title: "매직넘버:공지사항",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  });
}); // 게시판(공지사항) - 공지사항 게시글 라우터

router.get("/recruit", async (req, res, next) => {
  res.render("recruit", {
  title: "매직넘버:상담사모집",
  host: host,
  user: req.user,
  msg: req.query.msg,
  userInfo: userInfo,
  });
}); // 상담사 모집

module.exports = router;