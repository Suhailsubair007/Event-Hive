import { AddCategory } from "../../../use-cases/admin/category/AddCategory";
import { EditCategory } from "../../../use-cases/admin/category/EditCtegory";
import { CategoryContoller } from "../../../interface-apdaters/controllers/admin/Category/Category.Controller";
import { categoryRepository } from "../../../interface-apdaters/repositories/Admin/Category/CategoryRepository";
import { ListCategory } from "../../../use-cases/admin/category/ListCategory";
import { GetAllCategories } from "../../../use-cases/admin/category/GetAllCategories";

const categoryRepo = new categoryRepository();

const addCategory = new AddCategory(categoryRepo);
const editCategory = new EditCategory(categoryRepo);
const listCategeory = new ListCategory(categoryRepo);
const getAllCategories = new GetAllCategories(categoryRepo);

const categoryController = new CategoryContoller(
  addCategory,
  editCategory,
  listCategeory,
  getAllCategories
);

export { categoryController };
