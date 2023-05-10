import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadCustom from "../../../src/Components/Head/Head";
import PanelLayout from "../../../src/Components/PanelSection/PanelSection";
import UsersList from "../../../src/Components/PanelSection/UsersList/UsersList";
import LoaderCustom from "../../../src/Components/Shared/LoaderCustom/LoaderCustom";
import { setLoaderGlobal } from "../../../src/Redux/global/globalAction";
import { LIST_ALL_USER } from "../../../src/Utils/ApiRoute/apiRoutes";
import callApi from "../../../src/Utils/callApi/callApi";

function index() {
  const dispatch = useDispatch();
  const loaderG = useSelector((state) => state.global.loader);
  const [listUser, setListUser] = useState([]);

  const getAllListBio = async () => {
    dispatch(setLoaderGlobal(true));
    const { data } = await callApi(LIST_ALL_USER, true, "{}", "get");
    if (data.ok) {
      setListUser(data.result);
    }
    dispatch(setLoaderGlobal(false));
  };

  useEffect(() => {
    getAllListBio();
  }, []);

  return (
    <>
      <HeadCustom
        title={"پنل مدیریت |  لیست کاربر "}
        descriptionContent={"پنل مدیریت "}
      />

      <PanelLayout routeRender={" لیست کاربر"}>
        <UsersList list={listUser} updater={getAllListBio} />
      </PanelLayout>

      {loaderG && <LoaderCustom />}
    </>
  );
}

export default index;
