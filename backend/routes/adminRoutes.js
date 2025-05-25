//view all wasteReports
//update status of report

const router = require("express").Router();
const {
  viewRequests,
  updateStatus,
} = require("../controllers/adminController");

router.get("/requests", viewRequests);
router.out("/updateStatus", updateStatus);

module.exports = router;
