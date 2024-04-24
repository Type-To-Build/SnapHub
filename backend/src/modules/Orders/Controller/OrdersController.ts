import Orders from "../Model/Orders"
import asyncHandler from "../../../middlewares/asyncHandler";
import { resources, pagination, currencyFormatter } from "../../../utils";

import { checkpayment, sendPaymentLink } from "./EasebuzzController";
import MessagesGroup from "../../Messages/Model/MessagesGroup";
import Reviews from "../../Photographers/Model/Reviews";

export const { index, edit, deleteItem } = resources(Orders)

export const view = asyncHandler(async (req, res, next) => {

  const item = await Orders.findById(req.params.id).populate("hotel user roomTypes._id")

  if (!item) {
    return next({
      message: `No item found for id ${req.params.id}`,
      statusCode: 404,
    });
  }
  res.status(200).json({ success: true, data: item });

});
export const groupId = asyncHandler(async (req, res, next) => {

  const item = await Orders.findOne({groupId: req.params.id})

  if (!item) {
    return next({
      message: `No item found for id ${req.param.id}`,
      statusCode: 404,
    });
  }
  res.status(200).json({ success: true, data: item });

});

export const complete = asyncHandler(async (req, res, next) => {

  await Orders.updateOne({_id: req.body._id},{
    stars: req.body.stars,
    ratingDescription: req.body.ratingDescription,
    user: req.user._id,
    orderStatus: 'complete'
  })

  await Reviews.create({_id: req.body._id},{
    description: req.body.ratingDescription, 
    stars: req.body.stars,
    toUser: req.body.freelancer,
    fromUser: req.user._id,
  })
 
  res.status(200).json({ success: true, message: 'Rating successfully completed' });

});
export const create = asyncHandler(async (req, res, next) => {

  try {
    
      await Orders.create({
        ...req.body,
        employer: req.user._id
      });
      await MessagesGroup.updateOne({_id: req.body.groupId},{
        runnigOrder: 1
      })
      res.status(200).json({ success: true, message: 'Order successfully placed' });
 
  } catch (error) {
    res.status(200).json({ success: false, message: error });
  }

});
 
