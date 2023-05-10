import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import BlogCard from "../BlogIntro/BlogCard";

const LatestBlogs = ({ blogs }) => {
  return (
    <>
      <section className="container mx-auto mt-[5rem]">
        <h3 className="border-neutral-400 border-b pb-4 pr-4 md:pr-0 text-xl font-semibold ">
          اخرین مطالب و بلاگ ها
        </h3>

        <div className="p-4">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            spaceBetween={50}
            className="latestBlogsSlider"
          >
            {blogs.map((item) => (
              <SwiperSlide key={item.id}>
                <BlogCard
                  key={item.id}
                  content={item.content}
                  id={item.id}
                  title={item.title}
                  img={item.image}
                  slug={item.slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default LatestBlogs;
