import {
  HomeIcon,
  DevicePhoneMobileIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Cog6ToothIcon,
  PencilIcon,
  ArrowRightOnRectangleIcon,
  CheckBadgeIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import { Tooltip, Button } from "@material-tailwind/react";
import ModalDef from "../Shared/ModalDefault/ModalDef";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/user/userAction";
import UploadProfile from "./UploadProfile/UploadProfile";
import { useRouter } from "next/router";
import callApi from "../../Utils/callApi/callApi";
import axios from "axios";
import CardProfile from "./CardProfile/CardProfile";
import { BASE_URL, SHOW_PROFILE_IMAGE } from "../../Utils/ApiRoute/apiRoutes";

const ProfileSection = ({ userProfile, updateProfile }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [openGallery, setOpenGallery] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openUploadProfile, setOpenUploadProfile] = useState(false);

  const handleOpenGallery = () => setOpenGallery(!openGallery);
  const handleOpenSetting = () => setOpenSetting(!openSetting);
  const handleOpenUpload = () => setOpenUploadProfile(!openUploadProfile);

  useEffect(() => {
    if (!user.loginStatus) {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    if (userProfile.length === 0) {
      setOpenGallery(false);
    }
  }, [userProfile]);

  const counterDaysPackage = (d) => {
    const date = new Date(d).getTime();
    const dateNow = new Date().getTime();
    // محاسبه اختلاف timestamp ها
    const timeDiff = date - dateNow;
    // تبدیل به عدد روز
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return dayDiff;
  };

  return (
    <>
      <section className="container mx-auto bg-[#EDEDED] shadow-lg ">
        <div className="relative bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 h-[150px] sm:rounded-t-2xl  ">
          <div className="relative top-[50%] right-[2rem]  w-[150px] h-[150px]">
            {userProfile.length === 0 ? (
              <UserCircleIcon className="rounded-[50%] w-full h-full border-0 border-[#EDEDED] object-cover bg-[#EDEDED] text-neutral-500 " />
            ) : (
              <Image
                src={`${BASE_URL}${SHOW_PROFILE_IMAGE}${userProfile[0].image_id}`}
                alt={"user profile"}
                className={
                  "rounded-[50%] w-full h-full border-[4px] border-[#EDEDED] object-cover  "
                }
                fill
                onClick={handleOpenGallery}
              />
            )}

            <CameraIcon
              className="w-[40px] h-[40px] absolute left-[5px] bottom-[5px] text-violet-500 bg-white rounded-[50%] p-2 cursor-pointer "
              onClick={handleOpenUpload}
            />
          </div>
          <div className="absolute left-[2rem] bottom-[1rem] flex gap-x-4 text-white ">
            <Tooltip
              content="ویرایش اطلاعات"
              placement="bottom"
              className="bg-white text-neutral-600 text-sm py-1 px-2 "
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: -25 },
              }}
            >
              <Link href={"/profile/edit"}>
                <PencilIcon className="w-[25px] h-[25px] cursor-pointer " />
              </Link>
            </Tooltip>
            {/* <span>
              <PencilIcon className="w-[25px] h-[25px] cursor-pointer " />
            </span> */}
            <Tooltip
              content="تنظیمات"
              placement="bottom"
              className="bg-white text-neutral-600 text-sm py-1 px-2 "
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: -25 },
              }}
            >
              <Cog6ToothIcon
                className="w-[25px] h-[25px] cursor-pointer "
                onClick={handleOpenSetting}
              />
            </Tooltip>
            <Tooltip
              content="خروج از حساب کاربری"
              placement="bottom"
              className="bg-white text-neutral-600 text-sm py-1 px-2 "
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: -25 },
              }}
            >
              <ArrowRightOnRectangleIcon
                className="w-[25px] h-[25px] cursor-pointer"
                onClick={() => dispatch(logoutUser())}
              />
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between flex-wrap items-start mt-[90px] px-8 py-4 pb-8 text-neutral-700">
          <div className="w-full md:w-1/2  flex flex-col gap-y-4">
            <h2 className="text-2xl ">
              {user.info.firstName} {user.info.lastName}
            </h2>
            <h4 className="text-xl">
              {user.info.age} ساله
            </h4>
            <p className="text-base flex gap-2 ">
              <HomeIcon width={20} height={20} />
              {user.info.city} - {user.info.provinces}
            </p>
            <p className="text-base flex gap-2 ">
              <DevicePhoneMobileIcon width={20} height={20} />
              {user.info.phoneNumber}
              <CheckBadgeIcon className="w-[20px] h-[20px] text-sky-600 " />
            </p>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-y-4">
            <span className="text-xl">بیو:</span>
            {user.info.bio ? (
              <p className="text-base pr-3">{user.info.bio}</p>
            ) : (
              <Link
                href={"/profile/edit"}
                className="text-center flex justify-center items-center cursor-pointer "
              >
                برای ویرایش بیو کلیک کنید.
                <PencilIcon className="w-[15px] h-[15px] text-violet-400 " />
              </Link>
            )}
            <p className="text-base flex items-center gap-2">
              <BeenhereOutlinedIcon className="w-[20px] h-[20px]" />
              {user.info.userPackage ? (
                <>
                  پکیج فعال: {user.info.userPackage} ماهه
                  <CheckBadgeIcon className="w-[20px] h-[20px] text-sky-600 " />
                </>
              ) : (
                <>
                  <Link href={"/subscriptions"}>
                    برای خرید اشتراک کلیک کنید.
                  </Link>
                </>
              )}
            </p>
            {user.info.userPackage && (
              <p className="text-base flex gap-2">
                <HourglassEmptyRoundedIcon className="w-[20px] h-[20px]" />
                {counterDaysPackage(user.info.package_expire)} روز باقی مانده از
                اشتراک
              </p>
            )}
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
            {userProfile.length !== 0 &&
              userProfile.map((item) => (
                <SwiperSlide key={item.href}>
                  <CardProfile
                    src={`${BASE_URL}${SHOW_PROFILE_IMAGE}${item.image_id}`}
                    id={item.image_id}
                    updateProfile={updateProfile}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </ModalDef>

      {/* modal setting */}
      <ModalDef open={openSetting} handleOpen={handleOpenSetting}>
        <div className="min-w-[300px] ">
          <h2 className="py-2 text-xl text-center">تنظیمات</h2>
          <ul className="flex flex-col p-3">
            <Link href={"/profile/edit"}>
              <li className="navLink">ویرایش اطلاعات</li>
            </Link>
            <Link href={"/profile/oreder-history"}>
              <li className="navLink">سابقه پرداخت</li>
            </Link>
            <Link href={"/"}>
              <li className="navLink">کاربران بلاک شده</li>
            </Link>
            <Link href={"/profile/password-change"}>
              <li className="navLink">تغییر رمز ورود</li>
            </Link>
          </ul>
        </div>
      </ModalDef>
      {/* modal upload image */}
      <UploadProfile
        open={openUploadProfile}
        handleOpen={handleOpenUpload}
        updateProfile={updateProfile}
      />
    </>
  );
};

export default ProfileSection;
