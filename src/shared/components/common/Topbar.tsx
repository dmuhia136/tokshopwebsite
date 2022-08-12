import {
  faBars,
  faCartShopping,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useSearch from "shared/hooks/useSearch";
import { cartAtom, cartOpen } from "shared/recoil/cart";
import { menuOpen } from "shared/recoil/menu";
import { searchInput } from "shared/recoil/search";
import { user } from "shared/recoil/user";

const Topbar = () => {
  const [searching, setSearching] = useState<boolean>(false);
  let navigate = useNavigate();
  const setSearch = useSetRecoilState(searchInput);
  const setCartOpen = useSetRecoilState(cartOpen);
  const setMenuOpen = useSetRecoilState(menuOpen);
  const cart = useRecoilValue<any>(cartAtom);
  let { userName, token, wallet } = useRecoilValue<any>(user);
  const { handleChange, input, setInput } = useSearch();

  let number = cart.length;

  return (
    <div
      className="flex  px-[0.8rem] md:px-[2rem] lg:px-[4rem] py-3 items-center
      justify-center gap-6 md:gap-10 lg:gap-10"
    >
      <p
        onClick={() => {
          navigate("/");
        }}
        className={`${
          searching ? "hidden md:inline" : "inline"
        } text-blue-40 text-[1.6rem] font-semibold cursor-pointer md:text-2xl md:font-medium`}
      >
        <span className="text-black-40">tok</span>shop
      </p>
      <div
        onFocus={() => {
          setSearching(true);
          navigate("/searching");
        }}
        onBlur={() => {
          setSearch("");
          setInput("");
          setSearching(false);
        }}
        className={`${
          searching
            ? "w-screen md:w-[40%] lg:w-[55%] xl:w-[55%]"
            : "w-2/4 md:w-[40%] lg:w-[55%] xl:w-[55%]"
        } flex h-[35px] border-[1px] border-gray-400 p-0 rounded-md relative pr-2
          items-center focus:outline-none justify-between group overflow-x-clip`}
      >
        <input
          type="text"
          placeholder="Search TokShop"
          onChange={handleChange}
          value={input}
          className="w-full outline-none ring-0 p-2 placeholder:text-gray-30 placeholder:font-light"
        />
        <FontAwesomeIcon
          icon={faTimesCircle}
          onClick={() => {
            setSearch("");
            setInput("");
            setSearching(false);
            navigate("/");
          }}
          className={`${
            searching ? "inline" : "hidden"
          }  text-gray-500 text-[1.2rem] justify-self-end ml-auto`}
        />
      </div>
      <button
        onClick={() => navigate("/live")}
        className={`${
          searching ? "hidden md:inline" : "hidden md:inline"
        } bg-red-20 text-white md:text-sm
        rounded-md text-base px-6 md:px-4 py-[1px] md:py-[4px] font-semibold hover:shadow-lg 
        hover:bg-red-600`}
      >
        Go live
      </button>
      <button
        onClick={() => navigate("/login")}
        className={`${
          token === undefined ? "hidden md:inline" : "hidden"
        }  text-blue-40 border-[1px] border-blue-40 px-6 py-[1px] rounded-md text-base font-semibold items-center  hover:bg-blue-40 hover:text-white
        transition-all duration-150 ease-in-out delay-100`}
      >
        Sign in
      </button>
      <p
        className={`${
          token !== undefined ? "hidden lg:inline" : "hidden"
        }  text-blue-40 text-sm font-semibold`}
      >
        Hello🖐 $. {wallet}
      </p>
      <div
        onClick={() => {
          setCartOpen((prev: boolean) => !prev);
          setMenuOpen((prev: boolean) => (prev ? !prev : prev));
        }}
        className={`${
          searching ? "hidden md:inline" : "inline"
        } relative flex items-center p-0`}
      >
        <FontAwesomeIcon
          icon={faCartShopping}
          className="text-blue-40 text-xl font-light self-center"
        />

        <div
          className="absolute bg-blue-40 text-[0.7rem] font-[500] left-2/3 top-[-20%] 
          w-[1.2rem] h-[1.2rem] rounded-full text-white flex justify-center items-center"
        >
          {number}
        </div>
      </div>
      <FontAwesomeIcon
        onClick={() => {
          setMenuOpen((prev: boolean) => !prev);
          setCartOpen((prev: boolean) => (prev ? !prev : prev));
        }}
        icon={faBars}
        className={`${
          searching ? "hidden md:inline" : "inline"
        } text-blue-40 text-2xl `}
      />
    </div>
  );
};

export default Topbar;
