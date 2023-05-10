import { HomeIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import {
  DocumentTextIcon,
  EyeIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { GET_DASHBOARD } from "../../../Utils/ApiRoute/apiRoutes";
import callApi from "../../../Utils/callApi/callApi";
import LoaderCustom from "../../Shared/LoaderCustom/LoaderCustom";
import CardInfo from "../CardInfo/CardInfo";
import PieChartUser from "../PieChart/PieChart";
import UserCardRow from "../UserCardRow/UserCardRow";

const Dashboard = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});

  const fetchAllData = async () => {
    setLoader(true);
    const { data, status } = await callApi(GET_DASHBOARD, true, "{}", "get");
    if (data.ok) {
      setData(data.result);
      const bo = data.result.girl * 100;
      const lo = bo / data.result.all_user;
    } else {
      router.push("/");
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loader) return <LoaderCustom />;

  if (JSON.stringify(data) !== JSON.stringify({}))
    return (
      <>
        <section className="px-[1rem] md:px-[3rem] mt-8">
          <div className="flex flex-wrap -m-3">
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-3">
              <CardInfo
                icon={
                  <UsersIcon className="w-full h-full drop-shadow-lg text-neutral-500" />
                }
                title={"کل کاربران"}
                number={data.all_user}
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-3">
              <CardInfo
                icon={
                  <UsersIcon className="w-full h-full drop-shadow-lg text-emerald-500" />
                }
                title={"کاربران انلاین"}
                number={data.online_user}
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-3">
              <CardInfo
                icon={
                  <UsersIcon className="w-full h-full drop-shadow-lg text-violet-500" />
                }
                title={"کاربران با اشتراک"}
                number={data.user_package}
              />
            </div>
            {/* <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
            <CardInfo
              icon={
                <EyeIcon className="w-full h-full drop-shadow-lg text-rose-500" />
              }
              title={"بازدید"}
              number={12}
            />
          </div> */}
          </div>
        </section>

        <section className="px-[1rem] md:px-[3rem] mt-[2rem] text-neutral-500 ">
          <div className="flex flex-col lg:flex-row -m-3 ">
            <div className="w-full lg:w-1/3 p-3 flex flex-col gap-[3rem]">
              <div className="rounded-md shadow-md shadow-neutral-300 px-4 py-2 flex items-center">
                <div className="w-1/4">
                  <DocumentTextIcon className="w-full h-full text-yellow-400 drop-shadow-lg" />
                </div>
                <div className="flex-1 flex flex-col items-center gap-3 ">
                  <h1 className="text-lg text-center">تعداد بلاگ ها</h1>
                  <h4 className="text-3xl text-black text-center">
                    {data.blog}
                  </h4>
                  <span className="w-full text-left">
                    <Link href="/panel/blogs">مدیریت بلاگ</Link>
                  </span>
                </div>
              </div>

              <div className="px-4 py-2 ">
                <div className="w-[80%] mx-auto">
                  <PieChartUser
                    girl={data.girl}
                    boy={data.boy}
                    allUser={data.all_user}
                  />
                </div>
                <div className="w-fit mx-auto mt-4 flex flex-col gap-y-4">
                  <div className="flex gap-3 items-center">
                    <span className="text-[#a78bfa]">کاربران زن</span>
                    <span className="">
                      {((data.girl * 100) / data.all_user).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="text-[#10b981]">کاربران مرد</span>
                    <span className="">
                      {((data.boy * 100) / data.all_user).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 p-3">
              <div className=" px-4 py-3">
                <h1 className="text-center text-2xl text-neutral-800">
                  کاربرانی که اخیرا ثبت نام کردن
                </h1>
                <div className="flex flex-col gap-y-4 mt-8">
                  {data.users.map((item) => (
                    <UserCardRow 
                      nameUser={`${item.first_name} ${item.last_name}`}
                      age={item.age}
                      phone={item.phone_number}
                    />
                  ))}

                  {/* <UserCardRow />
                  <UserCardRow />
                  <UserCardRow />
                  <UserCardRow />
                  <UserCardRow /> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
};

export default Dashboard;
