import Footer from "../src/Components/Footer/Footer";
import HeadCustom from "../src/Components/Head/Head";
import Header from "../src/Components/Header/Header";
import RulesSection from "../src/Components/RulesSection/RulesSection";

export default function Rules() {
  return (
    <>
      <HeadCustom title={"قوانین"} descriptionContent={"قوانین استفاده از سوین"} />
      <Header />
      <main className="mb-7 mt-[100px]" >
        <RulesSection />
      </main>
      <Footer />
    </>
  );
}
