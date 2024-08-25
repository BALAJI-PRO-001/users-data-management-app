const express = require("express");
const router = express.Router();
const { loginPage } = require("../controllers/page.controller");

router.get("/", loginPage);

module.exports = router;