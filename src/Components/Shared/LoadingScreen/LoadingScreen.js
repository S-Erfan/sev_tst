import Image from "next/image";
import React from "react";
import spinerSrc from "../../../../public/images/spiner.gif";

const LoadingScreen = () => {
  return (
    <div className="w-[100vw] h-[100vh] absolute top-0 left-0 z-50 bg-white">
      <div className="w-[100vw] h-[100vh] grid place-items-center bg-neutral-500/25  ">
        <Image
          src={spinerSrc}
          alt="spinner"
          className="w-[10vw] h-[10vw] object-cover "
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
