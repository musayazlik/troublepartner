import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Pagination = () => {
  return (
    <>
      <div className="pagination flex gap-2 mt-6">
        <button className="bg-white  text-blue-700/70 font-bold  rounded border-blue-700/70 duration-300 hover:text-blue-50 hover:bg-blue-700 border-2  hover:shadow-lg hover:shadow-blue-600/50 w-10 h-10 flex justify-center items-center">
          <BiChevronLeft fontSize={32} />
        </button>
        <button className="bg-white  text-blue-700/70 font-extrabold  rounded border-blue-700/70 duration-300 hover:text-blue-50 hover:bg-blue-700 border-2  hover:shadow-lg hover:shadow-blue-600/50 w-10 h-10 flex justify-center items-center">
          1
        </button>
        <button className="bg-white  text-blue-700/70 font-extrabold  rounded border-blue-700/70 duration-300 hover:text-blue-50 hover:bg-blue-700 border-2  hover:shadow-lg hover:shadow-blue-600/50 w-10 h-10 flex justify-center items-center">
          2
        </button>
        <button className="bg-white  text-blue-700/70 font-extrabold  rounded border-blue-700/70 duration-300 hover:text-blue-50 hover:bg-blue-700 border-2  hover:shadow-lg hover:shadow-blue-600/50 w-10 h-10 flex justify-center items-center">
          3
        </button>
        <button className="bg-white  text-blue-700/70 font-extrabold  rounded border-blue-700/70 duration-300 hover:text-blue-50 hover:bg-blue-700 border-2  hover:shadow-lg hover:shadow-blue-600/50 w-10 h-10 flex justify-center items-center">
          4
        </button>
        <button className="bg-white  text-blue-700/70 font-bold  rounded border-blue-700/70 duration-300 hover:text-blue-50 hover:bg-blue-700 border-2  hover:shadow-lg hover:shadow-blue-600/50 w-10 h-10 flex justify-center items-center">
          <BiChevronRight fontSize={32} />
        </button>
      </div>
    </>
  );
};

export default Pagination;
