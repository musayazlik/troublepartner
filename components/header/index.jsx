import React from "react";

const Header = () => {
  return (
    <>
      <div className="h-2 bg-teal-500"></div>
      <div className=" shadow-lg shadow-teal-700 bg-slate-50 border-t-2 border-b-2 border-teal-700 ">
        <div className="container mx-auto px-4 ">
          <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap items-center justify-between  py-3 flex-row">
              <a className="flex items-center text-teal-700 mb-4 md:mb-0 font-medium">
                <span className=" text-xl font-maxbold">Trouble Partner</span>
              </a>

              <div className="flex justify-center font-extrabold">
                <button className=" text-teal-700 font-bold py-2 px-4 rounded hover:text-teal-500 duration-300 ">
                  Sign In
                </button>
                <button className="bg-teal-300  text-teal-700 font-bold py-2 px-4 rounded border-teal-600 duration-300 hover:text-teal-50 hover:bg-teal-700 border-2  hover:shadow-lg hover:shadow-teal-600/50">
                  Sign Up
                </button>
              </div>
            </div>
          </header>
        </div>
      </div>
      <div className="h-2 bg-teal-500"></div>
    </>
  );
};

export default Header;
