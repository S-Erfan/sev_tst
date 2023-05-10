import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { BASE_URL } from "../../ApiRoute/apiRoutes";
import { getTokenLocal } from "../../token/userToken";

const useSocket = (path) => {
  const user = useSelector((state) => state.user);
  const [connected, setConnected] = useState(false);

  useEffect(() => {

  }, [connected])

  return [connected];
};

export default useSocket;
