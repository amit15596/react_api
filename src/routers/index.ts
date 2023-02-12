import express, { Request, Response } from "express";

import categoryRouter from "./category_router";

import { statusCode } from "../helper";
import message from "../helper/message.json";

import productRouter from "./product_router";

const router = express.Router();

router.use(categoryRouter);
router.use(productRouter);

router.all("*", async (req: Request, res: Response) => {
  res.status(statusCode.Bad_Request).json({
    code: statusCode.Bad_Request,
    success: false,
    message: message.Url_not_found,
  });
});

export { router as routerV1 };
