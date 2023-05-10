import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import planVectore from "../../../public/images/buyP.png";
import { BUY_PACKAGE } from "../../Utils/ApiRoute/apiRoutes";
import callApi from "../../Utils/callApi/callApi";
import { toPriceFormater } from "../../Utils/helper/helpers";
import notify from "../../Utils/toast/notify";
import CardPlan from "./CardPlan";

const SubBuySection = () => {
  const router = useRouter();
  const [plan, setPlan] = useState(null);
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user);

  const changePlanHandler = (e, title, price, val) => {
    const obj = { title, price, val };
    setPlan(obj);
  };

  const payHandler = async () => {
    if (user.loginStatus === false) {
      notify("ابتدا وارد حساب کاربری بشوید.", "error");
      router.push("/login");
      return;
    }
    if (plan === null) {
      notify("باید یک پکیج را انتخاب کنید.", "error");
      return;
    }

    if (!plan.val) {
      notify("این پکیج موجود نیست.", "error");
      return;
    }

    setLoader(true);
    const raw = JSON.stringify({
      userPackage: plan.val,
    });

    try {
      const { data } = await callApi(BUY_PACKAGE, true, raw, "post");
      if (data.ok) {
        router.push(data.result.url);
      } else {
        data.errors.map((item) => notify(item.message, "error"));
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  };

  return (
    <>
      <section className="container mx-auto">
        <div className="flex flex-col">
          <div className="text-center mb-4 ">
            <h4 className="text-xl md:text-2xl font-bold ">
              خرید اشتراک و فعال سازی
            </h4>
          </div>

          <div className="w-[100%] md:w-[40%] mx-auto">
            <Image
              src={planVectore}
              alt="Help buying a subscription"
              className="w-full h-full object-cover drop-shadow-lg "
            />
          </div>

          <div className="mt-4 text-center">
            <p className="px-1 md:px-0">
              به هر کس که دوست دارید به تعداد دلخواه پیام بدهید یا با تبلیغ
              اکانت خود را در صفحه بقیه اعضا بالا ببرید
            </p>
          </div>

          <div className="mt-[4rem] mb-8 ">
            <div className="my-8 mx-auto text-center ">
              <p className="text-neutral-700">
                یکی از پلن های زیر را انتخاب کنید.
              </p>
            </div>
            <div className="flex flex-wrap -m-2 justify-center items-center">
              <CardPlan
                value={plan}
                onChange={changePlanHandler}
                idLab={"1m"}
                name="plans"
                title={" یک ماهه + 10 روز هدیه"}
                desc1={"40 روز عضویت ویژه"}
                desc2={"ارسال بی نهایت پیام دلخواه"}
                val={1}
                price={toPriceFormater(50000)}
              />
              <CardPlan
                value={plan}
                onChange={changePlanHandler}
                idLab={"2m"}
                name="plans"
                title={"دو ماهه + 15 روز هدیه"}
                desc1={"75 روز عضویت ویژه"}
                desc2={"ارسال بی نهایت پیام دلخواه"}
                val={2}
                price={toPriceFormater(75000)}
              />
              <CardPlan
                value={plan}
                onChange={changePlanHandler}
                idLab={"3m"}
                name="plans"
                title={"سه ماهه + 15 روز هدیه"}
                desc1={"105 روز عضویت ویژه"}
                desc2={"ارسال بی نهایت پیام دلخواه"}
                val={3}
                price={toPriceFormater(90000)}
              />
              <CardPlan
                value={plan}
                onChange={changePlanHandler}
                idLab={"6m"}
                name="plans"
                title={"شش ماهه + 15 روز هدیه"}
                desc1={"195 روز عضویت ویژه"}
                desc2={"ارسال بی نهایت پیام دلخواه"}
                val={6}
                price={toPriceFormater(140000)}
              />
              <CardPlan
                value={plan}
                onChange={changePlanHandler}
                idLab={"1y"}
                name="plans"
                title={"یک ساله + 15 روز هدیه"}
                desc1={"375 روز عضویت ویژه"}
                desc2={"ارسال بی نهایت پیام دلخواه"}
                val={12}
                price={toPriceFormater(160000)}
              />
              <CardPlan
                value={plan}
                onChange={changePlanHandler}
                name={"plans"}
                idLab="t1"
                title={"تبلیغ یک ماهه"}
                desc1={
                  "یک ماه بالا بردن اکانت شما در صفحه بقیه اعضا بازدید چند برابری اکانت"
                }
                price={toPriceFormater(100000)}
              />
              <CardPlan
                value={plan}
                idLab="t2"
                onChange={changePlanHandler}
                name={"plans"}
                title={"تبلیغ دو ماهه"}
                desc1={
                  "دو ماه بالا بردن اکانت شما در صفحه بقیه اعضا بازدید چند برابری اکانت"
                }
                price={toPriceFormater(130000)}
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="btn-main w-[160px] min-w-0 " onClick={payHandler}>
            {loader ? <CircularProgress size={24} /> : "پرداخت"}
          </button>
        </div>
      </section>
    </>
  );
};

export default SubBuySection;
