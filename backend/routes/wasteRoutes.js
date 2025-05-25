const {
  createCleanupRequest,
  updateCleanupRequest,
  deleteCleanupRequest,
} = require("../controllers/wasteController");

const router = require("express").Router();

router.post("/create", createCleanupRequest);
router.put("/update", updateCleanupRequest);
router.delete("/delete", deleteCleanupRequest);

module.exports = router;
