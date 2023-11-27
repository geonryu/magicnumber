const axios = require("axios");

// 3. 마이페이지
const mypage = {
  // 3.1 [GET] 내 포인트 조회
  async getMypoint(params, accessToken) {
    console.log("getMypoint(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/user/mypoint";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "https://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // GET 요청 보내기
      const response = await axiosInstance.get(apiUrl, { params: params });

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

  // 3.2 [POST] 마이페이지 (비밀번호 확인)
  async confirmPassword(params, accessToken) {
    console.log("confirmPassword(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/user/mypage/confirm/password";

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

  // 3.3 [GET] 마이페이지 호출
  async getMypage(params, accessToken) {
    console.log("getMypage(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/user/mypage";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "https://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // GET 요청 보내기
      const response = await axiosInstance.get(apiUrl, { params: params });

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

  // 3.4 [PUT] 개인정보 수정
  async changeUserInfo(params, accessToken) {
    console.log("changeUserInfo(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/user/mypage";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "https://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // PUT 요청 보내기
      const response = await axiosInstance.put(apiUrl, params);

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

  // 3.5 [PUT] 비밀번호 변경
  async changePassword(params, accessToken) {
    console.log("changePassword(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/user/mypage/change/password";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "https://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // PUT 요청 보내기
      const response = await axiosInstance.put(apiUrl, params);

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

  // 3.6 [PUT] 회원탈퇴
  async withDraw(params, accessToken) {
    console.log("withDraw(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/config/withdraw";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "https://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // PUT 요청 보내기
      const response = await axiosInstance.put(apiUrl, params);

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

module.exports = mypage;
