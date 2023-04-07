import React from "react";
import { BiTimeFive, BiComment, BiRightArrow } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

const Card = ({
  id,
  image = "",
  name = "",
  text = "",
  time = "",
  comment = "",
  slug,
}) => {
  return (
    <>
      <Link
        href={{
          pathname: `post/${slug + "-" + id}`,
        }}
        className="w-full"
      >
        <div className="card border-2 border-b-slate-400/30  border-slate-100 shadow-lg shadow-slate-200 hover:shadow-slate-500/30 duration-300 w-full rounded-lg  flex flex-col sm:flex-row px-8 py-8 gap-4 min-h-[240px]">
          <div className="image flex sm:flex-col items-center gap-4 ">
            <Image
              src={image}
              width={64}
              height={64}
              alt="Avatar"
              className="rounded-full border-4 border-slate-200 shadow-lg min-w-[64px] min-h-[64px] "
            />
            <span className="w-full h-1 sm:w-1 sm:h-full bg-slate-200/50"></span>
          </div>
          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col">
              <h3 className="text-slate-700 font-extrabold text-xl sm:text-2xl">
                {name}
              </h3>
              <p className="text-slate-600 text-base  sm:text-lg mb-4 sm:mb-0">
                {text}
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
    </>
  );
};

export default Card;
