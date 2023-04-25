import Head from "next/head";
import Layout from "./layout";
import Card from "@/components/card";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import formatDate from "@/helpers/formatDate";

import { Adsense } from "@ctrl/react-adsense";
import { BsCaretDownFill } from "react-icons/bs";
import Image from "next/image";

import { GoogleAdsenseContainer } from "@/components/googleAdsense";

export default function Home({ posts }) {
  const { status } = useSession();
  const { loading } = useAppContext();
  const [postsData, setPostsData] = useState([...posts.data]);
  const { push } = useRouter();
  const createPostPageHandle = () => {
    if (status === "authenticated") {
      return () => {
        push("/create-post");
      };
    } else {
      return () => {
        push("/auth/sign-in");
      };
    }
  };

  const loadMoreHandle = async () => {
    const { data } = await axios.get(`/api/posts?offset=${postsData.length}`);
    setPostsData([...postsData, ...data.data]);
  };

  return (
    <>
      <Head>
        <title>Trouble Partner</title>
        <meta name="description" content="Generated by Trouble Partner" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className=" py-20">
          <div className="md:container mx-auto px-4 min-h-[200px]">
            <section className="flex justify-center">
              <div className="flex flex-col items-center max-w-2xl">
                <h2 className="text-zinc-700 font-maxbold text-center text-4xl sm:text-5xl md:text-6xl relative w-60 h-24 sm:w-96 sm:h-36 mb-4">
                  <Image src="Logo.svg" fill alt="Logo" className="" />
                </h2>
                <p className="text-zinc-600 text-center font-semibold text-lg lg:text-2xl relative inline-flex justify-center">
                  Your problem is our problem.
                </p>
                <p className="text-center leading-5 px-4 text-zinc-800/60 mt-4 font-medium text-sm md:text-base max-w-xl">
                  Share your problem, either as yourself or anonymously. People
                  will connect with you and find solutions. they&apos;ll find
                  it. That&apos;s how simple it is. That&apos;s how beautiful it
                  is. That&apos;s how it is. as easy as that. That&apos;s how
                  safe it is.
                </p>
                <button
                  onClick={createPostPageHandle()}
                  className="bg-blue-300  text-blue-700 font-bold py-2 px-4 rounded border-blue-600 duration-300 hover:text-blue-50 hover:bg-blue-700 border-2  hover:shadow-lg hover:shadow-blue-600/50 mt-8 outline outline-2 outline-zinc-700 outline-offset-4"
                >
                  Share Your Trouble
                </button>
              </div>
            </section>

            <section className="mt-20 flex flex-col sm:grid sm:grid-cols-12 gap-4">
              <div className="col-span-2 px-4 py-4 relative hidden lg:flex">
                <div className="h-40 sticky top-12 w-full flex justify-center items-center text-white ">
                  <GoogleAdsenseContainer />
                </div>
              </div>
              <div className="cardArea flex flex-col items-center col-span-12 lg:col-span-8 gap-6 ">
                {postsData.map((post) => (
                  <Card
                    key={post._id}
                    id={post._id}
                    image={post.user.image}
                    name={post.user.name}
                    surname={post.user.surname}
                    title={post.title}
                    text={post.text}
                    slug={post.slug}
                    // memberType={post.user.memberType}
                    privacyStatus={post.privacyStatus}
                    time={formatDate(post.createdAt)}
                    comment={post.numComments}
                  />
                ))}

                {postsData.length !== posts?.count && (
                  <div>
                    <div>
                      <button
                        onClick={loadMoreHandle}
                        className="bg-blue-300 flex  items-center text-blue-700 font-bold py-2 px-4 rounded border-blue-600 duration-300 hover:text-blue-50 hover:bg-blue-700 border-2  hover:shadow-lg hover:shadow-blue-600/50 mt-8 outline-dashed outline-2 outline-blue-700/50 outline-offset-4 gap-4"
                      >
                        <BsCaretDownFill />
                        <span className="">Load More</span>
                        <BsCaretDownFill />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-span-2 px-4 py-4 relative hidden lg:flex">
                <div className="h-40 sticky top-12 w-full flex justify-center items-center text-white ">
                  <GoogleAdsenseContainer />
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex justify-center items-center">
          <div
            className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-blue-600  border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.APP_URL}/api/posts`);
  const posts = await res.json();

  return {
    props: {
      posts: posts,
    },
  };
}
