export const saveTokenLocal = (token) => {
  let obj = {
    token: token,
  };
  localStorage.setItem("UTA", JSON.stringify(obj));
};

export const getTokenLocal = () => {
  if (window === "defined") {
    return false;
  }

  if (localStorage.getItem("UTA") == null) {
    return false;
  } else {
    const obj = JSON.parse(localStorage.getItem("UTA"));
    return obj.token;
  }
};
