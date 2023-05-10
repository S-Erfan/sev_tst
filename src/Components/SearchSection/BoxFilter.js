import { XMarkIcon } from "@heroicons/react/24/outline";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoaderGlobal } from "../../Redux/global/globalAction";
import {
  LIST_CITY,
  LIST_PROVINCE_ID,
  SEARCH_USER_LIST,
} from "../../Utils/ApiRoute/apiRoutes";
import callApi from "../../Utils/callApi/callApi";
import notify from "../../Utils/toast/notify";
import InputCustom from "../Shared/InputCustom/InputCustom";
import SelectOptions from "../Shared/SelectOptions/SelectOptions";
import SlideRange from "../Shared/SlideRange/Index";

const BoxFilter = ({ setClose, setUserList }) => {
  const dispatch = useDispatch();
  const [listCity, setListCity] = useState([{ id: 0, name: "انتخاب کنید." }]);
  const [valCity, setValCity] = useState(listCity[0]);

  const [listHood, setListHood] = useState([
    { id: 0, name: "ابتدا استان انتخاب کنید." },
  ]);
  const [valHood, setValHood] = useState(listHood[0]);

  const listImageSort = [
    { id: 1, name: "داشته باشد" },
    { id: 2, name: "نداشته باشد" },
    { id: 3, name: "بیش از یک عکس" },
  ];
  const [valImg, setValImg] = useState("");

  const listOnlinSort = [
    { id: 1, name: "آنلاین" },
    { id: 2, name: "آفلاین" },
    { id: 3, name: "نیمه آنلاین" },
  ];
  const [valOnl, setValOnl] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [ageRange, setAgeRange] = React.useState([18, 60]);

  const ageChangeHandle = (event, newValue) => {
    setAgeRange(newValue);
  };

  const changeNameHandler = (e) => {
    setNameSearch(e.target.value);
  };

  //! Get All List City
  const getAllListCity = async () => {
    dispatch(setLoaderGlobal(true));
    const { data } = await callApi(LIST_CITY, false, "{}", "get");
    setListCity([...listCity, ...data.result]);
    dispatch(setLoaderGlobal(false));
  };

  //! Get All Province (Hood)
  const getAllProvince = async () => {
    const { data } = await callApi(
      LIST_PROVINCE_ID + valCity.id,
      false,
      "{}",
      "get"
    );
    setListHood(data.result);
  };

  //* for get list city and province
  useEffect(() => {
    if (listCity.length === 1) {
      getAllListCity();
    }
    if (valCity.id !== 0) {
      getAllProvince();
    }
  }, [listCity, valCity]);

  const filterFetcher = async (e) => {
    //? set user list response fetch
    setLoader(true);
    const { data } = await callApi(
      SEARCH_USER_LIST(
        nameSearch,
        ageRange[0],
        ageRange[1],
        valCity.id !== 0 ? valCity.name : "",
        valHood.id !== 0 ? valHood.name : ""
      ),
      false,
      "{}",
      "get"
    );
    if (data.ok) {
      const { result } = data;

      const arrNew = [];
      for (let i = 0; i < result.length; i++) {
        // const { ...allData } = result[i];
        const { uuid, provinces, ...allData } = result[i];
        const obj = { user_id: uuid, province: provinces, ...allData };
      }
      setUserList(result);
      setLoader(false);
    } else {
      setLoader(false);
      notify(data.message, "error");
    }

  };

  return (
    <>
      <div className="w-full h-[90%] p-4 md:w-[100%] md:px-8">
        <div className="flex justify-between items-center ">
          <h3 className="text-xl font-semibold text-neutral-700 ">فیلتر ها</h3>
          <XMarkIcon className="w-[35px] h-[35px] " onClick={setClose} />
        </div>
        <div className="mt-8 flex flex-col gap-y-6 ">
          <div className="flex flex-col w-full gap-y-2">
            <InputCustom
              label={"اسم"}
              idIn={"name"}
              value={nameSearch}
              onChange={changeNameHandler}
            />
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label className="text-sm pr-3">سن</label>
            <SlideRange handleChange={ageChangeHandle} value={ageRange} />
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label className="text-sm pr-3">استان</label>
            <SelectOptions
              listArr={listCity}
              state={valCity}
              changeHandler={setValCity}
            />
          </div>

          <div className="flex flex-col w-full gap-y-2">
            <label className="text-sm pr-3">شهرستان</label>
            <SelectOptions
              listArr={listHood}
              state={valHood}
              changeHandler={setValHood}
            />
          </div>

          {/* <div className="flex flex-col w-full gap-y-2">
            <label className="text-sm pr-3">عکس</label>
            <SelectOptions
              listArr={listImageSort}
              state={valImg}
              changeHandler={setValImg}
            />
          </div> */}

          <div className="flex flex-col w-full gap-y-2">
            <label className="text-sm pr-3">
              وضعیت آنلاینی(مخصوص اعضای ویژه)
            </label>
            <SelectOptions
              listArr={listOnlinSort}
              state={valOnl}
              changeHandler={setValOnl}
            />
          </div>
        </div>

        <div className="mt-8">
          {loader ? (
            <button className="btn-main">
              <CircularProgress size={25} />
            </button>
          ) : (
            <button className="btn-main" onClick={filterFetcher}>
              اعمال فیلتر
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BoxFilter;
