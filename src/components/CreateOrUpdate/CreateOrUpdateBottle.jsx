import { Box, Drawer } from "@mui/material";
import React, { useContext } from "react";
import BottleContext from "../../contexts/BottleContext";

const CreateOrUpdateBottle = () => {
  const { loading, open, setOpen, handleBottleChange, bottleData, addBottle, updateBottle } =
    useContext(BottleContext);

  const isUpdate = bottleData?.id ? true : false;
  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: 350 }} className="p-5">
        <p className="normal-font-bold text-xl tracking-widest">
          {isUpdate ? "Update" : "Create"} an{" "}
          <span className="text-amber-700">Bottle</span>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isUpdate) {
              updateBottle(bottleData?.id);
            } else {
              addBottle();
            }
          }}
          className="flex flex-col gap-3 mt-6"
        >
          <div className="flex flex-col">
            <p>Name</p>
            <input
              name="name"
              value={bottleData?.name}
              onChange={handleBottleChange}
              placeholder="Ex: Bottle 100ml"
              type="text"
              className="p-2 outline-none border-b transition-all hover:border-b-amber-700 focus:border-b-amber-700"
            />
          </div>
          <div className="flex flex-col mt-10">
            <p>Bottle Volum in ML</p>
            <div className="w-full flex flex-row justify-center items-center gap-5">
              <input
                placeholder="Ex: 100"
                value={bottleData?.volume_ml}
                onChange={handleBottleChange}
                name="volume_ml"
                type="number"
                className="p-2 w-full outline-none border-b transition-all hover:border-b-amber-700 focus:border-b-amber-700"
              />
              <p className="text-3xl text-amber-700 my-auto">ML</p>
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <p>Oil Required in G</p>
            <div className="w-full flex flex-row justify-center items-center gap-5">
              <input
                placeholder="Ex: 90"
                value={bottleData?.oil_required_grams}
                onChange={handleBottleChange}
                name="oil_required_grams"
                type="number"
                className="p-2 w-full outline-none border-b transition-all hover:border-b-amber-700 focus:border-b-amber-700"
              />
              <p className="text-3xl text-amber-700 my-auto">G</p>
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <p>Profit Per Bottle</p>
            <div className="w-full flex flex-row justify-center items-center gap-5">
              <input
                placeholder="Ex: 40"
                value={bottleData?.profit_per_bottle}
                onChange={handleBottleChange}
                name="profit_per_bottle"
                type="number"
                className="p-2 w-full outline-none border-b transition-all hover:border-b-amber-700 focus:border-b-amber-700"
              />
              <p className="text-3xl text-amber-700 my-auto">EGP</p>
            </div>
          </div>
          <button className="mt-10 w-fit tracking-widest bg-green-700 transition-all hover:bg-green-800 active:bg-green-700 text-white p-1.5 px-3">
            {loading ? "LOADING..." : isUpdate ? "UPDATE" : "CREATE"}
          </button>
        </form>
      </Box>
    </Drawer>
  );
};

export default CreateOrUpdateBottle;
