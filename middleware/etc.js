const axios = require("axios");

// 5. 구매
const etc = {
  // 3.1 [GET] 배너 목록 호출
  async getBanner(params) {
    console.log("getBanner(params)", params);
    try {
      // API URL
      const apiUrl = "/api/v1/banner";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: "",
        }, // 헤더 설정
      });

      // GET 요청 보내기
      const response = await axiosInstance.get(apiUrl, params);

      const responseStatus = response.status;
      const responseStatusText = response.statusText;
      const responseData = response.data;

      // 목록 반환
      return responseData;
    } catch (error) {
      const responseStatus = error.response.status;
      const responseStatusText = error.response.statusText;
      const responseData = error.response.data;

      return responseData;
    }
  },

  // 3.2 [POST] 약관 목록 호출
  async getAgreement(params) {
    console.log("getAgreement(params)", params);
    try {
      // API URL
      const apiUrl = "/api/v1/config/agreement";
    } catch (error) {}
  },
};

module.exports = etc;
