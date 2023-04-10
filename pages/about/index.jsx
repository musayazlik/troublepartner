import React from "react";
import Head from "next/head";
import { Adsense } from "@ctrl/react-adsense";
import Layout from "../layout";

const PostDetail = () => {
  return (
    <>
      <Head>
        <title>{`About Us | Trouble Partner`}</title>
        <meta name="description" content={`About Us | Trouble Partner`} />
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
              <div class="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-4xl text-3xl font-maxbold title-font mb-2 text-slate-900">
                  About Us
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-slate-500"></p>
              </div>
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
              <div className="context flex flex-col col-span-12 lg:col-span-8 "></div>
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
