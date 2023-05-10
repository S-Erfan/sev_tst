import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { BASE_URL, SHOW_PROFILE_IMAGE } from "../../Utils/ApiRoute/apiRoutes";

const UserAvatar = ({ name, image, lastTxt, date, msg }) => {
  return (
    <>
      <div className="w-full p-3 flex justify-between items-start gap-x-4 transition duration-300 ease-in hover:bg-violet-100 cursor-pointer">
        <div className="w-[60px] h-[60px]">
          {image === "undefined" ? (
            <UserCircleIcon className="w-[60px] h-[60px] text-neutral-500 " />
          ) : (
            <Image
              alt="profile user"
              className="w-full h-full object-cover rounded-[50%]"
              src={`${BASE_URL}${SHOW_PROFILE_IMAGE}${image}`}
              width={150}
              height={150}
            />
          )}
        </div>
        <div className="flex-1 flex flex-col justify-start gap-1 py-1">
          <h3 className="text-md ">{name}</h3>
          <p className="text-sm text-neutral-500 show_1_line">{lastTxt}</p>
        </div>
        <div className="w-fit flex flex-col justify-start gap-4 items-end ">
          <span
            className={`text-xs text-neutral-500 ${
              date === "Invalid Date" ? "hidden" : ""
            }`}
          >
            {date}
          </span>
          {msg > 0 && (
            <span className="w-[20px] h-[20px] p-2 bg-violet-500 rounded-[50%] text-white flex justify-center items-center float-left text-[8px] ">
              {msg}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default UserAvatar;
