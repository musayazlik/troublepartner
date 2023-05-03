import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import AvatarDropDown from "../avatarDropDown";
import { signIn, useSession } from "next-auth/react";
import {
  HiMenuAlt1,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineMail,
} from "react-icons/hi";
import Image from "next/image";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { TbBrandTelegram } from "react-icons/tb";
import { BiMoneyWithdraw, BiShield, BiDonateHeart } from "react-icons/bi";
import { MdOutlineFeedback } from "react-icons/md";
import { BsQuestionLg } from "react-icons/bs";

const Header = () => {
  const { pathname } = useRouter();
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <>
      {/* <div className="h-2 bg-blue-500"></div> */}
      <div className="headerTop bg-slate-200 hidden sm:block">
        <div className="container mx-auto flex items-center justify-between py-1 px-4">
          <div className="menuList ">
            <ul className="flex gap-3 items-center font-bold text-xs tracking-tight py-1 text-slate-700 ">
              <li className="hover:text-rose-500 duration-200">
                <Link href="/terms-and-conditions">Terms And Conditions</Link>
              </li>
              <li className="hover:text-rose-500 duration-200">
                <Link href="/contact">Sponsorship</Link>
              </li>
              <li className="hover:text-rose-500 duration-200">
                <Link href="/contact">Feedback</Link>
              </li>
              <Link
                href="https://buymeacoffee.com/musayazlik"
                target="_blank"
                className="bg-yellow-200 duration-200 px-2 py-1 rounded-md border-2 border-yellow-300 shadow shadow-yellow-400/50 flex gap-2 items-center text-yellow-600"
              >
                <Image
                  src="/buymeacoffee.png"
                  alt={"buymeacoffee"}
                  width="16"
                  height="16"
                  className="border-2 border-yellow-200 "
                />
                <p>Buy Me a Coffee</p>
              </Link>
              {/* <li className="hover:text-rose-500 duration-200">
                <Link href="/contac">F.A.Q.</Link>
              </li> */}
            </ul>
          </div>
          <div className="socialMedia">
            <ul className="flex gap-3 font-bold text-xs tracking-tight py-1 text-slate-700 ">
              <li className="hover:text-rose-500 duration-200">
                <Link href="/">
                  <FiFacebook fontSize={16} />
                </Link>
              </li>
              <li className="hover:text-rose-500 duration-200">
                <Link href="/about">
                  <FiInstagram fontSize={16} />
                </Link>
              </li>
              <li className="hover:text-rose-500 duration-200">
                <Link href="/about">
                  <FiTwitter fontSize={16} />
                </Link>
              </li>
              <li className="hover:text-rose-500 duration-200">
                <Link href="/about">
                  <FiYoutube fontSize={16} />
                </Link>
              </li>
              <li className="hover:text-rose-500 duration-200">
                <Link href="/telegram">
                  <TbBrandTelegram fontSize={16} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" shadow-lg shadow-blue-700 bg-zinc-50  border-b-2 border-blue-700 ">
        <div className="lg:container mx-auto px-4 ">
          <header className="text-zinc-600 body-font">
            <div className=" flex flex-wrap items-center justify-between  py-3 flex-row">
              <Link
                href={"/"}
                className="flex items-center text-zinc-700  font-medium hover:scale-110 duration-300"
              >
                <span className=" text-xl sm:text-2xl font-maxbold h-12 relative w-40">
                  <Image src="/Logo.svg" fill alt={"Logo"} />
                </span>
              </Link>

              <nav
                className={`fixed px-4 md:px-0 pt-8 md:pt-0 flex items-start flex-col md:flex-row z-30 min-w-[260px] bg-slate-50 text-slate-900 md:text-zinc-900  md:bg-transparent  h-screen md:h-auto top-0  md:relative md:flex md:flex-wrap  gap-2 md:gap-1 md:items-center text-lg  md:justify-center
                 duration-300 ease-in-out transition-all font-bold
                ${
                  showMenu
                    ? "visible right-[0px]"
                    : "invisible md:visible -right-[300px] md:right-0"
                }
              
              
              `}
              >
                <Link
                  href={"/"}
                  className={`mr-5 w-full md:w-auto  px-2  py-1.5 md:py-0  sm:hover:text-blue-500 duration-300 relative ${
                    pathname === "/"
                      ? "text-white md:text-blue-500"
                      : " hover:text-blue-500"
                  } `}
                >
                  <HiOutlineHome
                    fontSize={20}
                    className="inline-block mr-2 mb-0.5"
                  />
                  Home
                  {pathname === "/" && (
                    <span className="absolute w-full h-full items-center -z-10 md:h-1 bg-blue-500 top-0 md:top-auto  md:-bottom-1 left-0 right-0 mx-auto md:rounded-full rounded-sm transition-all duration-300  ">
                      <span className="absolute inline-block left-0 md:right-0 mx-auto h-full md:h-1.5 w-1 md:w-1.5 bg-blue-500 rounded-full animate-ping transition-none duration-500 "></span>
                    </span>
                  )}
                </Link>

                <Link
                  href={"/about"}
                  className={`mr-5 w-full md:w-auto  px-2  py-1.5 md:py-0  sm:hover:text-blue-500 duration-300 relative ${
                    pathname === "/about"
                      ? "text-white md:text-blue-500"
                      : " hover:text-blue-500"
                  } `}
                >
                  <HiOutlineUser
                    fontSize={20}
                    className="inline-block mr-2 mb-0.5"
                  />
                  About
                  {pathname === "/about" && (
                    <span className="absolute w-full h-full items-center -z-10 md:h-1 bg-blue-500 top-0 md:top-auto  md:-bottom-1 left-0 right-0 mx-auto md:rounded-full rounded-sm transition-all duration-300  ">
                      <span className="absolute inline-block left-0 md:right-0 mx-auto h-full md:h-1.5 w-1 md:w-1.5 bg-blue-500 rounded-full animate-ping transition-none duration-500 "></span>
                    </span>
                  )}
                </Link>
                <Link
                  href={"/pricing"}
                  className={`mr-5 w-full md:w-auto  px-2  py-1.5 md:py-0  sm:hover:text-blue-500 duration-300 relative ${
                    pathname === "/pricing"
                      ? "text-white md:text-blue-500"
                      : " hover:text-blue-500"
                  } `}
                >
                  <BiMoneyWithdraw
                    fontSize={20}
                    className="inline-block mr-2 mb-0.5"
                  />
                  Pricing
                  {pathname === "/pricing" && (
                    <span className="absolute w-full h-full items-center -z-10 md:h-1 bg-blue-500 top-0 md:top-auto  md:-bottom-1 left-0 right-0 mx-auto md:rounded-full rounded-sm transition-all duration-300  ">
                      <span className="absolute inline-block left-0 md:right-0 mx-auto h-full md:h-1.5 w-1 md:w-1.5 bg-blue-500 rounded-full animate-ping transition-none duration-500 "></span>
                    </span>
                  )}
                </Link>

                <Link
                  href={"/contact"}
                  className={`mr-5 w-full md:w-auto  px-2  py-1.5 md:py-0  sm:hover:text-blue-500 duration-300 relative ${
                    pathname === "/contact"
                      ? "text-white md:text-blue-500"
                      : " hover:text-blue-500"
                  } `}
                >
                  <HiOutlineMail
                    fontSize={20}
                    className="inline-block mr-2 mb-0.5"
                  />
                  Contact
                  {pathname === "/contact" && (
                    <span className="absolute w-full h-full items-center -z-10 md:h-1 bg-blue-500 top-0 md:top-auto  md:-bottom-1 left-0 right-0 mx-auto md:rounded-full rounded-sm transition-all duration-300  ">
                      <span className="absolute inline-block left-0 md:right-0 mx-auto h-full md:h-1.5 w-1 md:w-1.5 bg-blue-500 rounded-full animate-ping transition-none duration-500 "></span>
                    </span>
                  )}
                </Link>

                <div className="sm:hidden border-t-2 w-full border-slate-300 text-slate-900 py-2 flex flex-col">
                  <Link
                    href={"/terms-and-conditions"}
                    className={`mr-5 w-full md:w-auto  px-2  py-1.5 md:py-0  sm:hover:text-blue-500 duration-300 relative ${
                      pathname === "/terms-and-conditions"
                        ? "text-white md:text-blue-500"
                        : " hover:text-blue-500"
                    } `}
                  >
                    <BiShield
                      fontSize={20}
                      className="inline-block mr-2 mb-0.5"
                    />
                    Terms And Conditions
                    {pathname === "/terms-and-conditions" && (
                      <span className="absolute w-full h-full items-center -z-10 md:h-1 bg-blue-500 top-0 md:top-auto  md:-bottom-1 left-0 right-0 mx-auto md:rounded-full rounded-sm transition-all duration-300  ">
                        <span className="absolute inline-block left-0 md:right-0 mx-auto h-full md:h-1.5 w-1 md:w-1.5 bg-blue-500 rounded-full animate-ping transition-none duration-500 "></span>
                      </span>
                    )}
                  </Link>

                  <Link
                    href={"/contact"}
                    className={`mr-5 w-full md:w-auto  px-2  py-1.5 md:py-0  sm:hover:text-blue-500 duration-300 relative ${
                      pathname === "/contact"
                        ? "text-white md:text-blue-500"
                        : " hover:text-blue-500"
                    } `}
                  >
                    <MdOutlineFeedback
                      fontSize={20}
                      className="inline-block mr-2 mb-0.5"
                    />
                    Feedback
                    {pathname === "/contact" && (
                      <span className="absolute w-full h-full items-center -z-10 md:h-1 bg-blue-500 top-0 md:top-auto  md:-bottom-1 left-0 right-0 mx-auto md:rounded-full rounded-sm transition-all duration-300  ">
                        <span className="absolute inline-block left-0 md:right-0 mx-auto h-full md:h-1.5 w-1 md:w-1.5 bg-blue-500 rounded-full animate-ping transition-none duration-500 "></span>
                      </span>
                    )}
                  </Link>

                  <Link
                    href={"/contact"}
                    className={`mr-5 w-full md:w-auto  px-2  py-1.5 md:py-0  sm:hover:text-blue-500 duration-300 relative ${
                      pathname === "/contact"
                        ? "text-white md:text-blue-500"
                        : " hover:text-blue-500"
                    } `}
                  >
                    <BiDonateHeart
                      fontSize={20}
                      className="inline-block mr-2 mb-0.5"
                    />
                    Sponsorship
                    {pathname === "/sponsorship" && (
                      <span className="absolute w-full h-full items-center -z-10 md:h-1 bg-blue-500 top-0 md:top-auto  md:-bottom-1 left-0 right-0 mx-auto md:rounded-full rounded-sm transition-all duration-300  ">
                        <span className="absolute inline-block left-0 md:right-0 mx-auto h-full md:h-1.5 w-1 md:w-1.5 bg-blue-500 rounded-full animate-ping transition-none duration-500 "></span>
                      </span>
                    )}
                  </Link>
                  {/* <Link
                    href={"/f.a.q."}
                    className={`mr-5 w-full md:w-auto  px-2  py-1.5 md:py-0  sm:hover:text-blue-500 duration-300 relative ${
                      pathname === "/f.a.q."
                        ? "text-white md:text-blue-500"
                        : " hover:text-blue-500"
                    } `}
                  >
                    <BsQuestionLg
                      fontSize={20}
                      className="inline-block mr-2 mb-0.5"
                    />
                    F.A.Q.
                    {pathname === "/f.a.q." && (
                      <span className="absolute w-full h-full items-center -z-10 md:h-1 bg-blue-500 top-0 md:top-auto  md:-bottom-1 left-0 right-0 mx-auto md:rounded-full rounded-sm transition-all duration-300  ">
                        <span className="absolute inline-block left-0 md:right-0 mx-auto h-full md:h-1.5 w-1 md:w-1.5 bg-blue-500 rounded-full animate-ping transition-none duration-500 "></span>
                      </span>
                    )}
                  </Link> */}
                </div>
              </nav>
              {showMenu ? (
                <span
                  onClick={() => {
                    setShowMenu(false);
                  }}
                  className="flex md:hidden fixed top-0 left-0 w-screen h-screen bg-zinc-800/60 z-20"
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
                      className="  text-zinc-700 text-base hidden md:flex md-flex font-bold py-1.5 md:py-2 px-2 md:px-4 rounded-sm   duration-300 hover:text-zinc-600 hover:bg-zinc-200  "
                    >
                      <span className="">Sign In</span>
                    </Link>
                    <Link
                      href="/auth/sign-up"
                      className="bg-zinc-300 text-base hidden md:flex md-flex text-zinc-700 font-bold py-1.5 md:py-2 px-2 md:px-4  border-zinc-900 duration-300 hover:text-zinc-50 hover:bg-rose-500 border-2  hover:shadow-lg rounded-sm hover:shadow-rose-600/50 hover:border-rose-700"
                    >
                      <span className="">Sign Up</span>
                    </Link>
                    {/* Mobile Auth Button*/}
                    <Link
                      href="/auth/sign-in"
                      className=" w-9 h-9 md:hidden flex justify-center items-center  text-zinc-700 font-bold rounded-sm   duration-300  bg-zinc-200 hover:bg-zinc-400 hover:text-zinc-50 border-2 border-zinc-900  "
                    >
                      <HiOutlineUser className="text-xl  " />
                    </Link>
                  </div>
                )}
                <button
                  onClick={() => {
                    setShowMenu(!showMenu);
                  }}
                  className="md:hidden w-9 h-9 flex justify-center items-center  text-zinc-900 font-bold  rounded-sm   duration-300  bg-zinc-200 hover:bg-zinc-400 hover:text-zinc-50 border-2 border-zinc-900"
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
