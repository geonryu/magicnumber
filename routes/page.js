const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("index", {
    title: "매직넘버",
  });
});

router.get("/login", async (req, res, next) => {
  res.render("login", {
    title: "매직넘버:로그인",
  });
});

router.get("/join", async (req, res, next) => {
  res.render("join", {
    title: "매직넘버:회원가입",
  });
});

module.exports = router;
