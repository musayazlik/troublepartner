import React from "react";
import Layout from "../layout";
import { Tooltip } from "flowbite-react";

import { useSession, getSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { BsInfoCircleFill } from "react-icons/bs";
import { Adsense } from "@ctrl/react-adsense";

const CreatePost = () => {
  const [numberOfChars, setNumberOfChars] = React.useState({
    title: 0,
    text: 0,
  });

  const { data: session } = useSession();
  const [maxLength, setMaxLength] = React.useState({
    title: 43,
    text: session.user.memberType === "premium" ? 1000 : 400,
  });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const text = e.target.text.value;
    const privacyStatus = e.target.privacy.checked;

    if (text.length < 10) {
      Swal.fire("Error!", "Your post must be at least 10 characters.", "error");
      return;
    }

    if (text.length > 400 && session.user.memberType !== "premium") {
      Swal.fire("Error!", "Your post must be at most 400 characters.", "error");
      return;
    }

    Swal.fire({
      title: "Do you confirm?",
      text: "Your content will be shared publicly.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("/api/posts", {
            title,
            text,
            user: session.user.id,
            slug: title.split(" ").join("-").toLowerCase(),
            privacyStatus:
              session.user.memberType === "premium" ? privacyStatus : false,
            premiumTimeStatus:
              session.user.memberType === "premium" ? true : false,
          })
          .then((res) => {
            Swal.fire({
              title: "Success!",
              text: "Your post has been created.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            router.push("/");
          })
          .catch((err) => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const numberOfCharacters = (text) => {
    setNumberOfChars({ ...numberOfChars, text: text.length });
  };

  console.log(session.user.memberType);

  return (
    <Layout>
      <div className=" py-20">
        <div className="container mx-auto px-4 min-h-[200px]">
          <section className="mt-20 flex flex-col sm:grid sm:grid-cols-12 gap-4">
            <div className="col-span-2 px-4 py-4 relative hidden lg:flex">
              <Adsense
                client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
                slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT}
                style={{ display: "block" }}
                layout="in-article"
                format="fluid"
                data-full-width-responsive="true"
              />
            </div>
            <div className="cardArea flex flex-col items-center col-span-8 gap-6 ">
              <div className="mb-8 px-6 sm:px-14 ">
                <h1 className="text-3xl md:text-5xl font-extrabold text-center">
                  Create a Post
                </h1>

                <p className="text-center text-xl mt-2 text-gray-500">
                  Share your troubles and problems with us. Let our members
                  produce solutions for you. Take advantage of our members who
                  produce solutions.
                </p>
                <p className="text-center text-sm font-medium mt-4 bg-yellow-400 rounded-md px-4 py-2 text-yellow-700">
                  <span className="font-extrabold">Warning:</span> It is a
                  community of people who want to help each other. We are here
                  to help you. We are here to help each other.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="w-full px-6 sm:px-14">
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor="title"
                    className="font-extrabold text-xl mb-4"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    maxLength={maxLength.title}
                    placeholder="Trouble with my car..."
                    className="mb-6 border-2 placeholder:text-slate-400/60 outline-double shadow-lg shadow-blue-700/40 outline-blue-600 outline-offset-4 border-slate-600 p-2 rounded-md duration-300 hover:shadow-lg hover:shadow-blue-600/50 outline-2 font-bold focus:outline-blue-600 focus:outline-offset-8 focus:border-slate-600 focus:shadow-lg focus:shadow-blue-600/80"
                  />
                </div>

                <div className="flex flex-col ">
                  <label htmlFor="text" className="font-extrabold text-xl mb-4">
                    Tell your problem...
                  </label>

                  <textarea
                    name="text"
                    id="text"
                    cols="30"
                    rows="10"
                    {...(session.user.memberType !== "premium" && {
                      maxLength: maxLength.text,
                    })}
                    placeholder="I have a problem with my car. I can't start it. I don't know what to do. I need help."
                    className="mb-6 border-2 placeholder:text-slate-400/60 outline-double shadow-lg shadow-blue-700/40 outline-blue-600 outline-offset-4 border-slate-600 p-2 rounded-md duration-300 hover:shadow-lg hover:shadow-blue-600/50 outline-2 font-bold focus:outline-blue-600 focus:outline-offset-8 focus:border-slate-600 focus:shadow-lg focus:shadow-blue-600/80"
                    onChange={(e) => {
                      numberOfCharacters(e.target.value);
                    }}
                  ></textarea>
                  <div className="flex gap-3 items-center mb-6">
                    {session.user.memberType === "premium" ? null : (
                      <>
                        <p className="mb-0">
                          {maxLength.text - numberOfChars.text} characters left.
                        </p>
                        <Tooltip content="Share content with unlimited characters with a premium membership.">
                          <BsInfoCircleFill className="inline-block text-lg text-yellow-400" />
                        </Tooltip>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col  ">
                  <label
                    htmlFor="privacy"
                    className="font-extrabold text-xl"
                  ></label>
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      name="privacy"
                      id="privacy"
                      disabled={
                        session.user.memberType === "premium" ? false : true
                      }
                      className={`w-6 h-6 checked:bg-blue-500 accent-blue-500 checked:scale-110 checked:outline-double checked:outline-2 checked:outline-offset-4 duration-300 disabled:opacity-50 ${
                        session.user.memberType === "premium"
                          ? ""
                          : "cursor-not-allowed"
                      }  `}
                    />
                    <p
                      className={`font-bold text-lg text-gray-400 ${
                        session.user.memberType === "premium"
                          ? "text-gray-500"
                          : "cursor-not-allowed text-gray-400"
                      }`}
                    >
                      I want to hide my identity.
                    </p>

                    {session.user.memberType === "premium" ? null : (
                      <Tooltip content="Sharing confidential content is exclusive to premium members.">
                        <BsInfoCircleFill className="inline-block text-lg text-yellow-400" />
                      </Tooltip>
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-8 border-2 border-slate-800/50 border-b-4 font-extrabold text-lg lg:text-xl">
                    Create Post
                  </button>
                </div>
              </form>
            </div>
            <div className="col-span-2 px-4 py-4 relative hidden lg:flex">
              <Adsense
                client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
                slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT}
                style={{ display: "block" }}
                layout="in-article"
                format="fluid"
                data-full-width-responsive="true"
              />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
