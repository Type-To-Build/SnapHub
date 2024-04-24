import { body } from "express-validator";
import Users from "../Model/Users";
import { validationResult } from "express-validator";
import Otp from "../Model/Otp";

export const validate = (method) => {
  switch (method) {
    case "signup": {
      return [
        body("fullName", "Please enter full name")
          .notEmpty()
          .withMessage("Please enter full name")
          .isLength({ min: 3 })
          .withMessage("Name must be at least 3 chars long"),

        body("email")
          .isEmail().withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            const user = await Users.countDocuments({ email: value });
            if (user > 0) {
              throw new Error("Email already exits");
            }
            return;
          }),
        body('password')
          .isLength({ min: 8 }).withMessage('Please enter minimum 8 characters'),
        body('otp')
          .isLength({ min: 6, max: 6 }).withMessage('Please enter valid OTP')
          .custom(async function (value, { req }) {
            const otpList = await Otp.findOne({ otp: value, email: req.body.email })
            if (otpList == null) {
              throw new Error('Otp is wrong')
            } else if (otpList && otpList.expireAt < Date.now()) {
              throw new Error('Otp expired, Please generate new OTP.')
            }
            return;
          })
      ];
    }
    case "login": {
      return [
        body("email").isEmail().withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            console.log(value, '--value');

            const user = await Users.countDocuments({ email: value });
            if (user == 0) {
              throw new Error("Email not exist");
            }
            return;
          }),
        body('password').isLength({ min: 8 }).withMessage('Please enter minimum 8 characters'),
      ];
    }
    case "loginWithOtp": {
      return [
        body("phone").notEmpty().withMessage("Please enter valid phone")
          .custom(async function (value, { req }) {

            const user = await Users.countDocuments({ phone: value });
            if (user == 0) {
              throw new Error("Phone no. not exist");
            }
            return;
          })
      ];
    }

    case "loginWithOTPCheck": {
      return [
        body("phone").notEmpty().withMessage("Please enter valid phone")
          .custom(async function (value, { req }) {

            const user = await Users.countDocuments({ phone: value });
            if (user == 0) {
              throw new Error("Phone no. not exist");
            }
            return;
          }),
        body('otp')
          .isLength({ min: 6, max: 6 }).withMessage('Please enter valid OTP')
          .custom(async function (value, { req }) {
            const otpList: any = await Users.findOne({ otp: value, phone: req.body.phone })
            if (otpList == null) {
              throw new Error('Otp is wrong')
            } else if (otpList && otpList.otpExpireAt < Date.now()) {
              throw new Error('Otp expired, Please generate new OTP.')
            }
            return;
          })
      ];
    }
    case "sendotp": {
      return [
        body("email")
          .isEmail()
          .withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            const user = await Users.countDocuments({ email: value });
            if (user > 0) {
              throw new Error("Email already exits");
            }
            return;
          })
      ];
    }
    case "updateProfileSendOtp": {
      return [
        body("email")
          .isEmail()
          .withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            const user = await Users.countDocuments({ email: value });
            if (user > 0) {
              throw new Error("Email already exits");
            }
            return;
          })
      ];
    }

    case "sendotpForForgotPassword": {
      return [
        body("email")
          .isEmail()
          .withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            const user = await Users.countDocuments({ email: value });
            if (user == 0) {
              throw new Error("Email not exits");
            }
            return;
          })
      ];
    }
    case "updateForgotPassword": {
      return [

        body("email")
          .isEmail().withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            const user = await Users.countDocuments({ email: value });
            if (user == 0) {
              throw new Error("Email not exits");
            }
            return;
          }),
        body('password')
          .isLength({ min: 8 }).withMessage('Please enter minimum 8 characters'),
        body('otp')
          .isLength({ min: 6, max: 6 }).withMessage('Please enter valid OTP')
          .custom(async function (value, { req }) {
            const otpList = await Otp.findOne({ otp: value, email: req.body.email })
            if (otpList == null) {
              throw new Error('Otp is wrong')
            } else if (otpList && otpList.expireAt < Date.now()) {
              throw new Error('Otp expired, Please generate new OTP.')
            }
            return;
          })
      ];
    }

    case "create": {
      return [
        body("fullName", "Please enter full name")
          .notEmpty()
          .withMessage("Please enter full name")
          .isLength({ min: 3 })
          .withMessage("Name must be at least 3 chars long"),

        body("email")
          .isEmail().withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            const user = await Users.countDocuments({ email: value });
            if (user > 0) {
              throw new Error("Email already exits");
            }
            return;
          }),
        body("phone")
          .custom(async function (value, { req }) {
            if (value.length != 0) {
              const user = await Users.countDocuments({ phone: value });
              if (user > 0) {
                throw new Error("Phone already exits");
              }
            }

            return;
          }),

      ];
    }
  }
};

export const errorProtect = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let extractedErrors = [];
    errors.array().map((err) => {
      extractedErrors.push(err.msg);
    });
    return res
      .status(200)
      .json({ success: false, message: extractedErrors[0] });
  } else {
    next();
  }
};
