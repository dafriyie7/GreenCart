// place order COD: /api/order/cod

import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrderCOD = async (req, res) => {
	try {
		const { items, address } = req.body;
		const { userId } = req;

		if (!address || items.length === 0) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid details" });
		}

		const productIds = items.map((item) => item.product);
		const products = await Product.find({ _id: { $in: productIds } });

		const productMap = new Map(products.map((p) => [p._id.toString(), p]));

		let amount = items.reduce((acc, item) => {
			const product = productMap.get(item.product);
			if (product) {
				// Using offerPrice if available, otherwise price
				return (
					acc + (product.offerPrice || product.price) * item.quantity
				);
			}
			return acc;
		}, 0);

		// add tax charge (2%)
		amount += Math.floor(amount * 0.02);

		await Order.create({
			userId,
			items,
			amount,
			address,
			paymentType: "COD",
		});

		return res
			.status(201)
			.json({ success: true, message: "Order placed successfully" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get orders by user ID: /api/order/user
export const getUserOrders = async (req, res) => {
	try {
		const { userId } = req;
		const orders = await Order.find({
			userId,
			$or: [{ paymentType: "COD" }, { isPaid: true }],
		})
			.populate({ path: "items.product" })
			.populate({ path: "address" })
			.sort({ createdAt: -1 });

		res.status(200).json({ success: true, orders });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};

// get all orders ( for seller / admin): /api/order/seller
export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find({
			$or: [{ paymentType: "COD" }, { isPaid: true }],
		})
			.populate({ path: "items.product" })
			.populate({ path: "address" })
			.sort({ createdAt: -1 });

		res.status(200).json({ success: true, orders });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};
