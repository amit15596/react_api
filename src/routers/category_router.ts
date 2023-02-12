import express from "express";

import { category } from "../controllers";
// import middleware from "../validation/middleware";
// import categotySchemas from "../validation/category_schema";

const categoryRouter = express.Router();

categoryRouter.post("/category", category.addCategories);

categoryRouter.get("/category", category.getAllCategory);

categoryRouter.put("/category/:id", category.updateCategory);

categoryRouter.delete("/category/:id", category.deleteCategory);

export default categoryRouter;
