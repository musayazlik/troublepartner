import React, { useState } from "react";
import Layout from "../layout";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import CardDropdown from "@/components/cardDropdown";

const PostDetail = ({ post, comments }) => {
  const [comment, setComment] = useState([...comments]);
  const [dropdownShow, setDropdownShow] = useState(false);
  const [edit, setEdit] = useState([]);
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

  const deletePost = (id) => {
    axios({
      method: "DELETE",
      url: `/api/posts?id=${id}`,
    })
      .then((res) => {
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
            Swal.fire({
              icon: "success",
              title: "Deleted",
              text: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.href = "/";
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

  const editComment = (id) => {
    const commentText = document.getElementById(id).value;
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
      method: "PUT",
      url: `/api/comments?id=${id}`,
      data: data,
    })
      .then((res) => {
        setComment(
          comment.map((item) => {
            if (item._id === id) {
              return res.data.data;
            }
            return item;
          })
        );
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Comment updated",
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

  const updateData = (id) => {
    axios({
      method: "PATCH",
      url: edit.element === "post" ? `/api/posts` : `/api/comments`,
      data: {
        text: edit.text,
        id: id,
      },
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        setEdit(null);
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
    <>
      <Head>
        <title>{`${post.text.slice(0, 45)} | Trouble Partner`}</title>
        <meta name="description" content={post.text.slice(0, 150)} />
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
                <div className="postCard mb-6 flex flex-col sm:flex-row border-2 border-slate-400 rounded-md gap-1 shadow-lg shadow-slate-300/60">
                  <div className="userInfor flex gap-6 sm:gap-0 sm:flex-col justify-between items-start sm:items-center px-4 py-4 rounded-tr-md border-l-8 border-slate-400 bg-slate-300">
                    <div className="flex flex-row sm:flex-col justify-center items-center gap-4 sm:gap-2">
                      <div className="userAvatar w-10 h-10 sm:w-16 sm:h-16 relative">
                        <Image
                          src={post.user.image}
                          fill
                          alt="Avatar"
                          className="rounded-full border-4 border-slate-200 shadow-lg  sticky "
                        />
                      </div>
                      <div className="userName">
                        <h2 className="text-lg sm:text-base mt-2 font-extrabold whitespace-nowrap text-center">
                          {post.user.name}
                        </h2>
                      </div>
                    </div>

                    <div className=" pt-2 pr-1 relative sm:hidden">
                      <CardDropdown post={post} />
                    </div>
                  </div>
                  <div className="postInfor flex flex-col px-4 py-4 w-full ">
                    <p
                      className={` break-all
                      ${
                        edit?.element === "post"
                          ? "border-2 border-teal-500 p-2 "
                          : ""
                      }
                      `}
                      {...(edit?.element === "post"
                        ? { contentEditable: true }
                        : { contentEditable: false })}
                      onInput={(e) => {
                        setEdit({ ...edit, text: e.target.innerText });
                        console.log(e.target.innerText);
                      }}
                      dangerouslySetInnerHTML={{ __html: post.text }}
                    />
                  </div>
                  <div className=" pt-2 pr-1 relative hidden sm:flex">
                    <CardDropdown
                      comment={comment?.user?._id}
                      session={session?.user?.id}
                      post={post}
                      edit={edit}
                      setEdit={setEdit}
                      element="post"
                    />
                  </div>
                </div>
                <div className="EditPostButton">
                  <div className="flex justify-center mb-12">
                    {edit?.element === "post" ? (
                      <button
                        onClick={() => updateData(post._id)}
                        className="bg-teal-500 font-extrabold text-xl border-2 border-teal-700 hover:shadow-lg duration-300 hover:shadow-teal-500/50 text-white px-4 py-2 rounded-sm"
                      >
                        Update
                      </button>
                    ) : null}
                  </div>
                </div>
                <form
                  onSubmit={(e) => createComment(e)}
                  className="commentCreate"
                >
                  <textarea
                    type="text"
                    placeholder={
                      comment.length > 0
                        ? "Add a comment..."
                        : "Be the first to comment..."
                    }
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
                      <div className="commetText p-4 w-full">
                        <p
                          className={` break-all focus:outline-none rounded-md 
                      ${
                        edit?.element === "comment" && edit?.id === comment._id
                          ? "border-2 border-teal-500 p-2 "
                          : ""
                      }
                      `}
                          {...(edit?.element === "comment" &&
                          edit?.id === comment._id
                            ? { contentEditable: true }
                            : { contentEditable: false })}
                          onInput={(e) => {
                            setEdit({ ...edit, text: e.target.innerText });
                            console.log(e.target.innerText);
                          }}
                          dangerouslySetInnerHTML={{ __html: comment.text }}
                        />

                        {edit?.element === "comment" &&
                        edit?.id === comment._id ? (
                          <button
                            onClick={() => updateData(comment._id)}
                            className="bg-teal-500 font-extrabold text-xl border-2 border-teal-700 hover:shadow-lg duration-300 hover:shadow-teal-500/50 text-white px-4 py-2 rounded-sm mt-5"
                          >
                            Update
                          </button>
                        ) : null}
                      </div>
                      <div className=" pt-2 pr-1 relative ">
                        <CardDropdown
                          commentId={comment._id}
                          comment={comment?.user?._id}
                          session={session?.user?.id}
                          post={post}
                          edit={edit}
                          setEdit={setEdit}
                          element="comment"
                        />
                      </div>
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
    </>
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
