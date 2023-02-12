import { Request, Response } from "express";
import { statusCode } from "../helper";
import Product from "../models/product_model";
import message from "../helper/message.json";

interface ProductSchema {
  name: string;
  price: number;
  qty: number;
  description?: string;
  isdeleted?: boolean;
}
const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, qty, description, isdeleted }: ProductSchema =
      req.body;

    const productData = {
      name: name,
      price: price,
      qty: qty,
      description: description,
      isdeleted: isdeleted,
    };

    const result = await Product.create(productData);
    return res.status(statusCode.Created).json({
      success: true,
      message: message.Add_Common_Message,
      data: result,
    });
  } catch (err) {
    console.error(err);
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const { page, limit }: any = req.query;

    const pageOptions = {
      page: parseInt(page, 10) || 0,
      limit: parseInt(limit, 10) || 10,
    };

    const rowCount = await Product.count();

    const result = await Product.find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .exec();

    if (result.length > 0) {
      res
        .status(statusCode.Ok)
        .json({ success: true, data: result, count: rowCount });
    } else {
      res
        .status(statusCode.No_Content)
        .json({ success: true, message: message.Not_Recored_common_message });
    }
  } catch (err) {
    console.error(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const checkDataExists = await Product.find({ __id: id });
    if (!checkDataExists) {
      res
        .status(statusCode.No_Content)
        .json({ success: true, message: message.Not_Recored_common_message });
    } else {
      const { name, price, qty, description, isdeleted } = req.body;

      const updateData = {
        $set: {
          name: name,
          price: price,
          qty: qty,
          description: description,
          isdeleted: isdeleted,
        },
      };
      const result = await Product.updateOne({ _id: id }, updateData);
      res.status(statusCode.Ok).json({
        success: true,
        message: message.Update_common_message,
        data: result,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
const product = {
  addProduct,
  getProduct,
  updateProduct,
};

export default product;
