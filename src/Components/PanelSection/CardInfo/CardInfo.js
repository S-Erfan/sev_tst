import React from "react";

const CardInfo = ({ icon, number, title }) => {
  return (
    <>
      <div
        className={`rounded-md shadow-md shadow-neutral-300 flex items-center p-[1rem] `}
      >
        <div className="w-[70px] h-[70px]">{icon}</div>
        <div className="flex-1 flex justify-center items-center flex-col gap-2 " >
          <span className="text-3xl" >{number}</span>
          <span className="text-base opacity-60" >{title}</span>
        </div>
      </div>
    </>
  );
};

export default CardInfo;
