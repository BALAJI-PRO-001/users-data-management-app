const express = require("express");
const router = express.Router();
const verifyAdminAuthenticationToken = require("../utils/verifyAdminAuthenticationToken");
const { 
  createNewRecord,
  addNewCowRecordToUser,
  getAllRecords,
  getRecord,
  deleteAllRecords,
  downloadRecords,
  addNewInjectionInfoAndAiDates
} = require("../controllers/records.controller");

router.post("/records",verifyAdminAuthenticationToken, createNewRecord)
      .get("/records/all", verifyAdminAuthenticationToken, getAllRecords)
      .get("/records/:userId", verifyAdminAuthenticationToken, getRecord)
      .delete("/records/all", verifyAdminAuthenticationToken, deleteAllRecords)
      .post("/records/:userId/cows",verifyAdminAuthenticationToken, addNewCowRecordToUser)
      // .post("/records/:userId/cows/:cowId", verifyAdminAuthenticationToken, addNewInjectionInfoAndAiDates)
      .get("/records/download", verifyAdminAuthenticationToken, downloadRecords);

module.exports = router;
