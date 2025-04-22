import { Box, Drawer } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SaleContext from "../../contexts/SaleContext";
import OilContext from "../../contexts/OilContext";
import BottleContext from "../../contexts/BottleContext";

const CreateOrUpdateSale = () => {
  const {
    loading,

    open,
    setOpen,

    prevSaleData,

    saleData,
    setSaleData,
    handleSaleDataChange,

    addSale,

    updateSale,
  } = useContext(SaleContext);

  const {
    oils,
    fetchOils,

    loading: oil_loading,
  } = useContext(OilContext);

  useEffect(() => {
    if (open === true) {
      fetchOils();
    }
  }, [open]);

  const {
    bottles,
    fetchBottles,

    loading: bottle_loading,
  } = useContext(BottleContext);

  useEffect(() => {
    if (open === true) {
      fetchBottles();
    }
  }, [open]);

  const isUpdate = saleData?.id ? true : false;

  // calculate total profit
  useEffect(() => {
    const bottle = bottles?.find(
      (bottle) => bottle?.id == saleData?.bottle_size
    );

    const net_profit =
      Number(saleData?.quantity_sold) * Number(bottle?.profit_per_bottle);

    setSaleData({ ...saleData, total_profit: net_profit });
  }, [saleData?.quantity_sold, bottles, saleData?.bottle_size]);

  const [currentOilStock, setCurrentOilStock] = useState(0);
  const [oilStock, setOilStock] = useState(0);
  // calculate the oil stock
  useEffect(() => {
    const oil = oils?.find((o) => o.id == saleData?.oil_type);
    const newBottle = bottles?.find((b) => b.id == saleData?.bottle_size);
    const originalStock = oil?.quantity_grams || 0;

    let netStock = originalStock;

    // If in update mode, reverse the previous sale's oil usage
    if (isUpdate && prevSaleData) {
      const prevBottle = bottles?.find(
        (b) => b.id === prevSaleData?.bottle_size
      );
      const prevQty = prevSaleData?.quantity_sold || 0;
      const prevGrams = prevBottle?.oil_required_grams || 0;

      netStock += prevQty * prevGrams; // rollback previous deduction
    }

    // Apply new deduction
    const newQty = saleData?.quantity_sold || 0;
    const newGrams = newBottle?.oil_required_grams || 0;

    netStock -= newQty * newGrams;

    setCurrentOilStock(originalStock);
    setOilStock(netStock);
  }, [
    saleData?.quantity_sold,
    saleData?.oil_type,
    saleData?.bottle_size,
    oils,
    bottles,
    isUpdate,
  ]);

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: 350 }} className="p-5">
        <p className="normal-font-bold text-xl tracking-widest">
          {isUpdate ? "Update" : "Create"} a{" "}
          <span className="text-amber-700">Sale</span>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) {
              if (isUpdate) {
                updateSale(saleData?.id);
              } else {
                addSale();
              }
            }
          }}
          className="flex flex-col gap-3 mt-6"
        >
          <div className="flex flex-col mt-10">
            <p>Oil Type</p>
            {oil_loading ? (
              <p>Loading...</p>
            ) : (
              <select
                name="oil_type"
                onChange={handleSaleDataChange}
                value={saleData?.oil_type}
                className="p-2 outline-none border-b transition-all hover:border-b-amber-700 focus:border-b-amber-700"
              >
                <option value="">Select Oil Type</option>
                {oils?.map((oil) => (
                  <option key={oil?.id} value={oil?.id}>
                    {oil?.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex flex-col mt-10">
            <p>Bottle Size</p>
            {bottle_loading ? (
              <p>Loading...</p>
            ) : (
              <select
                name="bottle_size"
                onChange={handleSaleDataChange}
                value={saleData?.bottle_size}
                className="p-2 outline-none border-b transition-all hover:border-b-amber-700 focus:border-b-amber-700"
              >
                <option value="">Select Bottle Size</option>
                {bottles?.map((bottle) => (
                  <option key={bottle?.id} value={bottle?.id}>
                    {bottle?.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex flex-col mt-10">
            <p>Quantity Sold</p>
            <input
              name="quantity_sold"
              onChange={handleSaleDataChange}
              value={saleData?.quantity_sold}
              type="number"
              placeholder="Quantity Sold"
              className="p-2 outline-none border-b transition-all hover:border-b-amber-700 focus:border-b-amber-700"
            />
            <div className="mt-3 text-sm text-zinc-500 flex flex-col">
              <p>current oil = {currentOilStock}g</p>
              <p>net oil = {oilStock}g</p>
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <p>Total Profit</p>
            <div className="flex items-center gap-4">
              <input
                name="total_profit"
                onChange={handleSaleDataChange}
                value={saleData?.total_profit}
                type="number"
                placeholder="Total Profit"
                className="p-2 w-full outline-none border-b transition-all hover:border-b-amber-700 focus:border-b-amber-700"
              />
              <p className="text-2xl text-amber-700 font-bold">EGP</p>
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <p>Sale Price</p>
            <input
              name="sale_price"
              onChange={handleSaleDataChange}
              value={saleData?.sale_price}
              type="number"
              placeholder="Sale Price"
              className="p-2 outline-none border-b transition-all hover:border-b-amber-700 focus:border-b-amber-700"
            />
          </div>
          <button className="mt-10 w-fit tracking-widest bg-green-700 transition-all hover:bg-green-800 active:bg-green-700 text-white p-1.5 px-3">
            {loading ? "LOADING..." : isUpdate ? "UPDATE" : "CREATE"}
          </button>
        </form>
      </Box>
    </Drawer>
  );
};

export default CreateOrUpdateSale;
