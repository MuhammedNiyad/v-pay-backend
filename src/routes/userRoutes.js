const express = require("express");
const {
  getUserProfile,
  getUserReferrals,
  saveUserDetails,
  getUserWallet,
  getUserPointHistory,
  getUserTransactions,
} = require("../controllers/user/userController");
const protect = require("../middlewares/protect");
const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.get("/referrals", protect, getUserReferrals);
router.post("/details/save", protect, saveUserDetails);
router.get("/points/history", protect, getUserPointHistory);
router.get("/wallet", protect, getUserWallet);
router.get("/transactions/recent", protect, getUserTransactions);

module.exports = router;
