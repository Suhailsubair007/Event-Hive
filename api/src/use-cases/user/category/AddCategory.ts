import { ICategory } from "../../../entities/modelInterface/Category";
import { ICategoryRepository } from "../../../entities/repositoryInterface/interface.categoryRepository";
import { CustomError } from "../../../shared/utils/CustomError";

export class AddCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(category: ICategory): Promise<ICategory> {
    if (!category.name || !category.description || !category.imageUrl) {
      throw new CustomError("All fields are required", 400);
    }
    return await this.categoryRepository.createCategory(category);
  }
}
