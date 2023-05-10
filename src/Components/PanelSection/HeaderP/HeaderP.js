import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useSelector } from "react-redux";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

const HeaderP = () => {
  const { route } = useRouter();
  const user = useSelector((state) => state.user);

  const linkItem = [
    {
      id: 1,
      name: "داشبورد",
      path: "/panel",
      icon: <DashboardRoundedIcon sx={{ fontSize: "inherit" }} />,
    },
    {
      id: 2,
      name: "تایید کردن بیو کاربر",
      path: "/panel/users/accepted/bio",
      icon: <AddTaskRoundedIcon sx={{ fontSize: "inherit" }} />,
    },
    {
      id: 6,
      name: "تایید کردن عکس کاربر ",
      path: "/panel/users/accepted/images",
      icon: <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "inherit" }} />,
    },
    {
      id: 3,
      name: "مدیریت کاربران",
      path: "/panel/users",
      icon: <ManageAccountsRoundedIcon sx={{ fontSize: "inherit" }} />,
    },
    {
      id: 4,
      name: "بلاگ ها",
      path: "/panel/blogs",
      icon: <ArticleRoundedIcon sx={{ fontSize: "inherit" }} />,
    },
    {
      id: 5,
      name: " ساخت کاربر ",
      path: "/panel/users/create",
      icon: <BadgeOutlinedIcon sx={{ fontSize: "inherit" }} />,
    },
  ];

  const linkAdmin = [
    {
      id: 1,
      name: "داشبورد",
      path: "/panel",
      icon: <DashboardRoundedIcon sx={{ fontSize: "inherit" }} />,
    },
    {
      id: 2,
      name: "تایید کردن بیو کاربر",
      path: "/panel/users/accepted/bio",
      icon: <AddTaskRoundedIcon sx={{ fontSize: "inherit" }} />,
    },
    {
      id: 6,
      name: "تایید کردن عکس کاربر ",
      path: "/panel/users/accepted/images",
      icon: <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "inherit" }} />,
    },
    // {
    //   id: 3,
    //   name: "مدیریت کاربران",
    //   path: "/panel/users",
    //   icon: <ManageAccountsRoundedIcon sx={{ fontSize: "inherit" }} />,
    // },
    {
      id: 4,
      name: "بلاگ ها",
      path: "/panel/blogs",
      icon: <ArticleRoundedIcon sx={{ fontSize: "inherit" }} />,
    },
    // {
    //   id: 5,
    //   name: " ساخت کاربر ",
    //   path: "/panel/users/create",
    //   icon: <ArticleRoundedIcon sx={{ fontSize: "inherit" }} />,
    // },
  ];

  const linkHandler = (arr) => {
    return arr.map((item) => (
      <Link href={item.path} className={"grid place-items-center"}>
        <li
          className={`navLink w-fit md:w-full ${
            route === item.path
              ? "bg-violet-500 text-white hover:bg-violet-500 shadow-lg shadow-neutral-400 p-1 md:py-3 md:px-1 "
              : ""
          } `}
        >
          <span className="!text-[24px]">{item.icon}</span>
          <span className="hidden md:inline">{item.name}</span>
        </li>
      </Link>
    ));
  };

  return (
    <>
      <header className="w-[15%] md:w-[15%] h-screen bg-white absolute right-0 top-0 shadow-[-8px_0px_16px_0_#0005] z-20 ">
        <ul className="flex flex-col gap-4 p-[5px] md:p-3">
          {user.info.is_admin === 3
            ? linkHandler(linkAdmin)
            : linkHandler(linkItem)}
        </ul>
      </header>
    </>
  );
};

export default HeaderP;
