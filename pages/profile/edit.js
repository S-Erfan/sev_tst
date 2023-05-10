import HeadCustom from "../../src/Components/Head/Head";
import Header from "../../src/Components/Header/Header";
import Footer from "../../src/Components/Footer/Footer";
import ProfileSection from "../../src/Components/ProfileSection/ProfileSection";

import userProfile from "../../public/images/untitled folder 3/user-3.jpg";
import EditProfile from "../../src/Components/ProfileSection/EditProfile/EditProfile";

export default function ProfileEditPage() {
  return (
    <>
      <HeadCustom
        title={"ویرایش پروفایل | حساب کاربری"}
        descriptionContent={"ویرایش پروفایل | حساب کاربری"}
      />
      <Header />
      <main className="mt-[100px] ">
        <EditProfile />
      </main>
      <Footer />
    </>
  );
}
