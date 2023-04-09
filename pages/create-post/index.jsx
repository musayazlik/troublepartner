import React from "react";
import Layout from "../layout";
import Image from "next/image";

import { useSession, getSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { BiInfoCircle } from "react-icons/bi";
import { BsInfoCircleFill } from "react-icons/bs";

const CreatePost = () => {
  const [numberOfChars, setNumberOfChars] = React.useState(200);
  const [maxLength, setMaxLength] = React.useState(200);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const privacyStatus = e.target.privacy.checked;

    if (text.length < 10) {
      Swal.fire("Error!", "Your post must be at least 10 characters.", "error");
      return;
    }
    if (text.length > 200) {
      Swal.fire("Error!", "Your post must be at most 200 characters.", "error");
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
            text,
            user: session.user.id,
            slug: text.slice(0, 50).split(" ").join("-"),
            privacyStatus: privacyStatus,
            premiumTimeStatus: false,
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
    const numberOfChars = text.length;
    const totalChars = 200;
    const remainingChars = totalChars - numberOfChars;

    if (remainingChars < 0) {
      setNumberOfChars(0);
      const truncatedText = text.slice(0, totalChars);
      textarea.value = truncatedText;
      return;
    }
    setNumberOfChars(remainingChars);
  };

  return (
    <Layout>
      <div className=" py-20">
        <div className="container mx-auto px-4 min-h-[200px]">
          <section className="mt-20 flex flex-col sm:grid sm:grid-cols-12 gap-4">
            <div className="col-span-2 px-4 py-4 relative hidden lg:flex">
              <div className="h-40 sticky top-12 w-full flex justify-center items-center text-white ">
                <Image
                  src="https://i.pravatar.cc/300"
                  width={300}
                  height={250}
                  alt="Avatar"
                  className="rounded-full border-4 border-slate-200 shadow-lg min-w-[64px] min-h-[64px] sticky "
                />
              </div>
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
                <div className="flex flex-col gap-4">
                  <label htmlFor="text" className="font-extrabold text-xl">
                    Tell your problem...
                  </label>

                  <textarea
                    name="text"
                    id="text"
                    cols="30"
                    rows="10"
                    maxLength={200}
                    className="border-2 outline-double shadow-lg shadow-teal-700/40 outline-teal-600 outline-offset-4 border-slate-600 p-2 rounded-md duration-300 hover:shadow-lg hover:shadow-teal-600/50 outline-4 font-bold"
                    onChange={(e) => {
                      numberOfCharacters(e.target.value);
                    }}
                  ></textarea>
                  <div className="flex gap-3 items-center">
                    <p className="mb-0">{numberOfChars} characters left.</p>
                    <p>
                      <BsInfoCircleFill
                        title="You can become a premium member for an additional 300 characters."
                        className="inline-block text-lg text-yellow-500"
                      />
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4 my-4">
                  <label
                    htmlFor="privacy"
                    className="font-extrabold text-xl"
                  ></label>
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      name="privacy"
                      id="privacy"
                      disabled
                      className="w-6 h-6 checked:bg-teal-500 accent-teal-500 disabled:opacity-50 disabled:cursor-not-allowed "
                    />
                    <p className="font-bold text-lg text-gray-400 cursor-not-allowed">
                      I want to hide my identity.
                    </p>
                    <p>
                      <BsInfoCircleFill
                        title="Sharing confidential content is exclusive to premium members."
                        className="inline-block text-lg text-yellow-500"
                      />
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="bg-teal-500 text-white px-4 py-2 rounded-md mt-8 border-2 border-slate-800/50 border-b-4 font-extrabold text-lg lg:text-xl">
                    Create Post
                  </button>
                </div>
              </form>
            </div>
            <div className="col-span-2 px-4 py-4 relative hidden lg:flex">
              <div className="h-40 sticky top-12 w-full flex justify-center items-center text-white ">
                <Image
                  src="https://i.pravatar.cc/300"
                  width={300}
                  height={250}
                  alt="Avatar"
                  className="rounded-full border-4 border-slate-200 shadow-lg min-w-[64px] min-h-[64px] sticky "
                />
              </div>
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
