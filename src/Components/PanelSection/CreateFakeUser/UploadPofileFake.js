import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CardUploadImg = styled.label`
  :hover {
    .uploaderIcon {
      color: #525252 !important;
    }
  }
`;

const UploadPofileFake = ({ setImages, images }) => {
  const [listImg, setListImg] = useState([]);
  const imageUploadHandler = (e) => {
    const { files, name } = e.target;
    let src = URL.createObjectURL(files[0]);
    setImages([...images, { src, file: files[0] }]);
  };

  useEffect(() => {
    setListImg(images);
  }, [images]);

  return (
    <>
      <div className="mb-[1rem] w-full sm:w-[100%] md:w-[75%] mx-auto">
        <h1 className="mb-2">
          عکس کاربر
        </h1>
        <div className="flex flex-row justify-start items-center flex-wrap -mx-3 ">
          {listImg.length < 4 && (
            <div className="w-full p-2 sm:w-1/2 sm:p-3 lg:w-1/3 xl:w-1/4 lg:min-w-[200px] h-auto ">
              <CardUploadImg
                htmlFor="image-profile"
                className="relative w-full h-[350px] rounded-lg border-dashed border-spacing-8 border border-neutral-600/30 bg-neutral-300/10 cursor-pointer flex justify-center gap-2 flex-col items-center transition-all duration-300  hover:!border-neutral-600 hover:!bg-neutral-500/10 "
              >
                <ArrowUpTrayIcon className="w-[35px] h-[35px] text-neutral-400 transition-all duration-300  uploaderIcon " />
                <span className="m-0 text-sm text-neutral-700">
                  اپلود عکس پروفایل
                </span>
                <input
                  type={"file"}
                  id={"image-profile"}
                  hidden
                  accept={"image/png, image/jpeg"}
                  onChange={imageUploadHandler}
                />
              </CardUploadImg>
            </div>
          )}

          {listImg.map((item) => (
            <div
              key={item}
              className="w-full p-2 sm:w-1/2 sm:p-3 lg:w-1/3 xl:w-1/4 lg:min-w-[200px] h-auto "
            >
              <div className="relative block w-full h-[350px] overflow-hidden rounded-lg border-dashed border-spacing-8 border border-neutral-600/30">
                <Image
                  src={item.src}
                  alt={"profile image"}
                  className={"w-full h-full object-cover "}
                  fill
                />
              </div>
            </div>
          ))}

          {/* <div className="relative w-1/5 h-[250px] rounded-lg border-dashed border-spacing-8 border border-neutral-600/30">
            <Image
              src={""}
              alt={"profile image"}
              className={"w-full h-full object-cover "}
              fill
            />
          </div>
          <div className="relative w-1/5 h-[250px] rounded-lg border-dashed border-spacing-8 border border-neutral-600/30">
            <Image
              src={""}
              alt={"profile image"}
              className={"w-full h-full object-cover "}
              fill
            />
          </div>
          <div className="relative w-1/5 h-[250px] rounded-lg border-dashed border-spacing-8 border border-neutral-600/30">
            <Image
              src={""}
              alt={"profile image"}
              className={"w-full h-full object-cover "}
              fill
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default UploadPofileFake;
