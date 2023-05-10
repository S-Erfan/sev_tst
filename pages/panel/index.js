import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadCustom from "../../src/Components/Head/Head";
import Dashboard from "../../src/Components/PanelSection/Dashboard/Dashboard";
import PanelLayout from "../../src/Components/PanelSection/PanelSection";
import LoaderCustom from "../../src/Components/Shared/LoaderCustom/LoaderCustom";
import { authToken } from "../../src/Redux/user/userAction";
import { getTokenLocal } from "../../src/Utils/token/userToken";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (user.loginStatus === false) {
      if (getTokenLocal()) {
        dispatch(authToken());
      }
    }

    if (user.loginStatus) {
      if (
        user.info.is_admin == 1 ||
        user.info.is_admin == 2 ||
        user.info.is_admin == 3
      ) {
        setLoad(false);
      }else{
        router.push("/");
      }
    }
  }, [user]);

  return (
    <>
      <HeadCustom title={"پنل مدیریت "} descriptionContent={"پنل مدیریت "} />

      {load || user.loader ? (
        <LoaderCustom />
      ) : (
        <PanelLayout routeRender={"داشبورد"}>
          {user.info.is_admin !== 3 && user.info.is_admin !== 0 && (
            <Dashboard />
          )}
        </PanelLayout>
      )}
    </>
  );
}
