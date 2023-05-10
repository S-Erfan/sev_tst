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
import {
  BASE_URL,
  CREATE_BLOG,
  SHOW_BLOG_IMAGE,
  UPLOAD_BLOG,
} from "../../../Utils/ApiRoute/apiRoutes";
import axios from "axios";
import { useEffect } from "react";
import callApi from "../../../Utils/callApi/callApi";
const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => "Loading...",
  ssr: false,
});

const EditBlog = ({ blog }) => {
  const [loader, setLoader] = useState("");
  const [titleBlog, setTitleBlog] = useState("");
  const [slugBlog, setSlugBlog] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(false);
  const [valImg, setValImg] = useState(false);

  const createBlog = async (e) => {
    e.preventDefault();
    if (slugBlog === "" || titleBlog === "" || content === "") {
      notify("باید تمام فیلد ها را پر کنید.", "error");
      return;
    }

    setLoader(true);

    const raw = JSON.stringify({
      blog_id: blog.id,
      slug: slugBlog,
      title: titleBlog,
      content: content,
    });

    const { data, status } = await callApi(UPLOAD_BLOG, true, raw, "post");
    if (data.ok) {
      notify(data.message, "success");
      
    } else {
      notify(data.message, "error");
    }
    setLoader(false);
  };

  const imageHandler = (e) => {
    const { name, value, files } = event.target;
    let src = URL.createObjectURL(files[0]);
    setImage(src);
    setValImg(files[0]);
  };

  useEffect(() => {
    if (blog !== "") {
      setImage(`${BASE_URL}${SHOW_BLOG_IMAGE}${blog.id}`);
      setContent(blog.content);
      setSlugBlog(blog.slug);
      setTitleBlog(blog.title);
    }
  }, [blog]);

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

export default EditBlog;
