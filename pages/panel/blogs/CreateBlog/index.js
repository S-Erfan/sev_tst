import React from "react";
import HeadCustom from "../../../../src/Components/Head/Head";
import CreateBlogs from "../../../../src/Components/PanelSection/CreateBlog/CreateBlogs";
import PanelLayout from "../../../../src/Components/PanelSection/PanelSection";

const index = () => {
  return (
    <>
      <HeadCustom
        title={"پنل مدیریت | بلاگ ها"}
        descriptionContent={"پنل مدیریت "}
      />

      <PanelLayout routeRender={"نوشتن بلاگ "}>
        <CreateBlogs />
      </PanelLayout>
    </>
  );
};

export default index;
