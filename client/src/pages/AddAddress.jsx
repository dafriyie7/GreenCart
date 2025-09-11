import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
	<input
		type={type}
		placeholder={placeholder}
		name={name}
		onChange={handleChange}
		value={address[name] || ""}
		required
		className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
	/>
);

const AddAddress = () => {
	const { axios, user, navigate } = useAppContext();

	const [address, setAddress] = useState({
		firstName: "",
		lastName: "",
		email: "",
		street: "",
		city: "",
		state: "",
		country: "",
		zipCode: "",
		phone: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setAddress((prevAddress) => ({
			...prevAddress,
			[name]: value,
		}));
	};

	const onSubmitHandler = async (e) => {
		try {
			e.preventDefault();
			const { data } = await axios.post("/address/add", { address });

			if (data.success) {
				toast.success(data.message);
				navigate("/cart");
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message || "something went wrong");
		}
	};

	useEffect(() => {
		if (!user) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<div className="mt-16 pb-16">
			<p className="text-2xl md:text-3xl text-gray-500">
				Add Shipping{" "}
				<span className="font-semibold text-primary">Address</span>
			</p>

			<div className="flex flex-col-reverse md:flex-row justify-between mt-10">
				<div className="flex-1 max-w-md">
					<form
						onSubmit={onSubmitHandler}
						className="space-y-3 mt-6 text-sm"
					>
						<div className="grid grid-cols-2 gap-4">
							<InputField
								handleChange={handleChange}
								address={address}
								name="firstName"
								type="text"
								placeholder="first name"
							/>
							<InputField
								handleChange={handleChange}
								address={address}
								name="lastName"
								type="text"
								placeholder="last name"
							/>
						</div>

						<InputField
							handleChange={handleChange}
							address={address}
							name="email"
							type="email"
							placeholder="email"
						/>

						<InputField
							handleChange={handleChange}
							address={address}
							name="street"
							type="text"
							placeholder="street"
						/>

						<div className="grid grid-cols-2 gap-4">
							<InputField
								handleChange={handleChange}
								address={address}
								name="city"
								type="text"
								placeholder="city"
							/>

							<InputField
								handleChange={handleChange}
								address={address}
								name="state"
								type="text"
								placeholder="state"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<InputField
								handleChange={handleChange}
								address={address}
								name="zipCode"
								type="number"
								placeholder="zipcode"
							/>

							<InputField
								handleChange={handleChange}
								address={address}
								name="country"
								type="text"
								placeholder="country"
							/>
						</div>

						<InputField
							handleChange={handleChange}
							address={address}
							name="phone"
							type="text"
							placeholder="phone"
						/>

						<button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transision cursor-pointer uppercase">
							Save address
						</button>
					</form>
				</div>

				<img
					src={assets.add_address_iamge}
					alt="add address"
					className="md:mr-16 mb-16 md:mt-0"
				/>
			</div>
		</div>
	);
};

export default AddAddress;