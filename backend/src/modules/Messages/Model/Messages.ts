const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  sendBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  messageGroup: { type: mongoose.Schema.Types.ObjectId, ref: "MessagesGroup" },
  msg: { type: String, required: [true, "Please enter description"] },
  isReaded: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Messages", MessagesSchema);
