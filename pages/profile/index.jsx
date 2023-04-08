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

const PostDetail = ({ session, data }) => {
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
            <div className=" h-28 flex justify-center items-center"></div>
          </div>
          <div className="container mx-auto px-4 min-h-[200px]">
            <section className="mt-12 flex flex-col sm:grid sm:grid-cols-12 gap-4">
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
              <div className="context flex flex-col col-span-12 lg:col-span-8 ">
                <div className="px-6 sm:px-12">
                  <div action="">
                    <div className="flex flex-col gap-4">
                      <div>
                        <h2 className="font-black text-xl text-slate-700">
                          {" "}
                          User Information
                        </h2>
                      </div>
                      <div className="flex flex-col gap-2">
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
                          className="border-2 border-slate-800/50 border-b-4 rounded-md px-4 py-2 focus:outline-none focus:border-teal-500 max-w-lg"
                          defaultValue={data.user[0].name}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
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
                          className="border-2 border-slate-800/50 border-b-4 rounded-md px-4 py-2 focus:outline-none focus:border-teal-500 max-w-lg "
                        />
                      </div>
                    </div>
                    {/* <button
                      type="submit"
                      className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md font-extrabold"
                    >
                      Save
                    </button> */}
                  </div>
                </div>
                <div className="px-6 sm:px-12 mt-8">
                  <div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <h2 className="font-black text-xl text-slate-700">
                          {" "}
                          My Posts
                        </h2>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="cardList border-2 border-slate-300 p-2 rounded-lg max-h-96 overflow-auto ">
                          {data.posts.map((post) => (
                            <div
                              key={post._id}
                              className="card bg-slate-200 rounded-md p-4 border-2 border-slate-500/50 mb-4 last:mb-0"
                            >
                              <div className="flex justify-between items-center ">
                                <div className="card_content w-full flex flex-col">
                                  <p>
                                    {post.text.length > 100 ? (
                                      <span>
                                        {post.text.slice(0, 100)}...
                                        <Link href={`/post/${post._id}`}>
                                          <a className="text-teal-500 font-bold">
                                            Read more
                                          </a>
                                        </Link>
                                      </span>
                                    ) : (
                                      post.text
                                    )}
                                  </p>
                                  <div className="flex justify-between items-center mt-3">
                                    <div className="flex gap-5 ">
                                      <div className=" flex gap-2 items-center text-xs sm:text-sm font-extrabold text-slate-900/70  ">
                                        <BiTimeFive
                                          className=" "
                                          fontSize={20}
                                        />
                                        <span className="mt-0.5">
                                          {formatDate(post.createdAt)}
                                        </span>
                                      </div>
                                      <div className=" flex gap-2 items-center text-xs sm:text-sm font-extrabold text-slate-900/70  ">
                                        <BiComment
                                          className=" "
                                          fontSize={20}
                                        />
                                        <span className="mt-0.5">
                                          {post.numComments}
                                        </span>

                                        <div className=" flex gap-2 items-center text-xs sm:text-sm font-extrabold text-slate-900/70  ml-3 ">
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
                                <button className="hover:border-2 hover:border-red-700 border-2 border-transparent duration-300 hover:text-red-200 text-red-600 bg-transparent hover:bg-red-500 rounded-md p-1">
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
                <div className="px-6 sm:px-12 mt-8">
                  <div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <h2 className="font-black text-xl text-slate-700">
                          {" "}
                          My Comments
                        </h2>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="cardList border-2 border-slate-300 p-2 rounded-lg max-h-96 overflow-auto ">
                          {data.comments.map((commet) => (
                            <div
                              key={commet._id}
                              className="card bg-slate-200 rounded-md p-4 border-2 border-slate-500/50 mb-4 last:mb-0"
                            >
                              <div className="flex justify-between items-center ">
                                <div className="card_content w-full flex flex-col">
                                  <p>
                                    {commet.text.length > 100 ? (
                                      <span>
                                        {commet.text.slice(0, 100)}...
                                        <Link href={`/commet/${commet._id}`}>
                                          <a className="text-teal-500 font-bold">
                                            Read more
                                          </a>
                                        </Link>
                                      </span>
                                    ) : (
                                      commet.text
                                    )}
                                  </p>
                                  <div className="flex justify-between items-center mt-3">
                                    <div className="flex gap-5 ">
                                      <div className=" flex gap-2 items-center text-xs sm:text-sm font-extrabold text-slate-900/70  ">
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
                                <button className="hover:border-2 hover:border-red-700 border-2 border-transparent duration-300 hover:text-red-200 text-red-600 bg-transparent hover:bg-red-500 rounded-md p-1">
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

  console.log(data);

  return {
    props: {
      session,
      data,
    },
  };
}
