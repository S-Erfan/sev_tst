import Image from "next/image";
import React from "react";

import contactUsVector from "../../../public/images/contact.png";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailRoundedIcon from "@mui/icons-material/MailRounded";

const ContactUs = () => {
  return (
    <>
      <section className="container mx-auto min-h-[81vh]">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full md:w-[60%] ">
            <Image
              src={contactUsVector}
              alt={"contact us guid"}
              className="w-full h-full object-cover drop-shadow-lg"
            />
          </div>

          <div className="mt-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold ">
              پشتیبانی 24 ساعته سوین
            </h1>
          </div>

          <div className="mt-8 text-center">
            <p className="px-4">
              جهت رفع هرگونه مشکل و مشاوره و پیگیری مزاحمت و دزدی و کلاهبرداری و
              اخاذی می توانید به ایدی{" "}
              <span className="text-neutral-500 " dir="ltr">
                @Poshtibani_ssevin
              </span>
              در تلگرام پیام ارسال کنید.
            </p>
            <p className="px-4 mt-3 ">
              یا به
              <span className="text-neutral-500">
                {" "}
                this.is.ssevin@gmail.com{" "}
              </span>
              ایمیل ارسال کنید
            </p>
          </div>

          <div className="flex mx-auto justify-center items-center gap-x-4 mt-6 text-violet-700">
            <TelegramIcon className="w-[50px] h-[50px] transition duration-300 drop-shadow-md hover:scale-[1.2] cursor-pointer " />
            <WhatsAppIcon className="w-[50px] h-[50px] transition duration-300 drop-shadow-md hover:scale-[1.2] cursor-pointer " />
            <MailRoundedIcon className="w-[50px] h-[50px] transition duration-300 drop-shadow-md hover:scale-[1.2] cursor-pointer " />
          </div>

          {/* <span className="text-neutral-400 text-center mt-7 ">
            به هیچ وجه با شماره پشتیبانی تماس نگیرید.
          </span> */}
        </div>
      </section>
    </>
  );
};

export default ContactUs;
