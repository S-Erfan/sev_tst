import { CloseFullscreen, SearchOffOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import UserCard from "../Shared/UserCardShow/UserCard";
import {
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/20/solid";

import userPro from "../../../public/images/untitled folder 3/user.jpg";
import userPro2 from "../../../public/images/untitled folder 3/user-2.jpg";
import userPro3 from "../../../public/images/untitled folder 3/user-3.jpg";
import userPro4 from "../../../public/images/untitled folder 3/user-4.jpg";
import userPro5 from "../../../public/images/untitled folder 3/user-5.jpg";
import DropDown from "../Shared/DropDownFilter/DropDown";
import { BoxFilterTag } from "./FilterSortStyle";
import { XMarkIcon } from "@heroicons/react/24/outline";
import BoxFilter from "./BoxFilter";

const SearchSection = ({ userlist }) => {
  const [list, setList] = useState(userlist);
  const changeList = (arr) => {
    setList(arr);
  };
  const [openBox, setOpenBox] = useState(false);

  return (
    <>
      <section className="container mx-auto flex flex-col gap-y-8 px-3 md:px-0 ">
        <div className="w-full relative md:w-[50%] bg-teal-50 rounded shadow-[0_6px_12px_-5px_rgba(0,0,0,0.5)] p-4 flex justify-between items-center mx-auto ">
          <AdjustmentsHorizontalIcon
            className="w-[25px] h-[25px] cursor-pointer transition duration-300 ease-in hover:text-violet-500 "
            onClick={() => setOpenBox(true)}
          />
          <div className="">
            <DropDown setListUser={(arr) => changeList(arr)} list={list} />
          </div>
          <BoxFilterTag className="shadow-2xl" active={openBox}>
            <BoxFilter
              setClose={() => setOpenBox(false)}
              setUserList={changeList}
            />
          </BoxFilterTag>
        </div>
        <div className="flex flex-wrap -m-3 ">
          {list.map((item) => (
            <UserCard
              key={item.user_id}
              age={item.age}
              name={`${item.first_name} ${item.last_name}`}
              city={item.city + " - " + (item.provinces !== undefined ? item.provinces : item.province) }
              id={item.uuid}
              imgPath={item.image === undefined || item.image === null ? "" : item.image}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default SearchSection;
