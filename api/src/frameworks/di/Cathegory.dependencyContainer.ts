import { AddCategory } from "../../use-cases/user/category/AddCategory";
import { EditCategory } from "../../use-cases/user/category/EditCtegory";
import { CategoryContoller } from "../../interface-apdaters/controllers/admin/Category/Category.Controller";
import { categoryRepository } from "../../interface-apdaters/repositories/Admin/Category/CategoryRepository";
import {ListCategory} from '../../use-cases/user/category/ListCategory'

const categoryRepo = new categoryRepository();

const addCategory = new AddCategory(categoryRepo);
const editCategory = new EditCategory(categoryRepo)
const listCategeory = new ListCategory(categoryRepo)

const categoryController = new CategoryContoller(addCategory , editCategory, listCategeory);

export { categoryController };
