const axios = require("axios");

// 2. 인증
const auth = {
  // 2.1 [POST] 로그인 (AccessToken 생성)
  async getAccessToken(params, accessToken) {
    console.log("getAccessToken(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/auth/login";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // POST 요청 보내기
      const response = await axiosInstance.post(apiUrl, params, accessToken);

      const responseStatus = response.status;
      const responseStatusText = response.statusText;
      const responseData = response.data;

      return responseData;
    } catch (error) {
      const responseStatus = error.response.status;
      const responseStatusText = error.response.statusText;
      const responseData = error.response.data;

      return responseData;
    }
  },

  // 2.2 [GET] 로그인 시, 회원 기본 정보 호출
  async getUserInfo(params, accessToken) {
    console.log("getUserInfo(params, accessToken)", params, accessToken);

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

      // GET 요청 보내기
      const response = await axiosInstance.get(apiUrl);

      const responseStatus = response.status;
      const responseStatusText = response.statusText;
      const responseData = response.data;

      return responseData;
    } catch (error) {
      const responseStatus = error.response.status;
      const responseStatusText = error.response.statusText;
      const responseData = error.response.data;

      return responseData;
    }
  },

  // 2.3 [POST] 로그아웃
  async logout(params, accessToken) {
    console.log("logout(params, accessToken)", params, accessToken);
    try {
      // API URL
      const apiUrl = "/api/auth/logout/";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // POST 요청 보내기
      const response = await axiosInstance.post(apiUrl);

      const responseStatus = response.status;
      const responseStatusText = response.statusText;
      const responseData = response.data;

      return responseData;
    } catch (error) {
      const responseStatus = error.response.status;
      const responseStatusText = error.response.statusText;
      const responseData = error.response.data;

      return responseData;
    }
  },

  // 2.4 [POST] access_token 만료 시, 토큰 재발급
  async reissuance(params, accessToken) {
    console.log("reissuance(params, accessToken)", params, accessToken);
    try {
      // API URL
      const apiUrl = "/api/auth/reissuance";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // POST 요청 보내기
      const response = await axiosInstance.post(apiUrl);

      const responseStatus = response.status;
      const responseStatusText = response.statusText;
      const responseData = response.data;

      return responseData;
    } catch (error) {
      const responseStatus = error.response.status;
      const responseStatusText = error.response.statusText;
      const responseData = error.response.data;

      return responseData;
    }
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
