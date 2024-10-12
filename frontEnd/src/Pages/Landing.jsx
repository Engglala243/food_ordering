import React from "react";
import { IoSearch } from "react-icons/io5";

const Landing = () => {
  return (
    <>
      <div className="flex items-center hover:scale-110 ">
        <div className="text-[#69CC00] font-bold text-4xl w-48 h-48 bg-[#6b02a3] rounded-full absolute inset-2 z-1"></div>
        <div
          style={{ fontFamily: "Dancing_Script" }}
          className="text-[#69CC00] font-bold text-4xl w-48 h-48 bg-[#CC3499] rounded-full flex items-center justify-center inset-0 z-10"
        >
          Explore...
        </div>
      </div>
    </>
  );
};

export default Landing;
