import { ShowStore } from "modules/Live/store/ShowStore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

const Payment: React.FC<{
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setDone }) => {
  const [pay, setPay] = useState(false);
  const [amount, setAmount] = useState<any>(0);
  const navigate = useNavigate();
  const [store,setStore ]= useRecoilState(ShowStore);

  const handleSubmit = () => {
    setStore((prev) => {
      return {
        title: prev.title,
        description: prev.description,
        avatar: prev.avatar,
        product: prev.product,
        time: prev.time,
        date: prev.date,
        cod: prev.cod,
        mpesa: prev.mpesa,
        pay: amount,
        roomId: prev.roomId,
        now: prev.now,
      };
    });
    navigate("/live/show");
  };

  return (
    <div className="flex flex-col w-full items-center">
      <p className="text-black-70 text-xl  font-medium mb-4 self-start">
        Pay-to-Watch{" "}
        <span className="text-blue-40">
          {"("}optional{")"}
        </span>
      </p>
      <p className="text-sm">
        If enabled, charge viewers a fee to watch your show. Or you can keep it
        free to watch, but you must sell a product in your show.
      </p>
      <form
        className="flex flex-col  self-start gap-4 mt-6"
        // onSubmit={handleSubmit}
      >
        <div className="flex gap-6  w-full justify-cent h-8 items-center">
          <input
            onChange={() => setPay((prev: boolean) => !prev)}
            id="pay"
            type="checkbox"
            checked={pay}
            className="self-center "
          />
          <label htmlFor="pay self-center">Pay to view</label>
        </div>
      </form>
      {pay ? (
        <form className="flex self-start mt-8 items-center gap-6">
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            id="pay"
            placeholder="enter amount"
            className="py-1 px-4 focus:outline-none ring-1 ring-red-20 focus:ring-black-70 rounded-md"
          />
          <p className="text-lg ">
            Total:{" "}
            <span className="text-red-20 font-semibold">
              ${(0.96 * amount).toFixed(2)}
            </span>
          </p>
          <p className="text-lg ">
            Commission:{" "}
            <span className="text-red-20 font-semibold">
              ${(0.04 * amount).toFixed(2)}
            </span>
          </p>
        </form>
      ) : null}
    </div>
  );
};

export default Payment;
