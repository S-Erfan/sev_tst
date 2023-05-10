import BlogIntro from "../src/Components/BlogIntro/BlogIntro";
import Footer from "../src/Components/Footer/Footer";
import HeadCustom from "../src/Components/Head/Head";
import Header from "../src/Components/Header/Header";
import SignUpSection from "../src/Components/SignUpSection/SignUpSection";

export default function SignUp() {
  return (
    <>
      <HeadCustom title={"عضویت"} descriptionContent={"با عضویت می توانید از خدمات وبسایت سوین استفاده کنید"} />
      <Header />
      <main className="mb-7 mt-[100px] min-h-[81vh]" >
        <SignUpSection />
      </main>
      <Footer />
    </>
  );
}
