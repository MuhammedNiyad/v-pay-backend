const express = require("express");
const { getUserProfile } = require("../controllers/user/userController");
const router = express.Router();

// Middleware to simulate authentication
const protect = (req, res, next) => {
  req.user = { id: "64c7b2e6e13e4b001e7d52a4" }; // Example user ID
  next();
};

router.get("/profile", protect, getUserProfile);

module.exports = router;
