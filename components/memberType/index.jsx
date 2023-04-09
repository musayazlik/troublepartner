import React from "react";
import { Tooltip, Button } from "flowbite-react";
import { BiUser } from "react-icons/bi";
import { AiOutlineCrown } from "react-icons/ai";

export const MemberType = ({ type }) => {
  if (type === "premium") {
    return (
      <div className="relative flex justify-content-end">
        <Tooltip content="Premium">
          <AiOutlineCrown className="z-10 relative text-yellow-600 w-6 h-6 bg-yellow-400 p-0.5 rounded-full border-yellow-500 border-2 shadow-md shadow-yellow-500/70" />
        </Tooltip>
      </div>
    );
  } else if (type === "admin") {
    return (
      <div className="relative flex justify-content-end">
        <Tooltip content="Admin">
          <AiOutlineCrown className="z-10 relative text-teal-600 w-6 h-6 bg-teal-400 p-0.5 rounded-full border-teal-500 border-2 shadow-md shadow-teal-500/70" />
        </Tooltip>
      </div>
    );
  } else {
    return (
      <div className="relative flex justify-content-end">
        <Tooltip content="Free">
          <BiUser className="z-10 relative text-slate-600 w-6 h-6 bg-slate-400 p-0.5 rounded-full border-slate-500 border-2 shadow-md shadow-slate-500/70" />
        </Tooltip>
      </div>
    );
  }
};

export default MemberType;
