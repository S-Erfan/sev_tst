import { CircularProgress } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { ACCEPT_BIO_USER_ID } from "../../../Utils/ApiRoute/apiRoutes";
import callApi from "../../../Utils/callApi/callApi";
import notify from "../../../Utils/toast/notify";

const TableRow = ({ name, lName, bio, id, updater }) => {
  const [loader, setLoader] = useState(false);

  const acceptedBio = async () => {
    setLoader(true);

    const { data } = await callApi(ACCEPT_BIO_USER_ID + id, true, "{}", "get");
    if (data.ok) {
      notify(data.message, "success");
      updater();
    } else {
      notify(data.message, "success");
    }

    setLoader(false);
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex justify-center">
          <div className="ml-3">
            <p className="text-gray-600 whitespace-no-wrap">
              <Link href={`/user/${id}`}>
                {name} {lName}
              </Link>
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 w-40 md:w-96">{bio}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          className="relative inline-block px-3 py-1 text-white bg-indigo-600  rounded-lg leading-tight"
          onClick={acceptedBio}
        >
          {loader ? <CircularProgress size={20} /> : "تایید بیو"}
        </button>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <button className="relative inline-block px-3 py-1 bg-red-500 rounded-lg text-white leading-tight">
          حذف بلاگ
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
