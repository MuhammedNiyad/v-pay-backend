const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    referred_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true,
    },
});

const Referrals = mongoose.model("Referrals", referralSchema);

module.exports = Referrals;