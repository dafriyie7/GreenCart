import Address from "../models/Address.js";

// add address: /api/address/add
export const addAddress = async (req, res) => {
	try {
		const { address } = req.body;
		const { userId } = req

		await Address.create({ ...address, userId });

		res.status(201).json({
			success: true,
			message: "Address added successfully",
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};

// get address: /api/address/get
export const getAddress = async (req, res) => {
	try {
		const { userId } = req
		const addresses = await Address.find({ userId });

		res.status(200).json({ success: true, addresses });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};
