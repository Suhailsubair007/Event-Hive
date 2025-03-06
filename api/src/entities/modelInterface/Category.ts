import { Types } from "mongoose";

export interface ICategory {
  _id?: Types.ObjectId; // Use Types.ObjectId instead of string
  name: string;
  description: string;
  imageUrl: string;
  isListed: boolean;
  timestamp?: Date;
}

