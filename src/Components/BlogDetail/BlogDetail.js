import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BASE_URL, SHOW_BLOG_IMAGE, SHOW_PROFILE_IMAGE } from "../../Utils/ApiRoute/apiRoutes";

const BlogDetail = ({ title, img, description }) => {
  return (
    <>
      <section className="container mx-auto">
        <div className="flex justify-between items-center mb-8 px-4 sm:px-0 ">
          <h1 className="text-xl md:text-3xl font-bold">{title}</h1>
          <Link href="/blogs">
            <ChevronLeftIcon className="w-[25px] h-[25px] sm:w-[45px] sm:h-[45px] font-bold " />
          </Link>
        </div>

        <div className="w-full px-4 md:px-0 md:w-[75%] md:h-[600px] mt-8 mb-12 mx-auto">
          <Image
            src={`${BASE_URL}${SHOW_BLOG_IMAGE}${img}`}
            alt="blog image"
            className="w-full h-full object-cover rounded-xl shadow-lg shadow-neutral-600/70 "
            width={1500}
            height={1500}
          />
        </div>
        <div className=" mt-[2rem] px-4 sm:px-0">
          <div  dangerouslySetInnerHTML={{ __html: description }} className="text-neutral-600 text-sm text-justify sm:text-right sm:text-base md:text-lg">
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
