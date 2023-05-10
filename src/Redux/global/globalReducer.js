const initializeState = {
  loader: false,
};

const globalReducer = (state = initializeState, { type, payload }) => {
  switch (type) {
    case "LOADER_GL":
      return { ...state, loader: payload };
    default:
      return state;
  }
};

export default globalReducer;
