const PointHistory = require("../../models/PointHistory");
const Referrals = require("../../models/Referrals");
const User = require("../../models/User");
const Wallet = require("../../models/Wallet");
const generateToken = require("../../utils/generateToken");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

exports.loginService = async (data) => {
  if (!data.phoneNumber) {
    const error = new Error("Phone number is required");
    error.statusCode = 400; 
    throw error;
  }

  const existUser = await User.findOne({
    phone_number: data.phoneNumber,
  });

  if(existUser){

    existUser.name = data.name;
    existUser.email = data.email;
    await existUser.save();

    const token = generateToken(existUser._id);

    return  {existUser, token};
  }

  const user = await User({
    name: `@${data.phoneNumber}`,
    phone_number: data.phoneNumber,
  });
  await user.save();

  await Wallet.create({
    user_id: user._id,
    points: 0,
    point_history: [],
  });

  user.referral_code = generateReferralCode(user._id);
  await user.save();

  if (data.referralCode) {
    await assignReferralPoint(user._id, data.referralCode);
  }

  const token = generateToken(user._id);

  return { user, token };
};
const generateReferralCode = (userId) => {
  const baseString = `${userId}-${uuidv4()}`;
  const hash = crypto.createHash("sha256").update(baseString).digest("hex");

  return hash.substring(0, 6).toUpperCase();
};
const assignReferralPoint = async (userId, refererCode) => {
  const referer = await User.findOne({
    referral_code: refererCode,
  });

  if (!referer) {
    return;
  }

  const newReferral = await Referrals({
    user_id: referer._id,
    referred_user_id: userId,
  });
  await newReferral.save();

  await User.findByIdAndUpdate(
    userId,
    { referredBy: referer._id },
  );

  const wallet = await Wallet.findOne({
    user_id: referer._id,
  });

  wallet.points += 50;
  wallet.point_history.push(newReferral._id);
  await wallet.save();

  await PointHistory.create({
    user_id: referer._id,
    point: 50,
    source_type: "REFERRAL",
    transaction_id: null,
    referral_id: newReferral._id,
  });
};
