const express = require("express");
const router = express.Router();
const { indexPage, homePage, addUserPage } = require("../controllers/page.controller");

router.get("/", indexPage)
      .get("/home", homePage)
      .get("/add-user", addUserPage);

module.exports = router;