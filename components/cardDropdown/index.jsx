import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineWarning,
} from "react-icons/ai";
import Link from "next/link";

const CardDropdown = (props) => {
  const [dropdownShow, setDropdownShow] = React.useState(false);
  const { comment, session, post, edit, setEdit, element, commentId } = props;
  return (
    <>
      <BsThreeDotsVertical
        className="text-2xl text-slate-500"
        onClick={() => setDropdownShow(!dropdownShow)}
      />
      <div className="dropdownMenu">
        <ul
          className={`absolute z-20 bg-white right-2 border-2 border-slate-400  ease-in-out duration-200 rounded-md shadow-lg shadow-slate-300/60 ${
            dropdownShow
              ? " top-9 opacity-100 visible"
              : " top-0 opacity-0 invisible"
          }`}
        >
          {(session === post.user._id && element === "post") ||
          (session === comment && element === "comment") ? (
            <button
              onClick={() =>
                setEdit({
                  status: true,
                  id: element === "post" ? post._id : commentId,
                  element: element,
                })
              }
              className="w-full"
            >
              <li className="px-3 py-2 font-medium text-slate-700 hover:bg-slate-300 duration-200 rounded-t-md border-b-2 border-dashed flex gap-2 items-center">
                <AiOutlineEdit className="text-lg" />
                Edit
              </li>
            </button>
          ) : null}

          {comment === session && (
            <li className="px-3 py-2 font-medium text-slate-700 hover:bg-slate-300 duration-200 border-b-2 border-dashed flex gap-2 items-center">
              <button
                onClick={() => deletePost(post._id)}
                className="focus:outline-none flex gap-2 items-center"
              >
                <AiOutlineDelete className="text-lg" />
                Delete
              </button>
            </li>
          )}

          <li className="px-3 py-2 font-medium text-slate-700 hover:bg-slate-300 rounded-b-md flex gap-2 items-center">
            <button className="focus:outline-none flex gap-2 items-center">
              <AiOutlineWarning /> Complain
            </button>
          </li>
        </ul>
      </div>
      {dropdownShow && (
        <span
          className="w-screen h-screen fixed  z-10 left-0 top-0"
          onClick={() => setDropdownShow(!dropdownShow)}
        ></span>
      )}
    </>
  );
};

export default CardDropdown;
