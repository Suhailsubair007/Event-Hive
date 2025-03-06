import { Document, model, Schema } from "mongoose";
import { ICategory } from "../../entities/modelInterface/Category";

export interface CategoryDocument extends ICategory, Document {
  _id: import("mongoose").Types.ObjectId;
}

const categorySchema = new Schema<CategoryDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isListed: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now },
});

export const CategoryModel = model<CategoryDocument>(
  "Category",
  categorySchema
);
