import Image from "next/image";
import Link from "next/link";
import React from "react";
import us from "../../../public/images/untitled folder 3/user.jpg";
import { BASE_URL, SHOW_BLOG_IMAGE, SHOW_PROFILE_IMAGE } from "../../Utils/ApiRoute/apiRoutes";

const BlogCard = ({ img, title, content, id, slug }) => {
  return (
    <div className="bg-slate-200 rounded-xl flex flex-col md:flex-row overflow-hidden shadow-lg  ">
      <div className="flex-none w-full md:w-48 ">
        <Image
          alt={`blog cover || ${title}`}
          src={`${BASE_URL}${SHOW_BLOG_IMAGE}${id}`}
          className="w-full h-full max-h-[206px] object-cover"
          width={1500}
          height={1500}
        />
      </div>
      <div className="flex-auto p-6">
        <div className="flex flex-col">
          <h4 className="text-2xl mb-4">{title}</h4>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="text-sm text-neutral-600 overflow-ellipsis overflow-hidden show_3_line"
          ></div>
          <div>
            <Link href={`/blogs/${slug}`}>
              <button className="float-left text-xs text-neutral-700  py-2 px-4 border border-neutral-500 rounded-lg mt-4 transition duration-500 hover:bg-violet-500 hover:text-slate-50 ">
                دیدن بلاگ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
