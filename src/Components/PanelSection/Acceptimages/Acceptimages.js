import Image from "next/image";
import React from "react";
import srcimage from "../../../../public/images/untitled folder 3/images.jpg";
import ImageControl from "./ImageControl";

const AcceptImages = ({ list, updater }) => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-12 flex flex-wrap justify-between   ">
        <div className="flex justify-center flex-wrap mb-3 w-full ">
          {list.map((item) => (
            <ImageControl
              key={item.user_id}
              name={`${item.first_name} ${item.last_name}`}
              id={item.user_id}
              srcImg={item.image}
              updater={updater}
              imgId={item.image_id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AcceptImages;
