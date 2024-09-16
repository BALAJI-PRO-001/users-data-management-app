const express = require("express");
const router = express.Router();
const verifyAdminAuthenticationToken = require("../utils/verifyAdminAuthenticationToken");
const { 
  createNewRecord,
  addNewCowRecordToUser,
  getAllRecords,
  deleteAllRecords
} = require("../controllers/records.controller");

router.post("/records",verifyAdminAuthenticationToken, createNewRecord)
      .get("/records/all", verifyAdminAuthenticationToken, getAllRecords)
      .delete("/records/all", verifyAdminAuthenticationToken, deleteAllRecords)
      .post("/records/:userId/cows",verifyAdminAuthenticationToken, addNewCowRecordToUser);

module.exports = router;
