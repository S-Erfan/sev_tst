import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputCustom from "../Shared/InputCustom/InputCustom";
import signUpVector from "../../../public/images/signup.png";
import { useDispatch, useSelector } from "react-redux";
import { authUser, loginUser, prevStep } from "../../Redux/user/userAction";
import { useRouter } from "next/router";
import notify from "../../Utils/toast/notify";
import {
  TypeNumber,
  TypepersianNumber,
  validationPhone,
} from "../../Utils/helper/helpers";
import { CircularProgress } from "@mui/material";
import callApi from "../../Utils/callApi/callApi";
import { VERIFY_CODE } from "../../Utils/ApiRoute/apiRoutes";

const LoginSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [otp, setOtp] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    if (username === "" || pass === "" || !validationPhone(username)) {
      notify("فیلد ها را با دقت پر کنید.", "error");
      return;
    }

    const newPhoen = (number) => {
      const bo = number.split("");
      bo.shift();
      return bo.join("");
    };

    dispatch(loginUser(newPhoen(username), pass));
  };

  useEffect(() => {
    if (user.loginStatus) {
      router.push("/");
    }
  }, [user]);

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
        notify(data.message, "success");
        dispatch(prevStep());
      } else {
        notify(data.message, "error");
      }
    };
    fetcher();
  };

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
          {user.step === 1 ? (
            <>
              <h3 className="text-base md:text-lg text-center">
                لطفا فیلد ها را با دقت بر کنید
              </h3>
              <form
                className="w-full sm:w-[100%] md:w-[75%] mx-auto flex flex-col justify-start items-start gap-4 mt-8 "
                onSubmit={loginHandler}
              >
                <InputCustom
                  label={"شماره موبایل"}
                  placeholder={""}
                  idIn={"username"}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(TypepersianNumber(e.target.value))}
                />
                <InputCustom
                  label={"رمز ورود"}
                  placeholder={""}
                  idIn={"userpass"}
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />

                <div className="w-full text-center">
                  <Link href={"/forgotPassword"}>
                    <span className="text-neutral-400 text-sm ">
                      رمز خود را فراموش کردید
                    </span>
                  </Link>
                </div>

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
                  <Link href={"/signup"}>
                    <button className="btn-sec min-w-0">عضویت</button>
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <form
              className="w-full sm:w-[100%] md:w-[75%] mx-auto flex flex-col justify-start items-start gap-4 mt-8 "
              onSubmit={checkOtp}
            >
              <InputCustom
                label={"کد ارسال شده به شماره تلفن"}
                placeholder={"کد را وارد کنید."}
                idIn={"passC"}
                value={otp}
                onChange={(e) => setOtp(TypepersianNumber(e.target.value))}
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
                  type="button"
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
          )}
        </div>
      </section>
    </>
  );
};

export default LoginSection;
