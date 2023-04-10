import React from "react";
import Layout from "../layout";
import Image from "next/image";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MdDeleteOutline } from "react-icons/md";
import { BiTimeFive, BiComment } from "react-icons/bi";
import Link from "next/link";
import formatDate from "@/helpers/formatDate";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Adsense } from "@ctrl/react-adsense";

const PostDetail = ({ session, data }) => {
  const deleteHandle = (id, element) => {
    if (element === "post") {
      Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "Are you sure about deleting the post?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: "DELETE",
            url: `/api/posts?id=${id}`,
          })
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "Post deleted",
                showConfirmButton: false,
                timer: 1500,
              })
                .then(() => {
                  window.location.reload();
                })
                .catch((err) => {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.message,
                  });
                });
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.message,
              });
            });
        }
      });
    } else {
      axios({
        method: "DELETE",
        url: `/api/comments?id=${id}`,
      })
        .then((res) => {
          toast.success("Comment deleted.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.reload();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
          });
        });
    }
  };

  return (
    <>
      <Head>
        <title>{`Profile | Trouble Partner`}</title>
        <meta
          name="description"
          content={`This is ${session.user.name}'s profile page.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <div className="pt-12 pb-20">
          <div className="container mx-auto px-4 ">
            {/* Google adsense */}
            <div className=" h-28 flex justify-center items-center">
              <Adsense
                client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
                slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT}
                style={{ display: "block" }}
                layout="in-article"
                format="fluid"
                data-full-width-responsive="true"
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="sm:text-4xl text-3xl font-maxbold title-font mb-2 text-slate-900">
                Profile
              </h1>
              <p className=" mx-auto leading-relaxed text-base text-slate-500">
                This is your profile page. You can see your posts and comments
                here.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 min-h-[200px]">
            <section className="mt-12 flex flex-col sm:grid sm:grid-cols-12 gap-4">
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
              <div className="context flex flex-col col-span-12 lg:col-span-8 ">
                <div className="px-2 sm:px-12">
                  <div action="">
                    <div className="flex flex-col gap-4">
                      <div>
                        <h2 className="font-black text-xl text-slate-700">
                          {" "}
                          User Information
                        </h2>
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="name"
                          className="text-md font-bold text-slate-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          disabled
                          className="border-2 border-slate-800/50 border-b-4 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 max-w-lg"
                          defaultValue={data.user[0].name}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="email"
                          className="text-md font-bold text-slate-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          disabled
                          defaultValue={data.user[0].email}
                          className="border-2 border-slate-800/50 border-b-4 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 max-w-lg "
                        />
                      </div>
                    </div>
                    {/* <button
                      type="submit"
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md font-extrabold"
                    >
                      Save
                    </button> */}
                  </div>
                </div>
                <div className="px-2 sm:px-12 mt-8">
                  <div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <h2 className="font-black text-xl text-slate-700">
                          {" "}
                          My Posts
                        </h2>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="cardList border-2 border-slate-300 p-2 rounded-lg max-h-96 overflow-auto ">
                          {data.posts.map((post) => (
                            <div
                              key={post._id}
                              className="card bg-slate-200 rounded-md p-4 border-2 border-slate-500/50 mb-3 last:mb-0 w-full min-w-[400px]"
                            >
                              <div className="flex justify-between items-center gap-x-8 ">
                                <Link
                                  href={`/post/${post.slug}-${post._id}`}
                                  className="flex flex-col mb-4 last:mb-0 w-full "
                                >
                                  <div className="card_content w-full flex flex-col">
                                    <p
                                      style={{
                                        wordBreak: "break-word",
                                      }}
                                    >
                                      {post.text.slice(0, 100)}...
                                    </p>
                                    <div className="flex justify-between items-center mt-3">
                                      <div className="flex gap-3 ">
                                        <div className=" flex gap-3 items-center text-xs sm:text-sm font-extrabold text-slate-900/70  ">
                                          <BiTimeFive
                                            className=" "
                                            fontSize={20}
                                          />
                                          <span className="mt-0.5">
                                            {formatDate(post.createdAt)}
                                          </span>
                                        </div>
                                        <div className=" flex gap-3 items-center text-xs sm:text-sm font-extrabold text-slate-900/70  ">
                                          <BiComment
                                            className=" "
                                            fontSize={20}
                                          />
                                          <span className="mt-0.5">
                                            {post.numComments}
                                          </span>

                                          <div className=" flex gap-3 items-center text-xs sm:text-sm font-extrabold text-slate-900/70 ml-1 ">
                                            {post.privacyStatus ? (
                                              <FiEyeOff
                                                className=" "
                                                fontSize={20}
                                                title="This content was shared privately."
                                              />
                                            ) : (
                                              <FiEye
                                                className=" "
                                                fontSize={20}
                                                title="This content was shared without profile private."
                                              />
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                                <button
                                  onClick={() => {
                                    deleteHandle(post._id, "post");
                                  }}
                                  className="hover:border-2 hover:border-red-700 border-2 border-transparent duration-300 hover:text-red-200 text-red-600 bg-transparent hover:bg-red-500 rounded-md p-1"
                                >
                                  <MdDeleteOutline className=" text-2xl" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-2 sm:px-12 mt-8">
                  <div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <h2 className="font-black text-xl text-slate-700">
                          {" "}
                          My Comments
                        </h2>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="cardList border-2 border-slate-300 p-2 rounded-lg max-h-96 overflow-auto ">
                          {data.comments.map((commet) => (
                            <div
                              key={commet._id}
                              className="card bg-slate-200 rounded-md p-4 border-2 border-slate-500/50 mb-3 last:mb-0 min-w-[400px]"
                            >
                              <div className="flex justify-between items-center gap-x-8 ">
                                <div className="card_content w-full flex flex-col">
                                  <p
                                    className=""
                                    style={{
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {commet.text.slice(0, 100)}...
                                  </p>
                                  <div className="flex justify-between items-center mt-3">
                                    <div className="flex gap-5 ">
                                      <div className=" flex gap-3 items-center text-xs sm:text-sm font-extrabold text-slate-900/70  ">
                                        <BiTimeFive
                                          className=" "
                                          fontSize={20}
                                        />
                                        <span className="mt-0.5">
                                          {formatDate(commet.createdAt)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    deleteHandle(commet._id, "comment");
                                  }}
                                  className="hover:border-2 hover:border-red-700 border-2 border-transparent duration-300 hover:text-red-200 text-red-600 bg-transparent hover:bg-red-500 rounded-md p-1"
                                >
                                  <MdDeleteOutline className=" text-2xl" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
    </>
  );
};

export default PostDetail;

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

  const resData = await fetch(
    `${process.env.APP_URL}/api/profile?id=${session.user.id}`
  );
  const data = await resData.json();

  return {
    props: {
      session,
      data,
    },
  };
}
