import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const Header = () => {
  const { pathname } = useRouter();
  return (
    <>
      <div className="h-2 bg-teal-500"></div>
      <div className=" shadow-lg shadow-teal-700 bg-slate-50 border-t-2 border-b-2 border-teal-700 ">
        <div className="container mx-auto px-4 ">
          <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap items-center justify-between  py-3 flex-row">
              <Link
                href={"/"}
                className="flex items-center text-teal-700 mb-4 md:mb-0 font-medium hover:scale-110 duration-300"
              >
                <span className=" text-2xl font-maxbold">Trouble Partner</span>
              </Link>

              <nav className=" flex flex-wrap items-center text-lg font-semibold justify-center">
                <Link
                  href={"/"}
                  class="relative mr-5 hover:text-teal-500 duration-300 hover:duration-300"
                >
                  Home
                  {pathname === "/" && (
                    <span class="absolute w-full h-1 bg-teal-500 bottom-0 left-0 right-0 mx-auto rounded-full transition-all duration-300 ">
                      <span class="absolute inline-block left-0 right-0 mx-auto h-1.5 w-1.5 bg-teal-500 rounded-full animate-ping transition-none duration-500 "></span>
                    </span>
                  )}
                </Link>

                <a className="mr-5 hover:text-teal-500 duration-300">About</a>
                <a className="mr-5 hover:text-teal-500 duration-300">
                  Services
                </a>
                <a className="mr-5 hover:text-teal-500 duration-300">Contact</a>
              </nav>

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
