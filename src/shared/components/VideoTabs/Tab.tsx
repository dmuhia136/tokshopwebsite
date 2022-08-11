import { faCaretLeft, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { user } from "shared/recoil/user";
import Chat from "./Chat";
import Details from "./Details";
import Shop from "./Shop";

interface Props {
  room: any;
}

const Tab: React.FC<Props> = ({ room }) => {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(true);
  const { _id } = useRecoilValue<any>(user);

  return (
    <div className="overflow-clip ">
      <FontAwesomeIcon
        icon={!open ? faCaretLeft : faTimesCircle}
        onClick={() => setOpen((prev) => !prev)}
        className={`${open ? "text-red-500" : "text-blue-40"}  z-50 fixed hidden
        lg:block right-4 text-4xl top-16`}
      />

      {open && (
        <div className="flex flex-col  lg:w-[700px]  lg:max-w-md lg:min-h-[90vh] bg-white py-4 px-8 z-10">
          {/* top tabs */}
          <div className="flex w-full sticky top-16 z-20">
            <div
              onClick={() => setTab(0)}
              className={`${tab === 0 ? "border-b-2 border-blue-40" : ""}
          flex w-1/3 items-center justify-center py-2 cursor-pointer`}
            >
              Chat
            </div>
            <div
              onClick={() => setTab(1)}
              className={`${tab === 1 ? "border-b-2 border-blue-40" : ""}
          flex w-1/3 items-center justify-center py-2 cursor-pointer`}
            >
              Details
            </div>
            {room?.ownerId?._id !== _id && (
              <div
                onClick={() => setTab(2)}
                className={`${tab === 2 ? "border-b-2 border-blue-40" : ""}
                flex w-1/3 items-center justify-center py-2 cursor-pointer`}
              >
                Shop
              </div>
            )}
          </div>

          {/* content tabs */}
          {room !== undefined && (
            <div className="flex flex-col">
              {tab === 0 ? (
                <Chat id={room?._id} />
              ) : tab === 1 ? (
                <Details
                  title={room?.title}
                  host={room?.ownerId?.userName}
                  desc={room?.description}
                  img={room?.productImages[0]}
                />
              ) : (
                <>
                  {room?.ownerId?._id !== _id && (
                    <Shop
                      productID={room.productIds[0]._id}
                      img={room?.productImages[0]}
                      title={room?.title}
                      price={room?.productPrice}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tab;
