const axios = require("axios");

// API 호스트 경로
const host = "http://api.magicnumber.co.kr"

// 헤더 - 인증 토큰
const headers = {
  'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOiI0OTYyODViYzY5NGYwOGY3ODgzNzA3MDBjYWMwOGZjMCIsImlhdCI6MTY5MzgzNzQyNSwiZXhwIjoxNzAyNDc3NDI1LCJpc3MiOiJtYWdpY251bWJlciJ9.WPYKbug1hfP4TEVYGzapCpSpe1Z65ytZgMghQlegCYE'
}

// 1. 상담사 목록
// 2. 상담사 정보
/*
[
  {
    csrid: '12879', // 상담사 고유번호
    csrnm: '문정환', // 상담사 본명
    decamt: 1800, // dectm당 소모 포인트
    dectm: 60, // 소모되는 포인트 시간
    dtmfno: '1', // 상담사 연결 DTMF 번호
    nicknm: '로이', // 상담사 닉네임
    postnofix: '', // 해당상담사에 대하여 고정후불번호
    preflag: 'Y', // 선불(Y) / 후불(공백) / 선후불(P)
    sortno: 1, // 정렬 번호
    state: 'IDLE', // 상태 - 상담가능(IDLE), 부재중(ABSE), 상담중(CONN)
    telno: '01054313517', // 상담사 전화번호
    num: 14,  // 인덱스
    profile_path: '/csr_profile/1694266738734_Jy3SFwq6gd.jpeg', // 프로필 사진 경로
    profile_title: null, // 프로필 타이틀
    profile_contents: '<p><span>상담사 이력 :</span></p><p>&nbsp;</p><p><span>매직넘버 수비학.타로 연구소 소장</span></p>...... ', // 프로필 내용
    review_count: 0, // 리뷰 갯수
    review_avg: null, // 평점 평균
    tb_api_counselor_hash_tags: [ [Object], [Object], [Object] ] // 태그 정보
  },
  ...
]
*/


// 3. 후기 목록
/*
[
  {
    num: 26,  // 인덱스
    contents: '좋았습니다.', // 리뷰 내용
    score: 5, // 리뷰 점수
    create_time: '2023-06-02 13:08:38', // 리뷰 생성일
    update_time: null, // 리뷰 수정일
    reply_comment: 2, // 답글 작성 여부 - 작성전(1), 작성완료(2)
    user_profile_path: '/profile/1685360971643_6H4TcmauKy.jpeg', // 리뷰작성 회원 프로필 사진 경로
    user_nicknm: '강수만두', // 리뷰작성 회원 닉네임
    user_id: 'test@gmail.com', // 리뷰작성 회원 아이디
    csrid: 12705, // 상담사 고유번호
    csr_profile_path: '/csr_profile/1685678842136_TOraNMD7dC.jpeg', // 상담사 프로필 사진 경로
    csr_nicknm: '카리나', // 상담사 닉네임
    dtmfno: 1, // 상담사 DTMF 번호
    comment_num: 12, // 상담사 답글 인덱스
    comment: '감사합니다. 강수만두님.\n좋은 하루 되세요. 😍', // 상담사 답글 내용
    comment_create_time: '2023-06-02 13:09:39', // 상담사 답글 작성일
    comment_update_time: null // 상담사 답글 수정일
  },
  ...
]
*/

const counselor = {


  // 1. 상담사 목록
  async getCounselorList(state) {

    // API URL
    const apiUrl = `${host}/api/v1/counselor`

    // Axios 인스턴스 생성
    const axiosInstance = axios.create({

      // 헤더 설정
      headers: headers
    })

    // GET 요청 보내기
    const response = await axiosInstance.get(apiUrl);

    // 응답 처리
    const result = response.data.result;

    // 상담사 목록
    let counselorList = result;

    // 상태 조건 처리
    if(state == 'IDLE') {
      counselorList = result.filter(item => item.state == 'IDLE');
    } else if(state == 'ABSE') {
      counselorList = result.filter(item => item.state == 'ABSE');
    } else if(state == 'CONN') {
      counselorList = result.filter(item => item.state == 'CONN');
    }else{
      counselorList = result;
    }
    // console.log('counselorList', counselorList);

    // 목록 반환
    return counselorList;
  },


  // 2. 상담사 정보
  async getCounselor(csrid) {

    // API URL
    const apiUrl = `${host}/api/v1/counselor`

    // Axios 인스턴스 생성
    const axiosInstance = axios.create({

      // 헤더 설정
      headers: headers
    })

    // GET 요청 보내기
    const response = await axiosInstance.get(apiUrl);

    // 응답 처리
    const result = response.data.result;

    // 해당 데이터만 가져오도록 목록 필터링
    const counselorInfoList = result.filter(item => item.csrid == csrid);

    // 상담사 정보
    const counselorInfo = counselorInfoList.length > 0 ? counselorInfoList[0] : '';
    // console.log('counselorInfo', counselorInfo);

    return counselorInfo;
  },


  // 3. 후기 목록
  async getReviewList(csrid) {

    // 20230910 테스트용 설정
    csrid = csrid > 0 ? csrid : 12705

    // API URL
    const apiUrl = `${host}/api/v1/counselor/review/csr`

    // Axios 인스턴스 생성
    const axiosInstance = axios.create({

      // 헤더 설정
      headers: headers
    })

    // 요청 파라미터 설정
    const params = {
      csrid: csrid
    }

    // GET 요청 보내기
    const response = await axiosInstance.get(apiUrl, { params: params });

    // 응답 처리
    const result = response.data.result;

    // 후기 목록
    const reviewList = result;

    // if(state == 'IDLE') {
    //   reviewList = result.filter(item => item.state == 'IDLE');
    // } else if(state == 'ABSE') {
    //   reviewList = result.filter(item => item.state == 'ABSE');
    // } else if(state == 'CONN') {
    //   reviewList = result.filter(item => item.state == 'CONN');
    // }else{
    //   reviewList = result;
    // }
    console.log('reviewList', reviewList);

    return reviewList;
  },

};

module.exports = counselor;