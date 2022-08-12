import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShowStore } from "modules/Live/store/ShowStore";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Details: React.FC<{
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setDone }) => {
  const [POD, setPOD] = useState(false);
  const [local, setLocal] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<any>("");
  const [category, setCategory] = useState("");
  const [mpesa, setMpesa] = useState<any>("");
  const setStore = useSetRecoilState(ShowStore);
  const store = useRecoilValue(ShowStore);

  const handleSubmit = () => {
    setStore((prev) => {
      return {
        title: prev.title,
        description: prev.description,
        avatar: prev.avatar,
        product: prev.product,
        time: prev.time,
        date: prev.date,
        cod: POD,
        mpesa: mpesa,
        pay: prev.pay,
        roomId: prev.roomId,
        now: prev.now,
      };
    });
  };

  // useEffect(() => {
  //   if (mpesa?.length > 1) {
  //     setDone(true);
  //   } else {
  //     setDone(false);
  //   }
  // }, [mpesa]);

  useEffect(() => {
    setName(store.product.name);
    setPrice(store.product.price);
    setMpesa(store.mpesa);

    return () => {
      handleSubmit();
    };
  }, []);

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <p className="text-black-70 text-xl font-medium self-start">
        Product details
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col flex-wrap w-full  gap-8"
      >
        <input
          disabled
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Product name"
          className="inputs w-full "
        />
        <div className="flex flex-col w-full  gap-4">
          <div className="flex relative">
            <input
              disabled
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Price"
              className="inputs inputs w-full px-6"
            />
            <FontAwesomeIcon
              icon={faDollarSign}
              className="absolute top-1/2 left-2 
            -translate-y-1/2"
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <p className="text-xs md:text-lg">
              Total:{" "}
              <span className="text-red-20 font-semibold">
                ${(0.96 * price).toFixed(2)}
              </span>
            </p>
            <p className="text-xs md:text-lg">
              Commission:{" "}
              <span className="text-red-20 font-semibold">
                ${(0.04 * price).toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        {/* <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="inputs w-full "
          placeholder="Category"
        >
          <option value="volvo" defaultChecked>
            Category
          </option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
        </select> */}
        <div className="flex flex-col w-full ">
          <p className="text-base font-semibold">Allow cash on delivery</p>
          <div className="flex items-center gap-2">
            <input
              checked={!POD}
              onChange={() => setPOD((prev: boolean) => !prev)}
              type="radio"
              name=""
              id="cash"
              className=""
            />
            <label htmlFor="cash" className="">
              No
            </label>
            <input
              checked={POD}
              onChange={() => setPOD((prev: boolean) => !prev)}
              type="radio"
              name=""
              id="cash2"
              className=" ml-8"
            />
            <label htmlFor="cash2" className="">
              Yes
            </label>
          </div>
        </div>
{/*   
          <div className="flex w-full ">
            <button
              type="button"
              className="bg-red-20 hover:bg-red-600 rounded-md  px-4 py-2 text-white 
            h-[2.25rem]"
            >
              Connect payout details
            </button>
          </div> */}
    
      </form>
    </div>
  );
};

export default Details;
