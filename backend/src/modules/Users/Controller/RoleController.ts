import asyncHandler from "../../../middlewares/asyncHandler";
import { pagination } from "../../../utils"
import Roles from "../Model/Role"

export const index = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: await pagination(req.body, Roles)
  });
});

export const create = asyncHandler(async (req, res, next) => {
  await Roles.create(req.body);
  res.status(200).json({ success: true, message: 'Role successfully added' });
});

export const edit = asyncHandler(async (req, res, next) => {

  const role = await Roles.findById(req.params.id)
  if (!role) {
    return next({
      message: `No role found for id ${req.params.id}`,
      statusCode: 404,
    });
  }
  res.status(200).json({ success: true, data: role });
});

export const update = asyncHandler(async (req, res, next) => {

  await Roles.updateOne({
    _id: req.params.id
  }, { $set: req.body });
  res.status(200).json({ success: true, message: 'Role successfully updated' });
});

export const deleteItem = asyncHandler(async (req, res, next) => {
  const { ids } = req.body
  await Roles.deleteMany({ _id: { $in: ids } })
  res.status(200).json({ success: true, message: 'Items successfully removed', data: {} });
}); 
