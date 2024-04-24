import * as express from "express";
import multer from 'multer';
import { protect } from '../../middlewares/auth';
import * as Media from "./Controller/MediaController";

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const router = express.Router();

router.route("/media").post(protect, Media.index);
router.route("/media/save").post(protect, upload.single("file"), Media.save);
router.route("/media/upload").post(protect, upload.single("file"), Media.save);
router.route("/media/delete").post(protect, Media.deleteItem);

module.exports = router;