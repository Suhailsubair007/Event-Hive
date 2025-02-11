import { Request, Response } from "express";
import { AddCategory } from "../../../../use-cases/user/category/AddCategory";
import { ICategory } from "../../../../entities/modelInterface/Category";
import { EditCategory } from "../../../../use-cases/user/category/EditCtegory";

export class CategoryContoller {
  constructor(
    private addCategory: AddCategory,
    private editCategory : EditCategory
  ) {}

  async add(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, imageUrl } = req.body;
      const category: ICategory = {
        name,
        description,
        imageUrl,
        isListed: true,
      };

      const newCategory = await this.addCategory.execute(category);
      res.status(201).json({
        success: true,
        category: newCategory,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        messgae: "Internal server error",
      });
    }
  }

  async edit(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description, imageUrl } = req.body;

      const updatedCategory = await this.editCategory.execute(id, {
        name,
        description,
        imageUrl,
      });
      res.status(200).json({ success: true, category: updatedCategory });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
