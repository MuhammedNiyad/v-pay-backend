const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    card_number: {
      type: String,
      required: true,
      unique: true,
    },
    pin: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'blocked'],
      default: 'inactive',
    },
    issued_at: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('Card', cardSchema);
  