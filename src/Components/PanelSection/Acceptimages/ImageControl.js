import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import {
  ACCEPT_IMAGES_USER_ID,
  BASE_URL,
  SHOW_PROFILE_IMAGE,
} from "../../../Utils/ApiRoute/apiRoutes";
import callApi from "../../../Utils/callApi/callApi";
import notify from "../../../Utils/toast/notify";

const ImageControl = ({ name, srcImg, id, updater, imgId }) => {
  const [loader, setLoader] = useState(false);

  const acceptedImage = async () => {
    setLoader(true);

    const { data } = await callApi(
      ACCEPT_IMAGES_USER_ID + imgId,
      true,
      "{}",
      "get"
    );
    if (data.ok) {
      notify(data.message, "success");
      updater();
    } else {
      notify(data.message, "success");
    }

    setLoader(false);
  };

  return (
    <div className="p-3 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 ">
      <div className="rounded-lg shadow-lg bg-white w-full overflow-hidden">
        <div className="w-full h-[250px] relative">
          <Image
            src={`${BASE_URL}${SHOW_PROFILE_IMAGE}${imgId}`}
            alt="user image profile"
            fill
            className="!object-cover"
          />
        </div>
        <div className="p-2 md:p-6 flex flex-col  ">
          <h5 className="text-gray-900 text-xl mb-2">
            <Link href={`/user/${id}`}>نام و نام خانوادگی : {name}</Link>
          </h5>
          <div className="flex justify-around mt-2">
            <button
              type="button"
              className="inline-block px-6 py-3 bg-indigo-600 text-white text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={acceptedImage}
            >
              {loader ? <CircularProgress size={20} /> : "تایید کردن"}
            </button>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-red-600 text-white text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
            >
              {loader ? <CircularProgress size={20} /> : "رد کردن"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageControl;
