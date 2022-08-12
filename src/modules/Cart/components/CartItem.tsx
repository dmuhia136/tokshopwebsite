import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

interface Props {
  image: string;
  name: string;
  amount: number;
  price: number;
  id: string;
  productId: string;
}

const CartItem: React.FC<Props> = ({
  image,
  name,
  amount,
  price,
  id,
  productId,
}) => {
  const { removeItem } = useCart();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        window.location.reload();
        navigate(`/product/${productId}`);
      }}
      className="flex flex-row flex-nowrap rounded-3xl py-[2rem] items-center
            space-x-[0.7rem] lg:justify-between w-full cursor-pointer"
    >
      {image?.length > 0 ? (
        <img
          src={image}
          alt=""
          className="flex w-[3rem] lg:w-[3rem] max-h-[5rem]"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/img/picture.png";
          }}
        />
      ) : (
        <img
          src="/img/picture.png"
          alt=""
          className="flex w-[3rem] lg:w-[3rem] max-h-[5rem]"
        />
      )}
      {/*.....................................rem.
            *
            ......................................*/}
      <div className="flex flex-col w-full flex-wrap">
        <p className="text-blue-20 md:text-[0.7rem] font-[800] capitalize truncate">
          {name}
        </p>
        <p className="text-black-80 md:text-[0.7rem] font-[600] tracking-wider">
          {amount} x $. {price}
        </p>
      </div>
      {/*......................................
               *
               ......................................*/}
      <FontAwesomeIcon
        onClick={() => removeItem(id)}
        icon={faTrash}
        color="red"
        className="md:text-[1rem] font-bold self-center"
      />
    </div>
  );
};

export default CartItem;
