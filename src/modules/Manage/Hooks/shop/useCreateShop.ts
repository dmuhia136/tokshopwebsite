import React, { useState } from "react";
import { emailRegex } from "shared/regEx/regEx";

const useManage = () => {
	const [shopName, setShopName] = useState<string>("");
	const [location, setLocation] = useState<string>("");
	const [desc, setDesc] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [mailError, setMailError] = useState<string>("");


	const handlePhoneChange = (e: string) => {
		setPhone(e);
	};

	const handleChange = (e: any) => {
		switch (e.target.id) {
			case "shopName":
				setShopName(e.target.value);
				break;
			case "location":
				setLocation(e.target.value);
				break;
			case "desc":
				setDesc(e.target.value);
				break;
			case "email":
				setEmail(e.target.value);
				let mail = e.target.value.toLowerCase();
				if (mail.match(emailRegex)) setMailError("");
				else {
					setMailError("Invalid email");
				}
				break;
			default:
				break;
		}
	};


	return {
		shopName,
		email,
		location,
		desc,
		phone,
		handleChange,
		handlePhoneChange,
		mailError,
	};
};

export default useManage;
