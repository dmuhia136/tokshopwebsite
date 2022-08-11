import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "shared/styles/phoneInput.css";
import useSpinner from "shared/components/spinner/useSpinner";
import useEditShop from "../../Hooks/shop/useEditShop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useShop from "../../Hooks/shop/useShop";
import DeleteShop from "./DeleteShop";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "shared/components/common/ImageUpload";
import useFetch from "shared/hooks/useFetch";
import useFirebase from "shared/firebase/useFirebase";
import { dataURLtoFile } from "shared/helpers/dataUrlToFile";
import Swal from "sweetalert2";

const EditShop: React.FC = () => {
  const {
    shopName,
    email,
    location,
    desc,
    phone,
    handleChange,
    handlePhoneChange,
    mailError,
    getShopById,
  } = useEditShop();

  const { getShopsByUserId, myShop } = useShop();
  let { shopId } = useParams<string>();
  const [img, setImg] = useState<any>("");
  const [openDelete, setOpenDelete] = useState(false);
  let navigate = useNavigate();
  const { renderSpinner } = useSpinner();
  const [fileLoad, setFileLoad] = useState(false);

  useEffect(() => {
    getShopById();
    getShopsByUserId();
  }, []);

  useEffect(() => {
    if (myShop !== null) setImg(myShop);
  });

  const { getObject, load, mongoErr } = useFetch();
  const { uploadToFirebase, uris } = useFirebase();

  const handleSubmit = () => {};

  return (
    <div className="flex flex-col rounded-2xl px-[1rem] py-[3rem]  relative">
      {openDelete && (
        <DeleteShop
          name={shopName}
          shopId={shopId}
          setOpenDelete={setOpenDelete}
        />
      )}

      <FontAwesomeIcon
        icon={faCircleArrowLeft}
        onClick={() => navigate(`/myAccount/shops`)}
        className="back"
      />

      <form autoComplete="off" className="flex flex-col md:flex-row gap-8">
        <div className=" flex flex-col w-full md:w-[45%]">
          {/* shop Name */}
          <label htmlFor="shopName" className="labels">
            Shop Name
          </label>
          <input
            autoComplete="off"
            onChange={handleChange}
            value={shopName}
            required
            type="text"
            id="shopName"
            className="inputs"
          />
          {/* location */}
          <label htmlFor="location" className="labels">
            Location
          </label>
          <input
            autoComplete="off"
            onChange={handleChange}
            required
            value={location}
            type="text"
            id="location"
            className="inputs"
          />
          {/* shop email */}
          <label htmlFor="email" className="labels">
            Shop email
          </label>
          <input
            autoComplete="off"
            onChange={handleChange}
            value={email}
            required
            type="text"
            id="email"
            className="inputs"
          />
          <p className="text-red-20">{mailError}</p>
          {/* Phone Number */}
          <label htmlFor="phone" className="labels">
            Shop Telephone
          </label>
          <PhoneInput
            autoComplete="off"
            country={"us"}
            value={phone}
            required={true}
            onChange={handlePhoneChange}
            className="inputs"
          />
          {/* text area */}
          <label htmlFor="desc" className="labels">
            Description
          </label>
          <textarea
            autoComplete="off"
            onChange={handleChange}
            value={desc}
            required
            rows={5}
            cols={50}
            id="desc"
            className="textarea"
          />
        </div>

        {/* second col */}
        <div className="flex flex-col justify-end w-full md:w-[45%] gap-8 ">
          <ImageUpload setImg={setImg} oldImg={img} />
          {renderSpinner(load || fileLoad)}
          {/* button */}
          <div className="flex w-full flex-row justify-between lg:justify-center lg:gap-24 ">
            <button
              onClick={handleSubmit}
              type="button"
              disabled={load || fileLoad || mailError.length > 0}
              className="blue-btn"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setOpenDelete(true)}
              disabled={load}
              className="red-outline-btn"
            >
              Close shop
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditShop;
