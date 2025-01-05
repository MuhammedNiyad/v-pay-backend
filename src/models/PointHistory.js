const mongoose = require("mongoose");

const pointHistorySchema = new mongoose.Schema({
    
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    point:{
        type: Number,
        required: true,
        default: 0
    },
    source_type:{
        type: String,
        required: true,
        enum: ["REFERRAL","PURCHASE"],
        default: "REFERRAL"
    },
    transaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transactions",
    },
    referral_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Referrals",
    },
    

},{timestamps: true});

const PointHistory = mongoose.model("PointHistory", pointHistorySchema);

module.exports = PointHistory