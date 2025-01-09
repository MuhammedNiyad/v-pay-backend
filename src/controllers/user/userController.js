const asyncHandler = require("../../middlewares/asyncHandler");
const { getUserProfileService} = require("../../services/user/getUserProfile");
const { getUserReferralsService } = require("../../services/user/getUserReferrals");


exports.getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const userProfile = await getUserProfileService(userId);

  res.status(200).json({
    success: true,
    data: userProfile,
  });
});

exports.getUserReferrals = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const referrals = await getUserReferralsService(userId);

  res.status(200).json({
    success: true,
    data: referrals,
  });
})
