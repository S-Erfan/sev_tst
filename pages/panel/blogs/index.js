import { useEffect } from "react";
import { useState } from "react";
import HeadCustom from "../../../src/Components/Head/Head";
import Blogmain from "../../../src/Components/PanelSection/Blogmain/Blogmain";
import PanelLayout from "../../../src/Components/PanelSection/PanelSection";
import { GET_ALL_BLOG } from "../../../src/Utils/ApiRoute/apiRoutes";
import callApi from "../../../src/Utils/callApi/callApi";

export default function ProfilePage() {
  const [loader, setLoader] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const getAllListBlogs = async () => {
    setLoader(true);
    const { data } = await callApi(GET_ALL_BLOG, false, "{}", "get");
    if(data.ok){
      setBlogs(data.result)
    }else{
      
    }
    setLoader(false);
  };

  useEffect(() => {
    getAllListBlogs();
  }, []);

  return (
    <>
      <HeadCustom
        title={"پنل مدیریت | بلاگ ها"}
        descriptionContent={"پنل مدیریت "}
      />

      <PanelLayout routeRender={"بلاگ ها"}>
        <Blogmain blogs={blogs} uploader={getAllListBlogs} />
      </PanelLayout>
    </>
  );
}
