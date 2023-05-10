import {
  ArrowRightOnRectangleIcon,
  CameraIcon,
  CheckBadgeIcon,
  Cog6ToothIcon,
  DevicePhoneMobileIcon,
  HomeIcon,
  PencilIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Tooltip, Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ModalDef from "../../Shared/ModalDefault/ModalDef";
import srcimage from "../../../../public/images/untitled folder 3/download.jpg";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import {
  ADD_ADMIN_USER_ID,
  BASE_URL,
  SHOW_PROFILE_IMAGE,
  ADD_PACKAGE_USER,
} from "../../../Utils/ApiRoute/apiRoutes";
import CardProfile from "../../ProfileSection/CardProfile/CardProfile";
import { TrashIcon } from "@heroicons/react/24/outline";
import SelectOptions from "../../Shared/SelectOptions/SelectOptions";
import { useRouter } from "next/router";
import callApi from "../../../Utils/callApi/callApi";
import notify from "../../../Utils/toast/notify";
import { CircularProgress } from "@mui/material";

const Userinfo = ({ userProfile, images, name }) => {
  const dispatch = useDispatch();
  const { userInfoId } = useRouter().query;
  const [loader, setLoader] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [valPackage, setValPackage] = useState({
    unavailable: true,
    id: 0,
    name: "پکیج مورد نظر انتخاب کن.",
  });
  const [userAccess, setUserAccess] = useState({
    unavailable: true,
    id: 5,
    name: "دسترسی مورد نظر انتخاب کن.",
  });

  const handleOpenGallery = () => setOpenGallery(!openGallery);
  const handleOpenSetting = () => setOpenSetting(!openSetting);
  const handleOpenAdmin = () => setOpenAdmin(!openAdmin);
  const setAdminControl = async () => {
    if (userAccess.id === 5) {
      notify("یک گزینه رو انتخاب کنید.", "error");
      return;
    }
    setLoader(true);
    const raw = JSON.stringify({
      admin_level: userAccess.id,
    });
    const { data } = await callApi(
      ADD_ADMIN_USER_ID + userInfoId,
      true,
      raw,
      "post"
    );
    if (data.ok) {
      notify(data.message, "success");
      handleOpenAdmin(false);
    } else {
      notify(data.message, "error");
      handleOpenAdmin(false);
    }
    setLoader(false);
  };

  const setPackageUser = async (e, bo = false) => {
    const { data } = await callApi(
      ADD_PACKAGE_USER(userInfoId, bo === false ? valPackage.id : 0),
      true,
      "{}",
      "get"
    );
    if (data.ok) {
      notify(data.message, "success");
      setOpenSetting(false);
    }
  };

  return (
    <>
      <section className="container mx-auto bg-[#EDEDED] shadow-lg ">
        <div className="relative bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 h-[150px] sm:rounded-t-2xl  ">
          <div className="relative top-[50%] right-[2rem] w-[120px] h-[120px] md:w-[120px] md:h-[120px]">
            {userProfile.profile_image.length === 0 ? (
              <UserCircleIcon className="rounded-[50%] w-full h-full border-0 border-[#EDEDED] object-cover bg-[#EDEDED] text-neutral-500 " />
            ) : (
              <Image
                src={`${BASE_URL}${SHOW_PROFILE_IMAGE}${userProfile.profile_image[0].id}`}
                alt={"user profile"}
                className={
                  "rounded-[50%] w-full h-full border-[4px] border-[#EDEDED] object-cover  "
                }
                width={150}
                height={150}
                onClick={handleOpenGallery}
              />
            )}

            {/* <CameraIcon className="w-[40px] h-[40px] absolute left-[5px] bottom-[5px] text-violet-500 bg-white rounded-[50%] p-2 cursor-pointer " /> */}
          </div>
          <div className="absolute left-[2rem] bottom-[1rem] flex gap-x-4 text-white ">
            <Tooltip
              content="انتخاب ادمین"
              placement="bottom"
              className="bg-white text-neutral-600 text-sm py-1 px-2 z-50 "
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: -25 },
              }}
            >
              <UserGroupIcon
                className="w-[25px] h-[25px] cursor-pointer"
                onClick={handleOpenAdmin}
              />
            </Tooltip>
            <Tooltip
              content="ویرایش اطلاعات"
              placement="bottom"
              className="bg-white text-neutral-600 text-sm py-1 px-2 z-50 "
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: -25 },
              }}
            >
              <Link href={`/panel/users/Edit/${userInfoId}`}>
                <PencilIcon className="w-[25px] h-[25px] cursor-pointer " />
              </Link>
            </Tooltip>
            {/* <span>
              <PencilIcon className="w-[25px] h-[25px] cursor-pointer " />
            </span> */}
            <Tooltip
              content="فعال یا غیرفعال کردن اشتراک"
              placement="bottom"
              className="bg-white text-neutral-600 text-sm py-1 px-2 z-50"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: -25 },
              }}
            >
              <BeenhereOutlinedIcon
                className="w-[25px] h-[25px] cursor-pointer "
                onClick={handleOpenSetting}
              />
            </Tooltip>
            <Tooltip
              content="حذف کردن کاربر"
              placement="bottom"
              className="bg-white text-neutral-600 text-sm py-1 px-2 z-50"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: -25 },
              }}
            >
              <TrashIcon
                className="w-[25px] h-[25px] cursor-pointer"
                // onClick={() => dispatch(logoutUser())}
              />
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between flex-wrap items-start mt-[90px] px-8 py-4 pb-8 text-neutral-700">
          <div className="w-full md:w-1/2  flex flex-col gap-y-4">
            <h2 className="text-2xl ">
              {userProfile.first_name} {userProfile.last_name}
              {userProfile.package !== null && (
                <CheckBadgeIcon className="w-[20px] h-[20px] text-sky-600 inline " />
              )}
            </h2>
            <h4 className="text-xl">{userProfile.age} ساله</h4>
            <p className="text-base flex gap-2 ">
              <HomeIcon width={20} height={20} />
              {userProfile.city} - {userProfile.province}
            </p>
            {/* <p className="text-base flex gap-2 ">
              <DevicePhoneMobileIcon width={20} height={20} />
              {user.phoneNumber}
              <CheckBadgeIcon className="w-[20px] h-[20px] text-sky-600 " />
            </p> */}
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-y-4">
            {userProfile.bio !== null && (
              <div className="w-full md:w-1/2 flex flex-col gap-y-4">
                <span className="text-xl">بیو:</span>
                <p className="text-base pr-3">{userProfile.bio}</p>
              </div>
            )}
            <p className="text-base flex items-center gap-2">
              <BeenhereOutlinedIcon className="w-[20px] h-[20px]" />
              {userProfile.package ? (
                <>
                  پکیج فعال: {userProfile.package} ماهه
                  <CheckBadgeIcon className="w-[20px] h-[20px] text-sky-600 " />
                </>
              ) : (
                <>
                  <span className="cursor-pointer" onClick={handleOpenSetting}>
                    برای فعال کردن اشتراک کلیک کنید.
                  </span>
                </>
              )}
            </p>
            {/* {userProfile.userPackage && (
              <p className="text-base flex gap-2">
                <HourglassEmptyRoundedIcon className="w-[20px] h-[20px]" />
                {userProfile.package_expire} روز باقی مانده از اشتراک
              </p>
            )} */}
          </div>
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
                  <CardProfile
                    src={`${BASE_URL}${SHOW_PROFILE_IMAGE}${item.id}`}
                    id={item.id}
                    // updateProfile={updateProfile}
                    deletedAdmin={() => console.log("worked" + item.id)}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </ModalDef>

      {/* modal package */}
      <ModalDef
        open={openSetting}
        handleOpen={handleOpenSetting}
        classBase={"!overflow-auto  min-h-[300px] customScrollDark"}
      >
        <div className="min-w-[300px] z-50 ">
          <h2 className="py-2 text-xl text-center">اشتراک کاربر</h2>
          <p className="px-4 mb-2 ">
            اشتراک کاربر:
            {userProfile.package === null
              ? " اشتراک ندارد"
              : userProfile.package + "ماهه"}
          </p>
        </div>
        <div className="px-4 text-center mb-5">
          {loader ? (
            <button className="select-main">
              <CircularProgress size={20} />
            </button>
          ) : (
            <SelectOptions
              listArr={[
                { unavailable: true, id: 0, name: "پکیج مورد نظر انتخاب کن." },
                { unavailable: false, id: 1, name: "یک ماهه + 10 روز هدیه" },
                { unavailable: false, id: 2, name: "دو ماهه + 15 روز هدیه" },
                { unavailable: false, id: 3, name: "سه ماهه + 15 روز هدیه" },
                { unavailable: false, id: 6, name: "شش ماهه + 15 روز هدیه" },
                {
                  unavailable: false,
                  id: 12,
                  name: "یک ساله ماهه + 15 روز هدیه",
                },
              ]}
              state={valPackage}
              changeHandler={setValPackage}
            />
          )}
        </div>
        <div className="flex w-full justify-evenly items-center px-2 my-3 gap-2">
          <button className="btn-main w-fit min-w-0" onClick={setPackageUser}>
            فعال کردن اشتراک
          </button>
          <button
            className="btn-main w-fit min-w-0 hover:red"
            onClick={(e) => setPackageUser(e, true)}
          >
            غیر فعال کردن اشتراک
          </button>
        </div>
      </ModalDef>

      {/* modal add admin */}
      <ModalDef
        open={openAdmin}
        handleOpen={handleOpenAdmin}
        classBase={"!overflow-auto  min-h-[300px] customScrollDark"}
      >
        <div className="min-w-[300px] z-50 ">
          <h2 className="py-2 text-xl text-center">انتخاب ادمین</h2>
          <p className="px-4 ">
            دسترسی کاربر:
            {userProfile.package === null
              ? " اشتراک ندارد"
              : userProfile.package}
          </p>
        </div>
        <div className="px-4 my-4 text-center">
          <SelectOptions
            listArr={[
              { unavailable: true, id: 5, name: "دسترسی مورد نظر انتخاب کن." },
              { unavailable: false, id: 0, name: "کاربر عادی" },
              { unavailable: false, id: 3, name: "ادمین سطح 2" },
              { unavailable: false, id: 2, name: "ادمین سطح 1" },
              { unavailable: false, id: 1, name: "مدیر" },
            ]}
            state={userAccess}
            changeHandler={setUserAccess}
          />
        </div>
        <div className="flex w-full justify-evenly items-center px-2 mt-[3rem] gap-2">
          <button className="btn-main w-fit min-w-0" onClick={setAdminControl}>
            تغییر دسترسی کاربر
          </button>
        </div>
      </ModalDef>
    </>
  );
};

export default Userinfo;
