export const BASE_URL = "https://api.ssevin.com";
// export const BASE_URL = "http://192.168.1.111";
export const SIGN_UP = "/v1/user/register";
export const VERIFY_CODE = "/v1/user/verifyCode";
export const LOGIN = "/v1/user/login";
export const AUTH = "/v1/user/info";
export const START_CHAT = "/v1/user/private_chat/create";
export const UPLOAD_IMAGE = "/v1/user/profile/upload/image";
export const LIST_PROFILE_IMAGES = "/v1/user/profile/image/";
export const DELETE_PROFILE_IMAGE = "/v1/user/profile/delete/image/";
export const SHOW_PROFILE_IMAGE = "/v1/user/profile/show/image/";
export const SHOW_BLOG_IMAGE = "/v1/blog/show/image/";
export const LIKE_USER = "/v1/user/profile/like/";
export const LIST_LIKE_USER = "/v1/user/profile/like/list/";
export const SEEN_USER = "/v1/user/profile/seen/";
export const GET_LIST_SEEN_USER = "/v1/user/profile/get/seen/";
export const GET_LIST_LIKE_USER = "/v1/user/profile/like/data/";
export const GET_BLOG_ID = "/v1/blog/show/";
export const GET_ALL_BLOG = "/v1/blog/list/";
export const USER_BLOCK_ID = "/v1/user/profile/block/";
export const UPDATE_BIO_USER = "/v1/user/profile/bio/update/";
export const SHOW_PROFILE_USER_ID = "/v1/user/profile/show/user/";
export const SEARCH_USER_LIST = (
  name = false,
  minAge = false,
  maxAge = false,
  city = false,
  hood = false
) =>
  `/v1/Search?${name !== "" ? `q=${name}` : "q="}${minAge !== false && `&age=${minAge}`}${
    maxAge !== false && `&max_age=${maxAge}`
  }${city && `&city=${city}`}${hood && `&provinces=${hood}`} `;

export const FORGOT_PASS = "/v1/user/reset/password/";
export const SET_NEW_PASS = "/v1/user/reset/set/password";

//? Payment
export const BUY_PACKAGE = "/v1/zarinpal/create/";

//?Global
export const LIST_CITY = "/v1/iran/city/get/";
export const LIST_PROVINCE_ID = "/v1/iran/city/Province/";
export const PAY_CHECKER = "/v1/zarinpal/check/";

//?for admin and panel
export const GET_DASHBOARD = "/v1/panel/index/";
export const GET_BIO_LIST = "/v1/panel/bio/list/";
export const ACCEPT_BIO_USER_ID = "/v1/panel/bio/accept/";
export const GET_IMAGES_PROFILE_LIST = "/v1/panel/image/list/";
export const ACCEPT_IMAGES_USER_ID = "/v1/panel/image/accept/";
export const LIST_ALL_USER = "/v1/panel/user/list/";
export const ADD_ADMIN_USER_ID = "/v1/panel/admin/add/";
export const UPDATE_USER_ID = "/v1/panel/admin/update/";
export const DELETE_USER_ID = "/v1/panel/user/remove/";
export const GET_INFO_USER_ID = "/v1/panel/user/info/";
export const CREATE_BLOG = "/v1/panel/blog/create/";
export const DELETE_BLOG = "/v1/panel/blog/delete/";
export const UPLOAD_BLOG = "/v1/panel/blog/update/";
export const CREATE_FAKE_USER = "/v1/panel/user/fake/create/";
export const CREATE_FAKE_PHOTO = "/v1/panel/user/fake/photo/";
export const ADD_PACKAGE_USER = (userId = false, pack = false) =>
  `/v1/panel/user/package/manager/${userId}/${pack}`;
