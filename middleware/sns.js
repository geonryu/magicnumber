const axios = require("axios");

// 7. 계정관리 > SNS 로그인
const sns = {
  // 7.1 [POST] 구글 로그인
  async loginGoogle(params, accessToken) {
    console.log("loginGoogle(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/auth/login/google";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "https://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // POST 요청 보내기
      const response = await axiosInstance.post(apiUrl, params);

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

  // 7.2 [POST] 카카오 로그인
  async loginKakao(params, accessToken) {
    console.log("loginKakao(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/auth/login/kakao";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "https://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // POST 요청 보내기
      const response = await axiosInstance.post(apiUrl, params);

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
  // 7.3 [POST] 네이버 로그인
  async loginNaver(params, accessToken) {
    console.log("loginNaver(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/auth/login/naver";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "https://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // POST 요청 보내기
      const response = await axiosInstance.post(apiUrl, params);

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

};

module.exports = sns;
