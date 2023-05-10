import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AsideBar, HeaderCustomTag, HumberGer } from "./HeaderStyle";
import logo from "../../../public/images/logo.jpg";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import {
  UserPlusIcon,
  ArrowLeftOnRectangleIcon,
  ShoppingBagIcon,
  PhoneIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  MagnifyingGlassCircleIcon,
  ChatBubbleLeftRightIcon,
  HandThumbUpIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import { useSelector, useDispatch } from "react-redux";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RoomPreferencesOutlined from "@mui/icons-material/RoomPreferencesOutlined";
import { authToken, logoutUser } from "../../Redux/user/userAction";
import UserNavigate from "./UserNavigate";
import {
  connectSocket,
  disconnectSocket,
} from "../../Utils/webSocket/webSocket";
import useSocket from "../../Utils/Hooks/useSocket/useSocket";

const navItems = [
  {
    id: 0,
    name: "صفحه اصلی",
    path: "/",
    icon: <HomeIcon className="w-[24px] h-[24px]" />,
  },
  {
    id: 1,
    name: "عضویت",
    path: "/signup",
    icon: <UserPlusIcon className="w-[24px] h-[24px]" />,
  },
  {
    id: 2,
    name: "ورود",
    path: "/login",
    icon: <ArrowLeftOnRectangleIcon className="w-[24px] h-[24px]" />,
  },
  {
    id: 3,
    name: "خرید اشتراک",
    path: "/subscriptions",
    icon: <ShoppingBagIcon className="w-[24px] h-[24px]" />,
  },
];

const navItemsLogin = [
  {
    id: 0,
    name: "صفحه اصلی",
    path: "/",
    icon: <HomeIcon className="w-[24px] h-[24px]" />,
  },
  {
    id: 7,
    name: "خرید اشتراک",
    path: "/subscriptions",
    icon: <ShoppingBagIcon className="w-[24px] h-[24px]" />,
  },
  {
    id: 1,
    name: "سرچ کاربران",
    path: "/search",
    icon: <MagnifyingGlassCircleIcon className="w-[24px] h-[24px]" />,
  },
  {
    id: 2,
    name: "صحفه چت",
    path: "/chat-room",
    icon: <ChatBubbleLeftRightIcon className="w-[24px] h-[24px]" />,
  },
  {
    id: 3,
    name: "کاربران مورد علاقه",
    path: "/liked",
    icon: <HandThumbUpIcon className="w-[24px] h-[24px]" />,
  },
  {
    id: 4,
    name: "بازدید کنندگان",
    path: "/visitors",
    icon: <VisibilityOutlinedIcon className="w-[24px] h-[24px]" />,
  },
  {
    id: 5,
    name: "پروفایل شما",
    path: "/profile",
    icon: <UserIcon className="w-[24px] h-[24px]" />,
  },
];

const Header = () => {
  // ?custome hook call web socket
  // const { connected } = useSocket("/mrphpinfo");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(false);
  const navEl = useRef();

  const showNavbarHandle = () => {
    setNavbar(!navbar);
  };

  // useEffect(() => {
  //   navEl.current.addEventListener("click", () => setNavbar(false), {
  //     capture: false,
  //   });
  // }, []);

  // authication user
  useEffect(() => {
    if (user.loginStatus === false) {
      if (localStorage.getItem("UTA")) {
        dispatch(authToken());
      }
    }
  }, [user]);

  return (
    <HeaderCustomTag>
      <div className="contain_berger">
        <HumberGer onClick={showNavbarHandle} active={navbar}>
          <div></div>
          <div></div>
          <div></div>
        </HumberGer>
        <Link href={"/"}>
          <Image
            src={logo}
            width={50}
            height={50}
            style={{ objectFit: "cover", minHeight: "50px" }}
            alt="logo"
          />
        </Link>
      </div>
      <div className="grid place-items-center">
        {user.loginStatus ? (
          <UserNavigate />
        ) : (
          <Link href={"/signup"}>
            <button
              className="transition duration-150 ease-out h-10 px-6 rounded-md border border-slate-400 text-slate-900 hover:bg-violet-500 hover:text-teal-50 shadow-lg "
              type="button"
            >
              عضویت
              <PersonAddAltRoundedIcon />
            </button>
          </Link>
        )}
      </div>
      <AsideBar active={navbar} ref={navEl} onClick={() => setNavbar(false)}>
        <nav
          className="py-8 px-4 customScrollDark"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col justify-start items-start gap-y-4">
            {user.loginStatus
              ? navItemsLogin.map((item) => (
                  <Link href={item.path} className="w-full" key={item.id}>
                    <li className="navLink">
                      {item.icon}
                      {item.name}
                    </li>
                  </Link>
                ))
              : navItems.map((item) => (
                  <Link href={item.path} className="w-full" key={item.id}>
                    <li className="navLink">
                      {item.icon}
                      {item.name}
                    </li>
                  </Link>
                ))}
            {user.loginStatus && user.info.is_admin !== 0 && (
              <Link
                href="/panel"
                className="w-full border-t border-neutral-400 pt-2 "
              >
                <li className="navLink">
                  <RoomPreferencesOutlined className="w-[24px] h-[24px]" />
                  پنل مدیریت
                </li>
              </Link>
            )}
            <Link
              href={"/contact-us"}
              className={`w-full pt-2 ${
                !user.info.is_admin && "border-t border-neutral-400"
              } `}
            >
              <li className="navLink">
                <PhoneIcon className="w-[24px] h-[24px]" />
                تماس با ما
              </li>
            </Link>
            <Link href={"/rules"} className="w-full">
              <li className="navLink">
                <GavelOutlinedIcon className="w-[24px] h-[24px]" />
                قوانین
              </li>
            </Link>
            <Link href={"/privacy"} className="w-full">
              <li className="navLink">
                <ShieldCheckIcon className="w-[24px] h-[24px]" />
                حریم خصوصی
              </li>
            </Link>
            <Link
              href={"/blogs"}
              className={`w-full ${
                !user.loginStatus && "border-b border-neutral-400 pb-2"
              }`}
            >
              <li className="navLink">
                <DocumentTextIcon className="w-[24px] h-[24px]" />
                بلاگ
              </li>
            </Link>
            {user.loginStatus && (
              <span
                className="w-full border-b border-neutral-400 pb-2 cursor-pointer"
                onClick={() => dispatch(logoutUser())}
              >
                <li className="navLink w-full">
                  <LogoutOutlinedIcon className="w-[24px] h-[24px]" />
                  خروج از حساب کاربری
                </li>
              </span>
            )}
          </ul>
          {/* box signup */}
          {!user.loginStatus && (
            <div className="mt-4 flex flex-col justify-start items-start gap-3 border-b border-neutral-400 pb-4 ">
              <p className="text-sm text-justify ">
                با عضویت می توانید از خدمات وبسایت سوین استفاده کنید
              </p>
              <Link
                href={"/signup"}
                className="btn-main flex justify-evenly items-center w-[70%] min-w-fit mx-auto "
              >
                <UserPlusIcon className="w-[20px] h-[20px]" />
                عضویت
              </Link>
            </div>
          )}

          <p className="mt-4 text-xs ">
            تمام حقوق این سایت متعلق به وبسایت سوین می باشد و هرگونه کبی برداری
            از این سایت بیگرد قانونی دارد
          </p>
        </nav>
      </AsideBar>
    </HeaderCustomTag>
  );
};

export default Header;
