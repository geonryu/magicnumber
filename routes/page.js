const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("index", {
    title: "매직넘버",
  });
});

module.exports = router;
