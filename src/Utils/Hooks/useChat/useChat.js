import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "../../ApiRoute/apiRoutes";
import { getTokenLocal } from "../../token/userToken";

const useChat = (path) => {
  const [statusCon, setStatusCon] = useState(false);
  const [connect, setConnect] = useState(null);

  const sendMsg = (userId, msgType, getData) => {
    if (connect != null) {
      connect.emit("message:send", {
        receiver: userId,
        message: msgType,
        type: "1",
      });
      connect.on("message:send:result", (data) => {
        getData(data);
      });
    }
  };

  return [connect, sendMsg, listenReceive];
};

export default useChat;
