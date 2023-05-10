import Link from "next/link";
import React from "react";
import BlogCard from "../BlogIntro/BlogCard";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const BlogsSection = ({ blogs }) => {
  return (
    <>
      <section className="container mx-auto">
        <div className="flex justify-between items-center mb-8 px-4 sm:px-0 ">
          <h1 className="text-xl md:text-3xl font-bold">بلاگ ها</h1>
          <Link href="/">
            <ChevronLeftIcon className="w-[25px] h-[25px] sm:w-[45px] sm:h-[45px] font-bold " />
          </Link>
        </div>
        <div className="flex flex-col gap-y-[2.5rem] px-[1rem]">
          {blogs.map((item) => (
            <BlogCard
              key={item.blog_id}
              content={item.content}
              id={item.blog_id}
              title={item.title}
              slug={item.slug}
              img={item.image}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogsSection;
