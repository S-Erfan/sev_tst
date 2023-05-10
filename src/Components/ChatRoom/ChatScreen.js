import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowBack, ArrowBackIosNew } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { getListLikeUser } from "../../Redux/user/userAction";
import {
  BASE_URL,
  LIKE_USER,
  SHOW_PROFILE_IMAGE,
  USER_BLOCK_ID,
} from "../../Utils/ApiRoute/apiRoutes";
import callApi from "../../Utils/callApi/callApi";
import { convertDate, convertDateToTime } from "../../Utils/helper/helpers";
import notify from "../../Utils/toast/notify";
import { getTokenLocal } from "../../Utils/token/userToken";
import LoaderCustom from "../Shared/LoaderCustom/LoaderCustom";
import MenuAcc from "../Shared/MenuAcc/MenuAcc";
import ModalDef from "../Shared/ModalDefault/ModalDef";

const readyMsg = [
  "سلام پروفایل شما را دیدم و شیفته این هستم که بیشتر با شما آشنا شوم لطفاً اطلاعات تماس خودتون رو برام ارسال کنید",
  "سلام.",
  "از شما خوشم اومده.",
];

const ChatScreen = ({ userAvatar, socket }) => {
  const { userId } = useRouter().query;
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.global);
  const user = useSelector((state) => state.user);
  const [chatesMsg, setChatesMsg] = useState([]);
  const [msgType, setMsgType] = useState("");
  const [info, setInfo] = useState("");
  const [modalPm, setModalPm] = useState(false);
  const [textAreaSize, setTextAreaSize] = useState(64);

  const textAreaRef = useRef(null);

  const msgSendHandler = (e, notPg = false) => {
    if (msgType == "" || msgType == "\n" || msgType.trim() == "") {
      return;
    }

    if (user.info.userPackage === null && notPg === false) {
      notify(
        "ابتدا باید اشتراک خود را فعال کنید. ولی میتونی از پیام های اماده استفاده کنی.",
        "error"
      );
      setModalPm(true);
      return;
    }
    var tzoffset =
      new Date().getTimezoneOffset({
        timeZone: "Asia/Tehran",
      }) * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1);

    const raw = {
      receiver: userId,
      message: notPg === false ? msgType : notPg,
      created_at: localISOTime,
    };

    socket.emit("message:send", {
      receiver: userId,
      message: notPg === false ? msgType : notPg,
      type: "1",
    });
    socket.on("message:send:result", (data) => {
      if (data.ok) {
        setChatesMsg([...chatesMsg, raw]);
        setMsgType("");
        setTextAreaSize(64);
      } else {
        notify(data.message, "error");
      }
    });

    handleScroll();
  };

  const router = useRouter();

  const chatScreenEl = useRef();

  const handleScroll = () => {
    const scrollHeight = chatScreenEl.current.scrollHeight;
    const height = chatScreenEl.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    chatScreenEl.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  const setScreenChatDyn = () => {
    const textAreaHeight = textAreaRef.current.offsetHeight;

    if (textAreaHeight === 64) {
      setTextAreaSize(64);
      updateScreenSize(64);
    }

    if (textAreaHeight === 208) {
      updateScreenSize(208);
    }

    if (textAreaHeight > 64) {
      setTextAreaSize(textAreaHeight);
      updateScreenSize(textAreaHeight);
    }
  };

  useEffect(() => {
    if (window) {
      handleScroll();
    }
  }, [chatesMsg]);

  if (socket !== "") {
    socket.on("message:receive", (data) => {
      if (data.sender === userId) {
        var tzoffset =
          new Date().getTimezoneOffset({
            timeZone: "Asia/Tehran",
          }) * 60000; //offset in milliseconds
        var localISOTime = new Date(Date.now() - tzoffset)
          .toISOString()
          .slice(0, -1);

        const raw = {
          receiver: false,
          message: data.message,
          created_at: localISOTime,
        };

        // chatesMsg.push(raw);
        setChatesMsg([...chatesMsg, raw]);
      }
    });
  }

  useEffect(() => {
    if (socket) {
      socket.emit("user:getchat", {
        user_id: userId,
      });
      socket.on("user:getchat", (data) => {
        setInfo(data.result);
        setChatesMsg(data.result.messages);
      });
    }
  }, [socket, userId]);

  const [holdLeterKey, setHoldLeterKey] = useState(false);

  const oneEnterKey = (e) => {
    if (e.keyCode === 17) {
      setHoldLeterKey(true);
      return false;
    } else if (e.keyCode === 13 && holdLeterKey === true) {
      setHoldLeterKey(false);
      setMsgType(msgType + "\n");
      const textAreaHeight = textAreaRef.current.offsetHeight;
      updateScreenSize(textAreaHeight);
    } else if (e.keyCode === 13) {
      msgSendHandler();
    }
  };

  //! Block user action
  const blockUserHandler = async (e) => {
    const { data, status } = await callApi(
      USER_BLOCK_ID + userId,
      true,
      "{}",
      "get"
    );
    if (data.ok) {
      notify(data.message, "success");
      socket.emit("user:getchat", {
        user_id: userId,
      });
      socket.on("user:getchat", (data) => {
        const date = new Date("2023-02-14T19:29:05.000+03:30");
        setInfo(data.result);
        setChatesMsg(data.result.messages);
      });
    } else {
      notify(data.message, "error");
    }
  };

  const addFavUserHandler = async () => {
    const { data, status } = await callApi(
      LIKE_USER + userId,
      true,
      "{}",
      "get"
    );
    if (data.ok) {
      notify(data.message, "success");
    } else if (data.ok === false) {
      notify(data.message, "error");
    } else {
      notify(data, "error");
    }

    dispatch(getListLikeUser());
  };

  const sendReadyMsg = (e, content) => {
    msgSendHandler(e, content);
    setModalPm(false);
  };

  const updateScreenSize = (num = textAreaSize) => {
    const root = document.querySelector(":root");
    const varHeight =
      getComputedStyle(root).getPropertyValue("--screen-chat-size"); // 174px

    if (num === 64) {
      root.style.setProperty("--screen-chat-size", `174px`);
      handleScroll();
    } else {
      const he = 174 - 64;
      const resolve = he + num;
      root.style.setProperty("--screen-chat-size", `${resolve}px`);
      handleScroll();
    }
  };

  useEffect(() => {
    updateScreenSize();
  }, [textAreaSize]);

  return (
    <>
      <section className="bg-violet-50 h-full w-full flex flex-col justify-between">
        <>
          <div className="w-full p-2 flex justify-between items-center bg-[#EDEDED]/70 gap-x-4 shadow-[0_4px_8px_0_#0113] z-[1] ">
            <Link href={`/user/${userId}`}>
              <div className="w-[40px] h-[40px]">
                {info.image === undefined ? (
                  <UserCircleIcon className="w-full h-full text-neutral-500 " />
                ) : (
                  <Image
                    src={`${BASE_URL}${SHOW_PROFILE_IMAGE}${info.image}`}
                    width={150}
                    height={150}
                    alt="profile user"
                    className="w-full h-full object-cover rounded-[50%]"
                  />
                )}
              </div>
            </Link>
            <div className="flex-1 flex flex-col justify-start gap-[5px] py-0 ">
              <h3 className="text-md ">{`${info.first_name} ${info.last_name} `}</h3>
              <p
                className={`text-[12px] ${
                  info.online === 1 ? "text-green-500" : "text-red-500"
                }  show_1_line`}
              >
                {info.online === 1 ? "انلاین" : "افلاین"}
              </p>
            </div>
            <div className="w-fit flex justify-start gap-2 items-end ">
              <MenuAcc
                classBase={"bg-white z-50"}
                btnMenu={
                  <EllipsisVerticalIcon className="w-[25px] h-[25px] cursor-pointer" />
                }
                menuItems={[
                  [
                    info.blocked === 0 ? "بلاک کردن" : "انبلاک کردن",
                    blockUserHandler,
                  ],
                  ["افزودن به علاقه مندی ها", addFavUserHandler],
                ]}
              />
              {/* <EllipsisVerticalIcon className="w-[25px] h-[25px] cursor-pointer " /> */}
              <ChevronLeftIcon
                className="w-[25px] h-[25px] md:hidden cursor-pointer "
                onClick={() => router.push("/chat-room")}
              />
            </div>
          </div>
        </>
        {/* chat main */}
        <div className="flex-1 bg-slate-50  relative py-2 bg_screen_wallpaper ">
          <div
            ref={chatScreenEl}
            className=" flex flex-col absolute top-0 w-full heigth_screen_chat overflow-scroll customScroll justify-start gap-y-4 py-4 px-4 "
          >
            {/* //? for map all msg / */}
            {info !== "" &&
              chatesMsg.map((item, index) => (
                <>
                  <div className="w-full" key={index}>
                    <div
                      className={`${
                        item.receiver === userId
                          ? "float-right bg-purple-300 "
                          : "float-left bg-violet-300"
                      } min-w-[120px] max-w-[70%]  py-3 px-3 rounded-md shadow-lg flex flex-col  `}
                    >
                      <p className="">{item.message}</p>
                      <div className="flex justify-between align-center">
                        <span className="text-xs text-neutral-500">
                          {convertDateToTime(item.created_at)}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {convertDate(item.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute bottom-0 left-0  w-full h-auto px-2 py-3 bg-[#EDEDED] z-[1] flex justify-center items-end gap-x-4 shadow-[0_-4px_8px_0_#0113] "
            ref={textAreaRef}
          >
            {info.blocked === 0 ? (
              <>
                <div className=" cursor-pointer">
                  <PaperAirplaneIcon
                    className="w-[30px] h-[30px] text-violet-500 "
                    onClick={msgSendHandler}
                  />
                </div>
                <div className="flex-1 flex items-end ">
                  <TextareaAutosize
                    maxRows={7}
                    minRows={1}
                    className="input-chat resize-none h-full customScroll text-violet-600 placeholder:text-violet-300 "
                    placeholder="پیام..."
                    value={msgType}
                    onChange={(e) => {
                      setMsgType(e.target.value);
                      setScreenChatDyn();
                    }}
                    onKeyDown={(e) => oneEnterKey(e)}
                  />
                </div>
              </>
            ) : (
              <button className="btn-main" onClick={blockUserHandler}>
                انبلاک کردن کاربر
              </button>
            )}
          </div>
        </div>
      </section>
      <ModalDef open={modalPm} handleOpen={() => setModalPm(false)}>
        <div className="min-w-[200px] md:min-w-[350px] ">
          <h2 className="py-2 text-xl text-center">پیام های اماده</h2>
          <div className="flex flex-col gap-2 p-2">
            {readyMsg.map((item, index) => (
              <span
                className="border-b border-neutral-500 "
                key={index}
                onClick={(e) => sendReadyMsg(e, item)}
              >
                <button className="navLink border-neutral-500 ">
                  {index + 1} - {item}
                </button>
              </span>
            ))}
          </div>
        </div>
      </ModalDef>
      {loader && <LoaderCustom />}
    </>
  );
};

export default ChatScreen;

// socket.emit("message:send", {
//   receiver: "6ff83966-1d86-43ff-a77d-921955700510",
//   message: data.target.value,
//   type: "1",
// });
