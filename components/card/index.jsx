import React from "react";
import { BiTimeFive, BiComment, BiRightArrow } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
// import MemberType from "@components/memberType";

const Card = ({
  id,
  image = "",
  privacyStatus,
  name = "",
  surname = "",
  title = "",
  text = "",
  time = "",
  comment = "",
  slug,
  // memberType,
}) => {
  return (
    <>
      <div className="w-full">
        <Link
          href={{
            pathname: `post/${slug}`,
          }}
        >
          <div className="card border-2 border-b-slate-400/30  border-slate-100 shadow-lg shadow-slate-200 hover:shadow-slate-500/30 duration-300 rounded-lg  flex flex-col sm:flex-row px-8 py-8 gap-4 min-h-[240px]">
            <div className="image flex  sm:flex-col items-center gap-4 ">
              <div className=" relative">
                <Image
                  src={privacyStatus ? "/avatar.jpg" : image}
                  width={64}
                  height={64}
                  alt="Avatar"
                  className="rounded-full border-4 border-slate-200 shadow-lg min-w-[64px] min-h-[64px] "
                />
                {privacyStatus && (
                  <span className="w-14 h-14 left-0 right-0 m-auto top-0 bottom-0 bg-slate-200/50 absolute rounded-full backdrop-blur-sm"></span>
                )}

                <div className="absolute top-0">
                  {/* <MemberType type={memberType} /> */}
                </div>
              </div>
              <span className="w-full h-1 sm:w-1 sm:h-full bg-slate-200/50"></span>
            </div>
            <div className="flex flex-col justify-between w-full  ">
              <div className="flex flex-col ">
                <h3 className="text-slate-700 font-extrabold text-xl sm:text-2xl">
                  {title}
                </h3>
                <p
                  className="text-slate-600 text-base  sm:text-lg mb-4 sm:mb-0 "
                  style={{
                    wordBreak: "break-word",
                  }}
                >
                  {text.slice(0, 160)} ...
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-5 ">
                  <div className=" flex gap-2 items-center text-xs sm:text-sm font-extrabold text-slate-900/70  ">
                    <BiTimeFive className=" " fontSize={20} />
                    <span className="mt-0.5">{time}</span>
                  </div>
                  <div className=" flex gap-2 items-center text-xs sm:text-sm font-extrabold text-slate-900/70  ">
                    <BiComment className=" " fontSize={20} />
                    <span className="mt-0.5">{comment}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
