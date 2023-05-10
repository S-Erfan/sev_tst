import React, { useState } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
import SelectOptions from "../../Shared/SelectOptions/SelectOptions";
import InputCustom from "../../Shared/InputCustom/InputCustom";
import TextareaAutosize from "react-textarea-autosize";
import DatePickerCustom from "../../Shared/DatePicker/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import callApi from "../../../Utils/callApi/callApi";
import { UPDATE_BIO_USER } from "../../../Utils/ApiRoute/apiRoutes";
import notify from "../../../Utils/toast/notify";
import { useRouter } from "next/router";
import { authToken } from "../../../Redux/user/userAction";

const people = [];

const ageGeneration = () => {
  const nowYear = new Date().getFullYear();
  const date = (+nowYear).toString();
  for (let i = +nowYear - 18; i > +nowYear - 50; i--) {
    const dateInit = new Date("August 19, 1975 23:15:30").setFullYear(i);
    const nwD = new Date(dateInit).toLocaleString("fa-IR");
    const obj = { id: i, name: nwD.split("/")[0] };
    people.push(obj);
  }
};

ageGeneration();

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [listCity, setListCity] = useState([{ id: 1, name: "انتخاب کنید." }]);
  const [valCity, setValCity] = useState(listCity[0]);
  const [listHood, setListHood] = useState([
    { id: 1, name: "ابتدا استان انتخاب کنید." },
  ]);
  const [bio, setBio] = useState(() => (user.info.bio ? user.info.bio : ""));
  const [valHood, setValHood] = useState(listHood[0]);

  const editProfileHandler = async (e) => {
    e.preventDefault();
    if (user.info.bio === bio) {
      return;
    } else {
      const { data } = await callApi(UPDATE_BIO_USER, true, { bio }, "post");
      if(data.ok) {
        notify(data.message, "success");
        dispatch(authToken());
        router.push("/profile");
      }else{
        data.errors.map(item => notify(item.message, "error"))
      }
    }
  };

  return (
    <>
      <section className="container mx-auto fullScreen px-3 sm:px-0">
        <form className="flex flex-wrap -m-4" onSubmit={editProfileHandler}>
          <div className="flex flex-col p-4 w-full md:w-1/2 gap-y-2">
            <InputCustom
              label={"نام"}
              placeholder={"فقط حروف فارسی"}
              idIn={"firstName"}
              disabled={true}
              divClass={"opacity-60"}
              value={user.info.firstName}
            />
          </div>
          <div className="flex flex-col p-4 w-full md:w-1/2 gap-y-2">
            <InputCustom
              label={"نام خانوادگی"}
              placeholder={"فقط حروف فارسی"}
              idIn={"lastName"}
              disabled={true}
              divClass={"opacity-60"}
              value={user.info.lastName}
            />
          </div>

          <div className="flex flex-col p-4 w-full md:w-1/2 gap-y-2 opacity-60">
            <InputCustom
              label={"سن"}
              disabled={true}
              value={user.info.age}
              // onChange={setBirthday}
            />
          </div>

          <div className="flex flex-col p-4 w-full md:w-1/2 gap-y-2">
            <label className="text-sm pr-3">استان محل سکونت</label>
            <SelectOptions
              listArr={listCity}
              state={valCity}
              changeHandler={setValCity}
            />
          </div>

          <div className="flex flex-col p-4 w-full md:w-1/2 gap-y-2">
            <label className="text-sm pr-3">استان محل سکونت</label>
            <SelectOptions
              listArr={listHood}
              state={valHood}
              changeHandler={setValHood}
            />
          </div>

          <div className="flex flex-col p-4 w-full md:w-1/2 gap-y-2">
            <label>بیو</label>
            <TextareaAutosize
              maxRows={4}
              minRows={3}
              maxLength={100}
              className="input-main resize-none customScroll "
              placeholder="بیو..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="w-full flex justify-center items-center gap-x-4 py-4 ">
            <button className="btn-main min-w-fit">ثبت</button>
            <Link href={"/profile"}>
              <button className="btn-sec min-w-fit" type="button">
                بازگشت
              </button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProfile;
