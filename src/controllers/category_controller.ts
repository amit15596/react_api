import { Request, Response } from "express";
import Category from "../models/category_model";
import statusCode from "../helper/status";
import message from "../helper/message.json";
import { responseHandler } from "../helper";

const addCategories = async (req: Request, res: Response) => {
  try {
    const { name, description, isdeleted } = req.body;

    const data = {
      name: name,
      description: description,
      isdeleted: isdeleted,
    };

    const checkExistData = await Category.find({ name: name });
    if (checkExistData.length > 0) {
      res
        .status(statusCode.Conflict)
        .json({ success: false, message: message.Category_already_exists });
    } else {
      const result = await Category.create(data);

      res
        .status(statusCode.Created)
        .json(
          await responseHandler.success(
            statusCode.Created,
            message.Add_Common_Message,
            result
          )
        );
    }
  } catch (error) {
    console.error(error);
  }
};

interface Page {
  page: Number;
  limit: Number;
}
const getAllCategory = async (req: Request, res: Response) => {
  try {
    const { page, limit }: any = req.query;

    const pageOptions = {
      page: parseInt(page, 10) || 0,
      limit: parseInt(limit, 10) || 10,
    };

    const rowCount = await Category.count();

    const result = await Category.find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .exec();

    if (result.length > 0) {
      res.status(statusCode.Ok).json({
        success: true,
        count: rowCount ? rowCount : 0,
        data: result,
      });
    } else {
      res.status(statusCode.No_Content).json({
        success: false,
        message: message.Not_Recored_common_message,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const checkDataExists = await Category.find({ __id: id });
    if (!checkDataExists) {
      res.status(statusCode.Not_Found).json({
        success: false,
        message: message.Not_Recored_common_message,
      });
    } else {
      const { name, description } = req.body;

      const updateData = {
        $set: {
          name: name,
          description: description,
        },
      };
      const result = await Category.updateOne({ _id: id }, updateData);
      res.status(statusCode.Ok).json({
        success: true,
        message: message.Update_common_message,
        data: result,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const result = await Category.deleteOne({ _id: id });
    if (!result) {
      res.status(statusCode.No_Content).json({
        success: false,
        message: message.Not_Recored_common_message,
      });
    } else {
      res.status(statusCode.Ok).json({
        message: true,
        success: message.Delete_Recored_common_message,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const category = {
  addCategories,
  getAllCategory,
  deleteCategory,
  updateCategory,
};

export default category;
