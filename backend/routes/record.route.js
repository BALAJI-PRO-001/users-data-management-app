const express = require("express");
const router = express.Router();
const { 
  createNewRecord,
  addNewCowRecordToUser,
  getAllRecords,
  getRecord,
  deleteAllRecords,
  downloadRecords,
  removeCowFormUser,
  addNewInjectionInfoAndAiDatesToCow,
  removeInjectionInfoAndAiDatesFormCow,
  updateRecord,
  deleteRecord
} = require("../controllers/records.controller");


router.get("/records/all", getAllRecords)
      .get("/records/:userId", getRecord)
      .get("/records/download", downloadRecords);

router.post("/records", createNewRecord)
      .post("/records/:userId/cows", addNewCowRecordToUser)
      .post("/records/:userId/cows/:cowId/inject-info-ai-dates", addNewInjectionInfoAndAiDatesToCow);

router.patch("/records/:userId", updateRecord);
      
router.delete("/records/all", deleteAllRecords)
      .delete("/records/:userId", deleteRecord)
      .delete("/records/:userId/cows/:cowId", removeCowFormUser)
      .delete("/records/:userId/cows/:cowId/inject-info-ai-dates/:id", removeInjectionInfoAndAiDatesFormCow);

module.exports = router;
