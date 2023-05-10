import {
  DevicePhoneMobileIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const UserCardRow = ({ nameUser, phone, age }) => {
  return (
    <>
      <div className="w-full cursor-pointer mx-auto flex justify-evenly items-center gap-x-2 md:gap-x-8 px-4 py-2 transition duration-150 rounded-lg hover:bg-violet-200 shadow-lg shadow-neutral-300 ">
        <div className="w-[50px] h-[50px] hidden md:block">
          <UserCircleIcon className="w-full h-full" />
        </div>
        <span className="text-xs md:text-base">{nameUser}</span>
        <span className="text-xs md:text-base">{age} ساله</span>
        <span className="flex gap-2 text-xs md:text-base">
          <HomeIcon className="w-[25px] h-[25px] hidden sm:inline" />
          تهران - تهران
        </span>
        <span className="flex gap-2 text-xs md:text-base">
          <DevicePhoneMobileIcon className="w-[25px] h-[25px] hidden sm:inline " />
          {phone}
        </span>
      </div>
    </>
  );
};

export default UserCardRow;
