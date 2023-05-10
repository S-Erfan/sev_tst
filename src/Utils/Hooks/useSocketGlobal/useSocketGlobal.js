import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { BASE_URL } from "../../ApiRoute/apiRoutes";
import { getTokenLocal } from "../../token/userToken";

const useSocketG = (path) => {
  const [connected, setConnceted] = useState(false);
  const [tokenUser, setTokenUser] = useState("");
  const [socketInit, setSocketInit] = useState(null);

  const connectSocket = async () => {
    const initSocket = new io(`${BASE_URL}/${path}`, {
      reconnection: true,
    });

    await initSocket.on("connect", () => {
      setConnceted(true);
      setSocketInit(initSocket);
    });
  };

  const disconnectSocket = async () => {
    const initSocket = new io(`${BASE_URL}/${path}`, {
      reconnection: true,
    });

    await initSocket.on("disconnect", () => {
      setConnceted(false);
    });
  };

  useEffect(() => {
    if (connected === false) {
      connectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [connected]);

  return { connected, socketInit };
};

export default useSocketG;
