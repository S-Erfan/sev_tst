const initialState = {
  loginStatus: false,
  loader: false,
  step: 1,
  info: "",
  uuid: "",
  likedUser: [],
};

const userReducer = (state = initialState, action) => {
  const { type, preload } = action;

  switch (type) {
    case "LOADER_TRUE":
      return { ...state, loader: true };
    case "LOADER_FALSE":
      return { ...state, loader: false };
    case "NEXT_STEP":
      return { ...state, step: 2 };
    case "PREV_STEP":
      return { ...state, step: 1 };
    case "SET_USER_UUID":
      return { ...state, uuid: preload };
    case "LOGIN_USER":
      return { ...state, loginStatus: true, info: preload };
    case "LOG_OUT":
      localStorage.removeItem("UTA");
      return initialState;
    case "SET_LIST_LIKED": 
      return {...state, likedUser: preload};
    default:
      return state;
  }
};

export default userReducer;
