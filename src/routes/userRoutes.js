const express = require("express");
const { getUserProfile } = require("../controllers/user/userController");
const protect = require("../middlewares/protect");
const router = express.Router();


router.get("/profile", protect, getUserProfile);

module.exports = router;
