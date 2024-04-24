import * as mongoose from "mongoose"

const MediaSchema = new mongoose.Schema({
  name: { type: String, default: "", trim: true },
  size: { type: String, default: '', trim: true },
  fileName: { type: String, default: "", trim: true },
  type: { type: String, default: "", trim: true },
  thumbnailUrl: { type: String, default: "", trim: true },
  user: { type: mongoose.Schema?.Types.ObjectId, ref: "User" },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Media", MediaSchema);
// module.exports = mongoose.model("Media", MediaSchema);