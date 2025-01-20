const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    profile: { type: String },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    last_login: { type: Date, default: Date.now },
    referral_code: { type: String, unique: true },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    date_of_birth: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    pan_number: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);
module.exports = User;
