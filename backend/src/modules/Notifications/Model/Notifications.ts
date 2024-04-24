const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  description: { type: String, required: [true, "Please enter description"] },
  isReaded: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Notifications", NotificationsSchema);
