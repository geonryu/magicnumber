const axios = require("axios");

// 5. 구매
const etc = {
  // 3.1 [GET] 배너 목록 호출
  async getBanner(params) {
    console.log("getBanner(params)", params);
    try {
      // API URL
      const apiurl = "/api/v1/banner";
    } catch (error) {}
  },

  // 3.2 [POST] 약관 목록 호출
  async getAgreement(params) {
    console.log("getAgreement(params)", params);
    try {
      // API URL
      const apiurl = "/api/v1/config/agreement";
    } catch (error) {}
  },
};

module.exports = etc;
