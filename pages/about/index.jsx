import React from "react";
import Head from "next/head";
import { Adsense } from "@ctrl/react-adsense";
import Layout from "../layout";
import Image from "next/image";
import Link from "next/link";
import {
  FiFacebook,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { TbBrandTelegram } from "react-icons/tb";

const PostDetail = () => {
  return (
    <>
      <Head>
        <title>{`About Us | Trouble Partner`}</title>
        <meta name="description" content={`About Us | Trouble Partner`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <div className=" pb-20">
          <div className="container mx-auto px-4 mt-20  ">
            <div className="flex flex-col items-center">
              <div class="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-4xl text-3xl font-maxbold title-font mb-2 text-zinc-900">
                  About Us
                </h1>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 min-h-[200px] mb-28">
            <section className=" flex flex-col sm:grid sm:grid-cols-12 gap-4">
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
                <div className="avatar mx-auto w-full">
                  <Image
                    src="/images/author.png"
                    width={120}
                    height={120}
                    alt="Founder/CTO"
                    className="rounded-full mx-auto border-4 border-blue-600 shadow-lg shadow-blue-700/80 hover:shadow-2xl hover:shadow-blue-700 duration-500 transform-gpu hover:scale-110 hover:outline-offset-8 outline-2 outline-dashed outline-offset-4 outline-blue-600 mb-4"
                  />
                </div>
                <div className="text-center mt-4 mb-4">
                  <h1 className="text-2xl font-maxbold text-zinc-900">
                    Founder
                  </h1>
                  <h2 className="text-xl font-bold text-zinc-900 mb-4">
                    <a
                      href="https://www.linkedin.com/in/ahmet-ak%C4%B1n-0b1b4b1b3/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Musa Yazlik
                    </a>
                  </h2>

                  <p className="text-base md:text-lg text-zinc-900 px-4">
                    Hello. I&#39;m Musa Yazlik. In 2017, I turned to writing
                    with the hacking of my personal website that I established.
                    At first, I learned the software by doing backend coding in
                    the field of web software with the php programming language.
                    But then I turned to the frontend side in the field of web
                    software because the frontend analysis was more interesting
                    to me. Last year, I worked as a frontend developer in a
                    company that provides web services in the field of
                    artificial intelligence and blockchain. After leaving there,
                    I developed myself to develop Full-Stack applications in the
                    field of Javascript. Now I provide services as a freelance
                    Full-Stack Developer on sites such as{" "}
                    <Link
                      target="_blank"
                      href="https://www.fiverr.com/musayazlik"
                      className="text-blue-500 font-extrabold hover:text-blue-700 duration-300"
                    >
                      Fiverr
                    </Link>
                    ,{" "}
                    <Link
                      target="_blank"
                      href="https://www.upwork.com/freelancers/~01882cb66b2ba55ee0"
                      className="text-blue-500 font-extrabold hover:text-blue-700 duration-300"
                    >
                      Upwork
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="https://www.freelancer.com/u/musayazlik"
                      target="_blank"
                      className="text-blue-500 font-extrabold hover:text-blue-700 duration-300"
                    >
                      Freelancer
                    </Link>
                    . I am also involved in the founding of this site.
                  </p>
                </div>
                <div className="social mt-4">
                  <ul className="flex justify-center items-center">
                    <li className="mx-2">
                      <a
                        href="https://www.linkedin.com/in/musayazlik"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FiLinkedin className="text-2xl" />
                      </a>
                    </li>
                    <li className="mx-2">
                      <a
                        href="https://www.facebook.com/musayazlik"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FiFacebook className="text-2xl" />
                      </a>
                    </li>
                    <li className="mx-2">
                      <a
                        href="https://twitter.com/musayazlik"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FiTwitter className="text-2xl" />
                      </a>
                    </li>
                    <li className="mx-2">
                      <a
                        href="https://www.instagram.com/musa_yazlik/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FiInstagram className="text-2xl" />
                      </a>
                    </li>
                    <li className="mx-2">
                      <a
                        href="https://github.com/musayazlik"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FiGithub className="text-2xl" />
                      </a>
                    </li>
                    <li className="mx-2">
                      <a
                        href="https://t.me/musayazlik"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <TbBrandTelegram className="text-2xl" />
                      </a>
                    </li>
                  </ul>
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
