import { ShowStore } from "modules/Live/store/ShowStore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import useSpinner from "shared/components/spinner/useSpinner";
import Stepper from "shared/components/Stepper";
import useFetch from "shared/hooks/useFetch";
import { user } from "shared/recoil/user";
import Details from "./Details";
import Images from "./Images";
import Payment from "./Payment";

const Three = () => {
  let steps = ["Tokshow", "Product", "Get paid"];
  const [store, setStore] = useRecoilState(ShowStore);
  const { _id } = useRecoilValue(user);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const { getObject, mongoErr, load } = useFetch();
  const { renderSpinner } = useSpinner();
  const resetStore = useResetRecoilState(ShowStore);


  const handleCreate = async () => {
    if (store.now) {
      navigate("/live/show");
    } else {
      let room = await getObject(`rooms/${_id}`, "POST", {
        title: store.title,
        token: "",
        event: true,
        eventDate: new Date(`${store.date}:${store.time}`).getTime(),
        productIds: [store.product.id],
        hostIds: [_id],
        userIds: [],
        raisedHands: [],
        speakerIds: [],
        invitedIds: [],
        shopId: store.product.shopId,
        status: true,
        productPrice: store.product.price,
        productImages: store.product.images,
      });
      if (room) {
        navigate("/");
        resetStore();
      }
    }
  };

  return (
    <div className="flex flex-col w-full  mt-10 gap-6 px-4 py-10">
      <Stepper number={2} steps={steps} />
      <div className="flex flex-col gap-10 items-center lg:justify-center mt-6">
        <div className="flex w-full lg:w-1/2">
          <Details setDone={setDone} />
        </div>

        <div className="flex flex-col w-full lg:w-1/2 gap-10">
          <Images setDone={setDone} />
          <Payment setDone={setDone} />
        </div>
      </div>
      {renderSpinner(load)}

      <div className="flex w-full lg:w-1/3 self-center max-w-sm justify-between items-center gap-10">
        <button
          disabled={load}
          onClick={() => {
            navigate("/live/two");
          }}
          className="red-outline-btn w-32 "
        >
          Previous
        </button>

        <button disabled={load} onClick={handleCreate} className="blue-btn ">
          {store.now ? " Create Show" : "Save event"}
        </button>
      </div>
    </div>
  );
};

export default Three;
