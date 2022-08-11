import React from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartAtom, cartOpen } from "shared/recoil/cart";
import "../styles/cart.css";

const Cart = () => {
  const {  totalValue } = useCart();
  const cartValue = useRecoilValue(cartAtom);
  const setOpenCart = useSetRecoilState(cartOpen);
  let navigate = useNavigate();

  return (
    <div className="w-[70vw] md:w-[30vw] lg:w-[20vw] flex flex-col px-[0.5rem] py-[2rem] gap-y-[0.5rem] bg-[#eff7f6]  min-h-screen">
      <div
        className="flex flex-col gap-y-4 md:gap-y-[2rem] max-h-[60vh] lg:max-h-[50vh] 
            overflow-y-scroll  px-[0.8rem] md:px-[0.8rem] py-[2rem] border-t-2 "
      >
        {cartValue.length > 0 ? (
          cartValue?.map((item: any, key: number) => (
            <CartItem
              image={item?.image}
              name={item.name}
              price={item.price}
              amount={item.quantity}
              id={item.id}
              key={key}
              productId={item?.productId}
            />
          ))
        ) : (
          <div
            className="flex flex-row self-center items-center py-[3rem] gap-x-[2rem]
                  px-[2rem]"
          >
            <p className="text-red-20 font-[700] text-[1rem] md:text-[1rem]">
              Your cart is empty.
            </p>
          </div>
        )}
      </div>

      {cartValue.length > 0 ? (
        <div className=" mt-auto mb-4">
          <div className="flex flex-row md:text-[1rem] justify-between self-start">
            <p className="font-[500]">Estimated shipping &nbsp;&nbsp;</p>
            <p className="font-[600] text-blue-20">$. 0.00</p>
          </div>

          <div className="flex flex-row md:text-[1rem] justify-between self-start ">
            <p className="font-[500]">Estimated tax &nbsp;&nbsp;</p>
            <p className="font-[600] text-blue-20">$. 0.00</p>
          </div>

          <div
            className="flex flex-row md:text-[1rem] tracking-wider justify-between
                  self-start "
          >
            <p className="font-[500]">Estimated total &nbsp;&nbsp;</p>
            <p className="font-[600] text-blue-20 text-left">
              $. {isNaN(totalValue) ? 0 : totalValue}
            </p>
          </div>

          <button
            disabled={cartValue.length === 0}
            onClick={() => {
              setOpenCart((prev: boolean) => !prev);
              navigate(`/orders`);
            }}
            type="button"
            className="bg-blue-20 md:w-[40%] py-[0.4rem] px-[1rem] rounded-md self-start
                  hover:bg-blue-400 text-white text-[1.1rem] font-[500] 
                  disabled:bg-gray-300  my-[1.5rem]"
          >
            Checkout
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
