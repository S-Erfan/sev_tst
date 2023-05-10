import HeadCustom from "../../src/Components/Head/Head";
import Header from "../../src/Components/Header/Header";
import Footer from "../../src/Components/Footer/Footer";
import ProfileSection from "../../src/Components/ProfileSection/ProfileSection";

import userProfile from "../../public/images/untitled folder 3/user-3.jpg";
import EditProfile from "../../src/Components/ProfileSection/EditProfile/EditProfile";
import ChangePassword from "../../src/Components/ProfileSection/ChangePassword/ChangePassword";

export default function PasswordChangePage() {
  return (
    <>
      <HeadCustom
        title={"ویرایش رمز ورود"}
        descriptionContent={"ویرایش رمز ورود"}
      />
      <Header />
      <main className="mt-[100px] fullScreen ">
        <ChangePassword />
      </main>
    </>
  );
}
