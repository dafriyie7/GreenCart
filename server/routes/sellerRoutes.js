import express from "express";
import {
	isSellerAuth,
	sellerLogin,
	sellerLogout,
} from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";

const sellerRouter = express.Router();

sellerRouter
	.post("/login", sellerLogin)
	.get("/is-auth", authSeller, isSellerAuth)
	.get("/logout", sellerLogout);

export default sellerRouter;
