import { generateRandomNumbers } from "../../../utils";

const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  orderNo: {
    type: String,
    unique: true,
    trim: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "MessagesGroup" },
  description: { type: String, default: '' },

  paymentMethod: { type: String, default: '' },

  payment_id: { type: String, default: '' },
  txn_order_id: { type: String, default: '' },
  payment_signature: { type: String, default: '' },
  recordReason: { type: String, default: '' },
  amount: {
    type: Number,
    default: 0,
    trim: true,
  }, 
   stars: {
    type: Number,
    default: 0,
    trim: true,
  },
  ratingDescription: { type: String, default: '' },

  paymentStatus: { type: Number, default: 0 }, // 0 for unpaid , 1 for paid , 2 for refund , 3 for official
  orderStatus: { type: String, default: 'running' }, // 0 for unpaid , 1 for paid , 2 for refund , 3 for official

  createdAt: { type: Date, default: Date.now },


});
OrdersSchema.pre("save", async function (this: any, next) {

  this.orderNo = generateRandomNumbers(6)

  next();
});
export default mongoose.model("Orders", OrdersSchema);
