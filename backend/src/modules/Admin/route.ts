import * as express from "express";
import { validate, errorProtect } from "./Middleware/validate";
import * as Admin from "./Controller/AdminController";
import * as AdminRoleController from "./Controller/AdminRoleController";
import * as Auth from "./Controller/AuthController";

const { protect } = require("../../middlewares/auth");

const router = express.Router();

router.route("/admin").post(  Admin.index);
router.route("/admin/create").post(protect , Admin.create);
router.route("/admin/:id").get(protect, Admin.edit);
router.route("/admin/:id/update").post(protect, Admin.update);
router.route("/admin/delete/:id").post(protect, Admin.deleteItem);

router.route("/adminroles").post(  AdminRoleController.index);
router.route("/adminroles/create").post(protect , AdminRoleController.create);
router.route("/adminroles/:id").get(protect, AdminRoleController.edit);
router.route("/adminroles/:id/update").post(protect, AdminRoleController.update);
router.route("/adminroles/delete/:id").get(protect, AdminRoleController.deleteItem);


router.route("/admin/auth/updateProfile").post(protect, Auth.updateProfile);

router.route("/admin/auth/sendOtp").post(validate("sendotp"), errorProtect, Auth.sendOTP);
router.route("/admin/auth/login").post(validate("login"), errorProtect,Auth.login);


router.route("/admin/auth/sendotpForForgotPassword").post(validate("sendotpForForgotPassword"), errorProtect, Auth.sendotpForForgotPassword);
router.route("/admin/auth/updateForgotPassword").post(validate("updateForgotPassword"), errorProtect, Auth.updateForgotPassword);

router.route("/admin/auth/me").get(protect, Auth.me);

module.exports = router;