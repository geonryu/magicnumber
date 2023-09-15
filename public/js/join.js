document.addEventListener("DOMContentLoaded", () => {
  const $joinId = document.getElementById("joinId");
  const $joinName = document.getElementById("joinName");
  const $joinSoNum = document.getElementById("joinSoNum");
  const $joinGender = document.getElementById("joinGender");
  const $joinCarrier = document.getElementById("joinCarrier");
  const $joinTel = document.getElementById("joinTel");
  const $verifyCallBtn = document.getElementById("verifyCall");
  const $joinNickName = document.getElementById("joinNickName");
  const $joinPw = document.getElementById("joinPw");
  const $joinPwCk = document.getElementById("joinPwCk");

  const $selects = document.querySelectorAll(".policy .allow-list div input");
  const $selectAll = document.getElementById("allowAll");

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
    const joinCarrier = $joinCarrier.value;
    const joinSoNum = $joinSoNum.value;
    const joinGender = $joinGender.value;
    const re = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/; //email 유효성검사
    if (
      joinName &&
      joinTelInput.length >= 8 &&
      joinTel.replace(/-/g, "").length >= 10 &&
      (userEmail !== "" || !re.test(userEmail)) &&
      joinSoNum.length === 8 &&
      joinCarrier !== "default" &&
      joinGender !== "default"
    ) {
      document.getElementById("verifyCall").removeAttribute("disabled");
      document.getElementById("verifyCall").classList.remove("bg-bgDisabled");
    } else {
      document.getElementById("verifyCall").setAttribute("disabled", "");
      document.getElementById("verifyCall").classList.add("bg-bgDisabled");
    }
  };

  $joinName.addEventListener("keyup", checkTypedAuth);

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
      return false;
    } else {
      messageWarn.style.display = "none";
    }
  });
  // // 이메일 유효성 검사 끝

  $joinPw.addEventListener("keyup", (e) => {
    const userPW = $joinPw.value;
    const ckInc = document.querySelectorAll(".ck-pw-eff span");

    const num = userPW.search(/[0-9]/g);
    const eng = userPW.search(/[a-z]/gi);
    const spe = userPW.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    userPW.length < 8 || userPW.length > 20
      ? (ckInc[3].style.color = "#CCCCCC")
      : (ckInc[3].style.color = "#EB5602");
    eng < 0
      ? (ckInc[0].style.color = "#CCCCCC")
      : (ckInc[0].style.color = "#EB5602");
    num < 0
      ? (ckInc[1].style.color = "#CCCCCC")
      : (ckInc[1].style.color = "#EB5602");
    spe < 0
      ? (ckInc[2].style.color = "#CCCCCC")
      : (ckInc[2].style.color = "#EB5602");
  });

  $joinPwCk.addEventListener("keyup", (e) => {
    const currentInput = $joinPw.value;
    const userRepeat = $joinPwCk.value;

    const $msgWarn = document.getElementById("pwWarn");
    currentInput === userRepeat
      ? ($msgWarn.style.display = "none")
      : ($msgWarn.style.display = "block");
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
});
