import Link from "next/link";
import HeadCustom from "../src/Components/Head/Head";

export default function Custom404Page() {
  return (
    <>
      <HeadCustom
        title={"صفحه مورد نظر یافت نشد."}
        descriptionContent={
          "صفحه مورد نظر یافت نشد. | not found page 404 error"
        }
      />
      <main className="w-[100vw] h-[100vh]">
        <div className="relative">
          <div className="inset-0 bg-white opacity-25 absolute"> </div>
          <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-20 xl:py-40">
            <div className="w-full flex flex-col items-center relative z-10">
              <h1 className="text-5xl text-center text-neutral-500 leading-tight mt-4">
                صفحه مورد نظر پیدا نشد.
              </h1>
              <p className="font-extrabold text-8xl my-[8rem] md:my-[12rem] text-violet-600 animate-bounce drop-shadow-lg ">
                404
              </p>

              <Link href={"/"} className="btn-main !w-fit min-w-fit ">
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
