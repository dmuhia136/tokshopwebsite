import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full h-[4rem] w-[4rem] border-b-[0.2rem] 
       border-green-40"
      ></div>
    </div>
  );
};

export default Loading;
