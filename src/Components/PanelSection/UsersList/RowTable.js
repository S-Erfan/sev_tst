import { CircularProgress } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { DELETE_USER_ID } from "../../../Utils/ApiRoute/apiRoutes";
import callApi from "../../../Utils/callApi/callApi";
import notify from "../../../Utils/toast/notify";

const RowTable = ({ name, phone, userId, updater }) => {
  const [loader, setLoader] = useState(false);

  const deletedUser = async () => {
    setLoader(true);
    const { data } = await callApi(DELETE_USER_ID + userId, true, "{}", "get");
    if (data.ok) {
      notify(data.message, "success");
      updater();
    } else {
      notify(data.message, "error");
    }
    setLoader(false);
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm min-w-[185px]">
        <p className="text-gray-900 whitespace-no-wrap">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{phone}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link href={`/panel/users/userinfo/${userId}`}>
          <button className="relative inline-block px-3 py-1 text-white bg-indigo-600  rounded-lg leading-tight">
            اطلاعات کاربر
          </button>
        </Link>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        {loader ? (
          <CircularProgress size={20} />
        ) : (
          <button
            onClick={deletedUser}
            className="relative inline-block px-3 py-1 bg-red-500 rounded-lg text-white leading-tight"
          >
            حذف کردن کاربر
          </button>
        )}
      </td>
    </tr>
  );
};

export default RowTable;
