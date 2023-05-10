import React, { useState, useEffect } from "react";
import BlogIntro from "../src/Components/BlogIntro/BlogIntro";
import Footer from "../src/Components/Footer/Footer";
import HeadCustom from "../src/Components/Head/Head";
import Header from "../src/Components/Header/Header";
import HeroSection from "../src/Components/HeroSection/HeroSection";
import InputCustom from "../src/Components/Shared/InputCustom/InputCustom";
import SubscriptSection from "../src/Components/SubscriptSection/SubscriptSection";
import UserIntro from "../src/Components/UsersIntro/UserIntro";
import useSocketG from "../src/Utils/Hooks/useSocketGlobal/useSocketGlobal";
import { io } from "socket.io-client";
import { BASE_URL, GET_ALL_BLOG } from "../src/Utils/ApiRoute/apiRoutes";
import callApi from "../src/Utils/callApi/callApi";

export default function Home({ userlist, blogs }) {
  //* for socket get list user
  // const { connected, socketInit } = useSocketG("home");
  const [listUser, setListUser] = useState([]);
  return (
    <>
      <HeadCustom
        title={"صفحه اصلی سوین | دوستیابی سوین"}
        descriptionContent={
          "صفحه اصلی سوین | دوستیابی سوین | دوست یابی سوین یه شما کمک می کند با هر کسی که علاقه مند هستید چت کنید در محیط ساده و قوی دوستان جدیدی پیدا کنید"
        }
      />
      <Header />
      <main className="my-5">
        <HeroSection />
        <SubscriptSection />
        <UserIntro users={userlist} />
        <BlogIntro blogs={blogs} />
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const initSocket = await new io(`${BASE_URL}/home`, {
    reconnection: true,
  });

  await initSocket.emit("home:user_list");

  const { data, status } = await callApi(GET_ALL_BLOG, false, "{}", "get");

  return {
    props: {
      userlist: await new Promise((resolve) => {
        initSocket.on("home:user_list", (data) => {
          if (data.ok) {
            const { result } = data;
            resolve(result);
          }
        });
      }),
      blogs: data.result,
    },
  };
}
