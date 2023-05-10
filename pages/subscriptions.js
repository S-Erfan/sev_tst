import Footer from "../src/Components/Footer/Footer";
import HeadCustom from "../src/Components/Head/Head";
import Header from "../src/Components/Header/Header";
import SubBuySection from "../src/Components/SubBuySection/SubBuySection";

export default function Subscriptions() {
  return (
    <>
      <HeadCustom title={"خرید اشتراک و فعال سازی"} descriptionContent={"خرید اشتراک و فعال سازی"} />
      <Header />
      <main className="mb-7 mt-[100px]" >
        <SubBuySection />
      </main>
      <Footer />
    </>
  );
}
