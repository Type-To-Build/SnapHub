import Users from "../Model/Users";
import asyncHandler from "../../../middlewares/asyncHandler";
import { signupVerificationNotification, updateProfileVerificationNotification, welcomeEmailNotification, forgotPasswordNotification } from "./Emails";
import Otp from "../Model/Otp";
import bcrypt from "bcryptjs";

// Login Controller
export const login = asyncHandler(async (req, res, next) => {

  const { email, password, fcmid, login_type } = req.body;

  let user: any = await Users.findOne({ email });
  const match = await user.checkPassword(password);

  if (!match) {
    return res.status(200).json({ success: false, message: "The password does not match" });
  }

  const token = user.getJwtToken();

  user = await Users.findOne(user._id).lean();
  // .populate({ model: "Roles", path: "role" })
  // .lean();

  user.token = token;

  res.status(200).json({ success: true, message: "Login success", data: user });
});



export const sendOTP = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  let IfEalierSendOTP = await Otp.countDocuments({ email });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expireAt = new Date(Date.now() + 5 * 60 * 1000);
  let message = "";

  const OTPdata = {
    otp: otp,
    email: email,
    expireAt: expireAt,
  };

  if (IfEalierSendOTP) {
    await Otp.updateOne({ email: req.body.email }, { $set: OTPdata });
    message = "OTP Resend to registered email";
  } else {
    await Otp.create(OTPdata);
    message = "Otp successfully sent to email";
  }

  await signupVerificationNotification(req.body, otp);
  return res.status(200).json({ success: true, message });
});

export const updateProfileSendOtp = asyncHandler(async (req, res, next) => {


  let IfEalierSendOTP = await Otp.countDocuments({ email: req.user.email });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expireAt = new Date(Date.now() + 5 * 60 * 1000);
  let message = "";

  const OTPdata = {
    otp: otp,
    email: req.user.email,
    expireAt: expireAt,
  };

  if (IfEalierSendOTP) {
    await Otp.updateOne({ email: req.user.email }, { $set: OTPdata });
    message = "OTP Resend to registered email";
  } else {
    await Otp.create(OTPdata);
    message = "Otp successfully sent to email";
  }
  console.log(otp, '--otp');

  await updateProfileVerificationNotification(req.user, otp);
  return res.status(200).json({ success: true, message });
});

// Signup controller
export const signup = asyncHandler(async (req, res, next) => {

  await Users.create({
    ...req.body,
    role: "6477b287be35f4f46eb9462b",
  });

  let newUserData: any = await Users.findOne({ email: req.body.email });

  let token = newUserData.getJwtToken();

 // welcomeEmailNotification(newUserData);

  res.status(200).json({
    success: true,
    message: "Registration successfully done",
    data: {
      ...newUserData,
      token,
    },
  });
});

export const me = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});
export const updateProfile = asyncHandler(async (req, res, next) => {
  let updatedFields = req.body

  let user: any = await Users.findByIdAndUpdate(
    req.user._id,
    { $set: updatedFields },
    {
      new: true,
      runValidators: true,
    }
  );
  user = user.toJSON();
  user.token = req.user.token;

  res.status(200).json({
    success: true,
    message: "Profile successfully updated",
    data: user,
  });
});
export const sendotpForForgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  let IfEalierSendOTP = await Otp.countDocuments({ email });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expireAt = new Date(Date.now() + 5 * 60 * 1000);
  let message = "";

  const OTPdata = {
    otp: otp,
    email: email,
    expireAt: expireAt,
  };

  if (IfEalierSendOTP) {
    await Otp.updateOne({ email: req.body.email }, { $set: OTPdata });
    message = "OTP Resend to registered email";
  } else {
    await Otp.create(OTPdata);
    message = "Otp successfully sent";
  }

  await forgotPasswordNotification(req.body, otp);
  return res.status(200).json({ success: true, message });
});
export const updateForgotPassword = asyncHandler(async (req, res, next) => {
  let updatedFields = req.body

  const salt = await bcrypt.genSalt(10);
  updatedFields.password = await bcrypt.hash(updatedFields.password, salt);

  await Users.updateOne(
    { email: updatedFields.email },
    {
      $set: {
        password: updatedFields.password
      }
    });

  res.status(200).json({
    success: true,
    message: "Password successfully changed "
  });
});