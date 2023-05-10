import Link from "next/link";
import React from "react";
import InputCustom from "../../Shared/InputCustom/InputCustom";

const ChangePassword = () => {
  return (
    <>
      <section className="container mx-auto ">
        <div className="sm:rounded-lg  sm:shadow-lg shadow-neutral-400/75 sm:bg-white p-4">
          <h3 className="border-b pb-2 border-neutral-400 text-2xl ">تغییر رمز عبور</h3>
          <div className="w-full md:w-1/2 mx-auto mt-[3rem]">
            <InputCustom
              label={"رمز عبور فعلی"}
              placeholder={""}
              idIn={"passLast"}
            />
          </div>
          <div className="w-full md:w-1/2 mx-auto mt-[3rem] flex flex-col md:flex-row items-center gap-4 ">
            <InputCustom
              label={"رمز عبور جدید"}
              placeholder={""}
              idIn={"newPass"}
            />
            <InputCustom
              label={"تکرار رمز عبور جدید"}
              placeholder={""}
              idIn={"confPass"}
            />
          </div>
            <div className="mt-[2rem] mb-8 flex justify-center items-center gap-2" >
                <button className="btn-main min-w-fit " >
                    ثبت رمز عبور
                </button>
                <Link href={"/profile"} >
                <button className="btn-sec min-w-fit " >
                    بازگشت
                </button>
                </Link>
            </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
