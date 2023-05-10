import Footer from "../../src/Components/Footer/Footer";
import HeadCustom from "../../src/Components/Head/Head";
import Header from "../../src/Components/Header/Header";

import userTst from "../../public/images/untitled folder 3/user-3.jpg";
import userTst1 from "../../public/images/untitled folder 3/u.webp";
import { useRouter } from "next/router";
import UserProfile from "../../src/Components/UserProfile/UserProfile";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import callApi from "../../src/Utils/callApi/callApi";
import {
  SEEN_USER,
  SHOW_PROFILE_USER_ID,
} from "../../src/Utils/ApiRoute/apiRoutes";

export default function UserChat({ userInfo }) {
  const { userId } = useRouter().query;
  const user = useSelector((state) => state.user);

  // const userInfo = {
  //   id: 12,
  //   name: "تینا پهلوان",
  //   age: 20,
  //   phoneConfirm: true,
  // };

  const seenUserFetcher = async () => {
    const { data, status } = await callApi(
      SEEN_USER + userId,
      true,
      "{}",
      "get"
    );
  };

  useEffect(() => {
    if (user.loginStatus) {
      seenUserFetcher();
    }
  }, [user]);

  return (
    <>
      <HeadCustom
        title={`پروفایل کاربر | ${userInfo.first_name} ${userInfo.last_name}`}
        descriptionContent={"صحفه پروفایل کاربر"}
      />
      <Header />
      <main className="mt-[60px] sm:mt-[100px] fullScreen ">
        <UserProfile userProfile={userInfo} />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { userId } = context.params;
  const { data, status } = await callApi(
    SHOW_PROFILE_USER_ID + userId,
    false,
    "{}",
    "get"
  );

  return {
    props: {
      userInfo: data.result,
    },
  };
};
