import Image from "next/image";
import React, { useState } from "react";
import {
  HomeIcon,
  ChatBubbleBottomCenterIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Link from "next/link";
import defaultImg from "../../../../public/images/profile_default.png";
import callApi from "../../../Utils/callApi/callApi";
import {
  BASE_URL,
  LIKE_USER,
  SHOW_PROFILE_IMAGE,
  SHOW_PROFILE_USER_ID,
} from "../../../Utils/ApiRoute/apiRoutes";
import notify from "../../../Utils/toast/notify";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getListLikeUser } from "../../../Redux/user/userAction";
import { useEffect } from "react";

const UserCard = ({ imgPath, name, age, city, id, soloItem }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const [liked, setLiked] = useState(false);

  const likeHandler = async () => {
    if (user.loginStatus === false) {
      notify("ابتدا وارد حساب کاربری شوید.", "error");
      return;
    }

    setLoader(true);
    const { data, status } = await callApi(LIKE_USER + id, true, "{}", "get");
    if (data.ok) {
      notify(data.message, "success");
    } else if (data.ok === false) {
      notify(data.message, "error");
    } else {
      notify(data, "error");
    }

    dispatch(getListLikeUser());

    setLoader(false);
  };

  const errNotify = () => {
    notify("ابتدا وارد حساب کاربری بشوید.", "error");
  };

  return (
    <>
      <div
        className={`${
          soloItem
            ? "w-full"
            : "w-[95%] mx-auto  md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 "
        }  flex flex-col  `}
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
          <div className="bg-cover h-[350px] relative">
            <Image
              alt="user profile"
              src={
                imgPath === ""
                  ? defaultImg
                  : `${BASE_URL}${SHOW_PROFILE_IMAGE}${imgPath}`
              }
              className={"w-[100%] h-[100%] object-cover object-top	"}
              // width={500}
              fill
            />
          </div>
          <div className="p-4 flex-1 flex flex-col items-center">
            <h3 className="mb-4 text-xl">{name}</h3>
            <div className="mb-4 text-grey-darker text-sm flex-1">
              <p className="text-center">{age} ساله</p>
              <p className="flex items-center gap-1 ">
                <HomeIcon width={20} height={20} /> {city}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-2 text-xs text-gray-800 no-underline tracking-wide flex justify-center items-center gap-4">
              {user.loginStatus ? (
                <Link href={`/chat-room/${id}`}>
                  <ChatBubbleBottomCenterIcon
                    width={20}
                    className="transition duration-150 ease-linear hover:scale-125 cursor-pointer "
                  />
                </Link>
              ) : (
                <ChatBubbleBottomCenterIcon
                  width={20}
                  className="transition duration-150 ease-linear hover:scale-125 cursor-pointer"
                  onClick={errNotify}
                />
              )}

              <Link href={`/user/${id}`}>
                <UserIcon
                  width={20}
                  className="transition duration-150 ease-linear hover:scale-125 cursor-pointer "
                />
              </Link>
              {loader ? (
                <CircularProgress size={20} />
              ) : !user.loginStatus ? (
                <HeartIcon
                  onClick={likeHandler}
                  width={20}
                  className="transition duration-150 ease-linear hover:scale-125 hover:text-red-600 cursor-pointer "
                />
              ) : user.likedUser[id] ? (
                <FavoriteOutlinedIcon
                  onClick={likeHandler}
                  width={20}
                  className="transition text-red-600 duration-150 ease-linear hover:scale-125 hover:text-red-600 cursor-pointer "
                />
              ) : (
                <HeartIcon
                  onClick={likeHandler}
                  width={20}
                  className="transition duration-150 ease-linear hover:scale-125 hover:text-red-600 cursor-pointer "
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
