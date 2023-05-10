import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toPriceFormater } from "../../../Utils/helper/helpers";
import TableBody from "./TableBody";

const orderData = [
  {
    id: 1,
    title: "دو ماهه + 15 روز هدیه",
    date: "1401/10/23",
    price: "75000",
    status: 0,
  },
  {
    id: 2,
    title: "دو ماهه + 15 روز هدیه",
    date: "1401/10/23",
    price: "75000",
    status: 1,
  },
  {
    id: 3,
    title: "تبلیغ یک ماهه",
    date: "1401/10/23",
    price: "75000",
    status: 1,
  },
];

const OrderHisSec = () => {
  return (
    <>
      <section className="container mx-auto sm:rounded-lg sm:shadow-lg shadow-neutral-400 p-2">
        <h1 className="text-neutral-700 text-2xl mt-4 flex justify-between items-center ">
          فاکتور و سابقه پرداخت
          <Link href={"/profile"} >
          <ChevronLeftIcon className="w-[30px] h-[30px] cursor-pointer " />
          </Link>
        </h1>
        <div className="w-full overflow-x-scroll relative customScrollDark">
          <div className="mt-4 p-4 flex flex-col gap-4 w-[768px] md:w-full  ">
            <div className="flex justify-between items-center border-b pb-2 border-neutral-600">
              <span className="w-1/4">اشتراک خریداری شده</span>
              <span className="w-1/4 px-4">تاریخ</span>
              <span className="w-1/4 px-4">قیمت</span>
              <span className="w-fit float-left px-4">وضعیت</span>
            </div>

            {orderData.map((item) => (
              <TableBody
                key={item.id}
                title={item.title}
                date={item.date}
                price={toPriceFormater(item.price)}
                status={item.status}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderHisSec;
