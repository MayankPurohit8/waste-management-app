const router = require("express").Router();
const { getProfile, getAllRequests } = "../controllers/userController";

router.get("/profile", getProfile);
router.get("/requests", getAllRequests);

module.exports(router);
