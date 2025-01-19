const asyncHandler = require("../../middlewares/asyncHandler");
const {
  getUserPointHistoryService,
} = require("../../services/user/getUserPointHistory");
const { getUserProfileService } = require("../../services/user/getUserProfile");
const {
  getUserReferralsService,
} = require("../../services/user/getUserReferrals");
const { getUserTransactionService } = require("../../services/user/getUserTransactions");
const { getUserWalletService } = require("../../services/user/getUserWallet");
const { saveUserDetails } = require("../../services/user/saveUserDetails");

exports.getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
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
});

exports.saveUserDetails = asyncHandler(async (req, res) => {
  const response = await saveUserDetails(req.user.id, req.body);

  res.status(200).json({
    success: true,
    data: response,
  });
});

exports.getUserPointHistory = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const response = await getUserPointHistoryService(userId);

  res.status(200).json({
    success: true,
    data: response,
  });
});

exports.getUserWallet = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const response = await getUserWalletService(userId);

  res.status(200).json({
    success: true,
    data: response,
  });
});

exports.getUserTransactions = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const response = await getUserTransactionService(userId);

  res.status(200).json({
    success: true,
    data: response,
  });
});
