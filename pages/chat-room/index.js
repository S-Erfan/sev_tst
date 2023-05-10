import ChatRoom from "../../src/Components/ChatRoom/ChatRoom";
import Footer from "../../src/Components/Footer/Footer";
import HeadCustom from "../../src/Components/Head/Head";
import Header from "../../src/Components/Header/Header";

import userTst from "../../public/images/untitled folder 3/user-3.jpg";
import userTst1 from "../../public/images/untitled folder 3/u.webp";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "../../src/Utils/ApiRoute/apiRoutes";
import { getTokenLocal } from "../../src/Utils/token/userToken";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

let initSocket = "";
export default function ChatRoomPage() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [listUser, setListUser] = useState([]);
  const [socketConc, setSocketConc] = useState("");

  useEffect(() => {
    initSocket = io(`${BASE_URL}/mrphpinfo`, {
      auth: {
        token: getTokenLocal(),
      },
    });
    setSocketConc(initSocket);
    return () => {
      initSocket.emit("disconnected", () => {
        console.log("disconnectdddddddddddd");
      });
    };
  }, []);

  useEffect(() => {
    initSocket.emit("user:get_list");
    initSocket.on("user:get_list", (data) => {
      setListUser(data.result);
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
      <Header />
      <main className="mt-[60px] ">
        <ChatRoom usersChat={listUser} socket={socketConc} />
      </main>
    </>
  );
}
