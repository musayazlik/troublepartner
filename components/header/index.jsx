import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import AvatarDropDown from "../avatarDropDown";
import { signIn, useSession } from "next-auth/react";
import { HiMenuAlt1, HiOutlineUser } from "react-icons/hi";

const Header = () => {
  const { pathname } = useRouter();
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <>
      <div className="h-2 bg-teal-500"></div>
      <div className=" shadow-lg shadow-teal-700 bg-slate-50 border-t-2 border-b-2 border-teal-700 ">
        <div className="md:container mx-auto px-4 ">
          <header className="text-slate-600 body-font">
            <div className="container mx-auto flex flex-wrap items-center justify-between  py-3 flex-row">
              <Link
                href={"/"}
                className="flex items-center text-teal-700  font-medium hover:scale-110 duration-300"
              >
                <span className=" text-xl sm:text-2xl font-maxbold">
                  Trouble Partner
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
                  className="relative w-full md:w-auto text-center py-2 md:py-0 mr-5 hover:text-teal-500 duration-300 hover:duration-300"
                >
                  Home
                  {pathname === "/" && (
                    <span className="absolute w-full h-1 bg-teal-500 bottom-0 left-0 right-0 mx-auto rounded-full transition-all duration-300 ">
                      <span className="absolute inline-block left-0 right-0 mx-auto h-1.5 w-1.5 bg-teal-500 rounded-full animate-ping transition-none duration-500 "></span>
                    </span>
                  )}
                </Link>

                <Link
                  href={"/about"}
                  className="mr-5 w-full md:w-auto text-center py-2 md:py-0 hover:text-teal-500 duration-300"
                >
                  About
                  {pathname === "/about" && (
                    <span className="absolute w-full h-1 bg-teal-500 bottom-0 left-0 right-0 mx-auto rounded-full transition-all duration-300 ">
                      <span className="absolute inline-block left-0 right-0 mx-auto h-1.5 w-1.5 bg-teal-500 rounded-full animate-ping transition-none duration-500 "></span>
                    </span>
                  )}
                </Link>
                <Link
                  href={"/prices"}
                  className="mr-5 w-full md:w-auto text-center py-2 md:py-0 hover:text-teal-500 duration-300"
                >
                  Pricing
                  {pathname === "/prices" && (
                    <span className="absolute w-full h-1 bg-teal-500 bottom-0 left-0 right-0 mx-auto rounded-full transition-all duration-300 ">
                      <span className="absolute inline-block left-0 right-0 mx-auto h-1.5 w-1.5 bg-teal-500 rounded-full animate-ping transition-none duration-500 "></span>
                    </span>
                  )}
                </Link>
                <Link
                  href={"Contact"}
                  className="mr-5 w-full md:w-auto text-center py-2 md:py-0 hover:text-teal-500 duration-300"
                >
                  Contact
                  {pathname === "/contact" && (
                    <span className="absolute w-full h-1 bg-teal-500 bottom-0 left-0 right-0 mx-auto rounded-full transition-all duration-300 ">
                      <span className="absolute inline-block left-0 right-0 mx-auto h-1.5 w-1.5 bg-teal-500 rounded-full animate-ping transition-none duration-500 "></span>
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
                    <button
                      onClick={() => {
                        signIn("google");
                      }}
                      className="bg-teal-300   text-teal-700 font-bold py-1.5 md:py-2 px-2 md:px-4 rounded border-teal-600 duration-300 hover:text-teal-50 hover:bg-teal-700 border-2  hover:shadow-lg hover:shadow-teal-600/50"
                    >
                      <HiOutlineUser className="inline-block text-2xl lg:hidden  " />
                      <span className="hidden lg:flex">
                        Sign in with Google
                      </span>
                    </button>
                  </div>
                )}
                <button
                  onClick={() => {
                    setShowMenu(!showMenu);
                  }}
                >
                  <HiMenuAlt1 className="md:hidden text-3xl text-teal-700" />
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
