import {
  HomeIcon,
  DevicePhoneMobileIcon,
  UserCircleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import {
  Cog6ToothIcon,
  PencilIcon,
  ArrowRightOnRectangleIcon,
  CheckBadgeIcon,
  CameraIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import { Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ModalDef from "../Shared/ModalDefault/ModalDef";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SimilarUser from "./SimilarUser/SimilarUser";
import MenuAcc from "../Shared/MenuAcc/MenuAcc";
import notify from "../../Utils/toast/notify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import callApi from "../../Utils/callApi/callApi";
import {
  BASE_URL,
  LIKE_USER,
  SHOW_PROFILE_IMAGE,
  USER_BLOCK_ID,
} from "../../Utils/ApiRoute/apiRoutes";
import { getListLikeUser } from "../../Redux/user/userAction";
import { CircularProgress } from "@mui/material";

const UserProfile = ({ userProfile, name }) => {
  const { userId } = useRouter().query;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openGallery, setOpenGallery] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleOpenGallery = () => setOpenGallery(!openGallery);

  const errNotify = () => {
    notify("ابتدا وارد حساب کاربری بشوید.", "error");
  };

  const likeHandler = async () => {
    if (user.loginStatus === false) {
      notify("ابتدا وارد حساب کاربری شوید.", "error");
      return;
    }

    setLoader(true);
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

    setLoader(false);
  };

  // ! Blcok user
  const blockUserHandler = async (e) => {
    if (user.loginStatus === false) {
      notify("ابتدا وارد حساب کاربری شوید.", "error");
      return;
    }
    const { data, status } = await callApi(
      USER_BLOCK_ID + userId,
      true,
      "{}",
      "get"
    );
    if (data.ok) {
      notify(data.message, "success");
    } else {
      notify(data.message, "error");
    }
  };

  return (
    <>
      <section className="container mx-auto bg-[#EDEDED] shadow-lg ">
        <div className="relative bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 h-[150px] sm:rounded-t-2xl  ">
          <div className="relative top-[50%] right-[2rem]  w-[150px] h-[150px]">
            {userProfile.profile_image.length === 0 ? (
              <UserCircleIcon className="rounded-[50%] w-full h-full border-0 border-[#EDEDED] object-cover bg-[#EDEDED] text-neutral-500 " />
            ) : (
              <Image
                src={`${BASE_URL}${SHOW_PROFILE_IMAGE}${userProfile.profile_image[0].id}`}
                // src={userProfile.profile_image[0].path}
                alt={"user profile"}
                className={
                  "rounded-[50%] w-full h-full border-[4px] border-[#EDEDED] object-cover  "
                }
                onClick={handleOpenGallery}
                width={150}
                height={150}
              />
            )}

            {/* <UserCircleIcon className="rounded-[50%] w-full h-full border-0 border-[#EDEDED] object-cover bg-[#EDEDED] text-neutral-500 " /> */}
          </div>
          <div className="absolute left-[2rem] bottom-[1rem] flex gap-x-4 text-white ">
            <Tooltip
              content="چت کردن"
              placement="bottom"
              className="bg-white text-neutral-600 text-sm py-1 px-2 "
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: -25 },
              }}
            >
              {user.loginStatus ? (
                <Link href={`/chat-room/${userId}`}>
                  <ChatBubbleBottomCenterIcon className="w-[25px] h-[25px] cursor-pointer " />
                </Link>
              ) : (
                <ChatBubbleBottomCenterIcon
                  className="w-[25px] h-[25px] cursor-pointer "
                  onClick={errNotify}
                />
              )}
            </Tooltip>
            {/* <span>
            <PencilIcon className="w-[25px] h-[25px] cursor-pointer " />
          </span> */}
            <Tooltip
              content="افزودن به علاقه مندی"
              placement="bottom"
              className="bg-white text-neutral-600 text-sm py-1 px-2 "
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: -25 },
              }}
            >
              {loader ? (
                <CircularProgress size={20} />
              ) : !user.loginStatus ? (
                <FavoriteOutlinedIcon
                  className="w-[25px] h-[25px] cursor-pointer "
                  onClick={likeHandler}
                />
              ) : user.likedUser[userId] ? (
                <FavoriteOutlinedIcon
                  onClick={likeHandler}
                  className="transition text-red-600 duration-150 ease-linear hover:scale-125 hover:text-red-600 cursor-pointer "
                />
              ) : (
                <FavoriteOutlinedIcon
                  className="w-[25px] h-[25px] cursor-pointer "
                  onClick={likeHandler}
                />
              )}
            </Tooltip>
            <MenuAcc
              btnMenu={
                <EllipsisVerticalIcon className="w-[25px] h-[25px] cursor-pointer" />
              }
              menuItems={[["بلاک کردن", blockUserHandler]]}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between flex-wrap items-start mt-[90px] px-8 py-4 pb-8 text-neutral-700">
          <div className="w-full md:w-1/2  flex flex-col gap-y-4">
            <h2 className="text-2xl flex gap-2 items-center">
              {userProfile.first_name} {userProfile.last_name}
              {userProfile.package !== null && (
                <CheckBadgeIcon className="w-[20px] h-[20px] text-sky-600 " />
              )}
            </h2>
            <h4 className="text-xl">{userProfile.age} ساله</h4>
            <p className="text-base flex gap-2 ">
              <HomeIcon width={20} height={20} />
              {userProfile.city} - {userProfile.province}
            </p>
          </div>

          {userProfile.bio !== null && (
            <div className="w-full md:w-1/2 flex flex-col gap-y-4">
              <span className="text-xl">بیو:</span>
              <p className="text-base pr-3">{userProfile.bio}</p>
            </div>
          )}
        </div>
        <div className="px-8 ">
          <div className="flex justify-start items-center flex-wrap -m-2 ">
            {userProfile.profile_image.map((item, index) => (
              <div
                className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 relative p-3"
                key={index}
              >
                <Image
                  src={`${BASE_URL}${SHOW_PROFILE_IMAGE}${item.id}`}
                  alt="gallery user"
                  className="w-full h-[300px] md:min-h-[300px] md:max-h-[300px] md:h-[300px] object-cover rounded-lg "
                  width={1000}
                  height={1000}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[4rem] px-8">
          <SimilarUser listUser={userProfile.similar_user} />
        </div>
      </section>

      {/* modals */}
      {/* modal profile and galllery */}
      <ModalDef open={openGallery} handleOpen={handleOpenGallery}>
        <div>
          <Swiper
            scrollbar={{
              hide: false,
            }}
            modules={[Scrollbar]}
            className="h-[500px] roun"
          >
            {userProfile.profile_image.length !== 0 &&
              userProfile.profile_image.map((item) => (
                <SwiperSlide key={item.href}>
                  <Image
                    src={`${BASE_URL}${SHOW_PROFILE_IMAGE}${item.id}`}
                    alt="gallery user"
                    className="w-full h-full object-cover "
                    width={1000}
                    height={1000}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </ModalDef>
    </>
  );
};

export default UserProfile;
