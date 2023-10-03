const axios = require("axios");

// 5. 구매
const payment = {
  // 3.1 [GET] 포인트 상품 목록 호출
  async getProduct(params) {
    console.log("getMyPoint(params)", params);
    try {
      // API URL
      const apiUrl = "/api/v1/counselor/product";
    } catch (error) {}
  },

  // 3.2 [POST] 포인트 구매 전처리
  async preprocessPayment(params) {
    console.log("confirmPassword(params)", params);
    try {
      // API URL
      const apiUrl = "/api/v1/counselor/payment/preprocess";
    } catch (error) {}
  },

  // 3.3 [GET] 포인트 충전 내역
  async getPaymentHistory(params) {
    console.log("getMypage(params)", params);
    try {
      // API URL
      const apiUrl = "/api/v1/counselor/payment/history";
    } catch (error) {}
  },
};

module.exports = payment;
