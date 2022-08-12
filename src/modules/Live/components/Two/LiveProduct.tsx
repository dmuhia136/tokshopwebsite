import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useFetch from "shared/hooks/useFetch";
import { user } from "shared/recoil/user";
import useSpinner from "shared/components/spinner/useSpinner";
import { useNavigate } from "react-router-dom";
import { ShowStore } from "modules/Live/store/ShowStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const LiveProduct = () => {
  const { data, getObject, load } = useFetch();
  const [old, setOld] = useState(true);
  const [hasProduct, setHasProduct] = useState<any>(null);
  const { _id } = useRecoilValue<any>(user);
  const { renderSpinner } = useSpinner();
  const navigate = useNavigate();
  const setStore = useSetRecoilState(ShowStore);

  useEffect(() => {
    getObject(`products/get/all/${_id}`, "GET", {});
  }, []);

  return (
    <div className="flex flex-col w-full  gap-6">
      <p className="text-black-70 text-xl font-medium lg:ml-16">
        Add a product to your room
      </p>
      {renderSpinner(load)}
      <form
        className="flex flex-col items-start lg:items-start lg:px-20 gap-4"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="flex gap-4 items-center">
          <input
            type="radio"
            name=""
            id="free"
            checked={old}
            onChange={() => setOld((prev: boolean) => !prev)}
          />
          <label htmlFor="free">Add a product from your shop</label>
        </div>

        <div className="flex w-full flex-wrap flex-shrink-0 gap-4">
          {data?.map((prod: any, index: number) => (
            <div
              onClick={() => {
                setHasProduct(index);
                setStore((prev) => {
                  return {
                    title: prev.title,
                    description: prev.description,
                    avatar: prev.avatar,
                    product: {
                      name: prod.name,
                      id: prod._id,
                      price: prod.price,
                      images: prod.images,
                      shopId: prod.shopId._id,
                    },
                    time: prev.time,
                    date: prev.date,
                    cod: prev.cod,
                    mpesa: prev.mpesa,
                    pay: prev.pay,
                    roomId: prev.roomId,
                    now: prev.now,
                  };
                });
              }}
              key={index}
              className="flex flex-col shadow-lg px-4 py-2 rounded-md cursor-pointer h-32 w-32 relative"
            >
              <img
                src={prod?.images?.length > 0 ? prod?.images[0] : "/img/picture.png"}
                alt=""
                className=" object-contain h-20 w-20"
              />
              <p className="text-base text-blue-40 font-semibold">
                {prod?.name}
              </p>
              {hasProduct === index && (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-blue-40 z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl"
                />
              )}
            </div>
          ))}
        </div>

        <div
          onClick={() => navigate("/myAccount/shops")}
          className="flex gap-4 items-center"
        >
          <input
            type="radio"
            name=""
            id="pay"
            checked={!old}
            onChange={() => setOld((prev: boolean) => !prev)}
          />
          <label htmlFor="pay">Create a new product</label>
        </div>
      </form>

      <div className="flex self-center gap-10">
        <button
          onClick={() => {
            navigate("/live");
          }}
          className="red-outline-btn w-32 self-center"
        >
          Previous
        </button>
        <button
          disabled={hasProduct === null}
          onClick={() => {
            navigate(`/live/three`);
          }}
          className="blue-btn w-32 self-center"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LiveProduct;
