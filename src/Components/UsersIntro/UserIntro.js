import React from "react";
import UserCard from "../Shared/UserCardShow/UserCard";

import userPro from "../../../public/images/untitled folder 3/user.jpg";
import userPro2 from "../../../public/images/untitled folder 3/user-2.jpg";
import userPro3 from "../../../public/images/untitled folder 3/user-3.jpg";
import userPro4 from "../../../public/images/untitled folder 3/user-4.jpg";
import userPro5 from "../../../public/images/untitled folder 3/user-5.jpg";
import userPro6 from "../../../public/images/untitled folder 3/usernew.jpg";
import userPro7 from "../../../public/images/untitled folder 3/usernew2.jpg";
import userPro8 from "../../../public/images/untitled folder 3/usernew3.jpg";
import userPro9 from "../../../public/images/untitled folder 3/usernew4.jpg";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const userRandom = [
  { id: 1, name: "تینا", age: 35, city: "کرج", img: userPro },
  { id: 2, name: "زهرا", age: 23, city: "شیراز", img: userPro2 },
  { id: 3, name: "ژینا", age: 27, city: "کرج", img: userPro3 },
  { id: 4, name: "محدثه", age: 19, city: "تهران", img: userPro4 },
  { id: 5, name: "مبینا تهرانی", age: 21, city: "قم", img: userPro5 },
  { id: 6, name: "روژین", age: 23, city: "ساری", img: userPro6 },
  { id: 7, name: "نازنین", age: 24, city: "تهران", img: userPro7 },
  { id: 8, name: "معصومه", age: 22, city: "تهران", img: userPro8 },
  { id: 9, name: "زینب", age: 21, city: "اهواز", img: userPro9 },
];

const UserIntro = ({ users }) => {
  return (
    <>
      <section className="container mx-auto mt-[8rem] ">
        <div className="flex flex-wrap -m-3 ">
          {users.map((item) => {
            return (
              <UserCard
                key={item.user_id}
                age={item.age}
                name={`${item.first_name} ${item.last_name}`}
                city={item.city + " - " + item.province}
                id={item.user_id}
                imgPath={item.image === null ? "" : item.image}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default UserIntro;
