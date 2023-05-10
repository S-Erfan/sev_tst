import React, { useEffect, useState } from "react";

const ModalDef = ({ open, handleOpen, children, classBase }) => {
  const [showPro, setShowPro] = useState(false);

  useEffect(() => {
    if (open) {
      setShowPro(true);
    } else if (!open) {
      setShowPro(false);
    }
  }, [open]);

  return (
    <>
      {open ? (
        <>
          <div
            className={
              "justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition duration-300 opacity-0 ease-in-out  " +
              ` ${showPro ? "opacity-100 translate-y-[0]" : "opacity-0"}`
            }
            onClick={handleOpen}
          >
            <div
              className="relative w-auto my-6 mx-auto max-w-[90%] md:max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={
                  "border-0 rounded-lg overflow-hidden shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none " +
                  `${classBase}`
                }
              >
                {children}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ModalDef;
