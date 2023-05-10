import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import HeadCustom from "../../../../src/Components/Head/Head";
import EditBlog from "../../../../src/Components/PanelSection/EditBlog/EditBlog";
import PanelLayout from "../../../../src/Components/PanelSection/PanelSection";
import LoaderCustom from "../../../../src/Components/Shared/LoaderCustom/LoaderCustom";
import { GET_BLOG_ID } from "../../../../src/Utils/ApiRoute/apiRoutes";
import callApi from "../../../../src/Utils/callApi/callApi";

const EditBlogId = () => {
  const { blogid } = useRouter().query;
  const [loader, setLoader] = useState(false);
  const [blog, setBlog] = useState("");

  const getInfoUser = async () => {
    setLoader(true);
    const { data } = await callApi(GET_BLOG_ID + blogid, false, "{}", "get");
    if (data.ok) {
      setBlog(data.result.blog);
    }
    setLoader(false);
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  return (
    <>
      <HeadCustom
        title={"پنل مدیریت | ویرایش بلاگ"}
        descriptionContent={"پنل مدیریت "}
      />

      <PanelLayout routeRender={"ویرایش بلاگ "}>
        <EditBlog blog={blog} />
      </PanelLayout>
      {loader && <LoaderCustom />}
    </>
  );
};

export default EditBlogId;
