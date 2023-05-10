import Footer from "../src/Components/Footer/Footer";
import ForgotPassSection from "../src/Components/ForgotPassSection/ForgotPassSection";
import HeadCustom from "../src/Components/Head/Head";
import Header from "../src/Components/Header/Header";
import LoginSection from "../src/Components/LoginSection/LoginSection";

export default function ForgotPasswordPage() {
  return (
    <>
      <HeadCustom title={"فراموشی رمز عبور"} descriptionContent={"فراموشی رمز عبور "} />
      <Header />
      <main className="mb-7 mt-[100px] fullScreen" >
        {/* <LoginSection /> */}
        <ForgotPassSection />
      </main>
      <Footer />
    </>
  );
}
