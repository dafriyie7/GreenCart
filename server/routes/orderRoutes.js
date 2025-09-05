import express from "express";
import authUser from "../middlewares/authUser.js";
import {
	getAllOrders,
	getUserOrders,
	placeOrderCOD,
} from "../controllers/orderConroller.js";
import authSeller from "../middlewares/authSeller.js";

const orderRouter = express.Router();

orderRouter
	.post("/cod", authUser, placeOrderCOD)
	.get("/user", authUser, getUserOrders)
	.get("/seller", authSeller, getAllOrders);


	export default orderRouter