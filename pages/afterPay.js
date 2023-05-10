import Footer from "../src/Components/Footer/Footer";
import HeadCustom from "../src/Components/Head/Head";
import PayStatus from "../src/Components/PayStatus/PayStatus";

import sucPay from "../public/images/successPay.png";
import faiPay from "../public/images/failedPayment.png";
import { useRouter } from "next/router";
import callApi from "../src/Utils/callApi/callApi";
import { PAY_CHECKER } from "../src/Utils/ApiRoute/apiRoutes";
import { useState } from "react";
import notify from "../src/Utils/toast/notify";
import { useEffect } from "react";
import LoaderCustom from "../src/Components/Shared/LoaderCustom/LoaderCustom";

export default function SignUp() {
  const router = useRouter();
  const { Status, Authority } = router.query;
  const [loader, setLoader] = useState(true);
  const [txtShow, setTxtShow] = useState("");

  const checkPayFetcher = async () => {
    setLoader(true);
    const { data } = await callApi(PAY_CHECKER + Authority, true, "{}", "get");
    if (data.ok) {
      notify(data.message, "success");
      setTxtShow(data.message);
    } else {
      notify(data.message, "error");
    }
    setLoader(false);
  };

  useEffect(() => {
    window.onload = function () {
      if (performance.navigation.type == 1) {
        router.push("/");
      }
    };
  }, [Status, Authority]);

  useEffect(() => {
    if (Authority !== undefined && loader === true) {
      checkPayFetcher();
    }
  }, [Authority]);

  return (
    <>
      <HeadCustom
        title={"پرداخت"}
        descriptionContent={"نشان دادن وضعیت پرداخت"}
      />
      {/* <Header /> */}
      <main className="h-[93vh]">
        {loader && <LoaderCustom />}
        {Status === "OK" && txtShow !== "" ? (
          <PayStatus
            route={"/"}
            title={"پرداخت موفقیت امیز بود حالا میتونی بری چت کنی"}
            status={"بازگشت به صحفه اصلی"}
            srcImg={sucPay}
            order={txtShow}
          />
        ) : (
          <PayStatus
            route={"/subscriptions"}
            title={"پرداخت موفقیت امیز نبود"}
            status={"تلاش دوباره"}
            srcImg={faiPay}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
