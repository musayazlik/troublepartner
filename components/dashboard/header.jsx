import React from "react";
import { BiMenu } from "react-icons/bi";
import Image from "next/image";
import Message from "./headerDropdown/message";
import Notifications from "./headerDropdown/notifications";

const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    <header className="w-full flex justify-between relative z-0 border-slate-300/60 bg-blue-600 px-4 text-slate-50 py-4 ">
      <div
        className="menuIcon md:opacity-0 md:invisible "
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <BiMenu className="text-3xl" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Message />
          <Notifications />
          <div className="avatar">
            <Image
              src="/avatar.jpg"
              alt="Avatar"
              className="rounded-full"
              width={32}
              height={32}
            />
          </div>
          <div className="name ml-2">
            <div className="text-sm font-medium">Musa Yazlık</div>
            <div className="text-xs font-normal">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
