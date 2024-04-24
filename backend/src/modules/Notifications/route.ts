import * as express from "express"
import { protect } from "../../middlewares/auth";
import * as Notifications from "./Controller/NotificationsController"
import { validate, errorProtect } from "./Middleware/validate"
const router = express.Router();
 
router.route("/notifications").post(protect,Notifications.index)
router.route("/notifications/create").post(protect,validate('create'), errorProtect,Notifications.create)
router.route("/notifications/:id").get(protect,Notifications.edit)
router.route("/notifications/:id/update").post(protect,Notifications.update)
router.route("/notifications/delete").post(protect,Notifications.deleteItem)

module.exports = router;