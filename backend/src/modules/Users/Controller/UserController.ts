import Users from "../Model/Users";
import asyncHandler from "../../../middlewares/asyncHandler";
import { generateRandomString, pagination } from "../../../utils";
import bcrypt from "bcryptjs";
import geoip from "geoip-lite"
import { countriesList } from "../../../utils/allcountries";
import {  welcomeEmailNotification } from "./Emails";

export const ipinfo = asyncHandler(async (req, res, next) => {
  const ipAddress = req?.headers?.['x-real-ip'];
  
  var geo = geoip.lookup(ipAddress == '::1' ||  !ipAddress ? "49.156.101.248" : ipAddress);
  let country = countriesList.filter((item: any) => item.alpha2Code == geo?.country)?.[0]

  res.status(200).json({
    success: true,
    data: {
      ...geo,
      name: country?.name || '',
      currencies: country?.currencies?.[0] || {},
      flags: country?.flags || {},
      callingCodes: '+' + country?.callingCodes?.[0] || ''
    }
  });
});
export const index = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: await pagination(req.body, Users)
  });
});

export const create = asyncHandler(async (req, res, next) => {
  await Users.create({
    ...req.body,
    password: generateRandomString(8)});

  let newUserData: any = await Users.findOne({ email: req.body.email }).lean();
  welcomeEmailNotification(newUserData);

  res.status(200).json({ success: true, message: "User successfully added",data: newUserData });
});

export const edit = asyncHandler(async (req, res, next) => {
  const user = await Users.findById(req.params.id).select("-password").lean();

  if (!user) {
    return next({
      message: `The user ${req.params.id} is not found`,
      statusCode: 404,
    });
  }
  res.status(200).json({ success: true, data: user });
});
export const update = asyncHandler(async (req, res, next) => {


  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const user = await Users.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res
    .status(200)
    .json({ success: true, message: "User successfully updated", data: user });
});

export const deleteItem = asyncHandler(async (req, res, next) => {
  const { ids } = req.body;
  await Users.deleteMany({ _id: { $in: ids }, can_delete: true });
  res
    .status(200)
    .json({ success: true, message: "Items successfully removed", data: {} });
});

export const getUser = asyncHandler(async (req, res, next) => {

  const user = await Users.findById(req.params.id);

  if (!user) {
    return next({
      message: `The user ${req.params.id} is not found`,
      statusCode: 404,
    });
  }
  res.status(200).json({ success: true, data: user });
});

export const profile = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: req.user });
});
export const profileAdmin = asyncHandler(async (req, res, next) => {
  const user = await Users.findById(req.params.id)
    .select("-password")
    .populate({
      model: "User",
      path: "refBy",
      select: "_id avatar first_name last_name uniqueID",
    })
    .populate({
      model: "User",
      path: "parent",
      select: "_id avatar first_name last_name uniqueID",
    });
  if (!user) {
    return next({
      message: `The user ${req.params.id} is not found`,
      statusCode: 404,
    });
  }

  res.status(200).json({ success: true, data: user });
});
