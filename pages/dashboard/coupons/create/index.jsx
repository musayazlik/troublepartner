import React from "react";
import Layout from "../../layout";
import axios from "axios";
import { useRouter } from "next/router";

const CuoponsCreate = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.toUpperCase().trim().replace(/\s+/g, "");
    const discount = e.target.discount.value;
    const expiry = e.target.expiry.value;
    const piecesNumber = e.target.piecesNumber.value;
    const status = e.target.status.value;
    const data = {
      name,
      discount,
      expiry,
      piecesNumber,
      status,
    };

    axios({
      method: "post",
      url: "/api/coupons/couponsAll",
      data: data,
    })
      .then(() => {
        router.push("/dashboard/coupons");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <Layout>
      <div className="p-2">
        <div className="p-2 mb-8">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Coupons</h2>
              <p>Bu sayfada kupon oluşturabilirsiniz...</p>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <form
            className="w-full max-w-lg px-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full  px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="name"
                >
                  Kupon Adı
                </label>
                <input
                  className="appearance-none uppercase block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Kupon Adı"
                />
              </div>
              <div className="w-full  px-3 mb-2">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="discount"
                >
                  İndirim Oranı
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="discount"
                  type="number"
                  name="discount"
                  placeholder="İndirim Oranı"
                />
              </div>

              <div className="w-full  px-3 mb-2">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="piecesNumber"
                >
                  Kupon Adedi
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="piecesNumber"
                  type="number"
                  name="piecesNumber"
                  placeholder="Kupon Adedi"
                />
              </div>

              <div className="w-full  px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="expiry"
                >
                  Son Kullanım Tarihi
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="expiry"
                  type="date"
                  name="expiry"
                  placeholder="Son kullanım tarihi"
                />
              </div>
              <div className="w-full  px-3 mt-2">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="status"
                >
                  Durumu
                </label>
                <select name="status" id="status">
                  <option value="1">Aktif</option>
                  <option value="0">Pasif</option>
                </select>
              </div>
            </div>

            <div className="button">
              <button className="flex mb-8 bg-emerald-500 text-emerald-800 px-4 py-2 rounded-md font-bold">
                Kuponu Ouştur
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CuoponsCreate;
