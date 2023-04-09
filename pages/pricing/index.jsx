import React from "react";
import Layout from "../layout";

const Pricing = () => {
  const [status, setStatus] = React.useState("monthly");
  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-col text-center w-full my-20 ">
          <h1 className="sm:text-4xl text-3xl font-maxbold title-font mb-2 text-slate-900">
            Pricing
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-slate-500">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.
          </p>
          <div className="flex mx-auto border-2 border-slate-500 rounded overflow-hidden mt-6">
            <button
              onClick={() => {
                setStatus("monthly");
              }}
              className={`py-1 px-4 focus:outline-none ${
                status === "monthly" ? "bg-slate-500 text-white " : ""
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => {
                setStatus("annually");
              }}
              className={`py-1 px-4 focus:outline-none ${
                status === "annually" ? "bg-slate-500 text-white " : ""
              }`}
            >
              Annually
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mb-20">
          <div className="p-4 xl:w-2/5 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium uppercase">
                Free
              </h2>
              <h3 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200 font-bold">
                <span>$0</span>
                <span className="text-lg ml-1 font-normal text-gray-500">
                  {status === "monthly" ? "/mo" : "/yr"}
                </span>
              </h3>
              <p className="flex items-center text-gray-600 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                Sharing content with 140 character limit.
              </p>
              <p className="flex items-center text-gray-600 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                Public import sharing
              </p>
              <p className="flex items-center text-gray-600 mb-6">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                3 content sharing
              </p>
              <button className="flex items-center mt-auto duration-300 text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
                Buy Now
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-auto"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <p className="text-xs text-gray-500 mt-3">
                This package is created automatically for everyone who is a
                member.
              </p>
            </div>
          </div>
          <div className="p-4 xl:w-2/5 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-yellow-500 flex flex-col relative overflow-hidden">
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium uppercase">
                Premium
              </h2>
              <h3 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200 font-bold">
                <span>{status === "monthly" ? "$4.99" : "$49"}</span>
                <span className="text-lg ml-1 font-normal text-gray-500">
                  {status === "monthly" ? "/mo" : "/yr"}
                </span>
              </h3>
              <p className="flex items-center text-gray-600 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                Vexillologist pitchfork
              </p>
              <p className="flex items-center text-gray-600 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                Tumeric plaid portland
              </p>
              <p className="flex items-center text-gray-600 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                Hexagon neutra unicorn
              </p>
              <p className="flex items-center text-gray-600 mb-6">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                Mixtape chillwave tumeric
              </p>
              <button className="flex items-center mt-auto duration-300 text-white bg-yellow-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-yellow-600 rounded">
                Buy Now
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-auto"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Enjoy the membership with the premium package.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
