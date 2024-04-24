import Messages from "../Model/Messages"
import { resources } from "../../../utils";
import asyncHandler from "../../../middlewares/asyncHandler";
export const { create, edit, update, deleteItem } = resources(Messages)

export const index = asyncHandler(async (req, res, next) => {

    const item = await Messages.find({messageGroup : req.body.messageGroup})
    res.status(200).json({ success: true, data: item });
  
  });