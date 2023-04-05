import React from "react";
import Layout from "../layout";
import Image from "next/image";

import { useSession, getSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const CreatePost = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.text.value;

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
            console.log(err);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };
  return (
    <Layout>
      <div className=" py-20">
        <div className="container mx-auto px-4 min-h-[200px]">
          <section className="mt-20 grid grid-cols-12 gap-4">
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
              <form onSubmit={handleSubmit} className="w-full px-14">
                <div className="flex flex-col gap-4">
                  <label htmlFor="text" className="font-extrabold text-xl">
                    Share your problem with us
                  </label>

                  <textarea
                    name="text"
                    id="text"
                    cols="30"
                    rows="10"
                    className="border-2 outline-double shadow-lg shadow-teal-700/40 outline-teal-600 outline-offset-4 border-slate-600 p-2 rounded-md duration-300 hover:shadow-lg hover:shadow-teal-600/50 outline-4 font-bold"
                  ></textarea>
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
