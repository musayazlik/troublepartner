import React from "react";
import Layout from "../layout";
import Image from "next/image";

const PostDetail = () => {
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
            <div className="cardArea flex flex-col items-center col-span-8 gap-6 "></div>
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

export default PostDetail;

export async function getServerSideProps(context) {
  const { query } = context;

  const id = query.id.split("-").pop();

  const res = await fetch(`http://localhost:3000/api/posts/${id}`);
  const post = await res.json();

  console.log(post);

  return {
    props: {
      post,
    },
  };
}
