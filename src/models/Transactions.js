const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    trasaction_id:{
        type: String,
        required: true,
    },
    transaction_type:{
        type: String,
        required: true,
        enum: ["TRANSFER","PAYMENT","REFUND","WITHDRAWAL"],
        default: "PAYMENT"
    },
    is_merchant:{
        type: Boolean,
        required: true,
        default: false
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    currency:{
        type: String,
        required: true,
        default: "INR"
    },
    payment_method: {
        type: String,
        required: true,
        enum: ["UPI","QRCODE","POINT"],
        default: "UPI"
    },
    status:{
        type: String,
        required: true,
        enum: ["PENDING","SUCCESS","FAILED"],
        default: "PENDING"
    },
    description: {
        type: String,
        default: "",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    completed_at: {
        type: Date,
        default: null,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Transactions = mongoose.model("Transactions", transactionSchema);

module.exports = Transactions;