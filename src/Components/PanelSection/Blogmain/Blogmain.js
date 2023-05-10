import Link from "next/link";
import React from "react";
import RowTableBlogs from "./RowTableBlogs";

const Blogmain = ({ blogs, uploader }) => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-12">
        <div className="py-8">
          <div className="flex  justify-between items-center ">
            <h2 className="text-2xl  leading-tight"> بلاگ ها </h2>
            <Link href={"/panel/blogs/CreateBlog"}>
              <button className="text-xl btn-main !inline   !min-w-min  left-0   relative !items-center  ">
                نوشتن بلاگ
              </button>
            </Link>
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs  text-gray-700 uppercase tracking-wider">
                      id
                    </th>

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs  text-gray-700 uppercase tracking-wider">
                      موضوع بلاگ
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs  text-gray-700 uppercase tracking-wider">
                      ویرایش بلاگ
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs  text-gray-700 uppercase tracking-wider">
                      حذف بلاگ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((item) => (
                    <RowTableBlogs 
                      key={item.blog_id}
                      id={item.blog_id}
                      title={item.title}
                      uploader={uploader}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogmain;
