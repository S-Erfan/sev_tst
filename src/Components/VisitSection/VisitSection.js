import React from "react";
import UserCard from "../Shared/UserCardShow/UserCard";

const VisitSection = ({ usersList }) => {
  return (
    <>
      <section className="container min-h-[85vh] mx-auto ">
        <div className="mt-[2rem] mb-[4rem] pr-3 md:pr-0 ">
          <h1 className="text-xl md:text-3xl">بازدید کنندگان</h1>
        </div>
        <div className="flex flex-wrap -m-3">
          {usersList.length === 0 ? (
            <h2 className="text-center w-full">
              هیچ کاربری پروفایل شما را ندیده است.
            </h2>
          ) : (
            usersList.map((item) => (
              <UserCard
                key={item.user_id}
                age={item.age}
                name={`${item.first_name} ${item.last_name}`}
                city={item.city + " - " + item.province}
                id={item.user_id}
                imgPath={item.image === null ? "" : item.image}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default VisitSection;
