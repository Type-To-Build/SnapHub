import * as mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateRandomNumbers } from "../../../utils";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter your full name"],
    trim: true,
  },
  shortDescription: {  type: String,   trim: true, },
  description: {  type: String,   trim: true, },
  stars: {  type: Number,   default: 5 },
  password: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    default: "",
    trim: true,
  },
  jobType: {
    type: String,
    default: "",
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true,
  },
  workSample:{
    type: Array,
    default: []
  },
  can_delete: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  wallet: {
    type: Number,
    default: 0.0,
  },
  price: {
    type: Number,
    default: 50.0,
  },
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
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Roles" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
  socialAccount: {
    type: Object,
    default: {
      facebook: null,
      instagram: null,
      linkdin: null,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

UserSchema.pre("save", async function (this: any, next) {
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

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.checkPassword = async function (this: any, password) {
  console.log(password, this.password, '----');

  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Users", UserSchema);
