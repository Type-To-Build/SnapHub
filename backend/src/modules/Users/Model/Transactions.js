const mongoose = require("mongoose");
const TransactionsSchema = new mongoose.Schema({
  description: {
    type: String,
    default:"",
  },
  amount: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: false,
  },
  trxType: {
    type: String,
    default:"",
  },
  trxId:{
    type: String,
    default:""
  },
  driver: { type: mongoose.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
module.exports = mongoose.model("Transactions", TransactionsSchema);