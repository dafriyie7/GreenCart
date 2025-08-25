import { v2 as cloudinary } from "cloudinary";
import Product from "../configs/Product.js";

// add product: /api/product/add
export const addProduct = async (req, res) => {
	try {
		let productData = JSON.parse(req.body.productData);
		const images = req.files;
		let imagesUrl = await Promise.all(
			images.map(async (image) => {
				let result = await cloudinary.uploader.upload(image.path, {
					resource_type: "image",
				});
				return result.secure_url;
			})
		);

		await Product.create({ ...productData, image: imagesUrl });

		res.json({ success: true, message: "Product added successfully" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};

// get products: /api/product/list
export const productList = async (req, res) => {
	try {
		const products = await Product.find({});

		res.status(200).json({ success: true, products });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};

// add a single product: /api/product/id
export const productById = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);

		res.status(200).json({ success: true, product });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};

// change product inStock: /api/product/stock
export const changeStock = async (req, res) => {
	try {
		const { id, inStock } = req.body;

		await Product.findByIdAndUpdate(id, { inStock });

		res.json({ success: true, message: "Product stock changed successfully" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};
