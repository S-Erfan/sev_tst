import { CircularProgress } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { DELETE_BLOG } from "../../../Utils/ApiRoute/apiRoutes";
import callApi from "../../../Utils/callApi/callApi";
import notify from "../../../Utils/toast/notify";

const RowTableBlogs = ({ id, slug, title, uploader }) => {
  const [loader, setLoader] = useState(false);

  const deletedBlog = async () => {
    setLoader(true);

    const { data } = await callApi(DELETE_BLOG + id, true, "{}", "get");
    if (data.ok) {
      notify(data.message, "success");
      uploader();
    }

    setLoader(false);
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex justify-center">
          <div className="ml-3">
            <p className="text-gray-600 whitespace-no-wrap">{id}</p>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{title}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link
          href={`/panel/blogs/edit/${id}`}
          className="relative inline-block px-3 py-1 text-white bg-indigo-600  rounded-full leading-tight"
        >
          ویرایش بلاگ
        </Link>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <button
          className="relative inline-block px-3 py-1 bg-red-500 rounded-full text-white leading-tight"
          onClick={deletedBlog}
        >
          {loader ? <CircularProgress size={20} /> : "حذف بلاگ"}
        </button>
      </td>
    </tr>
  );
};

export default RowTableBlogs;
