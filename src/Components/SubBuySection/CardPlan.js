import React from "react";
import styles from "./styleInp.module.css";

const CardPlan = ({ title, desc1, desc2, price, value, onChange, name, idLab, val }) => {
  return (
    <>
      <div className="w-[95%] mx-auto md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col p-5 ">
        <label
          htmlFor={idLab}
          className={"relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer " + styles.container}
        >
          <h6 className="font-semibold text-xl text-neutral-900 leading-tight text-center mb-3">
           {title}
          </h6>
          <div className="font-normal text-neutral-500 my-3 ">
            <p className="text-lg">{desc1}</p>
            <span className="text-lg">{desc2}</span>
          </div>
          <span className="font-normal text-neutral-900 text-left ">
            <span className="text-2xl">{price}</span>
            <span className="text-xl uppercase">تومان</span>
          </span>
          <input
            type="radio"
            name={name}
            id={idLab}
            value={value}
            onChange={(e) => onChange(e, title, price, val)}
            className="absolute h-10 w-10 appearance-none"
          />
          <span
            aria-hidden="false"
            className=" absolute transition duration-150 inset-0 border-2 opacity-0 border-green-500 bg-neutral-400 bg-opacity-10 rounded-lg"
          >
            <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-green-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </span>
        </label>
      </div>
    </>
  );
};

export default CardPlan;
