import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import HeadCustom from "../../../../src/Components/Head/Head";
import Editusers from "../../../../src/Components/PanelSection/Editusers/Editusers";
import PanelLayout from "../../../../src/Components/PanelSection/PanelSection";
import LoaderCustom from "../../../../src/Components/Shared/LoaderCustom/LoaderCustom";
import { GET_INFO_USER_ID } from "../../../../src/Utils/ApiRoute/apiRoutes";
import callApi from "../../../../src/Utils/callApi/callApi";

const usersId = () => {
  const { usersId } = useRouter().query;
  const [loader, setLoader] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  const getInfoUser = async () => {
    setLoader(true);
    const { data } = await callApi(
      GET_INFO_USER_ID + usersId,
      true,
      "{}",
      "get"
    );
    if (data.ok) {
      setUserInfo(data.result);
    }
    setLoader(false);
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  return (
    <>
      <HeadCustom
        title={"پنل مدیریت | تغیر اطلاعات کاربر  "}
        descriptionContent={"پنل مدیریت /  تغیر اطلاعات کاربر "}
      />
      {loader && <LoaderCustom />}
      <PanelLayout routeRender={" تغیر اطلاعات کاربر "}>
        {userInfo !== "" && <Editusers userInfo={userInfo} />}
      </PanelLayout>
    </>
  );
};

export default usersId;
