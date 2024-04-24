const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: [true, "Please enter the otp"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    trim: true,
  },
  expireAt: {
    type: Date,
    default: new Date(Date.now() + 5 * 60 * 1000),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Otp", OtpSchema);
