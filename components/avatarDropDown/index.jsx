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
          className="rounded-full border-2 border-slate-900 shadow-lg  sticky "
          onClick={() => setIsOpen(!isOpen)}
        />

        <div
          className={`drowpdownMenu z-40 absolute  right-0 mt-2 bg-gray-100 min-w-[200px] max-w-[240px] rounded-md border-2 border-gray-900 shadow-lg shadow-slate-900/20 duration-300 ${
            isOpen
              ? "opacity-100 visible  top-10"
              : " opacity-0 invisible -top-4"
          } `}
        >
          <div
            className="absolute -top-3 right-3 w-3 h-3 bg-slate-900"
            style={{
              clipPath: "polygon(51% 22%, 0% 100%, 100% 100%)",
            }}
          ></div>
          <ul
            className="py-2 text-md font-bold text-slate-900"
            aria-labelledby="avatarButton"
          >
            <div className="px-4 pb-2 border-b border-b-slate-900/50 border-dashed">
              <h3 className="whitespace-nowrap overflow-hidden text-ellipsis truncate">
                Hello,
                <span className="ml-2">
                  {session?.user?.name + " " + session?.user?.surname}
                </span>
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
