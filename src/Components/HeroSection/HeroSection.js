import React, { useEffect, useRef, useState } from "react";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import { GroundSectionTag } from "./HeroStyles";
import Image from "next/image";
import TextAnim from "../../Utils/TextAnim/TextAnim";

import searchVector from "../../../public/images/searchV.png";
import planVector from "../../../public/images/plan.png";
import chatVector from "../../../public/images/chat.png";
import fakeVector from "../../../public/images/fake.png";
import { useIsomorphicLayoutEffect } from "../../Utils/Hooks/useIsomorphicLayoutEffect";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { AnimationOnScroll } from "react-animation-on-scroll";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const [sizeScreen, setSizeScreen] = useState();
  // const section_one = useRef();

  // useIsomorphicLayoutEffect(() => {
  //   const ctx = gsap.context((self) => {
  //     const boxes = self.selector(".image_holder");
  //     boxes.forEach((box) => {
  //       gsap.to(box, {
  //         x: -600,
  //         scrollTrigger: {
  //           trigger: box,
  //           start: "bottom bottom",
  //           end: "top 20%",
  //           scrub: true,
  //           snap: {
  //             snapTo: "labels", // snap to the closest label in the timeline
  //             duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
  //             delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
  //             ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
  //           },
  //         },
  //       });
  //     });
  //   }, section_one);
  //   return () => ctx.revert();
  // }, []);

  useEffect(() => {
    const updateSize = () => {
      setSizeScreen([window.innerWidth]);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <>
      <GroundSectionTag className="!mt-[6rem] ">
        <div className="image_holder first">
          <Image
            src={searchVector}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            className="drop-shadow-lg rounded-lg"
            alt="search modal"
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-y-5 w-[80vw] sm:w-[80vw] md:w-fit ">
          {/* <TextAnim
            tagName={"h1"}
            aniType={"float"}
            type="words"
            className="text-xl md:text-3xl"
          > */}
          <h1 className="text-xl md:text-3xl">جستجوی سریع</h1>
          <p className={"text-center"}>
            پیدا کنید و چت کنید و اولین قرار خود را بگذارید
          </p>
        </div>
      </GroundSectionTag>

      {/* <AnimationOnScroll
        animateIn="animate__fadeInLeftBig"
        initiallyVisible={true}
        afterAnimatedIn={(vis) => console.log(vis)}
        animatePreScroll={false}
      > */}
      <GroundSectionTag reverse>
        <div className="image_holder">
          <Image
            src={planVector}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            className="drop-shadow-lg rounded-lg"
            alt="search modal"
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-y-5 w-[80vw] sm:w-[80vw] md:w-fit ">
          {/* <TextAnim
              tagName={"h1"}
              aniType={"float"}
              type="words"
              className="text-xl md:text-3xl text-center"
            > */}
          <h1 className="text-xl md:text-3xl text-center">
            15 روز هدیه خرید اشتراک
          </h1>
          {/* </TextAnim> */}
          {/* <TextAnim
              tagName={"p"}
              aniType={"float"}
              type="words"
              className={"text-center"}
            > */}
          <p className="text-center">به هرکس که دوست دارید رایگان پیام بدهید</p>
          {/* </TextAnim> */}
        </div>
      </GroundSectionTag>
      {/* </AnimationOnScroll> */}

      {/* <AnimationOnScroll animateIn="animate__fadeInRightBig"> */}
      <GroundSectionTag>
        <div className="image_holder">
          <Image
            src={chatVector}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            className="drop-shadow-lg rounded-lg"
            alt="search modal"
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-y-5 w-[80vw] sm:w-[80vw] md:w-fit ">
          {/* <TextAnim
            tagName={"h1"}
            aniType={"float"}
            type="words"
            className="text-xl md:text-3xl text-center"
          > */}
          <h1 className="text-xl md:text-3xl text-center">
            محیط چت سریع و قوی
          </h1>
          {/* </TextAnim> */}
          {/* <TextAnim
            tagName={"p"}
            aniType={"float"}
            type="words"
            className={"text-center"}
          > */}
          <p className="text-center">پیشرفته با سرعت بالا و روان</p>
          {/* </TextAnim> */}
        </div>
      </GroundSectionTag>
      {/* </AnimationOnScroll> */}

      <div style={{ maxHeight: "85vh", overflow: "hidden" }}>
        {/* <AnimationOnScroll
          animateIn="animate__fadeInUpBig"
          style={{ overflow: "hidden" }}
        > */}
        <GroundSectionTag reverse>
          <div className="image_holder">
            <Image
              src={fakeVector}
              style={{ objectFit: "cover" }}
              className="drop-shadow-lg rounded-lg"
              alt="search modal"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-y-5 w-[80vw] sm:w-[80vw] md:w-fit ">
            {/* <TextAnim
                tagName={"h1"}
                aniType={"throw"}
                type="words"
                className="text-xl md:text-3xl text-center"
              > */}
            <h1 className="text-xl md:text-3xl text-center">
              بدون کاربران جعلی و فیک و کلاهبردار
            </h1>
            {/* </TextAnim> */}
            {/* <TextAnim
              tagName={"p"}
              aniType={"throw"}
              type="words"
              className={"text-center"}
            > */}
            <p className={"text-center"}>
              با بلاک کردن کاربران متقلب آنها توسط پلیس سایت حذف میشوند
            </p>
            {/* </TextAnim> */}
          </div>
        </GroundSectionTag>
        {/* </AnimationOnScroll> */}
      </div>
    </>
  );
};

export default HeroSection;
