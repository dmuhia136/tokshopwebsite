import React, { useState} from "react";
import { useRecoilValue } from "recoil";
import useRequest from "shared/http/useRequest";
import Swal from "sweetalert2";
import { user } from "shared/recoil/user";
import { useNavigate } from "react-router-dom";

const useAddShop = () => {
  const { _id } = useRecoilValue<any>(user);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<any>("");
  const [desc, setDesc] = useState<any>("");
  const [variations, setVariations] = useState<any>("");
  const [load, setLoad] = useState<boolean>(false);
  const { Axios } = useRequest();
  let navigate = useNavigate();

  const clearAttributes = () => {
    setName("");
    setPrice(0);
    setQuantity("");
    setDesc("");
  };

  const handleChange = (e: any) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "quantity":
        setQuantity(e.target.value);
        break;
      case "desc":
        setDesc(e.target.value);
        break;
      case "variations":
        setVariations(e.target.value);
        break;
      default:
        break;
    }
  };

  const addProduct = async (
    e: React.FormEvent<HTMLFormElement>,
    shopId: any
  ) => {
    setLoad(true);
    e.preventDefault();
    try {
      let { data } = await Axios.post(`/products/${shopId}`, {
        name,
        price,
        quantity,
        ownerId: _id,
        description: desc,
        variations,
      });
      navigate(`/myAccount/shops/add/${shopId}/images/${data.data._id}`, {
        replace: true,
      });
      clearAttributes();
      setLoad(false);
      Swal.fire({
        icon: "success",
        text: "proceed to add photos to your product",
      });
    } catch (error: any) {
      let errmsg = error.response.data.split(":");
      setLoad(false);

      Swal.fire({
        icon: "error",
        text:
          error.response.status === 409
            ? "Please choose a different shop name"
            : errmsg[2],
        timer: 2000,
      });
    }
  };

  return {
    name,
    price,
    quantity,
    handleChange,
    addProduct,
    load,
    desc,
    variations,
  };
};

export default useAddShop;
