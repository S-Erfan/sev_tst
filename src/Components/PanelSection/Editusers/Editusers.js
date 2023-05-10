import { CircularProgress, TextareaAutosize } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderGlobal } from "../../../Redux/global/globalAction";
import {
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

const Editusers = ({ userInfo }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loaderG = useSelector((state) => state.global);

  const [listCity, setListCity] = useState([{ id: 1, name: "انتخاب کنید." }]);
  const [valCity, setValCity] = useState({ name: userInfo.city, id: 1 });
  const [listHood, setListHood] = useState([
    { id: 1, name: "ابتدا استان انتخاب کنید." },
  ]);
  const [valHood, setValHood] = useState({ name: userInfo.provinces, id: 1 });

  const [Fname, setFname] = useState(userInfo.first_name);
  const [Lname, setLname] = useState(userInfo.last_name);
  const [sex, setSex] = useState(userInfo.sex);
  const [birthday, setBirthday] = useState(
    new Date(userInfo.year_of_birth * 1000)
  );
  const [phoneNum, setPhoneNum] = useState(`0${userInfo.phone_number}`);
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [bio, setBio] = useState(userInfo.bio === null ? "" : userInfo.bio);
  const [loader, setLoader] = useState(false);

  const changeUserInfoAdmin = async (e) => {
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
      confPass !== pass
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
    const { usersId } = router.query;

    const { data } = await callApi(UPDATE_USER_ID + usersId, true, raw, "post");

    if (data.ok) {
      notify(data.message, "success");
      router.back();
    } else if (data.errors.length >= 1) {
      const { errors } = data;
      errors.map((item) => {
        notify(item.message, "error");
      });
    } else {
      notify(data.message, "error");
    }

    setLoader(false);
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

  return (
    <>
      <div className="container mx-auto px-4 sm:px-12 flex flex-col items-center">
        <form
          className="w-full sm:w-[100%] md:w-[75%] mx-auto flex flex-col justify-start items-start gap-4 mt-8 mb-5"
          onSubmit={changeUserInfoAdmin}
          async
        >
          <InputCustom
            label={"تغییر نام "}
            placeholder={"فقط حروف فارسی"}
            idIn={"firstName"}
            value={Fname}
            onChange={(e) => setFname(e.target.value)}
            onKeyDown={persianTypeKeys}
          />
          <InputCustom
            label={" تغییر نام خانوادگی "}
            placeholder={"فقط حروف فارسی"}
            idIn={"lastName"}
            value={Lname}
            onChange={(e) => setLname(e.target.value)}
            onKeyDown={persianTypeKeys}
          />

          <div className="flex flex-col w-full gap-y-2 ">
            <label className="text-sm pr-3"> تغییر جنسیت </label>
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
              label={" تغییر تاریخ تولد"}
              value={birthday}
              onChange={setBirthday}
            />
          </div>

          <div className="flex flex-col w-full gap-y-2">
            <label className="text-sm pr-3"> تغییر استان محل سکونت </label>
            <SelectOptions
              listArr={listCity}
              state={valCity}
              changeHandler={setValCity}
            />
          </div>

          <div className="flex flex-col w-full gap-y-2">
            <label className="text-sm pr-3"> تغییر شهرستان محل </label>
            <SelectOptions
              listArr={listHood}
              state={valHood}
              changeHandler={setValHood}
            />
          </div>

          <InputCustom
            label={" تغییر شماره موبایل"}
            placeholder={"(فرمت - - - - - - - - - 09)"}
            idIn={"phone"}
            value={phoneNum}
            onKeyDown={TypeNumber}
            onChange={(e) => setPhoneNum(TypepersianNumber(e.target.value))}
          />

          <InputCustom
            label={" تغییر رمز ورود"}
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

          <div className="w-[70%] mx-auto flex justify-center items-center mt-4 gap-x-2 ">
            <button className="btn-main min-w-0" type="submit">
              {loader ? (
                <CircularProgress
                  className="text-neutral-600"
                  size={"1.8rem"}
                />
              ) : (
                "ثبت تغییرات "
              )}
            </button>
            <button
              onClick={backRouteHandler}
              type={"button"}
              className="btn-sec min-w-0"
            >
              خروج
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Editusers;