import React from "react";
import Layout from "../layout";

import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const PaymentSuccess = () => {
  const router = useRouter();

  setTimeout(() => {
    signOut({
      redirect: false,
    });

    router.push("/");
  }, 3000);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-maxbold text-zinc-800">
            Payment Success
          </h1>

          <p className="mt-3 text-2xl font-bold">
            Thank you for purchasing a premium membership.{" "}
          </p>
          <p className="mt-3 text-xl font-medium">
            You are being redirected to the home page...{" "}
          </p>
        </main>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
