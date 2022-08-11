import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  img: string;
  price: number;
  title: string;
  productID: string
}

const Shop: React.FC<Props> = ({ img, price, title, productID}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4  py-8 lg:min-w-[25rem]">
      <div className="flex flex-col">
        <p className="text-black-40 text-lg">Products</p>
        <p className="text-black-70 text-xs">Products available for purchase</p>
      </div>

      <div className="flex  w-full border-[1.2px] px-4 py-2 rounded-md gap-2 items-center">
        <img src={img} alt="" className="h-20 w-20  p-2 rounded-md" />
        <div className="flex flex-col gap-2">
          <p className="text-black-70  text-xs md:text-md font-semibold">
            {title}
          </p>
          <p className="text-red-20 ">${price}</p>
        </div>
        <button
        onClick={()=> navigate(`/product/${productID}`)}
          className="border-black-70 border-[1px] text-black-70 hover:bg-black-70 
        hover:text-white  w-44 px-4 py-2 h-10 rounded-lg"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Shop;
