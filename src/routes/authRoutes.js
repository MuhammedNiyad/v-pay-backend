const { authLogin } = require("../controllers/auth/authController");

const router = require("express").Router();

router.post("/login", authLogin)

module.exports = router