import * as express from "express";
import { validate, errorProtect } from "./Middleware/validate";
import * as Categories from "./Controller/CategoriesController";
import * as Reviews from "./Controller/ReviewsController";

const { protect } = require("../../middlewares/auth");

const router = express.Router();

router.route("/categories").post(Categories.index);
router.route("/categories/create").post(protect,Categories.create);
router.route("/categories/:id").get(Categories.edit);
router.route("/categories/slug/:slug").get(Categories.editBySlug);
router.route("/categories/:id/update").post(protect,Categories.update);
router.route("/categories/delete/:id").get(protect,Categories.deleteItem);

router.route("/reviews").post(Reviews.index);
router.route("/reviews/create").post(protect,Reviews.create);


module.exports = router;