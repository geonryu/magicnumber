const axios = require("axios");

// 1. 계정관리
const user = {
  // 1.1 [POST] 회원가입
  async signUp(params, accessToken) {
    console.log("signUp(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/user/signup";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
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

  // 1.2 [POST] 닉네임 중복 체크
  async checkNickname(params, accessToken) {
    console.log("checkNickname(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/user/signup/nickname/";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
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

  // 1.3 [POST] 아이디 찾기
  async findId(params, accessToken) {
    console.log("findId(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/auth/find/id";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
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

  // 1.4 [POST] 비밀번호 찾기
  async findPw(params, accessToken) {
    console.log("findPw(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/auth/find/pw";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
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

  // 1.5 [PUT] 비밀번호 찾기 이후, 비밀번호 변경
  async changeFindPw(params, accessToken) {
    console.log("changeFindPw(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/auth/find/pw/change";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
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

  // 1.6 [POST] 이메일 인증 요청
  async reqEmailAuth(params, accessToken) {
    console.log("reqEmailAuth(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/auth/email/req";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
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

  // 1.7 [POST] 이메일 인증
  async certEmailAuth(params, accessToken) {
    console.log("certEmailAuth(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/auth/email/cert";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
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

module.exports = user;
