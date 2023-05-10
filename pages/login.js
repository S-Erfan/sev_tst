import Footer from "../src/Components/Footer/Footer";
import HeadCustom from "../src/Components/Head/Head";
import Header from "../src/Components/Header/Header";
import LoginSection from "../src/Components/LoginSection/LoginSection";

export default function LogIn() {
  return (
    <>
      <HeadCustom title={"ورود"} descriptionContent={"ورود به حساب کاربری "} />
      <Header />
      <main className="mb-7 mt-[100px] fullScreen" >
        <LoginSection />
      </main>
      <Footer />
    </>
  );
}
