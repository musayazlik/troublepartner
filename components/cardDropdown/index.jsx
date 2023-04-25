import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineWarning,
} from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";

const CardDropdown = (props) => {
  const [dropdownShow, setDropdownShow] = React.useState(false);
  const {
    comment,
    session,
    post,
    edit,
    setEdit,
    element,
    commentId,
    deleteHandle,
  } = props;

  const complainHandle = (id, element) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to complain this ${element}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, complain it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("/api/complain", {
            id: id,
            element: element,
          })
          .then((res) => {
            Swal.fire({
              title: "Complain!",
              text: "Your complain has been sent.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <>
      <BsThreeDotsVertical
        className="text-2xl text-zinc-500 cursor-pointer"
        onClick={() => setDropdownShow(!dropdownShow)}
      />
      <div className="dropdownMenu">
        <ul
          className={`absolute overflow-hidden z-20 bg-white right-2 border-2 border-zinc-400  ease-in-out duration-200 rounded-md shadow-lg shadow-zinc-300/60 ${
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
              <li className="px-3 py-2 font-medium text-zinc-700 hover:bg-zinc-300 duration-200 rounded-t-md border-b-2 border-dashed flex gap-2 items-center">
                <AiOutlineEdit className="text-lg" />
                Edit
              </li>
            </button>
          ) : null}

          {(session === post.user._id && element === "post") ||
          (session === comment && element === "comment") ? (
            <button
              onClick={() =>
                deleteHandle(element === "post" ? post._id : commentId, element)
              }
              className="w-full"
            >
              <li className="px-3 py-2 font-medium text-zinc-700 hover:bg-zinc-300 duration-200 border-b-2 border-dashed flex gap-2 items-center">
                <AiOutlineDelete className="text-lg" />
                Delete
              </li>
            </button>
          ) : null}

          <li className="px-3 py-2 font-medium text-zinc-700 hover:bg-zinc-300 rounded-b-md flex gap-2 items-center">
            <button
              className="focus:outline-none flex gap-2 items-center"
              onClick={() => {
                complainHandle(
                  element === "post" ? post._id : commentId,
                  element
                );
              }}
            >
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
