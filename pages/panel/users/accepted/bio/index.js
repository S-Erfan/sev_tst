import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadCustom from "../../../../../src/Components/Head/Head";
import Acceptbio from "../../../../../src/Components/PanelSection/Acceptedbio/Acceptbio";
import PanelLayout from "../../../../../src/Components/PanelSection/PanelSection";
import LoaderCustom from "../../../../../src/Components/Shared/LoaderCustom/LoaderCustom";
import { setLoaderGlobal } from "../../../../../src/Redux/global/globalAction";
import { GET_BIO_LIST } from "../../../../../src/Utils/ApiRoute/apiRoutes";
import callApi from "../../../../../src/Utils/callApi/callApi";

const BioId = () => {
  const dispatch = useDispatch();
  const loaderG = useSelector((state) => state.global.loader);
  const [bioWait, setBioWait] = useState([]);

  const getAllListBio = async () => {
    dispatch(setLoaderGlobal(true));
    const { data } = await callApi(GET_BIO_LIST, true, "{}", "get");
    if (data.ok) {
      setBioWait(data.result);
    }
    dispatch(setLoaderGlobal(false));
  };

  useEffect(() => {
    getAllListBio();
  }, []);

  return (
    <>
      <HeadCustom
        title={"پنل مدیریت |  تایید بیوگرافی "}
        descriptionContent={"پنل مدیریت "}
      />

      <PanelLayout routeRender={"تایید بیوگرافی "}>
        <Acceptbio list={bioWait} updater={getAllListBio} />
      </PanelLayout>

      {loaderG && <LoaderCustom />}
    </>
  );
};

export default BioId;
