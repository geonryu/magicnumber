document.addEventListener("DOMContentLoaded", () => {
  const $joinId = document.getElementById("joinId");
  const $joinName = document.getElementById("joinName");
  const $joinBirth = document.getElementById("joinBirth");
  const $joinGender = document.getElementById("joinGender");
  const $reqAuthEmail = document.getElementById("reqAuthEmail");
  const $certCodeEmail = document.getElementById("certCodeEmail");
  const $certAuthEmail = document.getElementById("certAuthEmail");
  const $joinTel = document.getElementById("joinTel");
  const $joinNickName = document.getElementById("joinNickName");
  const $joinPw = document.getElementById("joinPw");
  const $joinPwCk = document.getElementById("joinPwCk");

  const $selects = document.querySelectorAll(".policy .allow-list div input");
  const $selectAll = document.getElementById("allowAll");

  const $ckNickname = document.getElementById("ckNickname");
  const $ckReqAuthEmail = document.getElementById("ckReqAuthEmail");
  const $ckCertAuthEmail = document.getElementById("ckCertAuthEmail");
  const $ckDupResult = document.getElementById("ckDupResult");
  const $joinSubmit = document.getElementById("joinSubmit");

  const $authEmailOk = document.getElementById("authEmailOk");
  const $nicknameOk = document.getElementById("nicknameOk");

  const ckRequired = () => {
    let required1 = $selects[0].checked;
    let required2 = $selects[1].checked;

    if (required1 && required2) {
      // nextBtns[0].disabled = false;
    } else {
      // nextBtns[0].disabled = true;
    }
  };

  const checkTypedAuth = () => {
    const joinName = $joinName.value;
    const joinTel = $joinTel.value;
    const joinTelInput = joinTel.slice(4);
    const userEmail = $joinId.value;
    const joinBirth = $joinBirth.value;
    const joinGender = $joinGender.value;
    const re = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/; //email 유효성검사
    const authEmailOk = $authEmailOk.value;
    const nicknameOk = $nicknameOk.value;

    if (
      joinName &&
      joinTelInput.length >= 8 &&
      joinTel.replace(/-/g, "").length >= 10 &&
      re.test(userEmail) &&
      joinBirth.length === 8 &&
      joinGender !== "default" &&
      authEmailOk === "1" &&
      nicknameOk === "1"
    ) {
      $joinSubmit.removeAttribute("disabled");
      $joinSubmit.classList.remove("bg-bgDisabled");
    } else {
      $joinSubmit.setAttribute("disabled", "");
      $joinSubmit.classList.add("bg-bgDisabled");
    }
  };

  $joinName.addEventListener("keyup", checkTypedAuth);
  $joinBirth.addEventListener("keyup", checkTypedAuth);
  $joinGender.addEventListener("change", checkTypedAuth);

  $joinTel.addEventListener("keyup", (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    // 하이픈 자동 삽입 정규식
    checkTypedAuth();
  });

  const re = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  $joinId.addEventListener("keyup", (e) => {
    const userEmail = $joinId.value;
    const messageWarn = document.getElementById("emailWarn");
    if (userEmail == "" || !re.test(userEmail)) {
      messageWarn.style.display = "block";
      $reqAuthEmail.setAttribute("disabled", "");
      $reqAuthEmail.classList.add("bg-bgDisabled");
      return false;
    } else {
      messageWarn.style.display = "none";
      $reqAuthEmail.removeAttribute("disabled");
      $reqAuthEmail.classList.remove("bg-bgDisabled");
    }
  });
  // 이메일 유효성 검사 끝

  $certCodeEmail.addEventListener("keyup", (e) => {
    const certCode = $certCodeEmail.value;
    console.log(certCode);

    if (certCode == "" || certCode.length < 6) {
      $certAuthEmail.setAttribute("disabled", "");
      $certAuthEmail.classList.add("bg-bgDisabled");
      return false;
    } else {
      $certAuthEmail.removeAttribute("disabled");
      $certAuthEmail.classList.remove("bg-bgDisabled");
    }
  });
  // 이메일 인증 입력 이벤트

  $joinNickName.addEventListener("change", checkTypedAuth);

  $joinNickName.addEventListener("keyup", (e) => {
    const nickName = $joinNickName.value;

    if (!nickName) {
      $ckNickname.setAttribute("disabled", "");
      $ckNickname.classList.add("bg-bgDisabled");
    } else {
      $ckNickname.removeAttribute("disabled");
      $ckNickname.classList.remove("bg-bgDisabled");
    }
  });
  // 닉네임 입력 이벤트

  $joinPw.addEventListener("keyup", (e) => {
    const userPW = $joinPw.value;
    const ckInc = document.querySelectorAll(".ck-pw-eff span");

    const num = userPW.search(/[0-9]/g);
    const eng = userPW.search(/[a-z]/gi);
    const spe = userPW.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    userPW.length < 8 || userPW.length > 20 ? (ckInc[3].style.color = "#CCCCCC") : (ckInc[3].style.color = "#EB5602");
    eng < 0 ? (ckInc[0].style.color = "#CCCCCC") : (ckInc[0].style.color = "#EB5602");
    num < 0 ? (ckInc[1].style.color = "#CCCCCC") : (ckInc[1].style.color = "#EB5602");
    spe < 0 ? (ckInc[2].style.color = "#CCCCCC") : (ckInc[2].style.color = "#EB5602");
  });

  $joinPwCk.addEventListener("keyup", (e) => {
    const currentInput = $joinPw.value;
    const userRepeat = $joinPwCk.value;

    const $msgWarn = document.getElementById("pwWarn");
    currentInput === userRepeat ? ($msgWarn.style.display = "none") : ($msgWarn.style.display = "block");
  });
  // pw유효성 끝

  $selectAll.addEventListener("change", (e) => {
    let isAll = e.target.checked;
    if (isAll) {
      $selects.forEach((item) => {
        item.checked = true;
      });
    } else {
      $selects.forEach((item) => {
        item.checked = false;
      });
    }

    ckRequired();
  });

  $selects.forEach((item) => {
    item.addEventListener("change", (e) => {
      let isChecked = e.target.checked;
      if (!isChecked) $selectAll.checked = false;
      ckRequired();
    });
  });
  // 약관 전체 동의 끝

  if($ckNickname){
    $ckNickname.addEventListener("click", (ev) => {
      ev.preventDefault();
      const nick_name = $joinNickName.value;
      const params = {
        nick_name: nick_name,
      };

      fetch("/checkNickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("서버에서 받은 데이터: ", data);

          if (data.result === 1) {
            // 이미 사용중인 닉네임입니다.
            $nicknameOk.value = 0;
            $ckDupResult.innerText = data.message;
            $ckDupResult.style.display = "block";
            $ckDupResult.classList.add("text-point");
          } else if (data.result === 2) {
            // 사용가능한 닉네임입니다.
            $nicknameOk.value = 1;
            $ckDupResult.innerText = data.message;
            $ckDupResult.style.display = "block";
            $ckDupResult.classList.remove("text-point");
          }
        })
        .catch((error) => {
          console.error("에러 발생: ", error);
        });
    });
  }

  $reqAuthEmail.addEventListener("click", (ev) => {
    ev.preventDefault();
    const email = $joinId.value;
    const params = {
      email: email,
    };

    fetch("/reqAuthEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("서버에서 받은 데이터: ", data);
        $ckReqAuthEmail.innerText = data.message;
        $ckReqAuthEmail.style.display = "block";
        if(data.code === 200 && data.status === "success"){
          localStorage.setItem("temp_token", data.result)
          $certCodeEmail.removeAttribute("disabled");
        }
      })
      .catch((error) => {
        console.error("에러 발생: ", error);
      });
  });

  $certAuthEmail.addEventListener("click", (ev) => {
    ev.preventDefault();
    const email = $joinId.value;
    const temp_token = localStorage.getItem("temp_token");
    const cert_code = $certCodeEmail.value;
    const params = {
      email: email,
      temp_token: temp_token,
      cert_code: cert_code,
    };

    fetch("/certAuthEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("서버에서 받은 데이터: ", data);
        $ckCertAuthEmail.innerText = data.message;
        $ckCertAuthEmail.style.display = "block";
        if(data.code === 200 && data.status === "success"){
          $authEmailOk.value = 1;
        }else{
          $authEmailOk.value = 0;
        }
      })
      .catch((error) => {
        console.error("에러 발생: ", error);
      });
  });
});
