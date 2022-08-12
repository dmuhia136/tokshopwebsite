import React, { useEffect, useState } from "react";
import useCreateShop from "../../../Hooks/shop/useCreateShop";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import useSpinner from "shared/components/spinner/useSpinner";
import ImageUpload from "shared/components/common/ImageUpload";
import useFirebase from "shared/firebase/useFirebase";
import useFetch from "shared/hooks/useFetch";
import { useRecoilValue } from "recoil";
import { user } from "shared/recoil/user";
import { dataURLtoFile } from "shared/helpers/dataUrlToFile";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateShop: React.FC = () => {
  const {
    shopName,
    email,
    location,
    desc,
    phone,
    handleChange,
    handlePhoneChange,
    mailError,
  } = useCreateShop();
  const { renderSpinner } = useSpinner();
  const { getObject, load, mongoErr } = useFetch();
  const [img, setImg] = useState<any>("");
  const { _id } = useRecoilValue<any>(user);
  let navigate = useNavigate();
  const { uploadToFirebase, uris } = useFirebase();
  const [fileLoad, setFileLoad] = useState(false);

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    let file: any = img?.length > 0 && dataURLtoFile(img, "profile");
    img.length > 0 && uploadToFirebase([file], "user/display_picture");
    setFileLoad(true);
  };

  const handleUpload = async () => {
    let res = await getObject(`/shop/${_id}`, "POST", {
      name: shopName,
      email: email,
      location: location,
      phoneNumber: phone,
      description: desc,
      image: uris[0],
    });
    if (res.success) {
      Swal.fire({
        icon: "success",
        timer: 1000,
      });
      navigate(`/myAccount/shops/`);
    }
  };

  useEffect(() => {
    if (uris.length === 1) {
      setFileLoad(false);
      handleUpload();
    }
    return () => {};
  }, [uris]);

  return (
    <div className="flex flex-col  w-full">
      <p className="text-xl text-black-80 text-center">Create Your Shop</p>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="py-8 flex flex-col gap-8 w-full items-center"
      >
        <div className="flex w-full flex-col md:flex-row lg:w-1/2 justify-center gap-6 lg:gap-10">
          <input
            onChange={handleChange}
            value={shopName}
            required
            type="text"
            id="shopName"
            placeholder="Name"
            className="inputs w-full"
          />
          <input
            onChange={handleChange}
            required
            value={location}
            type="text"
            id="location"
            placeholder="Location"
            className="inputs w-full"
          />
        </div>
        <div
          className="flex w-full flex-col md:flex-row md:w-full lg:w-1/2 justify-center 
        gap-6 lg:gap-10"
        >
          <div className="flex w-full flex-col gap-y-2">
            <input
              autoComplete="off"
              onChange={handleChange}
              value={email}
              required
              type="text"
              id="email"
              placeholder="Email"
              className="inputs w-full"
            />
            <p className="text-red-20">{mailError}</p>
          </div>
          <div className="flex w-full">
            <PhoneInput
              required={true}
              country={"us"}
              value={phone}
              onChange={handlePhoneChange}
              className="inputs w-full"
              placeholder="Telephone"
            />
          </div>
        </div>
        <div
          className="flex w-full flex-col md:flex-row md:w-full lg:w-1/2 justify-center 
          gap-6 lg:gap-10"
        >
          <textarea
            onChange={handleChange}
            value={desc}
            required
            rows={3}
            cols={50}
            id="desc"
            placeholder="Description"
            className="textarea w-full"
          />
        </div>

        <div className="min-w-full md:min-w-fit">
          <ImageUpload setImg={setImg} oldImg={undefined} />
        </div>
        <div className="flex flex-col-reverse w-full lg:w-1/2 gap-4 ">
          <button
            type="submit"
            disabled={mailError?.length > 0 || load || img?.length < 1}
            className="red-btn"
          >
            Submit
          </button>
          <p className="text-red-20 text-lg font-medium">{mongoErr}</p>
          {renderSpinner(load || fileLoad)}
        </div>
      </form>
    </div>
  );
};

export default CreateShop;
