import Admin from "../Model/Admin";
import asyncHandler from "../../../middlewares/asyncHandler";
import { signupVerificationNotification, welcomeEmailNotification, forgotPasswordNotification } from "./Emails";
import bcrypt from "bcryptjs";

// Login Controller
export const login = asyncHandler(async (req, res, next) => {

  const { email, password, fcmid, login_type } = req.body;

  let user: any = await Admin.findOne({ email });
  const match = await user.checkPassword(password);

  if (!match) {
    return res.status(200).json({ success: false, message: "The password does not match" });
  }

  const token = user.getJwtToken();

  user = await Admin.findOne(user._id).populate('role').lean();

  user.token = token;

  res.status(200).json({ success: true, message: "Login success", data: user });
});



export const sendOTP = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expireAt = new Date(Date.now() + 5 * 60 * 1000);
  let message = "";

  const OTPdata = {
    otp: otp,
    otpExpireAt: expireAt,
  };

  await Admin.updateOne({ email: req.body.email }, { $set: OTPdata });
  message = "OTP Resend to registered email";

  await signupVerificationNotification(req.body, otp);
  return res.status(200).json({ success: true, message });
});

// Signup controller
export const signup = asyncHandler(async (req, res, next) => {

  await Admin.create({
    ...req.body,
    email: req.body.email
  });

  let newUserData: any = await Admin.findOne({ email: req.body.email });

  let token = newUserData.getJwtToken();

  welcomeEmailNotification(newUserData);

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

  let user: any = await Admin.findByIdAndUpdate(
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

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expireAt = new Date(Date.now() + 5 * 60 * 1000);
  let message = "";

  const OTPdata = {
    otp: otp,
    email: email,
    otpExpireAt: expireAt,
  };

  await Admin.updateOne({ email: req.body.email }, { $set: OTPdata });
  message = "OTP Resend to registered email";


  await forgotPasswordNotification(req.body, otp);
  return res.status(200).json({ success: true, message });
});
export const updateForgotPassword = asyncHandler(async (req, res, next) => {
  let updatedFields = req.body

  const salt = await bcrypt.genSalt(10);
  updatedFields.password = await bcrypt.hash(updatedFields.password, salt);

  await Admin.updateOne(
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