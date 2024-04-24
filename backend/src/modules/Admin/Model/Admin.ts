import * as mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
 
const AdminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter your full name"],
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    default:"",
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true,
  },
  employeeID: { type: String, default: "" },
  avatar: { type: String, default: "" },
  isVerified: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Array,
    default: [],
  },
  otp: {
    type: String,
    default: "",
  },
  otpExpireAt: {
    type: Date,
    default: new Date(Date.now() + 5 * 60 * 1000),
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "AdminRoles" },
  hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotels" }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

AdminSchema.pre("save", async function (this: any, next) {
  let color = [
    "AFCFFD",
    "FCC5B7",
    "ABCFE0",
    "9FDEDA",
    "C7D9A8",
    "BFC5EE",
    "E8BBC1",
    "E1C8CE",
  ];

  var item = color[Math.floor(Math.random() * color.length)];
  this.avatar = `https://ui-avatars.com/api/?background=1E1E1E&color=${item}&name=${this.fullName}`;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

AdminSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

AdminSchema.methods.checkPassword = async function (this: any, password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Admin", AdminSchema);
