import React, { useContext, useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import { PiTrashSimpleThin } from "react-icons/pi";
import OilContext from "../contexts/OilContext";
import CreateOrUpdateOilType from "./CreateOrUpdate/CreateOrUpdateOilType";
import { isEnglish } from "../utlis/isEnglish";

const OilTypesSection = () => {
  const [open, setOpen] = useState(false);

  const {
    oils,
    loading,
    deleteOil,
    fetchOils,

    // update
    setName,
    setQuantityGrams,
    setUpdateOilObj,
  } = useContext(OilContext);

  useEffect(() => {
    fetchOils();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h3 className="text-3xl normal-font-bold tracking-[5px]">{isEnglish ? "Oil Types" : "انواع الزيوت"}</h3>
        <div className="flex sm:flex-row flex-col sm:items-center sm:gap-5 gap-2">
          <p className="tracking-widest">{isEnglish ? "Total Count" : "العدد"}: 5</p>
          <span className="sm:block hidden">|</span>
          <p className="tracking-widest">{isEnglish ? "Total Grams" : "الكمية"}: 1000G</p>
        </div>

        <div className="flex flex-col w-fit">
          <button
            onClick={() => {
              setName("");
              setQuantityGrams(10);
              setUpdateOilObj({});
              setOpen(true);
            }}
            className="tracking-wider outline-none normal-font-1 flex items-center gap-3 text-green-600"
          >
            <span className="text-3xl">+</span> {isEnglish ? "Create New Oil Type" : "اضافة نوع جديد"}
          </button>
          <span className="h-[1px] bg-green-600"></span>
        </div>

        <CreateOrUpdateOilType open={open} onClose={() => setOpen(false)} />
      </div>
      {/* table */}
      <div className="flex flex-col gap-10 mt-5 p-5 bg-white w-full max-w-full overflow-x-auto relative">
        {loading ? (
          <div className="absolute left-0 top-0 bg-black/40 w-full h-full flex flex-col justify-center">
            <p className="text-white mx-auto">{isEnglish ? "Loading..." : "جاري التحميل..."}</p>
          </div>
        ) : null}

        <div className="flex text-sm text-amber-700 min-w-fit">
          <p className="md:w-[100%] w-[160px]">{isEnglish ? "Name" : "الاسم"}</p>
          <p className="md:w-[100%] w-[75px]">{isEnglish ? "Grams" : "الكمية"}</p>
          <p className="md:w-[100%] w-[100px]">{isEnglish ? "Actions" : "الاجراءات"}</p>
        </div>
        {oils?.length === 0 ? (
          <p className="text-center">{isEnglish ? "No Types Found" : "لا يوجد انواع"}</p>
        ) : (
          oils?.map((oil, key) => (
            <div key={key} className="flex transition-all min-w-fit">
              <p className="md:w-[100%] w-[160px]">{oil?.name}</p>
              <p className="md:w-[100%] w-[75px]">{oil?.quantity_grams} G</p>
              <div className="flex items-center gap-5 md:w-[100%] w-[100px]">
                <button
                  className="text-blue-400 outline-none"
                  onClick={() => {
                    setName(oil?.name);
                    setQuantityGrams(oil?.quantity_grams);
                    setUpdateOilObj(oil);
                    setOpen(true);
                  }}
                >
                  {" "}
                  <HiOutlinePencil />{" "}
                </button>
                <button
                  className="text-red-400 outline-none"
                  onClick={() => deleteOil(oil?.id)}
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

export default OilTypesSection;
