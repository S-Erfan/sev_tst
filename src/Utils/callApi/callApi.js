import axios from "axios";
import { BASE_URL } from "../ApiRoute/apiRoutes";
import { getTokenLocal } from "../token/userToken";

const callApi = async (url, header, body, method) => {
  let headerApi;
  if (header === false) {
    headerApi = { "Content-Type": "application/json" };
  } else {
    const ls = getTokenLocal();
    headerApi = {
      Authorization: `Bearer ${ls}`,
      "Content-Type": "application/json",
    };
  }
  let config;
  if (body === "{}") {
    config = {
      method: method,
      url: BASE_URL + url,
      headers: headerApi,
    };
  } else {
    config = {
      method: method,
      url: BASE_URL + url,
      headers: headerApi,
      data: body,
    };
  }

  try {
    const { data } = await axios(config);
    return { data: data, status: 200 };
  } catch (error) {
    return { status: error.response.status, data: error.response.data};
    // return { status: 400, data: error };
  }
};

export default callApi;
