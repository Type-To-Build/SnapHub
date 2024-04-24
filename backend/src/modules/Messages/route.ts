import * as express from "express"
import { protect } from "../../middlewares/auth";
import * as Messages from "./Controller/MessagesController"
import * as MessagesGroup from "./Controller/MessagesGroupController"
import { validate, errorProtect } from "./Middleware/validate"
const router = express.Router();
 
router.route("/messages").post(protect,Messages.index)
router.route("/messages/create").post(protect,validate('create'), errorProtect,Messages.create)
router.route("/messages/delete").post(protect,Messages.deleteItem)

router.route("/messagesgroup").get(protect,MessagesGroup.messagesgroup)
router.route("/messagesgroup/create").post(protect,MessagesGroup.create)
router.route("/messagesgroup/:id").get(protect,MessagesGroup.details)

module.exports = router;