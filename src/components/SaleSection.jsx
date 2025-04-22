import React, { useContext, useEffect } from "react";
import SaleContext from "../contexts/SaleContext";

import { HiOutlinePencil } from "react-icons/hi2";
import { PiTrashSimpleThin } from "react-icons/pi";
import CreateOrUpdateSale from "./CreateOrUpdate/CreateOrUpdateSale";
import { isEnglish } from "../utlis/isEnglish";

const SaleSection = () => {
  const {
    fetchSales,
    sales,
    setOpen,
    setSaleData,
    setPrevSaleData,
    deleteSale,

    salesParams,
    handleChangeSalesParams,
  } = useContext(SaleContext);

  useEffect(() => {
    fetchSales();
  }, [salesParams.date_from, salesParams.date_to]);
  return (
    <div className="p-5 flex flex-col gap-5">
      {/* top */}
      <div className="flex sm:items-end items-start mb-10 sm:justify-between gap-5 sm:flex-row flex-col">
        <h3 className="text-3xl normal-font-bold tracking-[5px]">
          {isEnglish ? "Sales" : "المبيعات"}
        </h3>
        <div className="hidden lg:flex items-center gap-5 w-[calc(100%-400px)]">
          <div className="w-full flex flex-col gap-3 mt-5">
            <div className="flex items-center gap-4">
              <p className="font-bold text-amber-700">
                {isEnglish ? "Filter By Date" : "فرز حسب التاريخ"}
              </p>
              <p className="text-zinc-500 text-xs">
                {isEnglish ? "Last" : "الآخر"}{" "}
                {Math.ceil(
                  (new Date(salesParams.date_to) -
                    new Date(salesParams.date_from)) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                {isEnglish ? "Days" : "أيام"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <p>{isEnglish ? "Start From" : "من"}</p>
                <input
                  value={salesParams.date_from}
                  name="date_from"
                  onChange={handleChangeSalesParams}
                  type="date"
                  className="inpt-2"
                />
              </div>
              <div className="flex flex-col">
                <p>{isEnglish ? "End To" : "إلى"}</p>
                <input
                  value={salesParams.date_to}
                  name="date_to"
                  onChange={handleChangeSalesParams}
                  type="date"
                  className="inpt-2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <button
            onClick={() => {
              setOpen(true);
              setSaleData({});
            }}
            className="tracking-wider outline-none normal-font-1 flex items-center gap-3 text-green-600"
          >
            <span className="text-3xl">+</span>{" "}
            {isEnglish ? "Create New Sale" : "انشاء مبيع جديد"}
          </button>
          <span className="h-[1px] bg-green-600"></span>
        </div>

        <CreateOrUpdateSale />
      </div>

      <div className="flex lg:hidden items-center gap-5 w-full mb-4">
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <p className="font-bold text-amber-700">
              {isEnglish ? "Filter By Date" : "فرز حسب التاريخ"}
            </p>
            <p className="text-zinc-500 text-xs">
              {isEnglish ? "Last" : "الآخر"}{" "}
              {Math.ceil(
                (new Date(salesParams.date_to) -
                  new Date(salesParams.date_from)) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              {isEnglish ? "Days" : "أيام"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex flex-col">
              <p>{isEnglish ? "Start From" : "من"}</p>
              <input
                value={salesParams.date_from}
                name="date_from"
                onChange={handleChangeSalesParams}
                type="date"
                className="inpt-2"
              />
            </div>
            <div className="flex flex-col">
              <p>{isEnglish ? "End To" : "إلى"}</p>
              <input
                value={salesParams.date_to}
                name="date_to"
                onChange={handleChangeSalesParams}
                type="date"
                className="inpt-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* insights */}
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
        <div className="rounded-2xl bg-white p-5">
          <p className="text-sm font-bold text-amber-700">
            {isEnglish ? "Total Orders" : "إجمالي الطلبات"}
          </p>
          <p className="text-3xl font-bold mt-3">14</p>
        </div>
        <div className="rounded-2xl bg-white p-5">
          <p className="text-sm font-bold text-amber-700">
            {isEnglish ? "Total Sales" : "إجمالي المبيعات"}
          </p>
          <p className="text-3xl font-bold mt-3">121,000 EGP</p>
        </div>
        <div className="rounded-2xl bg-white p-5">
          <p className="text-sm font-bold text-amber-700">
            {isEnglish ? "Total Net Profit" : "إجمالي الربح الصافي"}
          </p>
          <p className="text-3xl font-bold mt-3">54,000 EGP</p>
        </div>
        <div className="rounded-2xl bg-white p-5">
          <p className="text-sm font-bold text-amber-700">
            {isEnglish ? "Total Oil Withdrawn" : "إجمالي الزيوت الممسوحة"}
          </p>
          <p className="text-3xl font-bold mt-3">800 g</p>
        </div>
      </div>
      {/* bottom */}
      <div className="flex flex-col gap-10 mt-10 p-5 bg-white w-full max-w-full overflow-x-auto">
        {/* Header */}
        <div className="flex text-sm text-amber-700 min-w-fit">
          <p className="md:w-[288px] w-[200px]">
            {isEnglish ? "Quantity Sold" : "الكمية المباعة"}
          </p>
          <p className="md:w-[192px] w-[130px]">
            {isEnglish ? "Sale Price" : "سعر المبيعة"}
          </p>
          <p className="md:w-[192px] w-[130px]">
            {isEnglish ? "Total Profit" : "إجمالي الربح"}
          </p>
          <p className="md:w-[288px] w-[200px]">
            {isEnglish ? "Date" : "التاريخ"}
          </p>
          <p className="md:w-[192px] w-[130px]">
            {isEnglish ? "Action" : "الإجراء"}
          </p>
        </div>

        {/* Sales list */}
        {sales?.length === 0 ? (
          <p className="text-2xl font-bold text-amber-700">
            {isEnglish ? "No sales found" : "لم يتم العثور على أي مبيعات"}
          </p>
        ) : (
          sales.map((sale) => (
            <div key={sale.id} className="flex items-center min-w-fit">
              {/* Quantity info (can wrap in a div if needed) */}
              <div className="md:w-[288px] w-[200px] flex flex-col gap-2">
                <p>
                  {sale.oil_name} {"->"}{" "}
                  {Number(sale.oil_quantity) * Number(sale.quantity_sold)} g
                </p>
                <p>
                  {sale.bottle_size_name} {"->"} {sale.quantity_sold}
                </p>
              </div>

              <p className="md:w-[192px] w-[130px]">{sale.sale_price}</p>
              <p className="md:w-[192px] w-[130px]">{sale.total_profit}</p>
              <p className="md:w-[288px] w-[200px]">
                {new Date(sale.date).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>

              {/* Action buttons */}
              <div className="md:w-[192px] w-[130px] flex gap-3 items-center">
                <button
                  onClick={() => {
                    setOpen(true);
                    setSaleData(sale);
                    setPrevSaleData(sale);
                  }}
                  className="text-blue-400 outline-none"
                >
                  <HiOutlinePencil size={22} />
                </button>
                <button
                  onClick={() => {
                    const confirmDelete = window.confirm(
                      `Are you sure you want to delete this sale?`
                    );
                    if (!confirmDelete) return;
                    deleteSale(sale.id);
                  }}
                  className="text-red-400 outline-none"
                >
                  <PiTrashSimpleThin size={22} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SaleSection;
