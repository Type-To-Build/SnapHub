var AWS = require("aws-sdk");
import asyncHandler from "../../../middlewares/asyncHandler";
import { pagination } from "../../../utils";
import Media from "../Model/Media";

export const index = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: await pagination(req.body, Media),
  });
});

export const save = asyncHandler(async (req, res, next) => {
  const file = req.file;
  const s3FileURL = `${process.env.AWS_Uploaded_File_URL_LINK}/${req.user._id}/`;
  // const s3FileURL = `${process.env.AWS_Uploaded_File_URL_LINK}/${req.body.brandName}/`;

  console.log(s3FileURL, "---s3FileURL");

  const wasabiEndpoint = new AWS.Endpoint(
    `s3.${process.env.AWS_REGION}.wasabisys.com`
  );

  let s3bucket = new AWS.S3({
    endpoint: wasabiEndpoint,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  var keykey = req.user._id + "/" + file.originalname;
  // var keykey = req.body.brandName + "/" + file.originalname;

  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: keykey,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  var newFileUploaded = {
    description: "test",
    fileLink: s3FileURL + file.originalname,
    s3_key: params.Key,
  };

  try {
    s3bucket.upload(params, async function (err, data) {
      if (err) {
        return res.json({ error: "Error -> " + err });
      } else if (data) {
        // console.log(data);
        await Media.create({
          name: file.originalname,
          fileName: file.fileName,
          size: file.size,
          type: file.mimetype,
          thumbnailUrl: data.Location,
          user: req.user._id,
        });
        return res.json({ success: true, data: newFileUploaded });
      }
    });
  } catch (error) {
    //res.json({ success: true, data: newFileUploaded });
  }
});

export const upload = asyncHandler(async (req, res, next) => {
  const file = req.file;
  const s3FileURL = `${process.env.AWS_Uploaded_File_URL_LINK}/${req.user._id}/`;
  const wasabiEndpoint = new AWS.Endpoint(
    `s3.${process.env.AWS_REGION}.wasabisys.com`
  );

  let s3bucket = new AWS.S3({
    endpoint: wasabiEndpoint,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  var keykey = req.user._id + "/" + file.originalname;
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: keykey,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  var newFileUploaded = {
    description: "test",
    fileLink: s3FileURL + file.originalname,
    s3_key: params.Key,
    size: file.size,
  };

  try {
    s3bucket.upload(params, async function (err, data) {
      if (err) {
        return res.json({ error: "Error -> " + err });
      } else if (data) {
        console.log(data);
        await Media.create({
          name: file.originalname,
          fileName: file.fileName,
          size: file.size,
          type: file.mimetype,
          thumbnailUrl: data.Location,
          user: req.user._id,
        });
        return res.json({ success: true, data: newFileUploaded });
      }
    });
  } catch (error) {
    res.json({ success: false, data: "error.message" });
  }
});
export const deleteItem = asyncHandler(async (req, res, next) => {
  const { ids, name } = req.body;

  await Media.deleteMany({ _id: { $in: ids } });

  try {
    const s3FileURL = `${process.env.AWS_Uploaded_File_URL_LINK}/`;

    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: name,
    };

    s3bucket.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack); // error
      else console.log(); // deleted
    });
  } catch (error) {
    res
      .status(200)
      .json({ success: true, message: "Items successfully removed", data: {} });
  }

  res
    .status(200)
    .json({ success: true, message: "Items successfully removed", data: {} });
});

export const savenew = async (req, res) => {
  try {
    const file = req.file;
    const s3FileURL = `${process.env.AWS_Uploaded_File_URL_LINK}/${req.body._id}/`;

    const wasabiEndpoint = new AWS.Endpoint(
      `s3.${process.env.AWS_REGION}.wasabisys.com`
    );

    let s3bucket = new AWS.S3({
      endpoint: wasabiEndpoint,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    var keykey = req.body._id + "/" + file.originalname;

    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: keykey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    var newFileUploaded = {
      description: "test",
      fileLink: s3FileURL + file.originalname,
      s3_key: params.Key,
    };

    await s3bucket.upload(params, async function (err, data) {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      } else if (data) {
        await Media.create({
          name: file.originalname,
          fileName: file.fileName,
          size: file.size,
          type: file.mimetype,
          thumbnailUrl: data.Location,
          user: req.body._id,
        });
        return data.Location;
      }
    });
  } catch (error) {
    console.log("err....messs", error.message);

    return res.status(400).json({ success: false, error: error.message });
  }
};
