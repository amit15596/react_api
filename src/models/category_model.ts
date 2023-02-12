import mongoose from "mongoose";
import { table } from "../helper";
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isdeleted: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model(table.CATEGORY, CategorySchema);
export default Category;
