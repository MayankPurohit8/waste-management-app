const router = require("express").Router();
const { logout } = require("../controllers/authController");
const { getProfile, getAllRequests } = require("../controllers/userController");
const requireAuth = require("../middlewares/verifyToken");
router.get("/profile", requireAuth, getProfile);
router.get("/requests", requireAuth, getAllRequests);
router.post("/logout", requireAuth, logout);

module.exports = router;
