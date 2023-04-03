import React from "react";

import { BsFillBalloonHeartFill } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="bg-slate-800 py-4 text-teal-400 border-t-4 border-teal-500">
        <div className="container mx-auto px-4">
          <div className="copyright text-center flex justify-center gap-2">
            © {new Date().getFullYear()} -
            <a
              href="https://troublepartner/com"
              className="text-teal-400 hover:text-teal-500 font-bold"
            >
              Trouble Partner
            </a>
            <p>- All rights reserved.</p>
          </div>
        </div>
      </footer>
      <div className="bg-teal-600 py-1.5">
        <p className="text-center text-slate-100 text-sm gap-2 flex justify-center">
          <span className=" font-bold text-slate-800">
            Designed and coded by
          </span>
          <span>
            <BsFillBalloonHeartFill
              className="inline-block text-red-700 border-b-2 border-red-700 "
              fontSize={20}
            />
          </span>
          <a
            href="https://www.linkedin.com/in/musayazlik/"
            className=" font-bold duration-300 text-slate-800 hover:text-teal-900"
          >
            Musa Yazlik
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
