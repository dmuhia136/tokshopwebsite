import  { useState } from "react";
import { emailRegex } from "shared/regEx/regEx";
import useRequest from "shared/http/useRequest";
import { useParams } from "react-router-dom";

const useEditShop = () => {
  const [shopName, setShopName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [img, setImg] = useState<any>("");
  const [desc, setDesc] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [mailError, setMailError] = useState<string>("");
  const { Axios } = useRequest();
  let { shopId } = useParams<string>();

  const getShopById = async () => {

    try {
      let {
        data: { name, email, location, phoneNumber, image, description },
      } = await Axios.get(`/shop/shop/${shopId}`);
      setShopName(name);
      setLocation(location);
      setImg(image);
      setDesc(description);
      setPhone(phoneNumber);
      setEmail(email);
    } catch (error) {
    }
  };

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
        setMailError("")
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
    img,
    phone,
    handleChange,
    handlePhoneChange,
    mailError,
    getShopById,
  };
};

export default useEditShop;
