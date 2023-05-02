import React from "react";
import Image from "next/image";
import {
  BiCategoryAlt,
  BiBasket,
  BiSliderAlt,
  BiGroup,
  BiLogOut,
  BiMessageSquareDots,
} from "react-icons/bi";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const router = useRouter();

  return (
    <>
      <aside
        className={` min-h-screen min-w-[240px]  md:left-0 h-screen md:h-auto fixed md:relative z-20 duration-300  ${
          showSidebar ? "left-0" : "-left-[240px]"
        } `}
      >
        <div className="shadow-lg shadow-slate-950/10 bg-white h-full py-2 flex flex-col justify-between">
          <div className="flex flex-col">
            <Link
              href="/"
              className="logo w-auto flex justify-center mx-2 h-16 relative"
            >
              <Image src="/logo.svg" alt="Logo" fill />
            </Link>

            <nav className="mt-6 py-4 w-full px-4">
              <ul className="flex flex-col gap-2">
                <li
                  className={`nav-item w-full py-2.5  px-2 bg-neutral-50 text-neutral-700 duration-300   rounded-md border border-neutral-500/20 
						${router.pathname === "/dashboard" ? "active" : "nav_item_hover"}
						`}
                >
                  <Link
                    href="/dashboard"
                    className="nav-link flex items-center gap-2"
                  >
                    <div className="icon">
                      <BiCategoryAlt className="text-2xl" />
                    </div>
                    <span className="text-base font-bold mt-0.5">
                      Dashboard
                    </span>
                  </Link>
                </li>
                <li
                  className={`nav-item w-full py-2.5  px-2 bg-neutral-50 text-neutral-700 duration-300  rounded-md border border-neutral-500/20 
						${router.pathname === "/dashboard/users" ? "active" : " nav_item_hover"}
						`}
                >
                  <Link
                    href="/dashboard/users"
                    className="nav-link flex items-center gap-2"
                  >
                    <div className="icon">
                      <BiGroup className="text-2xl" />
                    </div>
                    <span className="text-base font-bold mt-0.5">Users</span>
                  </Link>
                </li>
                <li
                  className={`nav-item w-full py-2.5  px-2 bg-neutral-50 text-neutral-700 duration-300  rounded-md border border-neutral-500/20 
						${router.pathname === "/dashboard/messages" ? "active" : " nav_item_hover"}
						`}
                >
                  <Link
                    href="/dashboard/messages"
                    className="nav-link flex items-center gap-2"
                  >
                    <div className="icon">
                      <BiMessageSquareDots className="text-2xl" />
                    </div>
                    <span className="text-base font-bold mt-0.5">Messages</span>
                  </Link>
                </li>
                <li
                  className={`nav-item w-full py-2.5  px-2 bg-neutral-50 text-neutral-700  duration-300 rounded-md border border-neutral-500/20
            ${
              router.pathname === "/dashboard/orders"
                ? "active"
                : " nav_item_hover"
            }
            `}
                >
                  <Link
                    href="/dashboard/orders"
                    className="nav-link flex items-center gap-2"
                  >
                    <div className="icon">
                      <BiBasket className="text-2xl" />
                    </div>
                    <span className="text-base font-bold mt-0.5">Orders</span>
                  </Link>
                </li>
                <li
                  className={`nav-item w-full py-2.5 px-2 bg-neutral-50 text-neutral-700 duration-300 rounded-md border border-neutral-500/20 
              
              ${
                router.pathname === "/dashboard/settings"
                  ? "active"
                  : " nav_item_hover"
              }
                `}
                >
                  <Link
                    href="/dashboard/settings"
                    className="nav-link flex items-center gap-2"
                  >
                    <div className="icon">
                      <BiSliderAlt className="text-2xl" />
                    </div>
                    <span className="text-base font-bold mt-0.5">Settings</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="px-4">
            <button
              type="button"
              onClick={() => signOut()}
              className="w-full py-2.5 px-2 bg-neutral-50 text-neutral-700 duration-300 rounded-md border border-neutral-500/20 hover:bg-red-500 hover:text-white text-start flex gap-3 items-center mt-auto font-bold"
            >
              <BiLogOut className="text-2xl" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {showSidebar && (
        <div
          className="w-screen h-screen bg-slate-900/20 top-0 left-0 fixed z-10 md:hidden duration-300"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
