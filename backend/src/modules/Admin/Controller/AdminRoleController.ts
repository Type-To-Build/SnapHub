import AdminRole from "../Model/AdminRole";
import { resources } from "../../../utils";

export const { index, create, edit, editBySlug, update, deleteItem } = resources(AdminRole)
