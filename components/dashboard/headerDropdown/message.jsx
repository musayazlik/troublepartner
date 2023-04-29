import React from "react";
import Image from "next/image";
import { BiMessageSquareDots } from "react-icons/bi";

const Message = () => {
  const [showMessage, setShowMessage] = React.useState(false);

  return (
    <>
      <div className="message relative mr-4">
        <div
          className="relative cursor-pointer"
          onClick={() => setShowMessage(!showMessage)}
        >
          <BiMessageSquareDots className="text-2xl" />

          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex justify-center items-center text-xs text-white font-extrabold">
            1
          </div>
        </div>

        <div
          className={`absolute  border-2 duration-300 border-blue-800 rounded-lg bg-slate-50 w-[280px] max-h-60 overflow-auto h-min-[200px] shadow-lg shadow-blue-800/20 z-20 ${
            showMessage === true
              ? "right-0 top-8 opacity-100 visible"
              : "right-0 top-16 opacity-0 invisible"
          } `}
        >
          <div className="card text-slate-900">
            <div className="card-header flex justify-between items-center px-4 py-2 border-b border-slate-200">
              <div className="text-sm font-extrabold">Mesajlar</div>
              <div className="text-xs font-extrabold">1</div>
            </div>

            <div className="card-body px-4 py-4">
              <div className="message flex gap-2 mb-2 border-b-2 last:border-none pb-2">
                <div className="avatar flex-shrink-0 pt-2">
                  <Image
                    src="/avatar.jpg"
                    alt="Avatar"
                    className="rounded-full w-8 h-8"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="message-content w-auto">
                  <div className="name text-md font-bold">Musa Yazlık</div>
                  <div className="text-sm font-medium leading-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, voluptatum.
                  </div>
                </div>
              </div>
              <div className="message flex gap-2 mb-2 border-b-2 last:border-none pb-2">
                <div className="avatar flex-shrink-0 pt-2">
                  <Image
                    src="/avatar.jpg"
                    alt="Avatar"
                    className="rounded-full w-8 h-8"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="message-content w-auto">
                  <div className="name text-md font-bold">Musa Yazlık</div>
                  <div className="text-sm font-medium leading-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, voluptatum.
                  </div>
                </div>
              </div>
              <div className="message flex gap-2 mb-2 border-b-2 last:border-none pb-2">
                <div className="avatar flex-shrink-0 pt-2">
                  <Image
                    src="/avatar.jpg"
                    alt="Avatar"
                    className="rounded-full w-8 h-8"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="message-content w-auto">
                  <div className="name text-md font-bold">Musa Yazlık</div>
                  <div className="text-sm font-medium leading-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, voluptatum.
                  </div>
                </div>
              </div>
              <div className="message flex gap-2 mb-2 border-b-2 last:border-none pb-2">
                <div className="avatar flex-shrink-0 pt-2">
                  <Image
                    src="/avatar.jpg"
                    alt="Avatar"
                    className="rounded-full w-8 h-8"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="message-content w-auto">
                  <div className="name text-md font-bold">Musa Yazlık</div>
                  <div className="text-sm font-medium leading-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, voluptatum.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMessage && (
        <div
          className="fixed w-screen h-screen top-0 left-0 z-10 "
          onClick={() => setShowMessage(false)}
        ></div>
      )}
    </>
  );
};

export default Message;
