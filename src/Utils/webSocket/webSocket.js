import { io } from "socket.io-client";
import { getTokenLocal } from "../token/userToken";

export const connectSocket = async () => {
  // initial connection
  const initSocket = new io("https://alborzclass.ir/mrphpinfo", {
    auth: {
      token: getTokenLocal(),
    },
  });

  // connect to route
  //   const socket = initSocket.socket("/mrphpinfo", {
  //     auth: {
  //       token: getTokenLocal(),
  //     },
  //   });

  await initSocket.on("connect", () => console.log("connected"));
};

export const disconnectSocket = async () => {
  // initial connection
  //   const initSocket = new io("https://alborzclass.ir", {
  //     auth: {
  //       token: getTokenLocal(),
  //     },
  //   });

  // connect to route
  const initSocket = new io("https://alborzclass.ir/mrphpinfo", {
    auth: {
      token: getTokenLocal(),
    },
  });

  await initSocket.on("disconnect", () => console.log("disconnect"));
};
