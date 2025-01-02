const asyncHandler = require("../../middlewares/asyncHandler");
const userService = require("../../services/user/userService");


exports.getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Assume user ID is extracted from JWT
  const userProfile = await userService.getUserProfile(userId);

  res.status(200).json({
    success: true,
    data: userProfile,
  });
});
