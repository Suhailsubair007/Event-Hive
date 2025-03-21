import { ICategoryRepository } from "../../../entities/repositoryInterface/Admin/interface.categoryRepository";
import { ICategory } from "../../../entities/modelInterface/Category";

export class GetAllCategories {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(
    page: number,
    limit: number
  ): Promise<{ categories: ICategory[]; total: number }> {
    return this.categoryRepository.findAllCategories(page, limit);
  }
}
