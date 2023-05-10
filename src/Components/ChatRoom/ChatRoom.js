import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { SmsFailedSharp } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { convertDate, convertTimeStamp } from "../../Utils/helper/helpers";
import { updaterMsg } from "../../Utils/updaterAsaidChat";
import ChatScreen from "./ChatScreen";
import UserAvatar from "./UserAvatar";

const ChatRoom = ({ userAvatar, socket }) => {
  const router = useRouter();
  const [listUser, setListUser] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const { userId } = router.query;
  useEffect(() => {
    socket !== "" && socket.emit("user:get_list");
    socket !== "" &&
      socket.on("user:get_list", (data) => {
        const { result } = data;
        const b = result.sort((a, b) => {
          if (Date.parse(a.date) / 1000 > Date.parse(b.date) / 1000) {
            return -1;
          }
          if (Date.parse(a.date) / 1000 < Date.parse(b.date) / 1000) {
            return 1;
          }
          return 0;
        });
        setListUser(b);
      });
    socket !== "" &&
      socket.on("message:receive", (data) => {
        setNewMsg(data);
      });
  }, [socket]);

  useEffect(() => {
    if (listUser.length >= 1 && newMsg !== "") {
      const finder = listUser.findIndex(
        (item) => item.user_id === newMsg.sender
      );
      const newArr = listUser;
      // newArr[finder]["last_message"] = newMsg.message;
      newArr[finder].last_message = newMsg.message;
      const filtered = newArr.filter((item) => item.user_id !== newMsg.sender);
      const updated = newArr.filter((item) => item.user_id === newMsg.sender);

      setListUser([...updated, ...filtered]);
      setNewMsg("");
    }
  }, [newMsg]);

  return (
    <>
      <section className="chat_section overflow-y-scroll flex flex-row justify-between items-start ">
        <div
          className={` w-full md:w-1/3 lg:w-1/4 h-full ${
            !!userId && "hidden"
          } md:block `}
        >
          <div className="flex flex-col gap-2 overflow-y-scroll h-full customScroll">
            {listUser.map((item) => (
              <Link href={`/chat-room/${item.user_id}`} key={item.user_id}>
                <UserAvatar
                  lastTxt={item.last_message}
                  image={item.image}
                  date={convertDate(item.date)}
                  name={item.first_name + " " + item.last_name}
                  msg={0}
                />
              </Link>
            ))}
          </div>
        </div>

        <div
          className={` ${
            !!userId ? "grid w-full" : "hidden"
          } md:w-2/3 lg:w-3/4 chat_section border-r border-neutral-400 md:grid place-items-center bg_screen_wallpaper `}
        >
          {!!router.query.userId === false ? (
            <div className="flex items-center gap-5 glass_bg_el p-[2rem] !shadow-xl shadow-neutral-600 ">
              <h2 className="text-lg text-neutral-600 ">
                یک کاربر را برای چت کردن انتخاب کنید
              </h2>
              <FaceSmileIcon className="w-[25px] h-[25px] text-violet-500 " />
            </div>
          ) : (
            <ChatScreen userAvatar={userAvatar} socket={socket} />
          )}
        </div>
      </section>
    </>
  );
};

export default ChatRoom;
