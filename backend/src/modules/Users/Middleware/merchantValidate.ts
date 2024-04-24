import { body } from "express-validator";
import Otp from "../Model/Otp";
import Users from "../Model/Users";
import jwt from "jsonwebtoken";

export const merchantValidate = (method) => {
  switch (method) {
    case "signup": {
      return [
        body("fullName", "Please enter full name")
          .notEmpty()
          .withMessage("Please enter full name")
          .isLength({ min: 3 })
          .withMessage("Name must be at least 3 chars long"),

        body("email")
          .isEmail()
          .withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            const user = await Users.countDocuments({ email: value });
            if (user > 0) {
              throw new Error("Email already exits");
            }
            return;
          }),

        body("password")
          .isLength({ min: 6 })
          .withMessage("Please enter minimum 6 characters"),

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
    case "sendotp": {
      return [
        body("email")
          .isEmail()
          .withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            const user = await Users.countDocuments({ email: value, role:"6477b287be35f4f46eb9462b"  });
            if (user > 0) {
              throw new Error("Email already exits");
            }
            return;
          })
      ];
    }
    case "login": {
      return [
        body("email")
          .isEmail()
          .withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            let filter = { email: value, role:"6477b287be35f4f46eb9462b" };

            const user = await Users.countDocuments(filter);
            if (user == 0) {
              throw new Error("Email not exist");
            }
            return;
          }),

        body("password")
          .isLength({ min: 6 })
          .withMessage("Please enter minimum 6 characters"),
      ];
    }
    case "forgetPassword": {
      return [
        body("email")
          .isEmail()
          .withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            const user = await Users.countDocuments({ email: value, role:"6477b287be35f4f46eb9462b"  });
            if (user == 0) {
              throw new Error("Email not exits");
            }
            return;
          }),
      ];
    }
    case "verifyOTP": {
      return [
        body("email")
          .isEmail()
          .withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            const user = await Users.countDocuments({ email: value, role:"6477b287be35f4f46eb9462b"  });
            if (user == 0) {
              throw new Error("Email not exits");
            }
            return;
          }),
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

    case "verifyPassword": {
      return [
        body("phone")
          .isInt()
          .withMessage("Please enter valid number")
          .isLength({ min: 10, max: 10 })
          .withMessage("Please enter valid number")
          .custom(async function (value, { req }) {
            const user = await Users.countDocuments({ phone: value });
            console.log(user, "-----user");
            if (user === 0) {
              throw new Error("Phone# not exist");
            }
            return;
          })
          .withMessage("Phone# not exist"),

        body("otp")
          .isLength({ min: 6, max: 6 })
          .withMessage("Please enter valid OTP"),
      ];
    }
    case "changePassword": {
      return [
        body("password")
          .isLength({ min: 6 })
          .withMessage("Please enter minimum 6 characters"),

        body("token").notEmpty().withMessage("Please enter token")
          .custom(async function (value, { req }) {
            const decoded = jwt.decode(req.body.token, process.env.JWT_SECRET);
            if (!decoded.id) {
              throw new Error("User not found");
            }
            return;
          })

      ];
    }

  }
};