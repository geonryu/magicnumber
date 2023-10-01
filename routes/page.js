const express = require("express");
const counselor = require("../middleware/counselor.js");
const auth = require("../middleware/auth.js");
const user = require("../middleware/user.js");
const passport = require("passport");

const router = express.Router();

// API 호스트 경로
const host = "http://api.magicnumber.co.kr";

router.get("/", async (req, res, next) => {
  try {
    const params = {
      page: 1,
    };
    const responseData = await counselor.getCounselor(params);

    const state = req.query.state;
    let counselorList = [];
    if (responseData.code === 200 && responseData.status === "success") {
      counselorList = responseData.result;
      if (state) {
        counselorList = counselorList.filter((item) => item.state == state);
      }
    }

    res.render("index", {
      title: "매직넘버",
      user: req.user,
      host: host,
      counselorList: counselorList,
      state: state,
    });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); // 랜딩 페이지

router.get("/login", async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("logged !!");
    res.redirect("/");
  } else {
    res.render("login", {
      title: "매직넘버:로그인",
      user: req.user,
    });
  }
}); //로그인 라우터

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true, // 실패할 때 플래시 메시지 사용
  }),
);

router.get("/logout", (req, res, next) => {
  req.logout(() => {
    res.redirect("/"); // 로그아웃 후 리디렉션
  }); // Passport에서 세션 제거
});

router.get("/join", async (req, res, next) => {
  res.render("join", {
    title: "매직넘버:회원가입",
    user: req.user,
  });
}); //회원가입라우터

router.post("/join", async (req, res, next) => {
  try {
    const params = {
      email: "abcd@magicnumber.co.kr",
      password: "5555",
      check_passowrd: "5555",
      nick_name: "김길동닉네임",
      sns_type: "1",
      user_status: "2",
      name: "김길동",
      birth: "20010101",
      gender: "1",
      phone_num: "01012345678",
      terms_of_service: "1",
      privacy: "1",
      advertisement: "1",
    };

    const responseData = await user.signUp(params);

    let counselorList = [];
    if (responseData.code === 200 && responseData.status === "success") {
      counselorList = responseData.result;
      if (state) {
        counselorList = counselorList.filter((item) => item.state == state);
      }
    }

    res.render("index", {
      title: "매직넘버",
      user: req.user,
      host: host,
      counselorList: counselorList,
      state: state,
    });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); //회원가입 처리

router.get("/forgotId", async (req, res, next) => {
  res.render("forgotId", {
    title: "매직넘버:아이디 찾기",
    user: req.user,
  });
}); //아이디 찾기 라우터

router.get("/forgotIdResult", async (req, res, next) => {
  res.render("forgotIdResult", {
    title: "매직넘버:아이디 찾기",
    user: req.user,
  });
}); //아이디 찾기 결과 라우터

router.get("/forgotId", async (req, res, next) => {
  res.render("forgotId", {
    title: "매직넘버:아이디 찾기",
    user: req.user,
  });
}); //아이디 찾기 결과 라우터

router.get("/forgotPw", async (req, res, next) => {
  res.render("forgotPw", {
    title: "매직넘버:비밀번호 찾기",
    user: req.user,
  });
}); //비밀번호 찾기 라우터

router.get("/forgotPwResult", async (req, res, next) => {
  res.render("forgotPwResult", {
    title: "매직넘버:비밀번호 찾기",
    user: req.user,
  });
}); //비밀번호 찾기 결과 라우터

router.get("/counselorInfoProfile", async (req, res, next) => {
  try {
    const csrid = req.query.csrid;
    const params = {
      csrid: csrid,
    };
    const responseData = await counselor.getCounselor(params);
    let counselorInfo = {};
    if (responseData.code === 200 && responseData.status === "success") {
      counselorInfo = responseData.result[0];
    }

    res.render("counselor-info-profile", {
      title: "매직넘버:상담사정보",
      user: req.user,
      host: host,
      counselorInfo: counselorInfo,
    });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); //상담사 개별 페이지 (상담사 ui카드 클릭시 이동) - 프로필 라우터 & 프로필 랜딩 라우터

router.get("/counselorInfoReview", async (req, res, next) => {
  try {
    const csrid = req.query.csrid;
    const params = {
      csrid: csrid,
    };
    const responseData = await counselor.getCounselor(params);
    let counselorInfo = {};
    if (responseData.code === 200 && responseData.status === "success") {
      counselorInfo = responseData.result[0];
    }

    const params2 = {
      csrid: csrid,
      page: 1,
    };

    const accessToken = req.user ? req.user.accessToken : "";
    const responseData2 = await counselor.getCounselorReview(params2, accessToken);
    let reviewList = {};
    if (responseData2.code === 200 && responseData2.status === "success") {
      reviewList = responseData2.result;
    }
    console.log("reviewList", reviewList);

    res.render("counselor-info-review", {
      title: "매직넘버:상담사정보",
      user: req.user,
      host: host,
      counselorInfo: counselorInfo,
      reviewList: reviewList,
    });
  } catch (error) {
    console.error("외부 API와의 통신 중 에러 발생:", error);
    res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
  }
}); //상담사 개별 페이지 (상담사 ui카드 클릭시 이동) - 후기

router.get("/counselorInfoQnA", async (req, res, next) => {
  res.render("counselor-info-qna", {
    title: "매직넘버:상담사정보",
    user: req.user,
  });
}); //상담사 개별 페이지 (상담사 ui카드 클릭시 이동) - 문의하기

router.get("/mypage", auth.isAuthenticated, async (req, res, next) => {
  res.render("mypage-basic-info", {
    title: "매직넘버:마이페이지",
    user: req.user,
  });
}); //마이페이지-기본정보 라우터

router.get("/mypage-info", async (req, res, next) => {
  res.render("mypage-user-info", {
    title: "매직넘버:마이페이지",
    user: req.user,
  });
}); //마이페이지-회원정보 라우터

router.get("/pwChange", async (req, res, next) => {
  res.render("pwChange", {
    title: "매직넘버:마이페이지",
    user: req.user,
  });
}); //마이페이지-회원정보 - 비밀번호 변경 라우터

router.get("/mypage-coin", async (req, res, next) => {
  res.render("mypage-coin", {
    title: "매직넘버:마이페이지",
    user: req.user,
  });
}); //마이페이지-코인정보 라우터

router.get("/mypage-history", async (req, res, next) => {
  res.render("mypage-history", {
    title: "매직넘버:마이페이지",
    user: req.user,
  });
}); //마이페이지-찜목록 라우터

router.get("/charge", async (req, res, next) => {
  res.render("charge", {
    title: "매직넘버:마이페이지",
    user: req.user,
  });
}); //코인충전 라우터

router.get("/howToUse", async (req, res, next) => {
  res.render("how-to-use", {
    title: "매직넘버:이용방법 안내",
    user: req.user,
  });
}); //이용방법안내 라우터

router.get("/notice", async (req, res, next) => {
  res.render("notice", {
    title: "매직넘버:공지사항",
    user: req.user,
  });
}); //게시판(공지사항) 라우터

router.get("/notice-post", async (req, res, next) => {
  res.render("notice-post", {
    title: "매직넘버:공지사항",
    user: req.user,
  });
}); //게시판(공지사항) - 공지사항 게시글 라우터

router.get("/recruit", async (req, res, next) => {
  res.render("recruit", {
    title: "매직넘버:상담사모집",
    user: req.user,
  });
}); // 상담사 모집

module.exports = router;
