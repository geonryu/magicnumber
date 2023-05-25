document.addEventListener("DOMContentLoaded", () => {
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

  const re = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  document.getElementById("joinId").addEventListener("keyup", (e) => {
    const userEmail = document.getElementById("joinId").value;
    const messageWarn = document.getElementById("emailWarn");
    if (userEmail == "" || !re.test(userEmail)) {
      messageWarn.style.display = "block";
      return false;
    } else {
      messageWarn.style.display = "none";
    }
  });
  // // 이메일 유효성 검사 끝

  document.getElementById("joinPw").addEventListener("keyup", (e) => {
    const userPW = document.querySelector("#joinPw").value;
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
    num < 1
      ? (ckInc[1].style.color = "#CCCCCC")
      : (ckInc[1].style.color = "#EB5602");
    spe < 2
      ? (ckInc[2].style.color = "#CCCCCC")
      : (ckInc[2].style.color = "#EB5602");
  });

  document.getElementById("joinPwCk").addEventListener("keyup", (e) => {
    const currentInput = document.getElementById("joinPw").value;
    const userRepeat = document.getElementById("joinPwCk").value;

    const $msgWarn = document.getElementById("pwWarn");
    currentInput === userRepeat
      ? ($msgWarn.style.display = "none")
      : ($msgWarn.style.display = "block");
  });
  // pw유효성 끝

  document.getElementById("joinAuthTel").addEventListener("keyup", (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    // 하이픈 자동 삽입 정규식

    let regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    let userInput = regExp.test(e.target.value);
    // 전화번호 형식 검사

    if (e.target.value.replace(/-/g, "").length >= 10) {
      document.getElementById("verifyCall").removeAttribute("disabled");
      document.getElementById("verifyCall").classList.remove("bg-bgDisabled");
    } else {
      document.getElementById("verifyCall").setAttribute("disabled", "");
      document.getElementById("verifyCall").classList.add("bg-bgDisabled");
    }
  }); //본인인증 유효성 끝
});
