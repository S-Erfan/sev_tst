import Image from "next/image";
import React from "react";
import blogVector from "../../../public/images/blog.png";
import BlogCard from "./BlogCard";

const BlogIntro = ({ blogs }) => {
  return (
    <>
      <section className="container mx-auto mt-[5rem]">
        <div className="w-[90%] lg:w-[600px] mx-auto ">
          <Image
            alt="blog vector start blog section and content"
            src={blogVector}
            className={
              "drop-shadow-lg shadow-stone-700 w-[100%] h-[100%] object-cover "
            }
          />
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

export default BlogIntro;
