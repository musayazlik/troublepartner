import React from "react";
import Layout from "../layout";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

const PaymentFail = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-maxbold text-zinc-800">
            Payment Failed
          </h1>

          <p className="mt-3 text-2xl font-bold">
            An error occurred during payment. Please contact the
            administrator...
          </p>
          <Link
            href="/contact"
            className="text-xl font-medium bg-zinc-700 text-zinc-50 px-4 py-2 rounded-md mt-8 flex justify-center items-center"
          >
            <MdEmail className="inline-block mr-2" />
            Contact
          </Link>
        </main>
      </div>
    </Layout>
  );
};

export default PaymentFail;
