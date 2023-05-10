import React from "react";

const InputCustom = ({
  divClass,
  labelClass,
  inputClass,
  idIn,
  nameIn,
  placeholder,
  value,
  onChange,
  onKeyDown,
  label,
  type,
  disabled
}) => {
  return (
    <>
      <div className={`flex flex-col w-full gap-y-2 ${divClass}`}>
        <label htmlFor={idIn} className={`text-sm pr-3 ${labelClass} `}>
          {label}
        </label>
        <input
          className={`input-main ${inputClass}`}
          id={idIn}
          type={type ? type : "text"}
          name={nameIn}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled ? true : false }
        />
      </div>
    </>
  );
};

export default InputCustom;
