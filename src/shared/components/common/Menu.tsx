import {
  faUser,
  faArrowRightFromBracket,
  faWallet,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { user } from "shared/recoil/user";

interface Props {
  setMenuOpen: any;
}

const Menu: React.FC<Props> = ({ setMenuOpen }) => {
  let navigate = useNavigate();
  let { token } = useRecoilValue<any>(user);
  const resetStore = useResetRecoilState(user);

  return (
    <div
      className="flex flex-col bg-[#eff7f6] min-h-screen gap-y-8 px-8 pt-6 pb-16 w-[68vw]
	  lg:w-[20vw] items-center"
    >
      <div className="flex flex-col  border-gray-400 w-full gap-6">
        {token?.length > 0 ? null : (
          <div className="flex flex-col w-full items-center pb-4 gap-2 border-b-[1px]">
            <button
              onClick={() => navigate("/login")}
              className="bg-black-40 text-white px-6 py-[1px] rounded-md w-1/2"
            >
              Sign in
            </button>
            <p
              onClick={() => navigate("/register")}
              className="text-black-40 font-semibold cursor-pointer"
            >
              New user? <span className="text-blue-40">Sign up</span>
            </p>
          </div>
        )}

        <div className="flex flex-col w-full items-start pb-4 gap-4">
          <div
            className="flex flex-row cursor-pointer items-start gap-x-[1rem]"
            onClick={() => {
              navigate(`/myAccount/profile`);
              setMenuOpen(false);
            }}
          >
            <FontAwesomeIcon
              icon={faUser}
              color="#33546D"
              className="text-[1rem] self-center"
            />
            <p className="text-[1.4rem] font-[500] text-gray-20">My Account</p>
          </div>
          <div
            className="flex flex-row cursor-pointer items-start gap-x-[1rem]"
            onClick={() => {
              navigate(`/live`);
              setMenuOpen(false);
            }}
          >
            <FontAwesomeIcon
              icon={faVideo}
              color="#33546D"
              className="text-[1rem] self-center"
            />
            <p className="text-[1.4rem] font-[500] text-gray-20">Go live</p>
          </div>
          <div
            onClick={() => {
              setMenuOpen(false);
              navigate("/wallet");
            }}
            className="flex flex-row cursor-pointer items-start gap-x-[1rem]"
          >
            <FontAwesomeIcon
              icon={faWallet}
              color="#33546D"
              className="text-[1rem] self-center"
            />
            <p className="text-[1.4rem] font-[500] text-gray-20">Wallet</p>
          </div>
          {token?.length > 1 && (
            <div
              onClick={() => {
                setMenuOpen(false);
                resetStore();
                navigate("/");
              }}
              className="flex flex-row cursor-pointer items-start gap-x-[1rem] "
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="text-[1rem] self-center"
                color="#F40009"
              />
              <p className="text-[1.4rem] font-[600] text-red-20">Logout</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
