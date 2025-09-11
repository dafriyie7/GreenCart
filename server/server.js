import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const PORT = process.env.PORT || 5000;

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);

app.get("/", (req, res) => {
	res.send("API is working");
});
app.use("/api/user", userRouter)
	.use("/api/seller", sellerRouter)
	.use("/api/product", productRouter)
	.use("/api/cart", cartRouter)
	.use('/api/address', addressRouter)
	.use('/api/order', orderRouter)

const startServer = async () => {
	try {
		await connectDB();
		await connectCloudinary();

		app.listen(PORT, () =>
			console.log(`Server running on http:localhost:${PORT}`)
		);
	} catch (error) {
		console.error("Failed to start server:", error.message);
		process.exit(1);
	}
};

startServer();
