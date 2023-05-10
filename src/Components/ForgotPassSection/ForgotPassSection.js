import React from "react";
import signUpVector from "../../../public/images/signup.png";
import Image from "next/image";
import { useState } from "react";
import InputCustom from "../Shared/InputCustom/InputCustom";
import {
  TypeNumber,
  TypepersianNumber,
  validationPhone,
} from "../../Utils/helper/helpers";
import notify from "../../Utils/toast/notify";
import callApi from "../../Utils/callApi/callApi";
import {
  FORGOT_PASS,
  SET_NEW_PASS,
  VERIFY_CODE,
} from "../../Utils/ApiRoute/apiRoutes";
import { CircularProgress } from "@mui/material";
import { Password } from "@mui/icons-material";
import { useRouter } from "next/router";

const ForgotPassSection = () => {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState(1);
  const [loader, setLoader] = useState(false);

  const sendPhone = async () => {
    setLoader(true);

    const newPhone = (number) => {
      const newNum = number.split("");
      newNum.shift();
      return newNum.join("");
    };

    const raw = JSON.stringify({
      phone_number: newPhone(phone),
    });

    const { data, status } = await callApi(FORGOT_PASS, false, raw, "post");

    setLoader(false);

    if (status !== 200 && status > 300) {
      if (data.errors !== undefined) {
        data.errors.map((item) => notify(item.message, "error"));
        return;
      }
      notify(data.message, "error");
    } else if (data.ok) {
      notify(data.message, "success");
      setUserId(data.result.user_id);
      setStep(2);
    } else {
      notify(data.message, "success");
    }
  };

  const sendOtp = async () => {
    setLoader(true);
    const raw = JSON.stringify({
      user_uuid: userId,
      sms_code: otp,
    });

    const { data, status } = await callApi(VERIFY_CODE, false, raw, "post");

    setLoader(false);

    if (status === 200) {
      notify(data.message, "success");
      setStep(3);
    } else {
      if (data.errors.length > 0) {
        data.errors.map((item) => notify(item.message, "error"));
        return;
      }
      notify(data.message, "error");
    }
  };

  const sendNewPass = async () => {
    setLoader(true);

    const raw = JSON.stringify({
      user_id: userId,
      password: newPass,
    });

    const { data, status } = await callApi(SET_NEW_PASS, false, raw, "post");

    setLoader(false);

    if (data.ok) {
      notify(data.message, "success");
      router.push("/login");
    } else {
      if (data.errors.length > 0) {
        data.errors.map((item) => notify(item.message, "error"));
        return;
      }
      notify(data.message, "error");
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (phone === "" || !validationPhone(phone)) {
        notify("شماره تلفن صحیح نیست", "error");
        return;
      }
      sendPhone();
    } else if (step === 2) {
      if (otp === "") {
        notify("کد را وارد کنید.", "error");
        return;
      }
      sendOtp();
    } else if (step === 3) {
      if (newPass.length < 8 || newPass === "") {
        notify("رمز ورود را با دقت بیشتری وارد کنید", "error");
        return;
      }
      if (confirmPass !== newPass) {
        notify("تکرار رمز عبور با رمز شما همخوانی ندارد.", "error");
        return;
      }
      sendNewPass();
    }
  };

  return (
    <>
      <section className="w-full flex flex-col md:flex-row-reverse items-center justify-center md:justify-between ">
        <div className="w-[100%] md:w-[40%]">
          <Image
            src={signUpVector}
            alt="vector sign up"
            className="object-cover w-[100%] h-[100%] drop-shadow-md"
          />
        </div>
        <div className="flex w-full md:w-1/2 flex-col justify-center items-center px-4">
          <form
            className="w-full sm:w-[100%] md:w-[75%] mx-auto flex flex-col justify-start items-start gap-6 mt-8 "
            onSubmit={submitHandle}
          >
            {step === 1 ? (
              <>
                <h3 className="text-base md:text-lg text-center">
                  برای بازیابی رمز ورود شماره خود را وارد کنید.
                </h3>
                <InputCustom
                  label={"شماره موبایل"}
                  placeholder={""}
                  idIn={"phoneNum"}
                  type="text"
                  value={phone}
                  onKeyDown={TypeNumber}
                  onChange={(e) => setPhone(TypepersianNumber(e.target.value))}
                />
              </>
            ) : step === 2 ? (
              <>
                <h3 className="text-base md:text-lg text-center">
                  کد otp برای شماره شما ارسال شده
                </h3>
                <InputCustom
                  label={"کد را وارد کنید"}
                  placeholder={"کد را وارد کنید"}
                  idIn={"otpSms"}
                  type="text"
                  value={otp}
                  onKeyDown={TypeNumber}
                  onChange={(e) => setOtp(TypepersianNumber(e.target.value))}
                />
              </>
            ) : (
              <>
                <h3 className="text-base md:text-lg text-center">
                  رمز عبور جدید را وارد کنید.
                </h3>
                <InputCustom
                  label={"رمز جدید"}
                  placeholder={" رمز ورود باید حداقل 8 کارکتر باشه. "}
                  idIn={"userpass"}
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <InputCustom
                  label={"تکرار رمز جدید"}
                  placeholder={""}
                  idIn={"confirm_pass"}
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </>
            )}

            <div className="w-[70%] mx-auto flex justify-center items-center mt-4 gap-x-2 ">
              <button className="btn-main min-w-0" type="submit">
                {loader ? (
                  <CircularProgress
                    className="text-neutral-600"
                    size={"1.8rem"}
                  />
                ) : (
                  "تایید"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassSection;
