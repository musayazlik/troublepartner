import React from "react";
import Layout from "../layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Label, TextInput } from "flowbite-react";

import { MdPayment } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

const Pricing = () => {
  const [status, setStatus] = React.useState("monthly");
  const { data: session } = useSession();
  const { push } = useRouter();
  const [show, setShow] = React.useState(false);
  const [amount, setAmount] = React.useState(4.99);
  const [coupon, setCoupon] = React.useState(null);

  const handlePayment = (e) => {
    e.preventDefault();
    const data = {
      name: e.currentTarget.name.value,
      surname: e.currentTarget.surname.value,
      address: e.currentTarget.address.value,
      phone: e.currentTarget.phone.value,
      city: e.currentTarget.city.value,
      country: e.currentTarget.country.value,
      user: session?.user,
      coupon: coupon,
      amount,
    };

    axios({
      method: "POST",
      url: "/api/payment",
      data,
    })
      .then((res) => {
        if (res.data.data.status === "success") {
          window.location.href =
            res.data.data.payment_page_url_international_card;
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const couponCheck = (e) => {
    e.preventDefault();

    axios({
      method: "get",
      url: `/api/coupons/couponCheck?id=${coupon}&status=${status}`,
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Coupon valid!",
          text: "You can use this coupon.",
        });
        setAmount(res.data.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Coupon is not valid!",
        });
      });
  };

  return (
    <div className="relative">
      <Layout>
        <div className="container mx-auto">
          <div className="flex flex-col text-center w-full my-20 ">
            <h1 className="sm:text-4xl text-3xl font-maxbold title-font mb-2 text-zinc-900">
              Pricing
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-zinc-500">
              Try Our Free Package, Upgrade To Our Premium Plan When You Need
              It!
            </p>
            <div className="flex mx-auto border-2 gap-2 border-zinc-300 rounded-md overflow-hidden mt-6 bg-zinc-100 p-1">
              <button
                onClick={() => {
                  setStatus("monthly");
                  setAmount(4.99);
                }}
                className={`py-1 rounded px-4  border-2 border-zinc-400 duration-300 ${
                  status === "monthly"
                    ? "bg-zinc-400 text-white border-zinc-500  "
                    : ""
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => {
                  setStatus("annually");
                  setAmount(49.99);
                }}
                className={`py-1 rounded px-4 border-2 border-zinc-400 duration-300  ${
                  status === "annually"
                    ? "bg-zinc-400 text-white border-zinc-500  "
                    : ""
                }`}
              >
                Annually
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center mb-20">
            <div className="p-4 xl:w-2/5 md:w-1/2 w-full">
              <div className="h-full shadow-xl shadow-zinc-300/30 md:scale-95 p-6 rounded-lg border-2 border-zinc-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium uppercase">
                  Free
                </h2>
                <h3 className="text-5xl text-zinc-900 leading-none flex items-center pb-4 mb-4 border-b border-zinc-200 font-extrabold">
                  <span>$0</span>
                  <span className="text-lg ml-1 font-normal text-zinc-500">
                    {status === "monthly" ? "/mo" : "/yr"}
                  </span>
                </h3>
                <p className="flex items-center text-zinc-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-zinc-400 text-white rounded-full flex-shrink-0">
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
                  Sharing content and comment with 260 character limit.
                </p>

                <p className="flex items-center text-zinc-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-zinc-400 text-white rounded-full flex-shrink-0">
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
                <p className="flex items-center text-zinc-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-zinc-400 text-white rounded-full flex-shrink-0">
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
                  Restricted content sharing
                </p>
                <button
                  onClick={() => {
                    push("/auth/sign-up");
                  }}
                  className="flex items-center mt-auto duration-300 text-white bg-zinc-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-zinc-500 rounded"
                >
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
                <p className="text-xs text-zinc-500 mt-3">
                  This package is created automatically for everyone who is a
                  member.
                </p>
              </div>
            </div>
            <div className="p-4 xl:w-2/5 md:w-1/2 w-full ">
              <div className="h-full shadow-xl shadow-yellow-300/30 md:scale-105 p-6 rounded-lg border-2 border-yellow-500 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium uppercase">
                  Premium
                </h2>
                <h3 className="text-5xl text-zinc-900 leading-none flex items-center pb-4 mb-4 border-b border-zinc-200 font-extrabold">
                  <span>{status === "monthly" ? "$4.99" : "$49.90"}</span>
                  <span className="text-lg ml-1 font-normal text-zinc-500">
                    {status === "monthly" ? "/mo" : "/yr"}
                  </span>
                </h3>
                <p className="flex items-center text-zinc-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-yellow-400 shadow-md shadow-yellow-500/50 text-white rounded-full flex-shrink-0">
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
                  Content and comment sharing with unlimited character limit
                </p>

                <p className="flex items-center text-zinc-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-yellow-400 shadow-md shadow-yellow-500/50 text-white rounded-full flex-shrink-0">
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
                  Share content both publicly and privately
                </p>
                <p className="flex items-center text-zinc-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-yellow-400 shadow-md shadow-yellow-500/50 text-white rounded-full flex-shrink-0">
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
                  Unlimited content sharing
                </p>
                <p className="flex items-center text-zinc-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-yellow-400 shadow-md shadow-yellow-500/50 text-white rounded-full flex-shrink-0">
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
                  Badge that you are a premium member
                </p>
                {/* <div className="absolute top-0 left-0 w-full h-full bg-yellow-400/95 flex text-5xl text-yellow-700 font-ultrabold justify-center items-center ">
                  Coming Soon
                </div> */}
                {session ? (
                  <Button
                    onClick={() => setShow(true)}
                    className="bg-yellow-600 hover:bg-yellow-400 duration-200"
                  >
                    Buy Now
                  </Button>
                ) : (
                  <button
                    onClick={() => push("/auth/sign-in")}
                    className="flex items-center mt-auto duration-300 text-white bg-yellow-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-yellow-600 rounded"
                  >
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
                )}

                <p className="text-xs text-zinc-500 mt-3">
                  Enjoy the membership with the premium package.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {show && (
        <>
          <div className="absolute px-6 py-6 top-0 left flex justify-center items-center w-full h-full z-50  ">
            <div className="relative z-50 space-y-4 py-6 px-8 rounded-lg bg-zinc-50 border-4 border-zinc-600/10 border-b-8 ">
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                Payment Information
              </h3>
              <p>
                <span className="text-zinc-500 dark:text-zinc-400">
                  You are about to purchase the premium package for{" "}
                </span>
                <span className="text-zinc-900 dark:text-zinc-100">
                  {status === "monthly" ? "$4.99" : "$49.90"}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {status === "monthly" ? "/mo" : "/yr"}
                </span>
              </p>

              <div className="mb-2 flex flex-col gap-2 ">
                <label
                  htmlFor="coupon"
                  className="text-sm font-bold text-gray-500"
                >
                  {" "}
                  Coupon Code
                </label>

                <div className="flex gap-2">
                  <TextInput
                    id="coupon"
                    type="text"
                    name="coupon"
                    onChange={(e) => {
                      setCoupon(e.target.value);
                    }}
                  />

                  <Button
                    onClick={(e) => {
                      couponCheck(e);
                    }}
                    className="bg-yellow-600 hover:bg-yellow-400 duration-200 text-sm "
                  >
                    Apply
                  </Button>
                </div>
              </div>

              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  handlePayment(e);
                }}
              >
                <div className="flex gap-4">
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Name" />
                    </div>
                    <TextInput
                      id="name"
                      type="text"
                      name="name"
                      defaultValue={session?.user?.name}
                      required={true}
                      disabled={true}
                    />
                  </div>
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label htmlFor="surname" value="Surname" />
                    </div>
                    <TextInput
                      id="surname"
                      type="text"
                      name="surname"
                      defaultValue={session?.user?.surname}
                      required={true}
                      disabled={true}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="phone" value="Phone" />
                  </div>
                  <TextInput
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="+1 555 555 5555"
                    required={true}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="address" value="Address" />
                  </div>
                  <TextInput
                    id="address"
                    type="text"
                    name="address"
                    placeholder="1234 Main St"
                    required={true}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pb-4">
                  <div className=" w-full">
                    <div className="mb-2 block">
                      <Label htmlFor="country" value="Country" />
                    </div>
                    <TextInput
                      id="country"
                      type="text"
                      name="country"
                      placeholder="1234 Main St"
                      required={true}
                    />
                  </div>
                  <div className=" w-full">
                    <div className="mb-2 block">
                      <Label htmlFor="city" value="City" />
                    </div>
                    <TextInput
                      id="city"
                      type="text"
                      name="city"
                      placeholder="1234 Main St"
                      required={true}
                    />
                  </div>
                </div>

                <div className="TotalPrice">
                  <div className="flex justify-between">
                    <p className="text-lg font-bold text-gray-500">
                      Total Price
                    </p>
                    <p className="text-lg font-bold text-gray-500">
                      {" "}
                      ${amount}
                    </p>
                  </div>
                </div>
                <div className="w-full ">
                  <button
                    type="submit"
                    className="flex items-center justify-center mt-auto duration-300 text-white bg-yellow-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-yellow-500 rounded  font-bold text-lg"
                  >
                    <MdPayment className="mr-2" fontSize={28} />
                    Buy Now
                  </button>
                </div>
              </form>
            </div>
            <div
              className="absolute top-0 left-0 w-full  h-full bg-black opacity-50 z-20"
              onClick={() => setShow(false)}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Pricing;
