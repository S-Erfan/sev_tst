import HeadCustom from "../src/Components/Head/Head";
import Header from "../src/Components/Header/Header";

import userTst from "../public/images/untitled folder 3/user-3.jpg";
import userTst1 from "../public/images/untitled folder 3/u.webp";
import Footer from "../src/Components/Footer/Footer";
import VisitSection from "../src/Components/VisitSection/VisitSection";

import userPro from "../public/images/untitled folder 3/user.jpg";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import callApi from "../src/Utils/callApi/callApi";
import { GET_LIST_SEEN_USER } from "../src/Utils/ApiRoute/apiRoutes";
import { useState } from "react";
import notify from "../src/Utils/toast/notify";
import LoaderCustom from "../src/Components/Shared/LoaderCustom/LoaderCustom";


export default function Visitors() {
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const getListSeenFetcher = async () => {
    setLoader(true);
    const { data, status } = await callApi(
      GET_LIST_SEEN_USER,
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
      <HeadCustom title={"بازدید کنند"} descriptionContent={"صحفه چت ها"} />
      <Header />
      <main className="mt-[100px]">
        <VisitSection usersList={list} />
      </main>
      <Footer />
      {loader && <LoaderCustom />}
    </>
  );
}
