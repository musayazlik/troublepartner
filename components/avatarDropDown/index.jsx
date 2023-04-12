import { BiChevronDown } from "react-icons/bi";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { BiUser, BiBasket, BiLogOut } from "react-icons/bi";
import { useAppContext } from "@/context";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const AvatarDropDown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, setUser } = useAppContext();
  const { data: session, status } = useSession();

  const handleDisconnect = async () => {
    Logout();
    setUser(null);
  };
  return (
    <>
      <div className="relative w-9 h-9">
        <Image
          src={session?.user?.image}
          fill
          alt="Avatar"
          className="rounded-full border-2 border-slate-200 shadow-lg  sticky "
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div
            className={`drowpdownMenu z-40 absolute -right-2 sm:right-0 mt-2 bg-gray-100 min-w-[200px] max-w-[240px] rounded-md border border-gray-600 shadow-lg shadow-slate-400/50 duration-300 ${
              isOpen
                ? "opacity-100 visible  top-12"
                : " opacity-0 invisible -top-4"
            } `}
          >
            <ul
              className="py-2 text-md font-bold text-slate-600"
              aria-labelledby="avatarButton"
            >
              <div className="px-4 border-b border-b-slate-300">
                <h3 className="whitespace-nowrap overflow-hidden text-ellipsis truncate">
                  Hello,
                  <span className="ml-2">{session?.user?.name}</span>
                </h3>
              </div>
              <li className="mt-2">
                <Link
                  href="/profile"
                  className="flex gap-2 px-4 py-2 hover:bg-gray-300 duration-300 "
                >
                  <BiUser className="w-6 h-6 " />
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="flex w-full gap-2 px-4 py-2 hover:bg-gray-300 duration-300"
                >
                  <BiLogOut className="w-6 h-6 -translate-x-1" />
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      {isOpen && (
        <span
          className="fixed w-screen h-screen top-0 left-0 bg-transparent z-10"
          onClick={() => setIsOpen(!isOpen)}
        ></span>
      )}
    </>
  );
};

export default AvatarDropDown;
