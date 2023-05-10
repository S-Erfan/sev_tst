import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL, UPLOAD_IMAGE } from "../../../Utils/ApiRoute/apiRoutes";
import callApi from "../../../Utils/callApi/callApi";
import notify from "../../../Utils/toast/notify";
import { getTokenLocal } from "../../../Utils/token/userToken";
import ModalDef from "../../Shared/ModalDefault/ModalDef";

const UploadProfile = ({ open, handleOpen, updateProfile }) => {
  const [loader, setLoader] = useState(false);
  const [imageIn, setImageIn] = useState("");

  const imageUploadHandler = async (e) => {
    const { name, value, files } = event.target;
    setImageIn(files[0]);
    if (files[0].size / 1024 > 2000) {
      notify("حجم فایل شما نباید بیشتر از 2mg باشد.", "error");
      return;
    }
    setLoader(true);

    const bodySend = new FormData();
    bodySend.append("image", files[0], files[0].name);

    const ls = getTokenLocal();

    var config = {
      //   maxBodyLength: Infinity,
      headers: {
        Authorization: `Bearer ${ls}`,
        "Content-Type": "multipart/form-data",
      },
      url: `${BASE_URL}${UPLOAD_IMAGE}`,
      method: "post",
      data: bodySend,
    };

    try {
      const { data, status } = await axios(config);
      if (data.ok) {
        notify(data.message, "success");
        updateProfile();
        handleOpen();
      } else {
        notify(data.message, "error");
        handleOpen();
      }
    } catch (error) {
      const err = error.response.data.errors;
      err.map((item) => notify(item.message, "error"));
    }

    setLoader(false);
  };

  return (
    <ModalDef open={open} handleOpen={handleOpen}>
      <div className="min-w-[250px] md:min-w-[350px]">
        <div className="p-2">
          <h2 className="py-2 text-md text-right">
            شما میتوانید چهار عکس در پروفایل خود آپلود کنید.
          </h2>
          {loader ? (
            <div className="w-full mt-4 ">
              <div className="border-dashed border bg-neutral-500/10 transition cursor-pointer hover:bg-inherit border-neutral-600 min-h-[300px] rounded-xl grid place-items-center">
                <CircularProgress size={25} />
              </div>
            </div>
          ) : (
            <div className="w-full mt-4 ">
              <label htmlFor="uploaderFileInput">
                <div className="border-dashed border bg-neutral-500/10 transition cursor-pointer hover:bg-inherit border-neutral-600 min-h-[300px] rounded-xl grid place-items-center ">
                  <ArrowUpTrayIcon className="w-[80px] h-[80px] text-neutral-500" />
                  <input
                    type={"file"}
                    accept={"image/png, image/jpeg"}
                    className={"hidden"}
                    id={"uploaderFileInput"}
                    onChange={imageUploadHandler}
                  />
                </div>
              </label>
            </div>
          )}
        </div>
      </div>
    </ModalDef>
  );
};

export default UploadProfile;
