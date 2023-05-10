import ContactUs from "../src/Components/ContactUs/ContactUs";
import Footer from "../src/Components/Footer/Footer";
import HeadCustom from "../src/Components/Head/Head";
import Header from "../src/Components/Header/Header";

export default function Contact_Us() {
  return (
    <>
      <HeadCustom title={"تماس با ما"} descriptionContent={"تماس با ما / راه های ارتباطی با سوین"} />
      <Header />
      <main className="mb-7 mt-[100px]" >
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}
