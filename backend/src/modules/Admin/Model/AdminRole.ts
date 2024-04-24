import * as mongoose from 'mongoose'

const AdminRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter role name"],
    trim: true,
    unique: true,

  },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotels" },
  can_delete: {
    type: Boolean,
    default: true
  },
  status: {
    type: Boolean,
    default: true
  },
  permissions: {
    type: Object,
    default:{}
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("AdminRoles", AdminRoleSchema);