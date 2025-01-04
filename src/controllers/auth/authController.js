const asyncHandler = require("../../middlewares/asyncHandler");
const { registerUser, loginUser } = require("../../services/auth/authService");
const generateToken = require("../../utils/generateToken");
const {
  getUserDetailsFromGoogle,
} = require("../../services/auth/googleAuthService");
const User = require("../../models/User");

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

const googleAuth = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  // Fetch user details from Google
  const googleUser = await getUserDetailsFromGoogle(email);

  // Check if user exists in your database or create a new user
  let user = await User.findOne({ email: googleUser.email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
    user = await User.create({
      name: googleUser.name,
      email: googleUser.email,
      avatar: googleUser.avatar,
    });
  }

  // Send response with JWT token
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    token: generateToken(user._id),
  });
});

module.exports = { register, login, googleAuth };
