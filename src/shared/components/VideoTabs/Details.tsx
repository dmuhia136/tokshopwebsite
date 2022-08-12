import React from "react";

interface Props {
  title: string;
  host: string;
  desc: string;
  img: string;
}

const Details: React.FC<Props> = ({ title, host, desc, img }) => {
  return (
    <div className="flex flex-col gap-4 w-full px-4 py-8 lg:min-w-[25rem]">
      <div className="flex gap-4">
        <img src={img} alt="" className="h-20 w-20  p-2 rounded-full" />{" "}
        <div className="flex flex-col gap-2 ">
          <p className="text-black-40  text-lg md:text-2xl font-semibold">
            {title}
          </p>
          <p className="text-black-40 text-sm">by {host}</p>
        </div>
      </div>
      <hr className="h-[1px] bg-gray-400" />
      <div className="flex">
        <p className="text-black-40 text-sm tracking-wide">{desc}</p>
      </div>
    </div>
  );
};

export default Details;
