// src/application/use-cases/GetAllCategories.ts
import { ICategoryRepository } from "../../../entities/repositoryInterface/interface.categoryRepository";
import { ICategory } from "../../../entities/modelInterface/Category";

export class GetAllCategories {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<ICategory[]> {
    return this.categoryRepository.findAllCategories();
  }
}