import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import SubscriptVec from "../../../public/images/planP.png";
import MainBtn from "../Shared/MainBtn/MainBtn";

const SubscriptSection = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="container mx-auto mt-[8rem] mb-4">
        <div className="flex flex-col justify-evenly items-center mx-auto ">
          <div className="flex flex-col items-center w-[85%] sm:w-[95%] md:w-[350px] ">
            <Image
              alt="SubscriptSection vector"
              src={SubscriptVec}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className="drop-shadow-xl rounded-lg mx-auto"
            />
            <div className="mt-10 text-center ">
              <h2 className="text-3xl mb-3 ">تخفیف ویژه خرید اشتراک </h2>
              <p className="text-sm">تخفیف 30 درصدی و 15 روز هدیه</p>
            </div>
          </div>
          <div className="flex flex-col w-full justify-center items-center ">
            <h5 className="text-md text-center">
              به هر کس که دوست دارید به تعداد دلخواه پیام بدهید یا
              <br />
              با تبلیغ اکانت خود را در صفحه بقیه اعضا بالا ببرید
            </h5>
            <Link href={"/subscriptions"}>
              <button className="btn-main mt-2 ">خرید اشتراک</button>
            </Link>
            {!user.loginStatus && (
              <div className="flex flex-row gap-x-8 w-100 mt-10 w-full items-center justify-center px-2 ">
                <div className="w-[160px] ">
                  <Link href={"/login"}>
                    <button className="btn-sec ">ورود</button>
                  </Link>
                </div>
                <div className="w-[160px]">
                  <Link href={"/signup"}>
                    <button className="btn-main w-50">عضویت</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptSection;
