import Link from "next/link";
import React, { useEffect } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import HeaderP from "./HeaderP/HeaderP";
import { useSelector } from "react-redux";

const PanelLayout = ({ children, routeRender }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <HeaderP />
      <main className="w-[85%] md:w-[85%] h-screen bg-white overflow-x-hidden overflow-y-scroll customScrollDark absolute left-0 top-0 z-10  ">
        <nav className="fixed top-0 left-0 w-[85%] md:w-[85%] shadow-[0_6px_8px_0_#0004] px-8 py-3 bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 text-white flex justify-between items-center z-10">
          <div className="flex justify-start items-center gap-x-3">
            <div className="hidden md:inline">
              <UserCircleIcon className="w-[45px] h-[45px]" />
            </div>
            <div className="flex flex-col justify-start ">
              <span className="text-sm md:text-base">
                {user.info.firstName} {user.info.lastName}
              </span>
              <span className="text-xs md:text-md">
                {user.info.is_admin === 1 ? "مدیر" : "ادمین"}
              </span>
            </div>
          </div>
          <div>
            <Link
              className="flex items-center gap-2 text-sm md:text-base"
              href={"/"}
            >
              <span className="hidden md:inline ">بازگشت به سایت</span>
              <LogoutOutlinedIcon className="w-[25px] h-[25px]" />
            </Link>
          </div>
        </nav>

        <div className="mt-[100px] mb-[30px] px-[1rem] md:px-[3rem] flex items-center text-base md:text-xl">
          <h1 className="text-neutral-400">
            <Link href={"/"}>سایت/</Link>
          </h1>
          <h2 className="text-neutral-400">
            <Link href={"/panel"}>پنل مدیریت/</Link>
          </h2>
          <h4 className="cursor-default">{routeRender}</h4>
        </div>

        {/* this for render sections */}
        {children}
      </main>
    </>
  );
};

export default PanelLayout;
