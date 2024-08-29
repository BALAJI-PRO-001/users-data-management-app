const express = require("express");
const router = express.Router();
const verifyAdminAuthenticationToken = require("../utils/verifyAdminAuthenticationToken");
const { login, downloadUsersRecords } = require("../controllers/admin.controller");

router.post("/login", login)
      .get("/users-records/download", verifyAdminAuthenticationToken, downloadUsersRecords);

module.exports = router;