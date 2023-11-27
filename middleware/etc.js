const axios = require("axios");

// 6. 기타
const etc = {
  // 6.1 [GET] 배너 목록 호출
  async getBanner(params, accessToken) {
    console.log("getBanner(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/banner";

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

  // 6.2 [POST] 약관 목록 호출
  async getAgreement(params, accessToken) {
    console.log("getAgreement(params, accessToken)", params, accessToken);

    try {
      // API URL
      const apiUrl = "/api/v1/config/agreement";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "https://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: accessToken,
        }, // 헤더 설정
      });

      // GET 요청 보내기
      const response = await axiosInstance.get(apiUrl, {params: params});

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

module.exports = etc;
