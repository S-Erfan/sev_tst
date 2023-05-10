import HeadCustom from "../../src/Components/Head/Head";
import Header from "../../src/Components/Header/Header";
import Footer from "../../src/Components/Footer/Footer";
import OrderHisSec from "../../src/Components/ProfileSection/OrderHistorySection/OrderHisSec";

export default function OrderHistoryPage() {
  return (
    <>
      <HeadCustom
        title={"سابقه پرداخت"}
        descriptionContent={"سابقه پرداخت"}
      />
      <Header />
      <main className="mt-[100px] fullScreen ">
        <OrderHisSec />
      </main>
      <Footer />
    </>
  );
}
