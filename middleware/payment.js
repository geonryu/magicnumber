const axios = require("axios");

// 5. 구매
const payment = {
  // 5.1 [GET] 포인트 상품 목록 호출
  async getProduct(params, accessToken) {
    console.log("getMyPoint(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/counselor/product";

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

  // 5.2 [POST] 포인트 구매 전처리
  async preprocessPayment(params, accessToken) {
    console.log("confirmPassword(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/counselor/payment/preprocess";

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

  // 5.3 [GET] 포인트 충전 내역
  async getPaymentHistory(params, accessToken) {
    console.log("getMypage(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/counselor/payment/history";

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
};

module.exports = payment;
