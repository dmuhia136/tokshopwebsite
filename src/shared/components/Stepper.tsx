import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  number: number;
  steps: string[];
}

const Stepper: React.FC<Props> = ({ number, steps }) => {
  return (
    <div className="flex flex-row text-black-70 items-center self-center">
      {steps.map((step: string, index: number) => (
        <div key={index} className="flex text-black-70 items-center w-full">
          <div
            className={`${
              number >= index
                ? "border-black-40 text-black-40 "
                : "border-gray-400 text-gray-400"
            } relative  border-2 w-6 h-6 flex rounded-full items-center bg-white`}
          >
            {number > index ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="w-5 h-5 text-blue-40 text-2xl"
              />
            ) : null}
            <p className="absolute -top-6 right-1/2 translate-x-1/2 w-16">{step}</p>
          </div>
          <div
            className={`${
              index === steps.length-1
                ? "hidden"
                : "flex h-0.5 w-10 425:w-20 md:w-44 bg-gray-400"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default Stepper;
