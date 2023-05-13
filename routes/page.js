const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("index", {
    title: "ㅎㅎ",
  });
});

module.exports = router;
