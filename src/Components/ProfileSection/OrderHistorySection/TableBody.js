import React from "react";

const TableBody = ({ title, date, price, status }) => {
  return (
    <>
      <div className="flex justify-between items-center pb-2 border-b border-neutral-200 ">
        <span className="w-1/4">{title}</span>
        <span className="w-1/4">{date}</span>
        <span className="w-1/4">
          {price}
          تومان
          </span>
        <span className={`w-fit float-left p-2 rounded-md  ${status === 0 ? "text-lime-600" : "text-red-600"}`}>
          {status === 0 ? "پرداخت شده" : "پرداخت نشده"}
        </span>
      </div>
    </>
  );
};

export default TableBody;
