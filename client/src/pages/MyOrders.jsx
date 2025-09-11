import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const MyOrders = () => {
	// Keep track of the user's orders
	const [myOrders, setMyOrders] = useState([]);
	const { currency, axios, user } = useAppContext();

	// Fetches the user's orders
	const fetchMyOrders = async () => {
		try {
			const { data } = await axios.get("/order/user");

			if (data.success) {
				setMyOrders(data.orders);
			}
		} catch (error) {
			console.log(error.response?.data || error.message);
		}
	};

	// Fetch orders as soon as the page loads
	useEffect(() => {
		if (user) {
			fetchMyOrders();
		}
	}, [user]);

	return (
		<div className="mt-16 pb-16">
			{/* Page title */}
			<div className="flex flex-col items-end w-max mb-8">
				<p className="text-2xl font-medium uppercase">My Orders</p>

				<div className="w-16 h-0.5 bg-primary rounded-full"></div>
			</div>

			{myOrders.map((order, index) => (
				// Loop through each order
				<div
					key={index}
					className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
				>
					{/* Show the main order details */}
					<p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col max-md:gap-1">
						<span>OrderId : {order._id}</span>
						<span>Payment : {order.paymentType}</span>
						<span>
							Total Amount : {currency} {order.amount}
						</span>
					</p>
					{order.items.map((item, index) => {
						// If a product associated with an order was deleted,
						// item.product will be null. We should handle this gracefully.
						if (!item.product) {
							return (
								<div
									key={index}
									className="p-4 text-gray-500 text-center"
								>
									An item from this order is no longer
									available.
								</div>
							);
						}
						return (
							// Then, loop through the items in that order
							<div
								key={index}
								className={`relative bg-white text-gray-500/70 ${
									order.items.length !== index + 1 &&
									"border-b"
								} border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
							>
								{/* Product info */}
								<div className="flex items-center gap-4 mb-4 md:mb-0">
									<div className="bg-primary/10 p-4 rounded-lg">
										<img
											src={item.product.image?.[0]}
											alt={item.product.name}
											className="w-16 h-16 object-contain"
										/>
									</div>

									<div>
										<h2 className="text-xl font-medium text-gray-800">
											{item.product.name}
										</h2>
										<p>{item.product.category}</p>
									</div>
								</div>

								{/* Order status and details */}
								<div className="flex flex-col justify-center md:ml-15 mb-4 md:mb-0">
									<p>Quantity: {item.quantity || "1"}</p>
									<p>Status: {order.status}</p>
									<p>
										Date:{" "}
										{new Date(
											order.createdAt
										).toLocaleDateString()}
									</p>
								</div>

								{/* Item subtotal */}
								<p className="text-primary text-lg font-medium">
									Amount: {currency}{" "}
									{item.product.offerPrice * item.quantity}
								</p>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default MyOrders;
