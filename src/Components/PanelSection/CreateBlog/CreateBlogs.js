import { CircularProgress } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputCustom from "../../Shared/InputCustom/InputCustom";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { engTypeKeys, persianTypeKeys } from "../../../Utils/helper/helpers";
import Image from "next/image";
import notify from "../../../Utils/toast/notify";
import { getTokenLocal } from "../../../Utils/token/userToken";
import { BASE_URL, CREATE_BLOG } from "../../../Utils/ApiRoute/apiRoutes";
import axios from "axios";
const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => "Loading...",
  ssr: false,
});

const CreateBlogs = () => {
  const [loader, setLoader] = useState("");
  const [titleBlog, setTitleBlog] = useState("");
  const [slugBlog, setSlugBlog] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(false);
  const [valImg, setValImg] = useState(false);

  const user = useSelector((state) => state.user);

  const createBlog = async (e) => {
    e.preventDefault();
    if(slugBlog === "" || titleBlog === "" || content === "" ){
      notify("باید تمام فیلد ها را پر کنید.", "error");
      return
    }
    if (valImg === false) {
      notify("باید عکس بلاگ را انتخاب کنید.", "error");
      return;
    }

    setLoader(true);
    
    var form = new FormData();
    form.append("slug", slugBlog);
    form.append("title", titleBlog);
    form.append("content", content);
    form.append("image", valImg);
    
    const ls = getTokenLocal();

    var config = {
      headers: {
        Authorization: `Bearer ${ls}`,
        "Content-Type": "multipart/form-data",
      },
      url: `${BASE_URL}${CREATE_BLOG}`,
      method: "post",
      data: form,
    };

    try {
      const { data, status } = await axios(config);
      if (data.ok) {
        notify(data.message, "success");
        setValImg(false);
        setImage(false);
        setTitleBlog("");
        setSlugBlog("");
        setContent("");
      } else {
        notify(data.message, "error");
      }
    } catch (error) {
      setLoader(false);
      const err = error.response.data.message;
      notify(err, "error");
    }
    setLoader(false);

    
  };

  const imageHandler = (e) => {
    const { name, value, files } = event.target;
    let src = URL.createObjectURL(files[0]);
    setImage(src);
    setValImg(files[0]);
  };

  return (
    <>
      <form
        className="w-full sm:w-[100%] md:w-[75%] mx-auto flex flex-col justify-start items-start gap-4 mt-8 "
        onSubmit={createBlog}
      >
        <InputCustom
          label={"عنوان بلاگ"}
          placeholder={""}
          idIn={"title"}
          type="text"
          value={titleBlog}
          onChange={(e) => setTitleBlog(e.target.value)}
        />
        <InputCustom
          label={"اسلاگ بلاگ (فارسی نباشد)"}
          placeholder={"example-slug"}
          idIn={"slug"}
          type="text"
          onKeyDown={engTypeKeys}
          value={slugBlog}
          onChange={(e) => setSlugBlog(e.target.value)}
        />
        <div className="mt-5 block pr-5 md:pr-0">
          <p> اپلود عکس </p>
        </div>

        <div className="flex items-center justify-center w-full h-[600px]  relative">
          {image === false ? (
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">برای اپلود کلیک کنید</span>
                </p>
                <p className="text-xs text-gray-500">SVG, PNG or JPG</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept={"image/png, image/jpeg"}
                className="hidden"
                onChange={imageHandler}
              />
            </label>
          ) : (
            <Image
              src={image}
              alt={"cover blog "}
              fill
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => {
                setImage(false);
                setValImg(false);
              }}
            />
          )}
        </div>

        <div>
          <p className=" pr-5 md:pr-0"> محتوای بلاگ </p>
        </div>
        <div className="w-full h-full input-main text-right ">
          <ReactQuill
            dir="rtl"
            className="h-[15rem] mb-6 "
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </div>

        <div className="w-[70%] mx-auto flex justify-center items-center mt-4 gap-x-2 mb-[2rem] ">
          <button className="btn-main min-w-0" type="submit">
            {loader ? (
              <CircularProgress className="text-neutral-600" size={"1.8rem"} />
            ) : (
              "تایید"
            )}
          </button>
          <Link href={"/panel/blogs/"}>
            <button className="btn-sec min-w-0"> بازکشت</button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default CreateBlogs;
