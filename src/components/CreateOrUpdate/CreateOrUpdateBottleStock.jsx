import { Box, Drawer } from "@mui/material";
import React, { useContext, useEffect } from "react";
import BottleStockContext from "../../contexts/BottleStockContext";
import BottleContext from "../../contexts/BottleContext";

const CreateOrUpdateBottleStock = () => {

    const {
        bottles,
        fetchBottles,
    } = useContext(BottleContext);

    useEffect(() => {
        fetchBottles();
    }, []);

  const { 
    open, setOpen,

    loading,

    changeStockData,
    stockData, 
    
    addStock, 

    updateStock,

   } = useContext(BottleStockContext);


   const isUpdate = stockData?.id ? true : false;

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: 350 }} className="p-5">
        <p className="normal-font-bold text-xl tracking-widest">
          {isUpdate ? "Update" : "Create"} a <span className="text-amber-700">Stock</span>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if(isUpdate){
                updateStock(stockData?.id);
            }else{
                addStock();
            }
          }}
          className="flex flex-col gap-3 mt-6"
        >
          <div className="flex flex-col">
            <p>Bottle</p>
            <select 
                name="bottle_size"
                onChange={changeStockData}
                value={stockData?.bottle_size}
                className="p-2 outline-none border-b transition-all hover:border-b-amber-700 focus:border-b-amber-700"
             >
                 <option value={""}>{"Select a bottle"}</option>
                {bottles?.map((bottle) => (
                    <option key={bottle?.id} value={bottle?.id}>{bottle?.name}</option>
                ))}
             </select>
          </div>

          <div className="flex flex-col mt-10">
            <p>Quantity</p>
            <input
              onChange={changeStockData}
              value={stockData?.quantity}
              name="quantity"
              placeholder="Ex: 300"
              type="text"
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

export default CreateOrUpdateBottleStock;
