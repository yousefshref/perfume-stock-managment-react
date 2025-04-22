import React, { useContext, useEffect } from "react";
import BottleStockContext from "../contexts/BottleStockContext";
import { HiOutlinePencil } from "react-icons/hi2";
import { PiTrashSimpleThin } from "react-icons/pi";
import CreateOrUpdateBottleStock from "./CreateOrUpdate/CreateOrUpdateBottleStock";
import { isEnglish } from "../utlis/isEnglish";

const BottlesStockSection = () => {
  const {
    stocks,
    loading,
    fetchStocks,

    setStockData,

    setOpen,

    deleteBottleStock,
  } = useContext(BottleStockContext);

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h3 className="text-3xl normal-font-bold tracking-[5px]">
          {isEnglish ? "Bottles Stock" : "مخزون الزجاجات"}
        </h3>

        <div className="flex flex-col w-fit">
          <button
            onClick={() => {
              setOpen(true);
              setStockData({});
            }}
            className="tracking-wider outline-none normal-font-1 flex items-center gap-3 text-green-600"
          >
            <span className="text-3xl">+</span>{" "}
            {isEnglish ? "Create New Stock" : "انشاء مخزون جديد"}
          </button>
          <span className="h-[1px] bg-green-600"></span>
        </div>

        <CreateOrUpdateBottleStock />
      </div>
      {/* table */}
      <div className="relative p-3 text-zinc-500 bg-white mt-3 flex flex-col gap-4 w-full max-w-full overflow-x-auto">
        {loading ? (
          <div className="absolute left-0 top-0 bg-black/40 w-full h-full flex flex-col justify-center">
            <p className="text-white mx-auto">{isEnglish ? "Loading..." : "جاري التحميل..."}</p>
          </div>
        ) : null}

        <div className="flex text-sm text-amber-700 min-w-fit">
          <p className="md:w-[100%] w-[160px]">{isEnglish ? "Name" : "الاسم"}</p>
          <p className="md:w-[100%] w-[75px]">{isEnglish ? "Quantity" : "الكمية"}</p>
          <p className="md:w-[100%] w-[100px]">{isEnglish ? "Actions" : "الاجراءات"}</p>
        </div>
        {stocks?.length === 0 ? (
          <p className="text-center">{isEnglish ? "No stocks Found" : "لم يتم العثور على مخزون"}</p>
        ) : (
          stocks?.map((stock, key) => (
            <div key={key} className="flex transition-all min-w-fit">
              <p className="md:w-[100%] w-[160px]">{stock?.bottle_size_name}</p>
              <p className="md:w-[100%] w-[75px]">{stock?.quantity}</p>
              <div className="flex items-center gap-5 md:w-[100%] w-[100px]">
                <button
                  onClick={() => {
                    setOpen(true);
                    setStockData(stock);
                  }}
                  className="text-blue-400 outline-none"
                >
                  {" "}
                  <HiOutlinePencil className="underline underline-offset-8" />{" "}
                </button>
                <button
                  onClick={() => {
                    deleteBottleStock(stock?.id);
                  }}
                  className="text-red-400 outline-none"
                >
                  {" "}
                  <PiTrashSimpleThin />{" "}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BottlesStockSection;
