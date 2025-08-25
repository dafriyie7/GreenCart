import express from "express";
import authUser from "../middlewares/authUser.js";
import {
	isAuth,
	login,
	logout,
	register,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter
	.post("/register", register)
	.post("/login", login)
	.get("/is-auth", authUser, isAuth)
	.get("/logout", authUser, logout);

export default userRouter;
