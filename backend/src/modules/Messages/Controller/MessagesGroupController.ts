import MessagesGroup from "../Model/MessagesGroup"
import { resources } from "../../../utils";
import asyncHandler from "../../../middlewares/asyncHandler";
import Orders from "../../../modules/Orders/Model/Orders";


export const messagesgroup = asyncHandler(async (req, res, next) => {

  const item = await MessagesGroup.find({ fromUser: req.user._id }).populate("fromUser toUser")

  res.status(200).json({ success: true, data: item });

});

export const create = asyncHandler(async (req, res, next) => {

  let item = await MessagesGroup.findOne({
    fromUser: req.user._id, toUser: req.body.freelancer
  }).populate("fromUser toUser")

  if (item == null) {
    item =  await MessagesGroup.create({
      fromUser: req.user._id,
      toUser: req.body.freelancer
    })
  }
  res.status(200).json({ success: true, data: item._id });

});
export const details = asyncHandler(async (req, res, next) => {

  let item = await MessagesGroup.findOne({_id: req.params.id}).populate("fromUser toUser").lean()
  let runnigOrder = 0
  if(item){
     runnigOrder = await Orders.countDocuments({
      employer: item.fromUser,
      freelancer: item.toUser,
      orderStatus: 'running'
    })
  }
  res.status(200).json({ success: true, data: {...item,runnigOrder} });

});
