import * as mongoose from 'mongoose'
const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter room name"],
    trim: true,
  },
  slug: {
    type: String,
    default: '',
    unique: true,
    trim: true,
  },
  image: { type: String, default: '' },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
CategoriesSchema.pre("save", async function (next) {
  const slug = this.name;
  this.slug = slug.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  next();
});
export default mongoose.model("Categories", CategoriesSchema);