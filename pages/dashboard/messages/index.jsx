import React from "react";
import Layout from "../layout";
import IsAdminMiddleware from "../middleware";
import dbConnect from "@/utils/dbconnect";
import Contact from "@/models/contact";

const MessagesPage = ({ messages }) => {
  return (
    <Layout>
      <div className="p-2">
        <div className="p-2 mb-8">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Messages</h2>
              <p>
                Bu sayfada mesajları görebilir, düzenleyebilir ve
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
                  Adı Soyadı
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Konu
                </th>
                <th scope="col" className="px-6 py-3">
                  Mesaj
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr
                  key={message._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {message.name}
                  </th>
                  <td className="px-6 py-4">{message.email}</td>
                  <td className="px-6 py-4">{message.subject}</td>
                  <td className="px-6 py-4 capitalize">{message.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;

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

  const messages = await Contact.find({});

  return {
    props: {
      messages: JSON.parse(JSON.stringify(messages)),
    },
  };
}
