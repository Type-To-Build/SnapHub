import * as express from "express";
import { validate, errorProtect } from "./Middleware/validate";
import * as Users from "./Controller/UserController";
import * as Role from "./Controller/RoleController";
import * as Auth from "./Controller/AuthController";

const { protect } = require("../../middlewares/auth");

const router = express.Router();

router.route("/roles").post(protect, Role.index);
router.route("/roles/create").post(protect, Role.create);
router.route("/roles/:id").get(protect, Role.edit);
router.route("/roles/:id/update").post(protect, Role.update);
router.route("/roles/delete").post(protect, Role.deleteItem);

router.route("/users/me").get(protect, Users.profile);

router.route("/users/ipinfo").get( Users.ipinfo);
router.route("/users").post(   Users.index);
router.route("/users/create").post(protect, validate("create"),errorProtect, Users.create);
router.route("/users/:id").get( Users.edit);
router.route("/users-profile-admin/:id").get(protect, Users.profileAdmin);
router.route("/users/:id/update").post(protect, Users.update);
router.route("/users/delete").post(protect, Users.deleteItem);




router.route("/auth/updateProfile").post(protect, Auth.updateProfile);
router.route("/auth/updateProfileSendOtp").post(protect, Auth.updateProfileSendOtp);

router.route("/auth/sendOtp").post(validate("sendotp"), errorProtect, Auth.sendOTP);
router.route("/auth/signup").post(validate("signup"), errorProtect, Auth.signup);
router.route("/auth/login").post(validate("login"), errorProtect,Auth.login);

router.route("/auth/sendotpForForgotPassword").post(validate("sendotpForForgotPassword"), errorProtect, Auth.sendotpForForgotPassword);
router.route("/auth/updateForgotPassword").post(validate("updateForgotPassword"), errorProtect, Auth.updateForgotPassword);

router.route("/auth/me").get(protect, Auth.me);

module.exports = router;