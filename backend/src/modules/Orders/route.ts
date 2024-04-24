import * as express from "express"
import { protect } from "../../middlewares/auth";
import * as Orders from "./Controller/OrdersController"
import { validate, errorProtect } from "./Middleware/validate"
import { createPaymentToken } from "./Controller/EasebuzzController";
const router = express.Router();
 
// createPayment() 

router.route("/orders").post(Orders.index)
router.route("/orders/createPaymentToken").post(protect,createPaymentToken) 
router.route("/orders/create").post(protect,validate('create'), errorProtect,Orders.create) 
router.route("/orders/groupId/:id").get(Orders.groupId) 
router.route("/orders/complete").post(protect,Orders.complete)

router.route("/orders/view/:id").get(Orders.view)
router.route("/orders/:id").get(Orders.edit) 
router.route("/orders/delete").post(protect,Orders.deleteItem)

module.exports = router;