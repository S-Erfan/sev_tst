import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import signUpVector from "../../../public/images/signup.png";
import InputCustom from "../Shared/InputCustom/InputCustom";
import SelectOptions from "../Shared/SelectOptions/SelectOptions";

import {
  persianTypeKeys,
  TypeNumber,
  TypepersianNumber,
  validationPhone,
} from "../../Utils/helper/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  prevStep,
  registered,
  verifyCodeOtp,
} from "../../Redux/user/userAction";
import DatePickerCustom from "../Shared/DatePicker/DatePicker";
import CircularProgress from "@mui/material/CircularProgress";
import notify from "../../Utils/toast/notify";
import { useRouter } from "next/router";
import callApi from "../../Utils/callApi/callApi";
import {
  LIST_CITY,
  LIST_PROVINCE_ID,
  VERIFY_CODE,
} from "../../Utils/ApiRoute/apiRoutes";
import { setLoaderGlobal } from "../../Redux/global/globalAction";
import LoaderCustom from "../Shared/LoaderCustom/LoaderCustom";

const people = [];

const ageGeneration = () => {
  const nowYear = new Date().getFullYear();
  const date = (+nowYear).toString();
  for (let i = +nowYear - 18; i > +nowYear - 50; i--) {
    const dateInit = new Date("August 19, 1975 23:15:30").setFullYear(i);
    const nwD = new Date(dateInit).toLocaleString("fa-IR");
    const obj = { id: i, name: nwD.split("/")[0] };
    people.push(obj);
  }
};

ageGeneration();

const SignUpSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loader } = useSelector((state) => state.global);

  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [listCity, setListCity] = useState([{ id: 0, name: "انتخاب کنید." }]);
  const [valCity, setValCity] = useState(listCity[0]);
  const [listHood, setListHood] = useState([
    { id: 0, name: "ابتدا استان انتخاب کنید." },
  ]);
  const [valHood, setValHood] = useState(listHood[0]);

  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [sex, setSex] = useState(0);
  const [birthday, setBirthday] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [resendCode, setResendCode] = useState(false);

  //? otp state
  const [otp, setOtp] = useState("");

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

  //!Register handler
  const registerHandler = (e) => {
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
      valCity.id === 0 ||
      valHood.id === 0
    ) {
      notify("فیلد ها را با دقت پر کنید.", "error");
      return;
    }

    if (confPass !== pass) {
      notify("تکرار رمز ورود با رمز ورود همخوانی ندارد.", "error");
      return;
    }

    if (!validationPhone(phoneNum)) {
      notify("شماره موبایل صحیح نیست", "error");
      return;
    }

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
    });

    dispatch(registered(raw));
  };

  //! Check Otp
  const checkOtp = (e) => {
    e.preventDefault();

    if (user.uuid === "") {
      window.location.reload();
      return;
    }

    if (otp === "") {
      notify("کد را وارد کنید.", "error");
      return;
    }

    const raw = JSON.stringify({
      user_uuid: user.uuid,
      sms_code: otp,
    });

    const fetcher = async () => {
      const { data, status } = await callApi(VERIFY_CODE, false, raw, "post");
      if (status === 200) {
        dispatch(prevStep());
        notify(data.message, "success");
        router.push("/login");
      } else {
        notify(data.message, "error");
      }
    };
    fetcher();
  };

  //! Resend Code Otp
  const tryAgainSendCode = () => {
    if (!resendCode) {
      notify("باید دو دقیقه بگذرد", "error");
    } else {
      notify("کد دوباره ارسال شد.", "success");
    }
  };

  //! check resend code timer
  useEffect(() => {
    if (user.step === 2) {
      setTimeout(() => {
        setResendCode(true);
      }, 12000);
    }

    if (user.step === 1) {
      setResendCode(false);
    }

  }, [user.step]);

  //* for get list city and province
  useEffect(() => {
    if (listCity.length === 1) {
      getAllListCity();
    }
    if (valCity.id !== 0) {
      getAllProvince();
    }
  }, [listCity, valCity]);
  return (
    <>
      <section className="w-full flex flex-col md:flex-row-reverse items-center justify-center md:justify-between ">
        <div className="w-[100%] md:w-[40%]">
          <Image
            src={signUpVector}
            alt="vector sign up"
            className="object-cover w-[100%] h-[100%]"
          />
        </div>
        <div className="flex w-full md:w-1/2 flex-col justify-center items-center px-4">
          <h3 className="text-base md:text-lg text-center">
            لطفا در تکمیل پروفایل خود دقت کنید، بعد از تکمیل اطلاعات، تنها استان
            و شهرستان قابل تغییر خواهند بود
          </h3>
          {user.step === 1 ? (
            <form
              className="w-full sm:w-[100%] md:w-[75%] mx-auto flex flex-col justify-start items-start gap-4 mt-8 "
              onSubmit={registerHandler}
            >
              <InputCustom
                label={"نام"}
                placeholder={"فقط حروف فارسی"}
                idIn={"firstName"}
                value={Fname}
                onChange={(e) => setFname(e.target.value)}
                onKeyDown={persianTypeKeys}
              />
              <InputCustom
                label={"نام خانوادگی"}
                placeholder={"فقط حروف فارسی"}
                idIn={"lastName"}
                value={Lname}
                onChange={(e) => setLname(e.target.value)}
                onKeyDown={persianTypeKeys}
              />

              <div className="flex flex-col w-full gap-y-2 ">
                <label className="text-sm pr-3">جنسیت</label>
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
                <label className="text-sm pr-3">شهرستان محل سکونت</label>
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
                onKeyDown={(e) => TypeNumber(e)}
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

              <div className="w-[70%] mx-auto flex justify-center items-center mt-4 gap-x-2 ">
                <button className="btn-main min-w-0" type="submit">
                  {user.loader ? (
                    <CircularProgress
                      className="text-neutral-600"
                      size={"1.8rem"}
                    />
                  ) : (
                    "ثبت نام"
                  )}
                </button>
                <Link href={"/login"}>
                  <button className="btn-sec min-w-0"> ورود</button>
                </Link>
              </div>
            </form>
          ) : (
            <>
              <form
                className="w-full sm:w-[100%] md:w-[75%] mx-auto flex flex-col justify-start items-start gap-4 mt-8 "
                onSubmit={checkOtp}
              >
                <InputCustom
                  label={"کد ارسال شده به شماره تلفن"}
                  placeholder={"کد را وارد کنید."}
                  idIn={"passC"}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  onKeyDown={(e) => TypeNumber(e)}
                />
                <div className="w-[70%] mx-auto flex justify-center items-center mt-4 gap-x-2 ">
                  <button className="btn-main min-w-0" type="submit">
                    {user.loader ? (
                      <CircularProgress
                        className="text-neutral-600"
                        size={"1.8rem"}
                      />
                    ) : (
                      "تایید"
                    )}
                  </button>
                  <button
                    className="btn-sec min-w-0"
                    onClick={() => dispatch(prevStep())}
                  >
                    ویرایش
                  </button>
                </div>
                <div className="w-full text-center">
                  {/* <span
                    className={`text-sm ${
                      resendCode
                        ? "!opacity-100 !cursor-pointer"
                        : "opacity-50 cursor-wait"
                    } `}
                    onClick={tryAgainSendCode}
                  >
                    ارسال مجدد کد
                  </span> */}
                </div>
              </form>
            </>
          )}
        </div>
      </section>
      {loader && <LoaderCustom />}
    </>
  );
};

export default SignUpSection;
