const express = require("express");
const router = express.Router();
const verifyAdminAuthenticationToken = require("../utils/verifyAdminAuthenticationToken");
const { 
  login, 
  downloadUsersRecords,
  createNewUser,
  updateUser,
  deleteUser
} = require("../controllers/admin.controller");

router.post("/login", login)
      .post("/users", verifyAdminAuthenticationToken, createNewUser)
      .patch("/users/:id", verifyAdminAuthenticationToken, updateUser)
      .delete("/users/:id", deleteUser) 
      .get("/users-records/download", verifyAdminAuthenticationToken, downloadUsersRecords);

module.exports = router;