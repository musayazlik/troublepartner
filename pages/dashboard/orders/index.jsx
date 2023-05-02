import React from "react";
import Layout from "../layout";
import { IsAdminMiddleware } from "../middleware";
import dbConnect from "@/utils/dbconnect";
import Orders from "@/models/orders";

const OrdersPage = ({ orders }) => {
  return (
    <Layout>
      <div className="p-2">
        <div className="p-2 mb-8">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Orders</h2>
              <p>
                Bu sayfada Siparişleri görebilir, düzenleyebilir ve
                silebilirsiniz.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Vallet Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Adı Soyadı
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Ödeme Durumu
                </th>
                <th scope="col" className="px-6 py-3">
                  Sipariş Tarihi
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.orderId}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.valletOrderId}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.user.name + " " + order.user.surname}
                  </th>
                  <td className="px-6 py-4">{order.amount}</td>
                  {order.paymentStatus === "paymentOk" ? (
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                        Ödendi
                      </span>
                    </td>
                  ) : (
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100">
                        Ödenmedi
                      </span>
                    </td>
                  )}

                  <td className="px-6 py-4 capitalize">{order.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;

export async function getServerSideProps(context) {
  const isLogAdmin = await IsAdminMiddleware(context.req, context.res);

  if (!isLogAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await dbConnect();

  const orders = await Orders.find({});

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
