import fs from "fs";
import asyncHandler from "../middlewares/asyncHandler";
var AWS = require("aws-sdk");

const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
};
export const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});
export const pagination = async (body, model, populate: any = false) => {
  try {
    var limit = typeof body.perPage == "undefined" ? 10 : body.perPage;
    var page = typeof body.page == "undefined" ? 1 : body.page;
    var keyword = typeof body.keyword == "undefined" ? false : body.keyword;
    var sort = typeof body.sort == "undefined" ? "date_desc" : body.sort;
    var filter = typeof body.filter == "undefined" ? [] : body.filter;
    var selectedField = typeof body.selectedField == "undefined" ? {} : body.selectedField;
    let search = filter.length != 0 ? filter : {};
    let populated = typeof body.populate == "undefined" ? populate : body.populate
    if (keyword) {
      search.name = { $regex: keyword, $options: "i" };
    }
    var sortBy: any = { createdAt: -1 };

    if (sort == "date_asc") {
      sortBy = { createdAt: 1 };
    } else if (sort == "date_desc") {
      sortBy = { createdAt: -1 };
    } else if (sort == "title_desc") {
      sortBy = { name: -1 };
    } else if (sort == "title_asc") {
      sortBy = { name: 1 };
    } else {
      sortBy = sort;
    } 

    let select = ""
    let size = Object.keys(selectedField).length;

    await model.schema.eachPath(function (path) {
      if (size == 0) {
        select += ` ${path}`
      }
      else if (typeof selectedField[path] != 'undefined') {
        select += ` ${path}`
      }

    });

    var total = await model.find(search).countDocuments();
    var skips = limit * (page - 1);
    var lists = [];

    if (populated) {
      lists = await model
        .find(search)
        .select(select)
        .populate(populated)
        .sort(sortBy)
        .skip(skips)
        .limit(limit)
        .lean()
        .exec();
    } else {
      lists = await model
        .find(search)
        .select(select)
        .sort(sortBy)
        .skip(skips)
        .limit(limit)
        .lean()
        .exec();
    }
    var totalPages: string | any = parseInt(total) / limit;
     return {
      pages: isFloat(totalPages) ? parseInt(totalPages) + 1 : totalPages,
      total: total,
      currentPage: page,
      lists,
    };
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const resources = (model: any) => {
  let returnResouce = {
    index: asyncHandler(async (req, res, next) => {
      res.status(200).json({
        success: true,
        data: await pagination(req.body, model)
      })
    }),
    create: asyncHandler(async (req, res, next) => {
      try {
        await model.create({
          ...req.body,
          owner: req.user._id
        });
        res.status(200).json({ success: true, message: 'Item successfully added' });

      } catch (error) {
        res.status(200).json({ success: false, message: error });
      }
    }),
    edit: asyncHandler(async (req, res, next) => {
      let item = null
      if (typeof req.query.populate != 'undefined') {
        item = await model.findById(req.params.id).populate(req.query.populate)
      } else {
        item = await model.findById(req.params.id)
      }

      if (!item) {
        return next({
          message: `No item found for id ${req.params.id}`,
          statusCode: 404,
        });
      }
      res.status(200).json({ success: true, data: item });
    }),

    editBySlug: asyncHandler(async (req, res, next) => {
      const item = await model.findOne({ slug: req.params.slug })

      if (!item) {
        return next({
          message: `No item found for slug ${req.params.slug}`,
          statusCode: 404,
        });
      }
      res.status(200).json({ success: true, data: item });
    }),
    update: asyncHandler(async (req, res, next) => {
      await model.updateOne({
        _id: req.params.id
      }, { $set: req.body });

      res.status(200).json({ success: true, message: 'Itme successfully updated' });
    }),
    deleteItem: asyncHandler(async (req, res, next) => {

      const item: any = await model.findById(req.params.id).lean();

      if (!item) {
        return next({
          message: `No item found for id ${req.params.id}`,
          statusCode: 404,
        });
      }
      await model.findOneAndDelete({ _id: req.params.id })

      // if (req.user.role == '63971a4dbbb1680f334beed3' || req.user._id.toString() == item?.owner.toString()) {
      //   await model.findOneAndDelete({ _id: req.params.id })

      // } else {
      //   console.log(req.user._id.toString(),item?.owner);

      //   return next({
      //     message: `Permission denied`,
      //     statusCode: 404,
      //   });
      // }

      res.status(200).json({ success: true, message: 'Item successfully removed', data: {} });
    }),
    multiDeleteItem: asyncHandler(async (req, res, next) => {
      try {
        let ids = req.body.ids
        // if (req.user.role == '63971a4dbbb1680f334beed3' || req.user._id.toString() == item?.owner.toString()) {

        for (let id of ids) {
          const item: any = await model.findById(id).lean();

          if (!item) {
            return next({
              message: `No item found for id ${req.params.id}`,
              statusCode: 404,
            });
          }
          await model.findOneAndDelete({ _id: id })
        }


        // } else {

        //   return next({
        //     message: `Permission denied`,
        //     statusCode: 404,
        //   });
        // }

      } catch (error) {

      }

      res.status(200).json({ success: true, message: 'Items successfully removed', data: {} });
    })
  }
  return returnResouce
}

export const uploadImage = async (files = []) => {


  const s3FileURL = `${process.env.AWS_Uploaded_File_URL_LINK}/`;
  const wasabiEndpoint = new AWS.Endpoint(
    `s3.${process.env.AWS_REGION}.wasabisys.com`
  );
  let s3bucket = new AWS.S3({
    endpoint: wasabiEndpoint,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  let urls = {};
  for (var file of files) {

    urls[file?.fieldname] = s3FileURL + file.originalname;

    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };
    try {
      s3bucket.upload(params, async function (err, data) {
        if (err) {
          return err;
        } else if (data) {
        }
      });
    } catch (error) {
      //res.json({ success: true, data: newFileUploaded });
    }
  }
  return urls;
};



export const checkifExistForUpdate = (
  obj: {},
  autoArr: string[],
  customArr: string[]
) => {
  let arr = customArr.length > 0 ? customArr : autoArr;
  const fieldsToUpdate1 = {};
  for (const value of arr) {
    if (obj[value]) fieldsToUpdate1[value] = obj[value];
  }
  return fieldsToUpdate1;
};

export const errorResponse = async (res, error) => {
  if (error) {
    return res.status(200).json({ success: false, message: error });
  }
};

export const successResponse = async (res, succesMsg, data = {}) => {
  if (data) {
    return res
      .status(200)
      .json({ success: true, message: succesMsg, data: data });
  }
};
export const generateRandomString = (length) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }

  return randomString;
}

export const generateRandomNumbers = (length) => {
  const charset = '0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }

  return randomString;
}