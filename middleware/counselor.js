const axios = require("axios");

const counselor = {
  // 1. 상담사 목록
  async getCounselorList(params) {
    console.log("getCounselorList(params)");

    try {
      // API URL
      const apiUrl = "/api/v1/counselor";

      // Axios 인스턴스 생성
      const axiosInstance = axios.create({
        baseURL: "http://api.magicnumber.co.kr", // API 기본 호스트 URL
        headers: {
          "content-Type": "application/json",
          authorization: "",
        }, // 헤더 설정
      });

      // GET 요청 보내기
      const response = await axiosInstance.post(apiUrl, params);

      const responseStatus = response.status;
      const responseStatusText = response.statusText;
      const responseData = response.data;

      // console.log("=== success start ===========================");
      // console.log(responseStatus);
      // console.log(responseStatusText);
      // console.log(responseData);
      // console.log("=== success end ============================");

      // 목록 반환
      return responseData;
    } catch (error) {
      const responseStatus = error.response.status;
      const responseStatusText = error.response.statusText;
      const responseData = error.response.data;

      // console.log("=== error start =============================");
      // console.log(responseStatus);
      // console.log(responseStatusText);
      // console.log(responseData);
      // console.log("=== error end ==============================");

      return responseData;
    }
  },

  // 2. 상담사 정보
  async getCounselor(csrid, accessToken) {
    console.log("getCounselor(csrid)", csrid, accessToken);

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

      // GET 요청 보내기
      const response = await axiosInstance.get(apiUrl);

      const responseStatus = response.status;
      const responseStatusText = response.statusText;
      const responseData = response.data;

      // console.log("=== success start ===========================");
      // console.log(responseStatus);
      // console.log(responseStatusText);
      // console.log(responseData);
      // console.log("=== success end ============================");

      // 해당 데이터만 가져오도록 목록 필터링
      const counselorInfoList = responseData.result.filter((item) => item.csrid == csrid);

      // 상담사 정보
      const counselorInfo = counselorInfoList.length > 0 ? counselorInfoList[0] : "";
      // console.log('counselorInfo', counselorInfo);

      return counselorInfo;
    } catch (error) {
      const responseStatus = error.response.status;
      const responseStatusText = error.response.statusText;
      const responseData = error.response.data;

      // console.log("=== error start =============================");
      // console.log(responseStatus);
      // console.log(responseStatusText);
      // console.log(responseData);
      // console.log("=== error end ==============================");

      return responseData;
    }
  },

  // 3. 후기 목록
  async getReviewList(csrid, accessToken) {
    console.log("getReviewList(csrid)", csrid, accessToken);

    try {
      // 20230910 테스트용 설정
      csrid = csrid > 0 ? csrid : 12705;

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

      // 요청 파라미터 설정
      const params = {
        csrid: csrid,
      };

      // GET 요청 보내기
      const response = await axiosInstance.get(apiUrl, { params: params });

      const responseStatus = response.status;
      const responseStatusText = response.statusText;
      const responseData = response.data;

      // console.log("=== success start ===========================");
      // console.log(responseStatus);
      // console.log(responseStatusText);
      // console.log(responseData);
      // console.log("=== success end ============================");

      // 후기 목록
      const reviewList = responseData.result;
      // console.log("reviewList", reviewList);

      return reviewList;
    } catch (error) {
      const responseStatus = error.response.status;
      const responseStatusText = error.response.statusText;
      const responseData = error.response.data;

      // console.log("=== error start =============================");
      // console.log(responseStatus);
      // console.log(responseStatusText);
      // console.log(responseData);
      // console.log("=== error end ==============================");

      return responseData;
    }
  },
};

module.exports = counselor;
