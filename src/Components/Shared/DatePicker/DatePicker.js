import React, { useEffect, useRef, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import opacity from "react-element-popper/animations/opacity";
import "react-multi-date-picker/styles/colors/purple.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { convertTimeStamp } from "../../../Utils/helper/helpers";
import {
  ArrowBack,
  ArrowBackIos,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

const DatePickerCustom = ({ labelClass, label, value, onChange, disabled }) => {
  const dateRef = useRef();

  const handle = () => {
    setTimeout(() => {
      const el = dateRef.current.querySelector(".rmdp-header-values");
      const bo = el.querySelectorAll("span")[1];
      bo.click();
    }, 100);
  };

  function CustomButton({ direction, handleClick, disabled }) {
    return (
      <i
        onClick={handleClick}
        style={{
          padding: "0 10px",
          fontWeight: "bold",
          color: disabled ? "gray" : "blue",
        }}
        className={disabled ? "cursor-default" : "cursor-pointer"}
      >
        {direction === "right" ? (
          <ChevronLeft className="w-[35px] h-[35px]" />
        ) : (
          <ChevronRight className="w-[35px] h-[35px]" />
        )}
      </i>
    );
  }

  return (
    <>
      <label className={`text-sm pr-3 ${labelClass} `}>{label}</label>
      <DatePicker
        ref={dateRef}
        // hideOnScroll
        editable={false}
        animations={[opacity()]}
        value={value}
        calendar={persian}
        locale={persian_fa}
        inputClass="input-main"
        className="rmdp-mobile purple"
        calendarPosition="bottom-right"
        maxDate={new DateObject()}
        onChange={onChange}
        disabled={disabled}
        renderButton={<CustomButton />}
        // months={ () =>  console.log("first")}
        onOpen={handle}
        // onOpenPickNewDate={() =>}
        // onFocusedDateChange={() => console.log("first")}
      />
    </>
  );
};

export default DatePickerCustom;
