import React from "react";

import { BsFillBalloonHeartFill } from "react-icons/bs";

const Footer = () => {
  return (
    <div>
      <footer className="bg-slate-800 py-4 text-white border-t-4 border-blue-500">
        <div className="container mx-auto px-4">
          <div className="copyright text-center text-xs sm:text-base flex justify-center gap-2">
            © {new Date().getFullYear()} -
            <a
              href="https://troublepartner.com"
              className="text-blue-400 hover:text-blue-500 font-bold"
            >
              Trouble Partner
            </a>
            <p>- All rights reserved.</p>
          </div>
        </div>
      </footer>
      <div className="bg-gray-700 py-1.5">
        <p className="text-center text-slate-100 text-xs sm:text-sm gap-2 flex justify-center">
          <span className=" font-bold text-white">Designed and coded by</span>
          <span>
            <BsFillBalloonHeartFill
              className="inline-block text-red-700 border-b-2 border-red-700 "
              fontSize={20}
            />
          </span>
          <a
            href="https://www.linkedin.com/in/musayazlik/"
            className=" font-ultrabold mt-0.5 duration-300 text-wgite hover:text-rose-500"
          >
            Musa Yazlik
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
