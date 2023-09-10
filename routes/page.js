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

router.get("/forgotId", async (req, res, next) => {
  res.render("forgotId", {
    title: "매직넘버:아이디 찾기",
  });
}); //아이디 찾기 라우터

router.get("/forgotPw", async (req, res, next) => {
  res.render("join", {
    title: "매직넘버:아이디 찾기",
  });
}); //비밀번호 찾기 라우터

router.get("/counselorInfoProfile", async (req, res, next) => {
  res.render("counselor-info-profile", {
    title: "매직넘버:상담사정보",
  });
}); //상담사 개별 페이지 (상담사 ui카드 클릭시 이동) - 프로필 라우터 & 프로필 랜딩 라우터

router.get("/counselorInfoReview", async (req, res, next) => {
  res.render("counselor-info-review", {
    title: "매직넘버:상담사정보",
  });
}); //상담사 개별 페이지 (상담사 ui카드 클릭시 이동) - 후기

router.get("/counselorInfoQnA", async (req, res, next) => {
  res.render("counselor-info-qna", {
    title: "매직넘버:상담사정보",
  });
}); //상담사 개별 페이지 (상담사 ui카드 클릭시 이동) - 문의하기

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

router.get("/mypage-history", async (req, res, next) => {
  res.render("mypage-history", {
    title: "매직넘버:마이페이지",
  });
}); //마이페이지-찜목록 라우터

router.get("/charge", async (req, res, next) => {
  res.render("charge", {
    title: "매직넘버:마이페이지",
  });
}); //코인충전 라우터

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
}); //게시판(공지사항) - 공지사항 게시글 라우터

router.get("/recruit", async (req, res, next) => {
  res.render("recruit", {
    title: "매직넘버:상담사모집",
  });
}); // 상담사 모집

module.exports = router;
