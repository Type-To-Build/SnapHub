import * as mongoose from 'mongoose'
const ReviewsSchema = new mongoose.Schema({
  description: {
    type: String,
    default: '',
    trim: true,
  }, 
  stars: { type: Number, default: 0 },
  toUser: { type: mongoose.Schema.ObjectId, ref: "Users" },
  fromUser: { type: mongoose.Schema.ObjectId, ref: "Users" },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Reviews", ReviewsSchema);