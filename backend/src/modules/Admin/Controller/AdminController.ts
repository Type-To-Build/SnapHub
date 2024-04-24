import Admin from "../Model/Admin";
import asyncHandler from "../../../middlewares/asyncHandler";
import { pagination, resources } from "../../../utils";
import bcrypt from "bcryptjs";

export const { index, create, edit, editBySlug, deleteItem } = resources(Admin)

export const profile = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: req.user });
});

export const update = asyncHandler(async (req, res, next) => {
  let updatedFields = req.body

  if (updatedFields.password.length != 0) {
    const salt = await bcrypt.genSalt(10);
    updatedFields.password = await bcrypt.hash(updatedFields.password, salt);
  } else {
    delete updatedFields.password
  }

  await Admin.updateOne({
    _id: req.params.id
  }, { $set: updatedFields });


  res.status(200).json({
    success: true,
    message: "Profile successfully updated "
  });
});
