import React from "react";
import { BiTimeFive, BiComment, BiRightArrow, BiUser } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import MemberType from "@components/memberType";

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
  memberType,
}) => {
  return (
    <>
      <div className="w-full">
        <Link
          href={{
            pathname: `post/${slug}`,
          }}
        >
          <div className="card border-2 border-b-zinc-600  border-zinc-100 shadow-lg shadow-zinc-200 hover:shadow-zinc-500/30 duration-300 rounded-lg  flex flex-col sm:flex-row px-8 py-8 gap-4 min-h-[240px] justify-between">
            <div className="image flex  sm:flex-col items-center gap-4 ">
              <div className=" relative">
                <Image
                  src={privacyStatus ? "/images/79638-avatar-icon.gif" : image}
                  width={64}
                  height={64}
                  alt="Avatar"
                  className="rounded-full border-4 border-zinc-200 shadow-lg min-w-[64px] min-h-[64px] "
                />
                {privacyStatus && (
                  <span className="w-10 h-10 sm:w-14 sm:h-14 left-0 right-0 m-auto top-0 bottom-0 bg-zinc-200/50 absolute rounded-full backdrop-blur-sm"></span>
                )}

                <div className="absolute top-0">
                  <MemberType type={memberType} />
                </div>
              </div>
              <span className="w-full h-1 sm:w-1 sm:h-full bg-zinc-200/50"></span>
            </div>
            <div className="flex flex-col justify-between w-full  ">
              <div className="flex flex-col ">
                <h3 className="text-zinc-700 font-extrabold tracking-tight text-xl sm:text-2xl mb-2">
                  {title}
                </h3>
                <p
                  className="text-zinc-600 text-base  sm:text-lg mb-6 leading-5 font-medium tracking-normal sm:mb-0 "
                  style={{
                    wordBreak: "break-word",
                  }}
                >
                  {text.slice(0, 160)} ...
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-5 ">
                  <div className=" flex gap-2 items-center text-xs sm:text-sm font-extrabold text-zinc-900">
                    <BiTimeFive className=" " fontSize={20} />
                    <span className="mt-0.5">{time}</span>
                  </div>
                  <div className=" flex gap-2 items-center text-xs sm:text-sm font-extrabold text-zinc-900">
                    <BiComment className=" " fontSize={20} />
                    <span className="mt-0.5">{comment}</span>
                  </div>
                  <div className=" flex gap-2 items-center text-xs sm:text-sm font-extrabold text-zinc-900">
                    <BiUser className=" " fontSize={20} />
                    <span className="mt-0.5">
                      {privacyStatus ? "Anonymous" : `${name} ${surname}`}
                    </span>
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
