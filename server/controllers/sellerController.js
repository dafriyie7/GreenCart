import jwt from "jsonwebtoken"

// seller login: /api/seller/login
export const sellerLogin = async (req, res) => {
	
	try {
		const { email, password } = req.body
		if (
			password === process.env.SELLER_PASSWORD &&
			email === process.env.SELLER_EMAIL
		) {
			const token = jwt.sign({ email }, process.env.JWT_SECRET, {
				expiresIn: "7d",
			});

			res.cookie("sellerToken", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite:
					process.env.NODE_ENV === "production" ? "none" : "strict",
				maxAge: 7 * 24 * 60 * 60 * 1000,
			});

			return res
				.status(200)
				.json({ success: true, message: "Logged in successfully" });
		} else {
			return res
				.status(400)
				.json({ success: false, message: "Invalid credentials" });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
}

// seller auth: /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
	try {
		return res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
		console.log(error);
	}
};

// seller logout: /api/seller/logout
export const sellerLogout = async (req, res) => {
	try {
		res.clearCookie("sellerToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		});

		res.status(200).json({
			success: true,
			message: "Logged out successfully",
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
		console.log(error);
	}
};