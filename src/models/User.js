const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone_number: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    profile: { type: String },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    last_login: { type: Date, default: Date.now },
    referral_code: { type: String, unique: true },
  },
  { timestamps: true }
);


const User = mongoose.model("Users", userSchema);
module.exports = User;
