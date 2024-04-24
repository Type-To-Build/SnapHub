import * as mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter role name"],
    trim: true,
    unique: true,

  },
  can_delete: {
    type: Boolean,
    default: true
  },
  role_type: {
    type: String,
    default:"Frontend"
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

export default mongoose.model("Roles", RoleSchema);