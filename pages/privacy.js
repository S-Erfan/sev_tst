import Footer from "../src/Components/Footer/Footer";
import HeadCustom from "../src/Components/Head/Head";
import Header from "../src/Components/Header/Header";
import PrivacySection from "../src/Components/PrivacySection/PrivacySection";

export default function Privacy() {
  return (
    <>
      <HeadCustom title={"حریم خصوصی"} descriptionContent={"حریم خصوصی در سوین"} />
      <Header />
      <main className="mb-7 mt-[100px] min-h-[81vh]" >
        <PrivacySection />
      </main>
      <Footer />
    </>
  );
}
