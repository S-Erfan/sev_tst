import ChatRoom from "../../src/Components/ChatRoom/ChatRoom";
import Footer from "../../src/Components/Footer/Footer";
import HeadCustom from "../../src/Components/Head/Head";
import Header from "../../src/Components/Header/Header";

import userTst from "../../public/images/untitled folder 3/user-3.jpg";
import userTst1 from "../../public/images/untitled folder 3/u.webp";
import { useRouter } from "next/router";
import callApi from "../../src/Utils/callApi/callApi";
import { BASE_URL, START_CHAT } from "../../src/Utils/ApiRoute/apiRoutes";
import { useEffect } from "react";
import { useState } from "react";
import LoadingScreen from "../../src/Components/Shared/LoadingScreen/LoadingScreen";
import { io } from "socket.io-client";
import { getTokenLocal } from "../../src/Utils/token/userToken";
import LoaderCustom from "../../src/Components/Shared/LoaderCustom/LoaderCustom";
import { useSelector } from "react-redux";

const usersList = [
  {
    id: 1,
    name: "شیلا",
    imgProf: userTst,
    desc: "",
    Ldate: "1401/10/25",
    msg: 20,
  },
  {
    id: 2,
    name: "زهرا",
    imgProf: "",
    desc: "امروز بیا",
    Ldate: "1401/10/05",
    msg: 1,
  },
  {
    id: 3,
    name: "زهرا",
    imgProf: userTst1,
    desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
    Ldate: "1401/10/05",
    msg: 0,
  },
];
let initSocket = "";

export default function UserChat() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [socketConc, setSocketConc] = useState("");
  const { userId } = useRouter().query;

  const fetcher = async () => {
    const raw = JSON.stringify({ user_id: userId });
    const { data, status } = await callApi(START_CHAT, true, raw, "post");
    setLoader(false);
  };

  useEffect(() => {
    initSocket = io(`${BASE_URL}/mrphpinfo`, {
      auth: {
        token: getTokenLocal(),
      },
    });
    setSocketConc(initSocket);
    fetcher();
    return () => {
      initSocket.emit("disconnected", () => {
      });
    };
  }, []);

  useEffect(() => {
    initSocket.on("connect", () => {
    });
  }, []);

  useEffect(() => {
    if (user.loginStatus === false) {
      router.push("/login");
    }
  }, [user]);

  return (
    <>
      <HeadCustom title={"صحفه چت ها"} descriptionContent={"صحفه چت ها"} />
      {loader && <LoaderCustom />}
      <Header />
      <main className="mt-[60px] ">
        <ChatRoom
          userAvatar={usersList[0]}
          socket={socketConc}
        />
      </main>
    </>
  );
}
