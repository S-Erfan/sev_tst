import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadCustom from "../../../../../src/Components/Head/Head";
import AcceptImages from "../../../../../src/Components/PanelSection/Acceptimages/Acceptimages";
import PanelLayout from "../../../../../src/Components/PanelSection/PanelSection";
import LoaderCustom from "../../../../../src/Components/Shared/LoaderCustom/LoaderCustom";
import { setLoaderGlobal } from "../../../../../src/Redux/global/globalAction";
import { GET_IMAGES_PROFILE_LIST } from "../../../../../src/Utils/ApiRoute/apiRoutes";
import callApi from "../../../../../src/Utils/callApi/callApi";

const ImagesAccept = () => {
  const dispatch = useDispatch();
  const loaderG = useSelector((state) => state.global.loader);
  const [imageWait, setImageWait] = useState([]);

  const getAllListImage = async () => {
    dispatch(setLoaderGlobal(true));
    const { data } = await callApi(GET_IMAGES_PROFILE_LIST, true, "{}", "get");
    setImageWait(data);
    dispatch(setLoaderGlobal(false));
  };

  useEffect(() => {
    getAllListImage();
  }, []);
  return (
    <>
      <HeadCustom
        title={"پنل مدیریت |  تایید عکس "}
        descriptionContent={"پنل مدیریت "}
      />

      <PanelLayout routeRender={"تایید عکس کاربر"}>
        <AcceptImages list={imageWait} updater={getAllListImage} />
      </PanelLayout>
      {loaderG && <LoaderCustom />}
    </>
  );
};

export default ImagesAccept;
