import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [isSeller, setIsSeller] = useState(false);
	const [showuserLogin, setShowUserLogin] = useState(false);
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState({});
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(true)

	const currency = import.meta.env.VITE_CURRENCY;

	// seller status
	const fetchSeller = async () => {
		try {
			const { data } = await axios.get("/seller/is-auth");

			if (data.success) {
				setIsSeller(true);
			} else {
				setIsSeller(false);
			}
		} catch (error) {
			setIsSeller(false);
			console.log(error);
		}
	};

	// fetch user status, user data and cart items
	const fetchUser = async () => {
		try {
			const { data } = await axios.get("/user/is-auth");

			if (data.success) {
				console.log(data);
				setUser(data.user);
				setCartItems(data.user.cartItems)
			} else {
				setUser(false);
			}
		} catch (error) {
			setUser(null);
			console.log(error);
		}
	};

	// fetch all products
	const fetchProducts = async () => {
		try {
			const { data } = await axios.get("/product/list");

			if (data.success) {
				setProducts(data.products);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};

	// add product to cart
	const addToCart = (itemId) => {
		let cartData = structuredClone(cartItems);

		if (cartData[itemId]) {
			cartData[itemId] += 1;
		} else {
			cartData[itemId] = 1;
		}
		setCartItems(cartData);
		toast.success("Added to Cart");
	};

	// update cart item quantity
	const updateCartItems = (itemId, quantity) => {
		let cartData = structuredClone(cartItems);
		cartData[itemId] = quantity;
		setCartItems(cartData);
		toast.success("Cart updated");
	};

	// remove product from cart
	const removeFromCart = (itemId) => {
		let cartData = structuredClone(cartItems);

		if (cartData[itemId]) {
			cartData[itemId] -= 1;
			if (cartData[itemId] === 0) {
				delete cartData[itemId];
			}
		}

		setCartItems(cartData);
		toast.success("Removed from cart");
	};

	// get cart item count
	const getCartCount = () => {
		let totalCount = 0;
		for (const item in cartItems) {
			totalCount += cartItems[item];
		}
		return totalCount;
	};

	// get cart total amount
	const getCartAmount = () => {
		let totalAmount = 0;
		for (const items in cartItems) {
			let itemInfo = products.find((product) => product._id === items);

			if (cartItems[items] > 0) {
				totalAmount += itemInfo.offerPrice * cartItems[items];
			}
		}

		return Math.floor(totalAmount * 100) / 100;
	};

	useEffect(() => {
		fetchProducts();
		fetchSeller();
		fetchUser();
	}, []);

	useEffect(() => { 
		const updateCart = async () => {
			try {
				console.log(cartItems)
				const {data} = await axios.post('/cart/update', {cartItems})
				if (!data.success) {
					toast.error(data.message)
				}
			} catch (error) {
				toast.error(error.response.data.message);
				console.log(error);
			}
		}

		if (user) {
			updateCart()
		}
	}, [cartItems])


	const value = {
		navigate,
		user,
		setUser,
		isSeller,
		setIsSeller,
		showuserLogin,
		setShowUserLogin,
		products,
		currency,
		addToCart,
		updateCartItems,
		removeFromCart,
		cartItems,
		searchQuery,
		setSearchQuery,
		getCartAmount,
		getCartCount,
		axios,
		fetchProducts,
		loading,
		setLoading,
		setCartItems,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	return useContext(AppContext);
};
