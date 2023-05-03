import React from "react";
import Layout from "../layout";
import dbConnect from "@/utils/dbconnect";
import Coupons from "@/models/coupons";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";

const CouponsPage = ({ coupons }) => {
  const router = useRouter();

  const couponDelete = (id) => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Bu işlemi geri alamayacaksınız!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "Hayır, iptal et!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "delete",
          url: `/api/coupons/couponsAll?id=${id}`,
        })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Başarılı...",
              text: "Kupon başarıyla silindi!",
            });

            router.push("/dashboard/coupons");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Bir hata oluştu!",
              footer: err.message,
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "İptal edildi...",
          text: "Kupon silme işlemi iptal edildi!",
        });
      }
    });
  };
  return (
    <Layout>
      <div className="p-2">
        <div className="p-2 mb-8">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Coupons</h2>
              <p>
                Bu sayfada Siparişleri görebilir, düzenleyebilir ve
                silebilirsiniz.
              </p>
            </div>
          </div>
        </div>

        <div className="cuoponCreateButton mb-6 flex justify-end mr-2">
          <Link
            href="/dashboard/coupons/create"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Kupon Oluştur
          </Link>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Kupon Name
                </th>
                <th scope="col" className="px-6 py-3">
                  İndirim Oranı %
                </th>
                <th scope="col" className="px-6 py-3">
                  Son Kullanım Tarihi
                </th>

                <th scope="col" className="px-6 py-3">
                  Kupon Adeti
                </th>

                <th scope="col" className="px-6 py-3">
                  Kullanılan Kupon Adeti
                </th>

                <th scope="col" className="px-6 py-3">
                  Kupon Durumu
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr
                  key={coupon._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {coupon.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {coupon.discount}
                  </th>

                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {coupon.expiry}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {coupon.piecesNumber}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {coupon.usedNumber}
                  </th>
                  {coupon.expiry ? (
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                        Aktif
                      </span>
                    </td>
                  ) : (
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100">
                        Pasif
                      </span>
                    </td>
                  )}

                  <td className="px-6 py-4 text-sm font-medium flex gap-2 justify-end items-center">
                    <Link
                      href={`/dashboard/coupons/${coupon._id}/edit`}
                      className="text-teal-50 bg-cyan-600 px-3 py-1.5 rounded-sm"
                    >
                      Düzenle
                    </Link>
                    <button
                      onClick={() => {
                        couponDelete(coupon._id);
                      }}
                      className="text-red-50 rounded-sm px-3 py-1.5 bg-red-600"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CouponsPage;

export async function getServerSideProps() {
  await dbConnect();
  const coupons = await Coupons.find({});

  return {
    props: {
      coupons: JSON.parse(JSON.stringify(coupons)),
    },
  };
}
