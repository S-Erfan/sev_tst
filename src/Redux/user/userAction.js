import {
  AUTH,
  LIST_LIKE_USER,
  LOGIN,
  SIGN_UP,
  VERIFY_CODE,
} from "../../Utils/ApiRoute/apiRoutes";
import callApi from "../../Utils/callApi/callApi";
import notify from "../../Utils/toast/notify";
import { saveTokenLocal } from "../../Utils/token/userToken";

export const loaderTrue = () => {
  return { type: "LOADER_TRUE" };
};

export const loaderFalse = () => {
  return { type: "LOADER_FALSE" };
};

export const nextStep = () => {
  return { type: "NEXT_STEP" };
};

export const prevStep = () => {
  return { type: "PREV_STEP" };
};

export const setUserId = (uuid) => {
  return { type: "SET_USER_UUID", preload: uuid };
};

export const setLogin = (user) => {
  return { type: "LOGIN_USER", preload: user };
};

export const registered = (body) => {
  return (dispatch) => {
    dispatch(loaderTrue());

    const fetcher = async () => {
      const { data, status } = await callApi(SIGN_UP, false, body, "post");
      if (status === 200) {
        notify(data.message, "success");
        dispatch(setUserId(data.result.user_uuid));
        dispatch(nextStep());
      } else {
        notify(data.errors[0].message, "error");
      }

      dispatch(loaderFalse());
    };

    fetcher();
  };
};

export const verifyCodeOtp = (otp, uuid) => {
  return (dispatch) => {
    dispatch(loaderTrue());

    const raw = JSON.stringify({
      user_uuid: uuid,
      sms_code: otp,
    });

    const fetcher = async () => {
      const { data, status } = await callApi(VERIFY_CODE, false, raw, "post");
      if (status === 200) {
        notify(data.message, "success");
      } else {
        notify(data.message, "error");
      }

      dispatch(loaderFalse());
    };

    fetcher();
  };
};

export const authToken = (req = false) => {
  return (dispatch) => {
    const fetcher = async () => {
      const { data, status } = await callApi(AUTH, true, "{}", "post");
      if (status === 200) {
        if (req) notify("با موفقیت وارد حساب کاربری خود شدید.", "success");
        dispatch(setLogin(data.result));
        dispatch(getListLikeUser());
      } else {
        notify(data, "error");
        localStorage.removeItem("UTA");
      }

      dispatch(loaderFalse());
    };

    fetcher();
  };
};

export const loginUser = (username, pass) => {
  return (dispatch) => {
    dispatch(loaderTrue());

    const raw = JSON.stringify({
      username: username,
      password: pass,
    });

    const fetcher = async () => {
      const { data, status } = await callApi(LOGIN, false, raw, "post");
      if (status === 200) {
        notify(data.message, "success");
        saveTokenLocal(data.token.token);
        dispatch(authToken(true));
      } else if (data.ok === false) {
        notify(data.message, "error");
        if (data.message === "اکانت شما فعال نیست") {
          dispatch(nextStep());
          dispatch(setUserId(data.result.user_id));
        }
      }
      dispatch(loaderFalse());
    };

    fetcher();
  };
};

export const logoutUser = () => {
  notify("با موفقیت از حساب خود خارج شدید.", "success");
  return { type: "LOG_OUT" };
};

export const setListUserLiked = (data) => {
  return { type: "SET_LIST_LIKED", preload: data };
};

export const getListLikeUser = () => {
  return (dispatch) => {
    const fetcher = async () => {
      const { data, status } = await callApi(LIST_LIKE_USER, true, "{}", "get");
      if (data.ok) {
        const { result } = data;
        let status = {};
        for (let i = 0; i < result.length; i++) {
          status[`${result[i].user_liked}`] = true;
        }
        dispatch(setListUserLiked(status));
      }
    };

    fetcher();
  };
};
