const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("index", {
    title: "매직넘버",
  });
}); // 랜딩 페이지

router.get("/login", async (req, res, next) => {
  res.render("login", {
    title: "매직넘버:로그인",
  });
}); //로그인 라우터

router.get("/join", async (req, res, next) => {
  res.render("join", {
    title: "매직넘버:회원가입",
  });
}); //회원가입라우터

router.get("/mypage", async (req, res, next) => {
  res.render("mypage-basic-info", {
    title: "매직넘버:마이페이지",
  });
}); //마이페이지-기본정보 라우터

router.get("/mypage-info", async (req, res, next) => {
  res.render("mypage-user-info", {
    title: "매직넘버:마이페이지",
  });
}); //마이페이지-회원정보 라우터

router.get("/mypage-coin", async (req, res, next) => {
  res.render("mypage-coin", {
    title: "매직넘버:마이페이지",
  });
}); //마이페이지-코인정보 라우터

router.get("/mypage-bookmark", async (req, res, next) => {
  res.render("mypage-bookmark", {
    title: "매직넘버:마이페이지",
  });
}); //마이페이지-찜목록 라우터

router.get("/charge", async (req, res, next) => {
  res.render("charge", {
    title: "매직넘버:마이페이지",
  });
}); //마이페이지-찜목록 라우터

router.get("/howToUse", async (req, res, next) => {
  res.render("how-to-use", {
    title: "매직넘버:이용방법 안내",
  });
}); //이용방법안내 라우터

router.get("/notice", async (req, res, next) => {
  res.render("notice", {
    title: "매직넘버:공지사항",
  });
}); //게시판(공지사항) 라우터

router.get("/notice-post", async (req, res, next) => {
  res.render("notice-post", {
    title: "매직넘버:공지사항",
  });
}); //게시판(공지사항) - 게시글 라우터

router.get("/recruit", async (req, res, next) => {
  res.render("recruit", {
    title: "매직넘버:상담사모집",
  });
}); //게시판(공지사항) - 게시글 라우터

module.exports = router;
