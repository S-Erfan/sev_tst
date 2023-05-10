import HeadCustom from "../src/Components/Head/Head";
import Header from "../src/Components/Header/Header";

import userTst from "../public/images/untitled folder 3/user-3.jpg";
import userTst1 from "../public/images/untitled folder 3/u.webp";
import Footer from "../src/Components/Footer/Footer";
import VisitSection from "../src/Components/VisitSection/VisitSection";

import userPro from "../public/images/untitled folder 3/user.jpg";
import LikedSection from "../src/Components/LikedSection/LikeSection";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import callApi from "../src/Utils/callApi/callApi";
import { GET_LIST_LIKE_USER } from "../src/Utils/ApiRoute/apiRoutes";
import LoaderCustom from "../src/Components/Shared/LoaderCustom/LoaderCustom";
import { useEffect } from "react";
import notify from "../src/Utils/toast/notify";

const userRandom = [
  { id: 1, name: "تینا", age: 23, city: "کرج", img: userPro },
  { id: 2, name: "تینا", age: 23, city: "کرج", img: userPro },
  { id: 3, name: "تینا", age: 23, city: "کرج", img: userPro },
  { id: 4, name: "تینا", age: 23, city: "کرج", img: userPro },
  { id: 5, name: "تینا", age: 23, city: "کرج", img: userPro },
  { id: 6, name: "تینا", age: 23, city: "کرج", img: userPro },
  { id: 7, name: "تینا", age: 23, city: "کرج", img: userPro },
  { id: 8, name: "تینا", age: 23, city: "کرج", img: userPro },
  { id: 9, name: "تینا", age: 23, city: "کرج", img: userPro },
];

export default function LikedPage() {
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const getListSeenFetcher = async () => {
    setLoader(true);
    const { data, status } = await callApi(
      GET_LIST_LIKE_USER,
      true,
      "{}",
      "get"
    );
    if (data.ok) {
      setList(data.result);
    } else {
      notify(data, "error");
    }
    setLoader(false);
  };

  useEffect(() => {
    if (user.loginStatus) {
      getListSeenFetcher();
    } else {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <HeadCustom
        title={"کاربران مورد علاقه"}
        descriptionContent={"کاربران مورد علاقه"}
      />
      <Header />
      <main className="mt-[100px]">
        <LikedSection usersList={list} />
      </main>
      <Footer />
      {loader && <LoaderCustom />}
    </>
  );
}
