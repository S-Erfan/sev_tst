import { CircularProgress, TextareaAutosize } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderGlobal } from "../../../Redux/global/globalAction";
import {
  BASE_URL,
  CREATE_FAKE_PHOTO,
  CREATE_FAKE_USER,
  LIST_CITY,
  LIST_PROVINCE_ID,
  UPDATE_USER_ID,
} from "../../../Utils/ApiRoute/apiRoutes";
import callApi from "../../../Utils/callApi/callApi";
import {
  persianTypeKeys,
  TypeNumber,
  TypepersianNumber,
} from "../../../Utils/helper/helpers";
import notify from "../../../Utils/toast/notify";
import DatePickerCustom from "../../Shared/DatePicker/DatePicker";
import InputCustom from "../../Shared/InputCustom/InputCustom";
import SelectOptions from "../../Shared/SelectOptions/SelectOptions";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import UploadPofileFake from "./UploadPofileFake";
import LoaderCustom from "../../Shared/LoaderCustom/LoaderCustom";
import { getTokenLocal } from "../../../Utils/token/userToken";
import axios from "axios";

const FakeUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loaderG = useSelector((state) => state.global);

  const [listCity, setListCity] = useState([{ id: 0, name: "انتخاب کنید." }]);
  const [valCity, setValCity] = useState({ name: "انتخاب کنید.", id: 0 });
  const [listHood, setListHood] = useState([
    { id: 0, name: "ابتدا استان انتخاب کنید." },
  ]);
  const [valHood, setValHood] = useState({
    name: "ابتدا استان انتخاب کنید.",
    id: 0,
  });

  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNum, setPhoneNum] = useState(``);
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [bio, setBio] = useState("");
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState(false);
  const [images, setImages] = useState([]);

  const createFakeUser = async (e) => {
    e.preventDefault();

    if (
      phoneNum === "" ||
      pass === "" ||
      pass.length < 8 ||
      Fname === "" ||
      Lname === "" ||
      sex === "" ||
      birthday === "" ||
      confPass === "" ||
      confPass !== pass ||
      valCity.id === 0 ||
      valHood.id === 0 ||
      images.length < 1 ||
      images.length >= 5
    ) {
      notify("فیلد ها را با دقت پر کنید.", "error");
      return;
    }

    setLoader(true);

    const newPhoen = (number) => {
      const bo = number.split("");
      bo.shift();
      return bo.join("");
    };

    const raw = JSON.stringify({
      firstName: Fname,
      lastName: Lname,
      sex: sex,
      year_of_birth: birthday.unix,
      phoneNumber: newPhoen(phoneNum),
      password: pass,
      password_confirmation: confPass,
      city: valCity.name,
      provinces: valHood.name,
      bio: bio,
    });

    const { data } = await callApi(CREATE_FAKE_USER, true, raw, "post");

    if (data.ok) {
      notify(data.message, "success");
      setUserId(data.result.user_id);
      //! start fetch image upload
      setImagesHandler(data.result.user_id);
    } else if (data.errors.length >= 1) {
      const { errors } = data;
      errors.map((item) => {
        notify(item.message, "error");
      });
      setLoader(false);
    } else {
      notify(data.message, "error");
      setLoader(false);
    }
  };

  //! Get All List City
  const getAllListCity = async () => {
    dispatch(setLoaderGlobal(true));
    const { data } = await callApi(LIST_CITY, false, "{}", "get");
    setListCity([...listCity, ...data.result]);
    dispatch(setLoaderGlobal(false));
  };

  //! Get All Province (Hood)
  const getAllProvince = async () => {
    const { data } = await callApi(
      LIST_PROVINCE_ID + valCity.id,
      false,
      "{}",
      "get"
    );
    setListHood(data.result);
  };

  //* for get list city and province
  useEffect(() => {
    if (listCity.length === 1) {
      getAllListCity();
    }
    if (valCity.id !== 0) {
      getAllProvince();
    }
  }, [listCity, valCity]);

  const backRouteHandler = () => {
    router.back();
  };

  //! call set images profile
  const setImagesHandler = async (id) => {
    var raw = new FormData();
    raw.append("user_id", id);
    images.map((item) => raw.append("image[]", item.file));

    const ls = getTokenLocal();

    let config = {
      headers: {
        Authorization: `Bearer ${ls}`,
        "Content-Type": "multipart/form-data",
      },
      url: `${BASE_URL}${CREATE_FAKE_PHOTO}`,
      method: "post",
      data: raw,
    };

    try {
      const { data } = await axios(config);
      if (data.ok) {
        notify(data.message, "success");
        setBio("");
        setBirthday("");
        setSex("");
        setFname("");
        setLname("");
        setPhoneNum("")
        setPass("");
        setConfPass("");
        setImages([]);
        setValCity({ name: "انتخاب کنید.", id: 0 });
        setValHood({
          name: "ابتدا استان انتخاب کنید.",
          id: 0,
        });
      } else {
        notify(data.message, "error");
      }
    } catch (error) {
      const err = error.response.data.errors;
      err.map((item) => notify(item.message, "error"));
    }

    setLoader(false);
  };

  return (
    <>
      {loader && <LoaderCustom />}
      <div className="container mx-auto px-4 sm:px-12 flex flex-col items-center">
        <UploadPofileFake images={images} setImages={setImages} />
        <form
          className="w-full sm:w-[100%] md:w-[75%] mx-auto flex flex-col justify-start items-start gap-4 mt-8 mb-5"
          onSubmit={createFakeUser}
          async
        >
          <InputCustom
            label={"نام کاربر"}
            placeholder={"فقط حروف فارسی"}
            idIn={"firstName"}
            value={Fname}
            onChange={(e) => setFname(e.target.value)}
            onKeyDown={persianTypeKeys}
          />
          <InputCustom
            label={"نام خانوادگی کاربر"}
            placeholder={"فقط حروف فارسی"}
            idIn={"lastName"}
            value={Lname}
            onChange={(e) => setLname(e.target.value)}
            onKeyDown={persianTypeKeys}
          />

          <div className="flex flex-col w-full gap-y-2 ">
            <label className="text-sm pr-3"> جنسیت </label>
            <div className="flex flex-row items-center gap-x-4 pr-3">
              <div className={`flex items-center gap-x-4`}>
                <label htmlFor="man" className="cursor-pointer">
                  مرد
                </label>
                <input
                  id="man"
                  type="radio"
                  name="sex"
                  className="cursor-pointer"
                  value={0}
                  checked={sex === 0 ? 1 : 0}
                  onChange={(e) => setSex(0)}
                />
              </div>
              <div className={`flex items-center gap-x-4`}>
                <label htmlFor="weman" className="cursor-pointer">
                  زن
                </label>
                <input
                  id="weman"
                  type="radio"
                  name="sex"
                  className="cursor-pointer"
                  value={1}
                  checked={sex === 1 ? true : false}
                  onChange={(e) => setSex(1)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-y-2">
            <DatePickerCustom
              label={"تاریخ تولد"}
              value={birthday}
              onChange={setBirthday}
            />
          </div>

          <div className="flex flex-col w-full gap-y-2">
            <label className="text-sm pr-3">استان محل سکونت</label>
            <SelectOptions
              listArr={listCity}
              state={valCity}
              changeHandler={setValCity}
            />
          </div>

          <div className="flex flex-col w-full gap-y-2">
            <label className="text-sm pr-3">شهرستان محل</label>
            <SelectOptions
              listArr={listHood}
              state={valHood}
              changeHandler={setValHood}
            />
          </div>

          <InputCustom
            label={"شماره موبایل"}
            placeholder={"(فرمت - - - - - - - - - 09)"}
            idIn={"phone"}
            value={phoneNum}
            onKeyDown={TypeNumber}
            onChange={(e) => setPhoneNum(TypepersianNumber(e.target.value))}
          />

          <InputCustom
            label={"رمز ورود"}
            placeholder={"بین 8 تا 16 کارکتر انگلیسی وارد کنید."}
            idIn={"pass"}
            value={pass}
            type={"password"}
            onChange={(e) => setPass(e.target.value)}
          />

          <InputCustom
            label={"تکرار رمز ورود"}
            placeholder={""}
            idIn={"passC"}
            type={"password"}
            value={confPass}
            onChange={(e) => setConfPass(e.target.value)}
          />

          <label>بیو</label>
          <TextareaAutosize
            maxRows={4}
            minRows={3}
            maxLength={100}
            className="input-main resize-none customScroll w-full "
            placeholder="بیو..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <div className="w-[100%] sm:w-[70%] mx-auto flex justify-center items-center mt-4 gap-x-2 ">
            <button className="btn-main min-w-0" type="submit">
              {loader ? (
                <CircularProgress
                  className="text-neutral-600"
                  size={"1.8rem"}
                />
              ) : (
                "ثبت کاربر"
              )}
            </button>
            <span
              onClick={backRouteHandler}
              type={"button"}
              className="btn-sec min-w-0"
            >
              خروج
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default FakeUser;
