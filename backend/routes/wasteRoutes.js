const requireAuth = require("../middlewares/verifyToken");
const path = require("path");
const {
  createCleanupRequest,
  updateCleanupRequest,
  deleteCleanupRequest,
} = require("../controllers/wasteController");

const router = require("express").Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create",
  requireAuth,
  upload.single("file"),
  createCleanupRequest
);
router.put("/update", requireAuth, updateCleanupRequest);
router.delete("/delete", requireAuth, deleteCleanupRequest);

module.exports = router;
