import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShowStore } from "modules/Live/store/ShowStore";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface Props {
  date: string;
  now: boolean;
  time: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setNow: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

const Time: React.FC<Props> = ({
  date,
  time,
  now,
  setDate,
  setTime,
  setNow,
}) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <p className="text-black-70 text-xl font-medium lg:ml-16">
        When do you want to go live?
      </p>
      <form className="flex flex-col items-start lg:items-start lg:px-20 gap-4">
        <div className="flex gap-4 items-center">
          <input
            checked={now}
            onChange={() => setNow((prev: boolean) => !prev)}
            type="radio"
            name=""
            id="now"
          />
          <label htmlFor="now">Now</label>
        </div>
        <div className="flex gap-4 items-center">
          <input
            checked={!now}
            onChange={() => setNow((prev: boolean) => !prev)}
            type="radio"
            name=""
            id="later"
          />
          <label htmlFor="later">Later</label>
        </div>
      </form>
      <form
        className={`${
          now ? "hidden" : "flex flex-col items-start lg:px-20 gap-4"
        } `}
      >
        <input
          onChange={(evt) => setDate(evt.target.value)}
          value={date}
          required
          type="date"
          className="inputs w-full"
        />
        <input
          onChange={(evt) => setTime(evt.target.value)}
          value={time}
          required
          type="time"
          className="inputs w-full"
        ></input>
      </form>
    </div>
  );
};

export default Time;
