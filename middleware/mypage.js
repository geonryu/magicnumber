const axios = require("axios");

// 3. 마이페이지
const mypage = {
  // 3.1 [GET] 내 포인트 조회
  async getMyPoint(params) {
    console.log("getMyPoint(params)", params);
    try {
      // API URL
      const apiurl = "/api/v1/user/mypoint";
    } catch (error) {}
  },

  // 3.2 [POST] 마이페이지 (비밀번호 확인)
  async confirmPassword(params) {
    console.log("confirmPassword(params)", params);
    try {
      // API URL
      const apiurl = "/api/v1/user/mypage/confirm/password";
    } catch (error) {}
  },

  // 3.3 [GET] 마이페이지 호출
  async getMypage(params) {
    console.log("getMypage(params)", params);
    try {
      // API URL
      const apiurl = "/api/v1/user/mypage";
    } catch (error) {}
  },

  // 3.4 [PUT] 개인정보 수정
  async changeUserInfo(params) {
    console.log("changeUserInfo(params)", params);
    try {
      // API URL
      const apiurl = "/api/v1/user/mypage";
    } catch (error) {}
  },

  // 3.5 [PUT] 비밀번호 변경
  async changePassword(params) {
    console.log("changePassword(params)", params);
    try {
      // API URL
      const apiurl = "/api/v1/user/mypage/change/password";
    } catch (error) {}
  },

  // 3.6 [PUT] 회원탈퇴
  async withDraw(params) {
    console.log("withDraw(params)", params);
    try {
      // API URL
      const apiurl = "/api/v1/config/withdraw";
    } catch (error) {}
  },
};

module.exports = mypage;
