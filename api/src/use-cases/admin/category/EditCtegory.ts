import { ICategoryRepository } from "../../../entities/repositoryInterface/Admin/interface.categoryRepository";
import { CustomError } from "../../../shared/utils/CustomError";
import { ICategory } from "../../../entities/modelInterface/Category";

export class EditCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string, category: Partial<ICategory>): Promise<ICategory> {
    if (!id) {
      throw new CustomError("Category ID is required", 400);
    }

    if (category.name) {
      const existingCategory = await this.categoryRepository.findByName(
        category.name
      );
      if (existingCategory && existingCategory._id?.toString() !== id) {
        throw new CustomError("Category with this name already exists", 400);
      }
    }

    const updatedCategory = await this.categoryRepository.updateCategory(
      id,
      category
    );
    if (!updatedCategory) {
      throw new CustomError("Category not found", 404);
    }

    return updatedCategory;
  }
}
