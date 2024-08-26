const express = require("express");
const router = express.Router();
const { indexPage, homePage } = require("../controllers/page.controller");

router.get("/", indexPage)
      .get("/home", homePage);

module.exports = router;