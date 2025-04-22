import React, { useContext, useEffect } from "react";
import BottleContext from "../contexts/BottleContext";
import { HiOutlinePencil } from "react-icons/hi2";
import { PiTrashSimpleThin } from "react-icons/pi";
import CreateOrUpdateBottle from "./CreateOrUpdate/CreateOrUpdateBottle";
import { isEnglish } from "../utlis/isEnglish";

const BottlesSection = () => {
  const { 
    bottles, 
    loading, 
    fetchBottles,
    setOpen, 
    setBottleData,
    deleteBottle
} = useContext(BottleContext);


useEffect(() => {
  fetchBottles();
}, []);
  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h3 className="text-3xl normal-font-bold tracking-[5px]">
          {isEnglish ? "Bottle Sizes" : "احجام الزجاجات"}
        </h3>
        <div className="flex items-center gap-5">
          <p className="tracking-widest">{isEnglish ? "Total Bottles: 200" : "العدد الكلي: 200"}</p>
        </div>

        <div className="flex flex-col w-fit">
          <button
            onClick={() => {
              setOpen(true);
              setBottleData({});
            }}
            className="tracking-wider outline-none normal-font-1 flex items-center gap-3 text-green-600"
          >
            <span className="text-3xl">+</span> {isEnglish ? "Create New Bottle" : "اضافة زجاجة جديدة"}
          </button>
          <span className="h-[1px] bg-green-600"></span>
        </div>

        <CreateOrUpdateBottle />
      </div>
      {/* table */}
      <div className="relative p-3 text-zinc-500 bg-white mt-3 flex flex-col gap-4 w-full max-w-full overflow-x-auto">
        {loading ? (
          <div className="absolute left-0 top-0 bg-black/40 w-full h-full flex flex-col justify-center">
            <p className="text-white mx-auto">{isEnglish ? "Loading..." : "جاري التحميل..."}</p>
          </div>
        ) : null}

        <div className="flex text-sm text-amber-700 min-w-fit">
          <p className="md:w-[288px] w-[200px]">{isEnglish ? "Name" : "الاسم"}</p>
          <p className="md:w-[192px] w-[130px]">{isEnglish ? "Volum in ML" : "الحجم في مليلتر"}</p>
          <p className="md:w-[192px] w-[130px]">{isEnglish ? "Oil Required in G" : "الكمية المطلوبة من الزيت"}</p>
          <p className="md:w-[288px] w-[200px]">{isEnglish ? "Profit per Bottle" : "الربح لكل زجاجة"}</p>
          <p className="md:w-[192px] w-[130px]">{isEnglish ? "Actions" : "العمليات"}</p>
        </div>
        {bottles?.length === 0 ? (
          <p className="text-center">{isEnglish ? "No Bottles Found" : "لم يتم العثور على اي زجاجات"}</p>
        ) : (
          bottles?.map((bottle, key) => (
            <div key={key} className="flex transition-all min-w-fit">
              <p className="md:w-[288px] w-[200px]">{bottle?.name}</p>
              <p className="md:w-[192px] w-[130px]">{bottle?.volume_ml} ml</p>
              <p className="md:w-[192px] w-[130px]">{bottle?.oil_required_grams} g</p>
              <p className="md:w-[288px] w-[200px]">{bottle?.profit_per_bottle} EGP</p>
              <div className="flex items-center gap-5 md:w-[192px] w-[130px]">
                <button
                onClick={() => {
                    setOpen(true);
                    setBottleData(bottle);
                }}
                className="text-blue-400 outline-none">
                  {" "}
                  <HiOutlinePencil />{" "}
                </button>
                <button 
                onClick={() => deleteBottle(bottle?.id)}
                className="text-red-400 outline-none">
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

export default BottlesSection;
