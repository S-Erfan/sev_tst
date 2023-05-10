import { Manager } from "socket.io-client";
import { getTokenLocal } from "../token/userToken";

// initial connection
export const initSocket = new Manager("https://alborzclass.ir", {
  auth: {
    token: getTokenLocal(),
  },
});

// connect to route
export const socket = initSocket.socket("/mrphpinfo", {
  auth: {
    token: getTokenLocal(),
  },
});

//? connect to websocket https://alborzclass.ir/mrphpinfo
socket.on("connect", () => {
});

//! receive messages user
socket.on("message:receive", (data) => {
});

//?
socket.on("message:send:result", (data) => {
});

//! send message a user
socket.emit("message:send", {
  receiver: "6ff83966-1d86-43ff-a77d-921955700510", // userId
  message: "msg tst", //msg
  type: "1",
});
