const Referrals = require("../../models/Referrals");

exports.getUserReferralsService = async (userId) => {
  try {
    const referrals = await Referrals.find({
      user_id: userId,
    }).populate({
      path: "referred_user_id",
      select: "_id name email phone_number profile",
    })

    return referrals;

  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    const err = new Error("Internal server error");
    err.statusCode = 500;
    throw err;
  }
};
