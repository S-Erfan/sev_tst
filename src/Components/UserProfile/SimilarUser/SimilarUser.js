import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import userPro from "../../../../public/images/untitled folder 3/user.jpg";
import userPro2 from "../../../../public/images/untitled folder 3/user-2.jpg";
import userPro3 from "../../../../public/images/untitled folder 3/user-3.jpg";
import userPro4 from "../../../../public/images/untitled folder 3/user-4.jpg";
import userPro5 from "../../../../public/images/untitled folder 3/user-5.jpg";
import UserCard from "../../Shared/UserCardShow/UserCard";

const userRandom = [
  { id: 1, name: "تینا", age: 23, city: "کرج", img: userPro },
  { id: 2, name: "تینا", age: 23, city: "کرج", img: userPro2 },
  { id: 3, name: "تینا", age: 23, city: "کرج", img: userPro3 },
  { id: 4, name: "تینا", age: 23, city: "کرج", img: userPro4 },
  { id: 5, name: "تینا", age: 23, city: "کرج", img: userPro5 },
  { id: 6, name: "تینا", age: 23, city: "کرج", img: userPro },
  { id: 7, name: "تینا", age: 23, city: "کرج", img: userPro },
  { id: 8, name: "تینا", age: 23, city: "کرج", img: userPro },
  { id: 9, name: "تینا", age: 23, city: "کرج", img: userPro },
];

const SimilarUser = ({ listUser }) => {
  return (
    <>
      <div>
        <h3 className="text-2xl text-neutral-600">کاربران مشابه</h3>
        <div className="mt-8 pb-4">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            slidesPerGroup={1}
            // loop={true}
            breakpoints={{
              480: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              976: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
            }}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-violet-500",
            }}
            modules={[Pagination]}
            className="!pb-[3rem]"
          >
            {listUser.map((item) => (
              <SwiperSlide>
                <UserCard
                  key={item.id}
                  age={item.age}
                  name={`${item.first_name} ${item.last_name}`}
                  city={
                    item.city + "-" + item.provinces !== "undefined"
                      ? item.provinces
                      : item.province
                  }
                  id={item.id}
                  imgPath={item.image !== "undefined" ? item.image : ""}
                  soloItem={true}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SimilarUser;
