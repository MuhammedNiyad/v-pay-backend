const asyncHandler = require('../../middlewares/asyncHandler');
const { registerUser, loginUser } = require('../../services/auth/authService');
const jwt = require('jsonwebtoken');
const generateToken = require('../../utils/generateToken');

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  const user = await registerUser({ name, email, password, phoneNumber });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phone_number,
    token: generateToken(user._id),
  });
});

// @desc Authenticate a user
// @route POST /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await loginUser({ email, password });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});

module.exports = { register, login };
