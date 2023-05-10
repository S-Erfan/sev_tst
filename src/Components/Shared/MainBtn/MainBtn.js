import React from "react";

const MainBtn = ({ children, onClick, className }) => {
  return (
    <button
        onClick={onClick}
        className={`transition duration-150 ease-in h-10 px-6 rounded-md border border-slate-400 text-slate-900 hover:bg-violet-500 hover:text-teal-50 shadow-lg ${className} `}>
        {children}
    </button>
  );
};

export default MainBtn;
