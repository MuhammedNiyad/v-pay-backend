const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    auth_methode: { type: String, default: "password", enum:["password", "google"] },
    profile_picture: { type: String },
    points: { type: Number, default: 0 },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    last_login: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Encrypt password before saving
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   });
  
//   // Match user password
//   userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   };

const User = mongoose.model("Users", userSchema);
module.exports = User;
