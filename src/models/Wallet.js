const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    point_history:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PointHistory"
        }
    ]
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;