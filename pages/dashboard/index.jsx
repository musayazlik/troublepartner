import React from "react";
import Layout from "./layout";
import { IsAdminMiddleware } from "./middleware";

import { getSession } from "next-auth/react";
import { FiUsers } from "react-icons/fi";
import { BsPostcard } from "react-icons/bs";
import { BiBasket } from "react-icons/bi";
import dbConnect from "@/utils/dbconnect";
import Users from "@/models/users";
import Posts from "@/models/posts";
import Orders from "@/models/orders";

const Dashboard = ({
  usersCount,
  postsCount,
  ordersCount,
  orderMoneyCount,
}) => {
  return (
    <Layout>
      <div className="p-4">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <FiUsers className="text-blue-500 w-12 h-12 mb-3 inline-block" />
              <h2 className="title-font font-extrabold text-3xl text-gray-900">
                {usersCount}
              </h2>
              <p className="leading-relaxed font-medium">Users</p>
            </div>
          </div>
          <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <BsPostcard className="text-blue-500 w-12 h-12 mb-3 inline-block" />
              <h2 className="title-font font-extrabold text-3xl text-gray-900">
                {postsCount}
              </h2>
              <p className="leading-relaxed font-medium">Posts</p>
            </div>
          </div>
          <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <BiBasket className="text-blue-500 w-12 h-12 mb-3 inline-block" />
              <h2 className="title-font font-extrabold text-3xl text-gray-900">
                {ordersCount}
              </h2>
              <p className="leading-relaxed font-medium">Orders</p>
            </div>
          </div>
          <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <BiBasket className="text-blue-500 w-12 h-12 mb-3 inline-block" />
              <h2 className="title-font font-extrabold text-3xl text-gray-900">
                {orderMoneyCount ? orderMoneyCount : 0} $
              </h2>
              <p className="leading-relaxed font-medium">Money</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  const isLogAdmin = await IsAdminMiddleware(context.req, context.res);
  if (!isLogAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    await dbConnect();

    const usersCount = await Users.countDocuments({});
    const postsCount = await Posts.countDocuments({});
    const ordersCount = await Orders.countDocuments({});

    let orderMoneyCount = await Orders.aggregate([
      {
        $match: {
          $or: [
            { paymentStatus: { $exists: false } },
            { paymentStatus: "paymentOk" },
          ],
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    if (orderMoneyCount.length === 0) {
      orderMoneyCount = [
        {
          _id: null,
          total: 0,
        },
      ];
    }

    console.log(orderMoneyCount);

    return {
      props: {
        usersCount,
        postsCount,
        ordersCount,
        orderMoneyCount: orderMoneyCount[0]?.total,
      },
    };
  }
}
