const express = require("express");
const auth = require("../middleware/auth.js");
const counselor = require("../middleware/counselor.js");
const etc = require("../middleware/etc.js");
const mypage = require("../middleware/mypage.js");
const payment = require("../middleware/payment.js");
const sns = require("../middleware/sns.js");
const user = require("../middleware/user.js");
const passport = require("passport");

const router = express.Router();

// API 호스트 경로
const host = "https://api.magicnumber.co.kr";

router.get("/", async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        const params = {
            page: 2,
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

        let bannerList = [];
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
}); // 메인 라우터

router.get("/login", async (req, res, next) => {
    try {
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
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
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

router.get("/auth/naver", passport.authenticate("naver")); // 네이버 로그인 라우터

router.get(
    "/auth/naver/callback",
    passport.authenticate("naver", {
        // successRedirect: "/join",
        failureRedirect: "/login",
        failureFlash: true, // 실패할 때 플래시 메시지 사용
    }),
    async (req, res, next) => {
        try {
            console.log("/auth/naver/callback - req.user", req.user);

            /*
      // 네이버에서 받은 로그인 정보
      // => 닉네임 정보만 활용가능
      email: undefined,
      nickname: '닉네임',
      profile_image: undefined,
      age: undefined,
      birthday: 'MM-DD',
      id: '고유아이디'
      */

            if (req.user.accessToken) {
                res.redirect("/");
            } else {
                const sns_type = 4; // 1:로컬, 2:구글, 3:카카오, 4:네이버
                const sns_uid = req.user.id;
                const params = {
                    sns_uid: sns_uid,
                };
                const responseData = await sns.loginNaver(params, "");
                console.log(
                    "/auth/naver/callback - responseData",
                    responseData
                );

                if (
                    responseData.code === 200 &&
                    responseData.status === "success"
                ) {
                    // 회원 정보가 없을 경우
                    if (responseData.result.code == 404) {
                        const name = req.user._json.name
                            ? req.user._json.name
                            : "";
                        const birth = req.user._json.birthday
                            ? req.user._json.birthday
                            : "";
                        const gender = req.user._json.gender
                            ? req.user._json.gender
                            : "";
                        const phone_num = req.user._json.phone_num
                            ? req.user._json.phone_num
                            : "";
                        const email = req.user._json.email
                            ? req.user._json.email
                            : "";
                        const nick_name = req.user._json.nickname
                            ? req.user._json.nickname
                            : "";
                        res.redirect(
                            `/joinSocial?sns_type=${sns_type}&sns_uid=${sns_uid}&name=${name}&birth=${birth}&gender=${gender}&phone_num=${phone_num}&email=${email}&nick_name=${nick_name}`
                        );
                    } else {
                        res.redirect("/auth/naver");
                    }
                }
            }
        } catch (error) {
            console.error("외부 API와의 통신 중 에러 발생:", error);
            res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
        }
    }
); // 네이버 로그인 처리

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
); // 구글 로그인 라우터

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        // successRedirect: "/join",
        failureRedirect: "/login",
        failureFlash: true, // 실패할 때 플래시 메시지 사용
    }),
    async (req, res, next) => {
        try {
            console.log("/auth/google/callback - req.user", req.user);

            /*
      // 구글에서 받은 로그인 정보
      // => 이름과 이메일 정보만 활용가능
      sub: '고유번호',
      name: '홍길동',
      given_name: '길동',
      family_name: '홍',
      picture: '프로필이미지',
      email: '이메일',
      email_verified: true,
      locale: 'ko'
      */

            if (req.user.accessToken) {
                res.redirect("/");
            } else {
                const sns_type = 2; // 1:로컬, 2:구글, 3:카카오, 4:네이버
                const sns_uid = req.user.id;
                const params = {
                    sns_uid: sns_uid,
                };
                const responseData = await sns.loginGoogle(params, "");
                console.log(
                    "/auth/google/callback - responseData",
                    responseData
                );

                if (
                    responseData.code === 200 &&
                    responseData.status === "success"
                ) {
                    // 회원 정보가 없을 경우
                    if (responseData.result.code == 404) {
                        const name = req.user._json.name
                            ? req.user._json.name
                            : "";
                        const birth = req.user._json.birth
                            ? req.user._json.birth
                            : "";
                        const gender = req.user._json.gender
                            ? req.user._json.gender
                            : "";
                        const phone_num = req.user._json.phone_num
                            ? req.user._json.phone_num
                            : "";
                        const email = req.user._json.email
                            ? req.user._json.email
                            : "";
                        const nick_name = req.user._json.nickname
                            ? req.user._json.nickname
                            : "";
                        res.redirect(
                            `/joinSocial?sns_type=${sns_type}&sns_uid=${sns_uid}&name=${name}&birth=${birth}&gender=${gender}&phone_num=${phone_num}&email=${email}&nick_name=${nick_name}`
                        );
                    } else {
                        res.redirect("/auth/google");
                    }
                }
            }
        } catch (error) {
            console.error("외부 API와의 통신 중 에러 발생:", error);
            res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
        }
    }
); // 구글 로그인 처리

router.get("/auth/kakao", passport.authenticate("kakao")); // 카카오 로그인 라우터

router.get(
    "/auth/kakao/callback",
    passport.authenticate("kakao", {
        // successRedirect: "/join",
        failureRedirect: "/login",
        failureFlash: true, // 실패할 때 플래시 메시지 사용
    }),
    async (req, res, next) => {
        try {
            console.log("/auth/kakao/callback - req.user", req.user);

            /*
      // 카카오에서 받은 로그인 정보
      // => 이메일 정보만 활용가능 (닉네임과 프로필이미지 선택 비동의 시)
      id: 고유번호,
      connected_at: 접근일시,
      kakao_account: {
        profile_nickname_needs_agreement: false,
        profile_image_needs_agreement: false,
        has_email: true,
        email_needs_agreement: false,
        is_email_valid: true,
        is_email_verified: true,
        email: '이메일'
      }
      */

            if (req.user.accessToken) {
                res.redirect("/");
            } else {
                const sns_type = 3; // 1:로컬, 2:구글, 3:카카오, 4:네이버
                const sns_uid = req.user.id;
                const params = {
                    sns_uid: sns_uid,
                };
                const responseData = await sns.loginKakao(params, "");
                console.log(
                    "/auth/kakao/callback - responseData",
                    responseData
                );

                if (
                    responseData.code === 200 &&
                    responseData.status === "success"
                ) {
                    // 회원 정보가 없을 경우
                    if (responseData.result.code == 404) {
                        const name = req.user._json.name
                            ? req.user._json.name
                            : "";
                        const birth = req.user._json.birth
                            ? req.user._json.birth
                            : "";
                        const gender = req.user._json.gender
                            ? req.user._json.gender
                            : "";
                        const phone_num = req.user._json.phone_num
                            ? req.user._json.phone_num
                            : "";
                        const email = req.user._json.kakao_account.email
                            ? req.user._json.kakao_account.email
                            : "";
                        const nick_name = req.user._json.nickname
                            ? req.user._json.nickname
                            : "";
                        res.redirect(
                            `/joinSocial?sns_type=${sns_type}&sns_uid=${sns_uid}&name=${name}&birth=${birth}&gender=${gender}&phone_num=${phone_num}&email=${email}&nick_name=${nick_name}`
                        );
                    } else {
                        res.redirect("/auth/kakao");
                    }
                }
            }
        } catch (error) {
            console.error("외부 API와의 통신 중 에러 발생:", error);
            res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
        }
    }
); // 카카오 로그인 처리

router.get("/logout", async (req, res, next) => {
    try {
        req.logout(() => {
            res.redirect("/"); // 로그아웃 후 리디렉션
        }); // Passport에서 세션 제거
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 로그아웃 처리

router.get("/join", async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        // 이용약관
        const params = {
            agreement_type: 1,
        };
        const responseData = await etc.getAgreement(params, "");
        let termsOfUse = "";
        if (responseData.code === 200 && responseData.status === "success") {
            termsOfUse = responseData.result;
        }

        // 개인정보처리방침
        const params2 = {
            agreement_type: 3,
        };
        const responseData2 = await etc.getAgreement(params2, "");
        let privatePolicy = "";
        if (responseData2.code === 200 && responseData2.status === "success") {
            privatePolicy = responseData2.result;
        }

        res.render("join", {
            title: "매직넘버:회원가입",
            host: host,
            user: req.user,
            msg: req.query.msg,
            termsOfUse: termsOfUse,
            privatePolicy: privatePolicy,
            profile: null,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 회원가입 라우터

router.get("/joinSocial", async (req, res, next) => {
    try {
        res.render("joinSocial", {
            title: "매직넘버:소셜회원가입",
            host: host,
            user: "",
            msg: req.query.msg,
            sns_type: req.query.sns_type,
            sns_uid: req.query.sns_uid,
            name: req.query.name,
            birth: req.query.birth,
            gender: req.query.gender,
            phone_num: req.query.phone_num,
            email: req.query.email,
            nick_name: req.query.nick_name,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 소셜회원가입 라우터

router.post("/join", async (req, res, next) => {
    try {
        const params = {
            email: req.body.email,
            password: req.body.password,
            check_password: req.body.check_password,
            nick_name: req.body.nick_name,
            sns_type: 1, // 1:로컬, 2:구글, 3:카카오, 4:네이버
            user_status: 2, // 1:비회원(모바일), 2:회원, 3:휴면, 4:탈퇴
            name: req.body.name,
            birth: req.body.birth,
            gender: req.body.gender,
            phone_num: req.body.phone_num,
            terms_of_service: req.body.terms_of_service,
            privacy: req.body.privacy,
            advertisement: req.body.advertisement,
        };

        const responseData = await user.signUp(params, "");

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

router.post("/joinSocial", async (req, res, next) => {
    try {
        const params = {
            sns_uid: req.body.sns_uid,
            name: req.body.name,
            birth: req.body.birth,
            gender: req.body.gender,
            email: req.body.email,
            phone_num: req.body.phone_num,
            nick_name: req.body.nick_name,
        };

        const sns_type = req.body.sns_type;

        let responseData = {};

        // 1:로컬, 2:구글, 3:카카오, 4:네이버
        if (sns_type == 2) {
            responseData = await sns.loginGoogle(params, "");
        } else if (sns_type == 3) {
            responseData = await sns.loginKakao(params, "");
        } else if (sns_type == 4) {
            responseData = await sns.loginNaver(params, "");
        }

        if (responseData.code === 200 && responseData.status === "success") {
            res.redirect("/");
        } else {
            res.render("joinSocial", {
                title: "매직넘버:소셜회원가입",
                host: host,
                user: "",
                msg: req.query.msg,
                sns_uid: req.query.sns_uid,
                name: req.query.name,
                birth: req.query.birth,
                gender: req.query.gender,
                phone_num: req.query.phone_num,
                email: req.query.email,
                nick_name: req.query.nick_name,
            });
        }
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 네이버 회원가입 처리

router.post("/reqAuthEmail", async (req, res, next) => {
    try {
        const params = {
            email: req.body.email,
        };

        const responseData = await user.reqAuthEmail(params, "");

        res.status(200).json(responseData);
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 이메일 인증 요청 처리

router.post("/certAuthEmail", async (req, res, next) => {
    try {
        const params = {
            email: req.body.email,
            temp_token: req.body.temp_token,
            cert_code: req.body.cert_code,
        };

        const responseData = await user.certAuthEmail(params, "");

        res.status(200).json(responseData);
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 이메일 인증 처리

router.post("/checkNickname", async (req, res, next) => {
    try {
        const params = {
            nick_name: req.body.nick_name,
        };

        const responseData = await user.checkNickname(params, "");

        res.status(200).json(responseData);
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 닉네임 중복 체크 처리

router.get("/forgotId", async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        res.render("forgotId", {
            title: "매직넘버:아이디 찾기",
            host: host,
            user: req.user,
            msg: req.query.msg,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 아이디 찾기 라우터

router.post("/forgotId", async (req, res, next) => {
    try {
        const params = {
            name: req.body.name,
            birth: req.body.birth,
            phone_num: req.body.phone_num,
        };

        const responseData = await user.findId(params, "");

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
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        const email = req.query.email;
        res.render("forgotIdResult", {
            title: "매직넘버:아이디 찾기",
            host: host,
            user: req.user,
            msg: req.query.msg,
            email: email,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 아이디 찾기 결과 라우터

router.get("/forgotPw", async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        res.render("forgotPw", {
            title: "매직넘버:비밀번호 찾기",
            host: host,
            user: req.user,
            msg: req.query.msg,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
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
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        const temp_token = req.query.temp_token;
        res.render("forgotPwResult", {
            title: "매직넘버:비밀번호 찾기",
            host: host,
            user: req.user,
            msg: req.query.msg,
            temp_token: temp_token,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 비밀번호 찾기 결과 라우터

router.post("/forgotPwResult", async (req, res, next) => {
    try {
        const params = {
            temp_token: req.body.temp_token,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
        };

        const responseData = await user.changeFindPw(params, "");

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
        const accessToken = req.user ? req.user.accessToken : "";
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
            sendCall: req.query.sendCall,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 상담사 개별 페이지 (상담사 ui카드 클릭시 이동) - 프로필 라우터 & 프로필 랜딩 라우터

router.get("/counselorInfoReview", async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
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

        const responseData2 = await counselor.getCounselorReview(
            params2,
            accessToken
        );
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
}); // (사용안함) 상담사 개별 페이지 (상담사 ui카드 클릭시 이동) - 문의하기

router.get(
    "/mypage-user-auth",
    auth.isAuthenticated,
    async (req, res, next) => {
        try {
            const accessToken = req.user ? req.user.accessToken : "";
            let userInfo = [];
            const userData = await auth.getUserInfo("", accessToken);
            if (userData.code === 200 && userData.status === "success") {
                userInfo = userData.result;
            }

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
    }
); // 마이페이지-비밀번호확인 라우터

router.post(
    "/mypage-user-auth",
    auth.isAuthenticated,
    async (req, res, next) => {
        try {
            const accessToken = req.user ? req.user.accessToken : "";

            const params = {
                password: req.body.password,
            };

            const responseData = await mypage.confirmPassword(
                params,
                accessToken
            );

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
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        // 내 정보
        const params = {};
        const responseData = await mypage.getMypage(params, accessToken);
        let mypageInfo = {};
        if (responseData.code === 200 && responseData.status === "success") {
            mypageInfo = responseData.result;
        }

        // 내 포인트
        const params2 = {};
        const responseData2 = await mypage.getMypoint(params2, accessToken);
        let mypoint = {};
        if (responseData2.code === 200 && responseData2.status === "success") {
            mypoint = responseData2.result;
        }

        // 지역화된 숫자 서식 처리 - 3자리마다 콤마(,)
        mypoint =
            typeof mypoint != "object"
                ? new Intl.NumberFormat().format(mypoint)
                : 0;

        // 내 상담내역
        const params3 = {
            page: 1,
        };
        const responseData3 = await counselor.getMyCounselingHistory(
            params3,
            accessToken
        );
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
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        // 내 정보
        const params = {};
        const responseData = await mypage.getMypage(params, accessToken);
        let mypageInfo = {};
        if (responseData.code === 200 && responseData.status === "success") {
            mypageInfo = responseData.result;
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
        const accessToken = req.user ? req.user.accessToken : "";

        const params = {
            nick_name: req.body.nick_name,
            birth: req.body.birth,
        };

        const responseData = await mypage.changeUserInfo(params, accessToken);

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

router.get("/pwChange", auth.isAuthenticated, async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        res.render("pwChange", {
            title: "매직넘버:마이페이지",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 마이페이지-회원정보 - 비밀번호 변경 라우터

router.post("/pwChange", auth.isAuthenticated, async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";

        const params = {
            password: req.body.password,
            new_password: req.body.new_password,
            confirm_new_password: req.body.confirm_new_password,
        };

        const responseData = await mypage.changePassword(params, accessToken);

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

router.get("/mypage-coin", auth.isAuthenticated, async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        // 내 정보
        const params = {};
        const responseData = await mypage.getMypage(params, accessToken);
        let mypageInfo = {};
        if (responseData.code === 200 && responseData.status === "success") {
            mypageInfo = responseData.result;
        }

        // 내 포인트
        const params2 = {};
        const responseData2 = await mypage.getMypoint(params2, accessToken);
        let mypoint = {};
        if (responseData2.code === 200 && responseData2.status === "success") {
            mypoint = responseData2.result;
        }
        // 지역화된 숫자 서식 처리 - 3자리마다 콤마(,)
        mypoint =
            typeof mypoint != "object"
                ? new Intl.NumberFormat().format(mypoint)
                : 0;

        // 충전내역
        const params3 = {
            page: 1,
        };
        const responseData3 = await payment.getPaymentHistory(
            params3,
            accessToken
        );

        let paymentHistory = {};
        if (responseData3.code === 200 && responseData3.status === "success") {
            paymentHistory = responseData3.result;
        }

        res.render("mypage-coin", {
            title: "매직넘버:마이페이지",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
            mypageInfo: mypageInfo,
            mypoint: mypoint,
            paymentHistory: paymentHistory,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 마이페이지-코인정보 라우터

router.get("/mypage-history", auth.isAuthenticated, async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
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

        // 내 상담내역
        let myCounselingHistory = {};
        if (responseData3.code === 200 && responseData3.status === "success") {
            myCounselingHistory = responseData3.result;
        }

        res.render("mypage-history", {
            title: "매직넘버:마이페이지",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
            myCounselingHistory: myCounselingHistory,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 마이페이지-상담내역 라우터

router.get("/mypage-review1", auth.isAuthenticated, async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        const params = {
            type: 1, // 1:작성가능, 2:작성완료(수정)
            page: 1,
        };

        const responseData = await counselor.getMyReview(params, accessToken);

        // 내 리뷰내역
        let myReviewList = {};
        if (responseData.code === 200 && responseData.status === "success") {
            myReviewList = responseData.result;
        }

        res.render("mypage-review1", {
            title: "매직넘버:마이페이지",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
            myReviewList: myReviewList,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 마이페이지-리뷰내역 라우터 (작성가능)

router.get("/mypage-review2", auth.isAuthenticated, async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        const params = {
            type: 2, // 1:작성가능, 2:작성완료(수정)
            page: 1,
        };

        const responseData = await counselor.getMyReview(params, accessToken);

        // 내 리뷰내역
        let myReviewList = {};
        if (responseData.code === 200 && responseData.status === "success") {
            myReviewList = responseData.result;
        }

        res.render("mypage-review2", {
            title: "매직넘버:마이페이지",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
            myReviewList: myReviewList,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 마이페이지-리뷰내역 라우터 (작성완료)

router.post("/addReview", auth.isAuthenticated, async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
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

        const responseData = await counselor.createReview(params, accessToken);

        if (responseData.code === 200 && responseData.status === "success") {
            res.redirect(`/mypage-review2?msg=${responseData.message}`);
        } else {
            res.redirect(`/mypage-review1?msg=${responseData.message}`);
        }
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 리뷰 작성 처리

router.post("/editReview", auth.isAuthenticated, async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
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

        const responseData = await counselor.updateReview(params, accessToken);

        if (responseData.code === 200 && responseData.status === "success") {
            res.redirect(`/mypage-review2?msg=${responseData.message}`);
        } else {
            res.redirect(`/mypage-review2?msg=${responseData.message}`);
        }
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 리뷰 작성 처리

router.get("/charge", auth.isAuthenticated, async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        // 포인트 상품 목록
        const params = {};

        const responseData = await payment.getProduct(params, accessToken);

        let productList = [];
        if (responseData.code === 200 && responseData.status === "success") {
            productList = responseData.result;
        }

        res.render("charge", {
            title: "매직넘버:코인충전",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
            productList: productList,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 코인충전 라우터

router.post("/charge", auth.isAuthenticated, async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        const params = {
            payment_type: req.body.payment_type,
            product_num: req.body.product_num,
            view_type: req.body.view_type,
        };

        const responseData = await payment.preprocessPayment(
            params,
            accessToken
        );

        // 060 충전처리 API
        const url = responseData.result.url; // https://passcall.co.kr:28737/CPTL/Pay2/Card/pay.jsp
        const body = responseData.result.body; // oid=CS231021449C035739239&cpid=0015&membid=045383&amount=33000&coinamt=30300&membnm=홍길동&item=30000포인트&telno=01044445555&formurl=http://www.api.magicnumber.co.kr/api/v1/counselor/payment/form&returnurl=http://www.api.magicnumber.co.kr/api/v1/counselor/payment/log

        if (
            responseData.code === 200 &&
            responseData.status === "success" &&
            responseData.result
        ) {
            res.render("chargeResult", {
                title: "매직넘버:결제",
                host: host,
                user: req.user,
                msg: req.query.msg,
                userInfo: userInfo,
                url: url,
                body: body,
            });
        } else {
            res.redirect(`/charge?msg=${responseData.message}`);
        }
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 코인충전 처리

router.get("/howToUse", async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        res.render("how-to-use", {
            title: "매직넘버:이용방법 안내",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 이용방법안내 라우터

router.get("/notice", async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        res.render("notice", {
            title: "매직넘버:공지사항",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // (사용안함) 게시판(공지사항) 라우터

router.get("/notice-post", async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        res.render("notice-post", {
            title: "매직넘버:공지사항",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // (사용안함) 게시판(공지사항) - 공지사항 게시글 라우터

router.get("/recruit", async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        res.render("recruit", {
            title: "매직넘버:상담사모집",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 상담사 모집 라우터

router.get("/sendCallPrepaid", auth.isAuthenticated, async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        const csrid = req.query.csrid;
        const params = {
            telno: userInfo.telno,
            csrid: csrid,
        };
        const responseData = await counselor.sendCallWithoutComment(
            params,
            accessToken
        );
        console.log("responseData", responseData);

        if (
            responseData.code === 200 &&
            responseData.status === "success" &&
            responseData.result
        ) {
            res.redirect(
                `/counselorInfoProfile?csrid=${csrid}&sendCall=prepaid`
            );
        } else {
            res.redirect(`/counselorInfoProfile?csrid=${csrid}`);
        }
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 선불상담 버튼 처리

router.get(
    "/sendCallDeferred",
    auth.isAuthenticated,
    async (req, res, next) => {
        try {
            const accessToken = req.user ? req.user.accessToken : "";
            let userInfo = [];
            const userData = await auth.getUserInfo("", accessToken);
            if (userData.code === 200 && userData.status === "success") {
                userInfo = userData.result;
            }

            const csrid = req.query.csrid;
            const params = {
                telno: userInfo.telno,
                csrid: csrid,
            };
            const responseData = await counselor.sendCallWithoutComment(
                params,
                accessToken
            );

            if (
                responseData.code === 200 &&
                responseData.status === "success" &&
                responseData.result
            ) {
                res.redirect(
                    `/counselorInfoProfile?csrid=${csrid}&sendCall=deffered`
                );
            } else {
                res.redirect(`/counselorInfoProfile?csrid=${csrid}`);
            }
        } catch (error) {
            console.error("외부 API와의 통신 중 에러 발생:", error);
            res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
        }
    }
); // 후불상담 버튼 처리

router.get("/userWithdrawal", auth.isAuthenticated, async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        res.render("userWithdrawal", {
            title: "매직넘버:회원탈퇴",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
            withdraw: req.query.withdraw,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 회원탈퇴 라우터

router.post("/userWithdrawal", async (req, res, next) => {
    const accessToken = req.user ? req.user.accessToken : "";

    try {
        const params = {
            password: req.body.password,
        };

        const responseData = await mypage.withDraw(params, accessToken);

        if (responseData.code === 200 && responseData.status === "success") {
            res.redirect("/userWithdrawal?withdraw=true");
        } else {
            res.redirect(`/userWithdrawal?msg=${responseData.message}`);
        }
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 회원탈퇴 처리

router.get("/termsOfUse", async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        // 이용약관
        const params = {
            agreement_type: 1,
        };
        const responseData = await etc.getAgreement(params, "");
        let termsOfUse = "";
        if (responseData.code === 200 && responseData.status === "success") {
            termsOfUse = responseData.result;
        }

        res.render("termsOfUse", {
            title: "매직넘버:이용약관",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
            termsOfUse: termsOfUse,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 이용약관 라우터

router.get("/privatePolicy", async (req, res, next) => {
    try {
        const accessToken = req.user ? req.user.accessToken : "";
        let userInfo = [];
        const userData = await auth.getUserInfo("", accessToken);
        if (userData.code === 200 && userData.status === "success") {
            userInfo = userData.result;
        }

        // 개인정보처리방침
        const params = {
            agreement_type: 3,
        };
        const responseData = await etc.getAgreement(params, "");
        let privatePolicy = "";
        if (responseData.code === 200 && responseData.status === "success") {
            privatePolicy = responseData.result;
        }

        res.render("privatePolicy", {
            title: "매직넘버:개인정보처리방침",
            host: host,
            user: req.user,
            msg: req.query.msg,
            userInfo: userInfo,
            privatePolicy: privatePolicy,
        });
    } catch (error) {
        console.error("외부 API와의 통신 중 에러 발생:", error);
        res.status(500).json({ error: "외부 API와의 통신 중 에러 발생" });
    }
}); // 개인정보처리방침 라우터

module.exports = router;
