const express = require("express");
const router = express.Router();
const { login, logOut } = require("../controllers/admin.controller");

router.post("/admin/login", login)
      .get("/admin/log-out", logOut);

module.exports = router;