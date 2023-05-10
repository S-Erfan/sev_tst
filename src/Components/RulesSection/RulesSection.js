import Image from "next/image";
import React from "react";

import rulesVector from "../../../public/images/rules.png";

const loremTxt =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.";

const RulesSection = () => {
  return (
    <>
      <section className="container mx-auto">
        <div className="flex flex-col">
          <h3 className="text-xl md:text-3xl text-center ">قوانین استفاده</h3>

          <div className="w-full md:w-[60%] mx-auto mb-8">
            <Image
              src={rulesVector}
              alt="rules vector"
              className="w-full h-full object-cover drop-shadow-xl "
            />
          </div>

          <div className="w-full px-4 flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              {/* <h6 className="text-2xl md:text-3xl"> مقدمه و معرفی</h6> */}
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                شبکه اجتماعی در چهارچوب قوانین جمهوری اسلامی می باشد
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                این سایت بستری امن برای آشنایی و سرگرمی می باشد
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                سایت فقط یک اپلیکیشن دارد که لینک آن در صفحه اصلی قرار گرفته است
                و اپلیکیشن های دیگر به سایت مرتبط نمی باشد شبکه اجتماعی سوین هیچ
                مسئولیتی در قبال آن ندارد
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                زیر پا گذاشتن قوانین وبسایت شبکه اجتماعی سوین باعث حذف شدن اکانت
                و اشتراک می باشد
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                ارسال پیام هایی که مخالف قوانین جمهوری اسلامی ایران باشد ممنوع
                است
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                پرداخت هرگونه وجه و اعتبار به سایر کاربران یا به توصیه آنها
                ممنوع است و شبکه اجتماعی سوین هیچ مسئولیتی در قبال آن ندارد
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                ثبت نام کاربران زیر 18 سال خلاف قوانین بوده
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                تصاویر کاربران و متن های گذاشته شده توسط پلیس سایت تایید میشود
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                تصاویر پروفایل باید برای خود کاربر باشد
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                استفاده از عکس و شماره و اسم دیگران در شبکه اجتماعی سوین خلاف
                قوانین می‌باشد
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                اطلاعات شخصی شما مانند شماره تلفن برای بقیه کاربران به هیچ عنوان
                نمایش داده نمیشود
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                کاربران قبل ثبت نام موظفند قوانین وبسایت را مطالعه نمایند
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                تقاضا میشود در صورت مشاهده نقص قوانین به ما اطلاع دهید.
              </p>
              <p className="text-neutral-500 pr-0 md:pr-4 text-justify md:text-right text-sm md:text-base">
                عضویت در سایت به سوین به منزله تایید قوانین سوین از طرف کاربران
                می باشد
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RulesSection;
