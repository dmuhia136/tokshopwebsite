import { ShowStore } from "modules/Live/store/ShowStore";
import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import Stepper from "shared/components/Stepper";
import LiveProduct from "./LiveProduct";
import Time from "./Time";

const Two = () => {
  let steps = ["Tokshow", "Product", "Get paid"];

  const [now, setNow] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [store, setStore] = useRecoilState(ShowStore);
  
  const handleNext = () => {
    setStore((prev) => {
      return {
        title: prev.title,
        description: prev.description,
        avatar: prev.avatar,
        product: prev.product,
        time: `${time}`,
        date: `${date}`,
        cod: prev.cod,
        mpesa: prev.mpesa,
        pay: prev.pay,
        roomId: prev.roomId,
        now: now,
      };
    });
  };

  useEffect(() => {
    handleNext();
   
  }, [now,date,time]);

  return (
    <div className="flex flex-col  w-full items-center mt-10 gap-6 px-10">
      <Stepper number={1} steps={steps} />
      <div className="flex flex-col items-center w-fu gap-10 py-10 lg:px-60 self-center">
        <Time
          time={time}
          setTime={setTime}
          date={date}
          setDate={setDate}
          now={now}
          setNow={setNow}
        />
        <LiveProduct />
      </div>
    </div>
  );
};

export default Two;
