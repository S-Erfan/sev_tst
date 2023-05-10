import React, { useState } from "react";
import HeadCustom from "../../../../src/Components/Head/Head";
import FakeUser from "../../../../src/Components/PanelSection/CreateFakeUser/FakeUser";
import PanelLayout from "../../../../src/Components/PanelSection/PanelSection";

const CreateUserPage = () => {
  return (
    <>
      <HeadCustom
        title={"پنل مدیریت | ساخت کاربر"}
        descriptionContent={"پنل مدیریت /  ساخت کاربر "}
      />
      <PanelLayout routeRender={" ساخت کاربر "}>
        <FakeUser />
      </PanelLayout>
    </>
  );
};

export default CreateUserPage;
