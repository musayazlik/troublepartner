import React from "react";
import Layout from "./layout";
import Link from "next/link";
import { BiLeftArrow } from "react-icons/bi";

const Page404 = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-8xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-medium text-gray-600">Page Not Found</h2>

        <p className="text-gray-500 mt-2 mb-4">
          We're sorry, the page you requested could not be found.
        </p>

        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-blue-500 transition duration-300 ease-in-out flex items-center"
        >
          <BiLeftArrow className="inline-block mr-2" />
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default Page404;
