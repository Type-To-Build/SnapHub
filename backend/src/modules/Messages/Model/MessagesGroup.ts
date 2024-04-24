const mongoose = require("mongoose");

const MessagesGroupSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  runnigOrder: {type :Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("MessagesGroup", MessagesGroupSchema);
