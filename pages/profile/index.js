import HeadCustom from "../../src/Components/Head/Head";
import Header from "../../src/Components/Header/Header";
import Footer from "../../src/Components/Footer/Footer";
import ProfileSection from "../../src/Components/ProfileSection/ProfileSection";

import userProfile from "../../public/images/untitled folder 3/user-3.jpg";
import { useEffect } from "react";
import { useState } from "react";
import callApi from "../../src/Utils/callApi/callApi";
import { LIST_PROFILE_IMAGES } from "../../src/Utils/ApiRoute/apiRoutes";
import notify from "../../src/Utils/toast/notify";

export default function ProfilePage() {
  const [profilesUser, setProfilesUser] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetcher = async () => {
    setLoader(true);
    const { data, status } = await callApi(
      LIST_PROFILE_IMAGES,
      true,
      "{}",
      "get"
    );

    data.ok ? setProfilesUser(data.result) : notify(data.message, "error");
    setLoader(false);
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <>
      <HeadCustom
        title={"پروفایل | حساب کاربری"}
        descriptionContent={"پروفایل | حساب کاربری"}
      />
      <Header />
      <main className="mt-[60px] sm:mt-[100px] fullScreen ">
        <ProfileSection userProfile={profilesUser} updateProfile={fetcher} />
      </main>
      <Footer />
    </>
  );
}
