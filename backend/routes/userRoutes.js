const router = require("express").Router();
const { getProfile, getAllRequests } = require("../controllers/userController");
const requireAuth = require("../middlewares/verifyToken");
router.get("/profile", requireAuth, getProfile);
router.get("/requests", requireAuth, getAllRequests);

module.exports = router;
