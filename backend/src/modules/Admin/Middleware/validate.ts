import { body } from "express-validator";
import Admin from "../Model/Admin";
import { validationResult } from "express-validator";

export const validate = (method) => {
  switch (method) {
    case "login": {
      return [
        body("email").isEmail() .withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
          
            const user = await Admin.countDocuments({ email: value });
            if (user == 0) {
              throw new Error("Email not exist");
            }
            return;
          }),
          body('password').isLength({ min: 8 }).withMessage('Please enter minimum 8 characters') ,
      ];
    } 
    
    case "sendotp": {
      return [
        body("email")
          .isEmail()
          .withMessage("Please enter valid email")
          .custom(async function (value, { req }) {
            const user = await Admin.countDocuments({ email: value });
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
            const user = await Admin.countDocuments({ email: value });
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
          .isEmail() .withMessage("Please enter valid email")
        .custom(async function (value, { req }) {
          const user = await Admin.countDocuments({ email: value });
          if (user == 0) {
            throw new Error("Email not exits");
          }
          return;
        }),
        body('password') 
        .isLength({ min: 8 }).withMessage('Please enter minimum 8 characters') ,
        body('otp')
          .isLength({ min: 6, max: 6 }).withMessage('Please enter valid OTP')
          
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
