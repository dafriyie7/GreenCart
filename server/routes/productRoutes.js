import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/authSeller.js";
import {
	addProduct,
	changeStock,
	productById,
	productList,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter
	.post("/add", upload.array("images"), authSeller, addProduct)
	.get("/list", productList)
	.get("/:id", productById)
	.post("/stock", authSeller, changeStock);

export default productRouter;
