const axios = require("axios");

// 4. 상담 - 상담사, 상담내역
const counselor = {
  // 4.1 [POST] 상담사 목록 전체 호출
  async getCounselor(params, accessToken) {
    console.log("getCounselor(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/counselor";

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

  // 4.2 [GET] 상담사 개별 리뷰 호출
  async getCounselorReview(params, accessToken) {
    console.log("getCounselorReview(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/counselor/review/csr";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
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

  // 4.3 [PUT] 멘트 없이 전화걸기 설정
  async sendCallWithoutComment(params, accessToken) {
    console.log("sendCallWithoutComment(params, accessToken)", params, accessToken);
    try {
      // API URL
      const apiUrl = "/api/v1/counselor";

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

  // 4.4 [GET] 상담내역 목록 호출
  async getMyCounselingHistory(params, accessToken) {
    console.log("getMyCounselingHistory(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/counselor/history";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
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

  // 4.5 [GET] 리뷰 목록 호출
  async getMyReview(params, accessToken) {
    console.log("getMyReview(params, accessToken)", params, accessToken);
    try {
      // API URL
      const apiUrl = "/api/v1/counselor/review";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
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

  // 4.6 [POST] 리뷰 작성
  async createReview(params, accessToken) {
    console.log("createReview(params, accessToken)", params, accessToken);
    try {
      // API URL
      const apiUrl = "/api/v1/counselor/review";

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

  // 4.7 [PUT] 리뷰 수정
  async updateReview(params, accessToken) {
    console.log("updateReview(params, accessToken)", params, accessToken);
    try {
      // API URL
      const apiUrl = "/api/v1/counselor/review";

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
};

module.exports = counselor;
