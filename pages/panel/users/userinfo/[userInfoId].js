import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadCustom from "../../../../src/Components/Head/Head";
import PanelLayout from "../../../../src/Components/PanelSection/PanelSection";
import Userinfo from "../../../../src/Components/PanelSection/Userinfo/Userinfo";
import LoaderCustom from "../../../../src/Components/Shared/LoaderCustom/LoaderCustom";
import { setLoaderGlobal } from "../../../../src/Redux/global/globalAction";
import { SHOW_PROFILE_USER_ID } from "../../../../src/Utils/ApiRoute/apiRoutes";
import callApi from "../../../../src/Utils/callApi/callApi";

const Userinfoid = () => {
  const { userInfoId } = useRouter().query;
  const dispatch = useDispatch();
  const loaderG = useSelector((state) => state.global.loader);
  const [userInfo, setUserInfo] = useState("");

  const getUserInfoFetcher = async () => {
    dispatch(setLoaderGlobal(true));
    const { data } = await callApi(
      SHOW_PROFILE_USER_ID + userInfoId,
      true,
      "{}",
      "get"
    );
    if (data.ok) {
      setUserInfo(data.result);
    }
    dispatch(setLoaderGlobal(false));
  };

  useEffect(() => {
    getUserInfoFetcher();
  }, []);

  if (loaderG) return <LoaderCustom />;

  return (
    <>
      <HeadCustom
        title={"پنل مدیریت | اطلاعات کاربر  "}
        descriptionContent={"پنل مدیریت / اطلاعات کاربر "}
      />

      <PanelLayout routeRender={"اطلاعات کاربر"}>
        {userInfo !== "" && (
          <Userinfo
            userProfile={userInfo}
            name={`${userInfo.first_name} ${userInfo.last_name}`}
            images={userInfo.profile_image ? userInfo.profile_image : []}
          />
        )}
      </PanelLayout>
    </>
  );
};

export default Userinfoid;
