const axios = require("axios");

// 2. 인증
const auth = {
  // 2.1 [POST] 로그인 (AccessToken 생성)
  async getAccessToken(params) {
    console.log("getAccessToken(params)", params);
    try {
      // API URL
      const apiUrl = "/api/auth/login";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: "",
        }, // 헤더 설정
      });

      // POST 요청 보내기
      const response = await axiosInstance.post(apiUrl, params);

      const responseStatus = response.status;
      const responseStatusText = response.statusText;
      const responseData = response.data;

      // console.log("=== success start ===========================");
      // console.log(responseStatus);
      // console.log(responseStatusText);
      // console.log(responseData);
      // console.log("=== success end ============================");

      return responseData;
    } catch (error) {
      const responseStatus = error.response.status;
      const responseStatusText = error.response.statusText;
      const responseData = error.response.data;

      // console.log("=== error start =============================");
      // console.log(responseStatus);
      // console.log(responseStatusText);
      // console.log(responseData);
      // console.log("=== error end ==============================");

      return responseData;
    }
  },

  // 2.2 [GET] 로그인 시, 회원 기본 정보 호출
  async getUserInfo(accessToken) {
    console.log("getUserInfo(accessToken)", accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/user";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // POST 요청 보내기
      const response = await axiosInstance.get(apiUrl);

      const responseStatus = response.status;
      const responseStatusText = response.statusText;
      const responseData = response.data;

      // console.log("=== success start ===========================");
      // console.log(responseStatus);
      // console.log(responseStatusText);
      // console.log(responseData);
      // console.log("=== success end ============================");

      return responseData;
    } catch (error) {
      const responseStatus = error.response.status;
      const responseStatusText = error.response.statusText;
      const responseData = error.response.data;

      // console.log("=== error start =============================");
      // console.log(responseStatus);
      // console.log(responseStatusText);
      // console.log(responseData);
      // console.log("=== error end ==============================");

      return responseData;
    }
  },

  // 2.3 [POST] 로그아웃
  async logout(params) {
    console.log("logout(params)", params);
    try {
      // API URL
      const apiurl = "/api/auth/logout/";
    } catch (error) {}
  },

  // 2.4 [POST] access_token 만료 시, 토큰 재발급
  async reissuance(params) {
    console.log("reissuance(params)", params);
    try {
      // API URL
      const apiurl = "/api/auth/reissuance";
    } catch (error) {}
  },

  // 인증 상태 확인
  isAuthenticated(req, res, next) {
    console.log("isAuthenticated(req, res, next)");

    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },
};

module.exports = auth;
