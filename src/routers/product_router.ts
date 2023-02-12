import express from "express";
const productRouter = express.Router();

import { product } from "../controllers";

productRouter.post("/product", product.addProduct);

productRouter.get("/product", product.getProduct);

// productRouter.put("/product/:id");
export default productRouter;
