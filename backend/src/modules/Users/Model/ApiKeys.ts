import * as mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const ApiKeysSchema = new mongoose.Schema({
  apiKeyOwner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  apiKey: {
    type: String,
    required: [true, "Please enter api key"],
    trim: true,
    unique: true,
  },
  hitsCounts: [{
    hitAt: {
      type: Date,
      default: Date.now
    },
    endpointsHits: {
      type: Array,
      default: []
    }
  }],
  freeHits:{
    type: Number,
    default: 0
  },
  status: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ApiKeysSchema.methods.createNewKey = async function (apiKeyOwner) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(apiKeyOwner, salt);
};
export const createNewKey =async (apiKeyOwner:any)=>{
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(apiKeyOwner, salt);
}
export default mongoose.model("ApiKeys", ApiKeysSchema);