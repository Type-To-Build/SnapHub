import { resources } from "../../../utils";
import Reviews from "../Model/Reviews";

export const { index, create, edit,editBySlug, update, deleteItem } = resources(Reviews)
