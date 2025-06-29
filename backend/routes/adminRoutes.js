//view all wasteReports
//update status of report

const router = require("express").Router();
const {
  viewRequests,
  updateStatus,
  deleteRequest,
} = require("../controllers/adminController");
const verifyAdmin = require("../middlewares/verifyAdmin");
router.get("/requests", verifyAdmin, viewRequests);
router.put("/updateStatus", verifyAdmin, updateStatus);
router.delete("/deleteRequest/:id", verifyAdmin, deleteRequest);

module.exports = router;
