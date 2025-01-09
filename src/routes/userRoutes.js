const express = require("express");
const { getUserProfile, getUserReferrals } = require("../controllers/user/userController");
const protect = require("../middlewares/protect");
const router = express.Router();


router.get("/profile", protect, getUserProfile);
router.get("/referrals", protect, getUserReferrals);

module.exports = router;
