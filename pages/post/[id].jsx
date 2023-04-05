import React from "react";
import Layout from "../layout";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";

const PostDetail = ({ post, comments }) => {
  const [comment, setComment] = React.useState([...comments]);
  const { data: session, status } = useSession();
  const createComment = (e) => {
    e.preventDefault();

    const commentText = e.target[0].value;

    if (!commentText) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Comment cannot be empty",
      });
      return;
    }

    const data = {
      text: commentText,
      user: session?.user?.id,
      post: post._id,
    };

    axios({
      method: "POST",
      url: "/api/comments",
      data: data,
    })
      .then((res) => {
        setComment([...comment, res.data.data]);
        e.target[0].value = "";
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Comment added",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  };

  const deleteComment = (id) => {
    axios({
      method: "DELETE",
      url: `/api/comments?id=${id}`,
    })
      .then((res) => {
        Swal.fire({
          icon: "warning",
          title: "Are you sure?",
          text: "Are you sure about deleting the comment?",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            setComment(comment.filter((item) => item._id !== id));
            Swal.fire({
              icon: "success",
              title: "Deleted",
              text: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
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
            <div className="context flex flex-col col-span-8  px-6 ">
              <div className="postCard mb-6 flex border-2 border-slate-400 rounded-md  gap-2 shadow-lg shadow-slate-300/60">
                <div className="userInfor flex flex-col items-center px-4 py-4  border-l-8 border-slate-400 bg-slate-300">
                  <div className="userAvatar">
                    <Image
                      src={post.user.image}
                      width={64}
                      height={64}
                      alt="Avatar"
                      className="rounded-full border-4 border-slate-200 shadow-lg min-w-[64px] min-h-[64px] sticky "
                    />
                  </div>
                  <div className="userName">
                    <h2 className="text-base mt-2 font-bold">
                      {post.user.name}
                    </h2>
                  </div>
                </div>
                <div className="postInfor flex flex-col px-4 py-4 ">
                  <p>{post.text}</p>
                </div>
              </div>
              <form
                onSubmit={(e) => createComment(e)}
                className="commentCreate"
              >
                <textarea
                  type="text"
                  placeholder="Write a comment..."
                  rows={5}
                  className="w-full border-2 font-medium resize-none p-4 border-slate-200 focus:outline-teal-500 focus:border-teal-500 rounded-md"
                />
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="bg-teal-500 font-extrabold text-xl border-2 border-teal-700 hover:shadow-lg duration-300 hover:shadow-teal-500/50 text-white px-4 py-2 rounded-sm"
                  >
                    Submit comment
                  </button>
                </div>
              </form>
              <div className="commets mt-12 mb-28">
                {comment.map((comment) => (
                  <div
                    key={comment._id}
                    className="commentCard relative mb-6 flex border-2 border-b-4 shadow-md shadow-slate-200/50 rounded-md  gap-2 "
                  >
                    <div className="userInfor flex flex-col items-center px-4 py-4 min-w-[100px] ">
                      <div className="userAvatar">
                        <Image
                          src={comment.user.image}
                          width={64}
                          height={64}
                          alt="Avatar"
                          className="rounded-full border-4 border-slate-200 shadow-lg min-w-[64px] min-h-[64px] sticky "
                        />
                      </div>
                      <div className="userName">
                        <h2 className="text-base mt-2 font-bold text-center ">
                          {comment.user.name}
                        </h2>
                      </div>
                    </div>
                    <div className="commetText p-4">
                      <p className="font-medium">{comment.text}</p>
                    </div>
                    {comment.user._id === session?.user?.id && (
                      <span
                        onClick={() => {
                          deleteComment(comment._id);
                        }}
                        className="commentDelete w-6 h-6 absolute flex justify-center items-center border-2 border-red-700 bg-red-500 -top-2 -right-2 rounded-md shadow-md shadow-red-600/50"
                      >
                        <AiOutlineDelete className="text-white text-lf" />
                      </span>
                    )}
                  </div>
                ))}
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
  );
};

export default PostDetail;

export async function getServerSideProps(context) {
  const { query } = context;

  const id = query.id.split("-").pop();

  const resPost = await fetch(`${process.env.APP_URL}/api/posts/${id}`);
  const post = await resPost.json();
  const resComments = await fetch(
    `${process.env.APP_URL}/api/comments?postId=${id}`
  );
  const comments = await resComments.json();

  return {
    props: {
      post: post.data[0],
      comments: comments.data,
    },
  };
}
