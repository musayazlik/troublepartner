import React from "react";
import Layout from "../layout";
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const [token, setToken] = useState("");
  const recaptchaRef = useRef(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const token = recaptchaRef.current.getValue();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please check the captcha!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!name || !email || !message) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const data = {
      name,
      email,
      message,
      token,
    };

    setLoading(true);

    axios({
      method: "POST",
      url: "/api/contact",
      data: data,
    })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your message has been sent successfully!",
          showConfirmButton: false,
          timer: 2000,
        });

        event.target.name.value = "";
        event.target.email.value = "";
        event.target.message.value = "";
        recaptchaRef.current.reset();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Layout>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-4xl text-3xl font-maxbold title-font mb-2 text-slate-900">
            Contact
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-slate-500">
            We look forward to hearing from you! If you have any questions,
            feedback or suggestions, do not hesitate to contact us. You can
            contact us by filling out the contact form below or by writing
            directly to our e-mail address. We will try to reply you as soon as
            possible. We thank you!
          </p>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <form
              action=""
              className="flex flex-wrap -m-2"
              onSubmit={handleSubmit}
            >
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 flex justify-center w-full">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  ref={recaptchaRef}
                />
              </div>
              <div class="p-2 w-full">
                <button class="flex justify-center items-center gap-3 mx-auto text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded text-xl font-bold">
                  {loading && (
                    <svg
                      className="animate-spin  h-5 w-5 mb-0.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  )}
                  Submit
                </button>
              </div>
            </form>
            <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              <Link
                href={"mailto:info@troublepartner.com"}
                class="text-blue-500"
              >
                info@troublepartner.com
              </Link>
              <p class="leading-normal my-5">Eskisehir/Turkey</p>
              <span class="inline-flex">
                <a class="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a class="ml-4 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a class="ml-4 text-gray-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a class="ml-4 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
