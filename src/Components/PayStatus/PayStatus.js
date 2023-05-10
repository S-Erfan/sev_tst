import Image from "next/image";
import Link from "next/link";
import React from "react";

const PayStatus = ({ status, title, srcImg, route, order }) => {
  return (
    <>
      <section className="container mx-auto h-full mt-2 grid place-items-center ">
        <h1 className="text-neutral-600 text-2xl text-center">{title}</h1>
        <div className="w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] xl:w-[35vw] xl:h-[35vw] mx-auto relative ">
          <Image
            alt="status pay || وضعیت پرداخت"
            src={srcImg}
            className={
              "w-[100%] h-[100%] object-cover drop-shadow-[0_10px_5px_rgba(0,0,0,0.35)] "
            }
            fill
          />
        </div>
        {order && (
          <div className="text-center">
            <span className="border rounded-lg shadow-lg py-4 px-4">
              {order}
            </span>
          </div>
        )}
        <div className="text-center">
          <Link className="btn-main py-4 px-4" href={route}>
            {status}
          </Link>
        </div>
      </section>
    </>
  );
};

export default PayStatus;
