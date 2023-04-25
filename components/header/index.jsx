import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import AvatarDropDown from "../avatarDropDown";
import { signIn, useSession } from "next-auth/react";
import { HiMenuAlt1, HiOutlineUser } from "react-icons/hi";
import Image from "next/image";

const Header = () => {
  const { pathname } = useRouter();
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <>
      {/* <div className="h-2 bg-blue-500"></div> */}
      <div className=" shadow-lg shadow-blue-700 bg-slate-50  border-b-2 border-blue-700 ">
        <div className="lg:container mx-auto px-4 ">
          <header className="text-slate-600 body-font">
            <div className=" flex flex-wrap items-center justify-between  py-3 flex-row">
              <Link
                href={"/"}
                className="flex items-center text-slate-700  font-medium hover:scale-110 duration-300"
              >
                <span className=" text-xl sm:text-2xl font-maxbold h-12 relative w-40">
                  <Image src="/Logo.svg" fill alt={"Logo"} />
                </span>
              </Link>

              <nav
                className={`fixed px-4 md:px-0 pt-8 md:pt-0 flex items-start flex-col md:flex-row z-30 min-w-[260px] bg-slate-600 text-slate-50 md:text-slate-700 md:bg-transparent  h-screen md:h-auto top-0  md:relative md:flex md:flex-wrap gap-3 md:items-center text-lg font-semibold md:justify-center
                 duration-300 ease-in-out transition-all
                ${
                  showMenu
                    ? "visible right-[0px]"
                    : "invisible md:visible -right-[300px] md:right-0"
                }
              
              
              `}
              >
                <Link
                  href={"/"}
                  className="relative w-full md:w-auto text-center py-2 md:py-0 mr-5 hover:text-blue-500 duration-300 hover:duration-300"
                >
                  Home
                  {(pathname === "/" || pathname.startsWith("/post/")) && (
                    <span className="absolute w-full h-1 bg-blue-500 -bottom-1 left-0 right-0 mx-auto rounded-full transition-all duration-300 ">
                      <span className="absolute inline-block left-0 right-0 mx-auto h-1.5 w-1.5 bg-blue-500 rounded-full animate-ping transition-none duration-500 "></span>
                    </span>
                  )}
                </Link>

                <Link
                  href={"/about"}
                  className="mr-5 w-full md:w-auto text-center py-2 md:py-0 hover:text-blue-500 duration-300 relative"
                >
                  About Us
                  {pathname === "/about" && (
                    <span className="absolute w-full h-1 bg-blue-500 -bottom-1 left-0 right-0 mx-auto rounded-full transition-all duration-300 ">
                      <span className="absolute inline-block left-0 right-0 mx-auto h-1.5 w-1.5 bg-blue-500 rounded-full animate-ping transition-none duration-500 "></span>
                    </span>
                  )}
                </Link>
                <Link
                  href={"/pricing"}
                  className="mr-5 w-full md:w-auto text-center py-2 md:py-0 hover:text-blue-500 duration-300 relative "
                >
                  Pricing
                  {pathname === "/pricing" && (
                    <span className="absolute w-full h-1 bg-blue-500 -bottom-1 left-0 right-0 mx-auto rounded-full transition-all duration-300 ">
                      <span className="absolute inline-block left-0 right-0 mx-auto h-1.5 w-1.5 bg-blue-500 rounded-full animate-ping transition-none duration-500 "></span>
                    </span>
                  )}
                </Link>
                <Link
                  href={"/contact"}
                  className="mr-5 w-full md:w-auto text-center py-2 md:py-0 hover:text-blue-500 duration-300 relative"
                >
                  Contact
                  {pathname === "/contact" && (
                    <span className="absolute w-full h-1 bg-blue-500 -bottom-1 left-0 right-0 mx-auto rounded-full transition-all duration-300 ">
                      <span className="absolute inline-block left-0 right-0 mx-auto h-1.5 w-1.5 bg-blue-500 rounded-full animate-ping transition-none duration-500 "></span>
                    </span>
                  )}
                </Link>
              </nav>
              {showMenu ? (
                <span
                  onClick={() => {
                    setShowMenu(false);
                  }}
                  className="flex md:hidden fixed top-0 left-0 w-screen h-screen bg-slate-800/60 z-20"
                ></span>
              ) : null}

              <div className="flex gap-4">
                {status === "authenticated" ? (
                  <AvatarDropDown />
                ) : (
                  <div className="flex justify-center font-extrabold">
                    {/* Desktop Auth Button */}
                    <Link
                      href="/auth/sign-in"
                      className="  text-slate-700 text-base hidden md:flex md-flex font-bold py-1.5 md:py-2 px-2 md:px-4 rounded-sm   duration-300 hover:text-slate-600 hover:bg-slate-200  "
                    >
                      <span className="">Sign In</span>
                    </Link>
                    <Link
                      href="/auth/sign-up"
                      className="bg-slate-300 text-base hidden md:flex md-flex text-slate-700 font-bold py-1.5 md:py-2 px-2 md:px-4  border-slate-900 duration-300 hover:text-slate-50 hover:bg-slate-700 border-2  hover:shadow-lg rounded-sm hover:shadow-slate-600/50"
                    >
                      <span className="">Sign Up</span>
                    </Link>
                    {/* Mobile Auth Button*/}
                    <Link
                      href="/auth/sign-in"
                      className=" w-9 h-9 md:hidden flex justify-center items-center  text-slate-700 font-bold rounded-sm   duration-300  bg-slate-200 hover:bg-slate-400 hover:text-slate-50 border-2 border-slate-900  "
                    >
                      <HiOutlineUser className="text-xl  " />
                    </Link>
                  </div>
                )}
                <button
                  onClick={() => {
                    setShowMenu(!showMenu);
                  }}
                  className="md:hidden w-9 h-9 flex justify-center items-center  text-slate-900 font-bold  rounded-sm   duration-300  bg-slate-200 hover:bg-slate-400 hover:text-slate-50 border-2 border-slate-900"
                >
                  <HiMenuAlt1 className="text-xl " />
                </button>
              </div>
            </div>
          </header>
        </div>
      </div>
      <div className="h-2 bg-blue-500"></div>
    </>
  );
};

export default Header;
