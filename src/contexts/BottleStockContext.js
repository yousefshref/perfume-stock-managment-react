import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { checkAuth } from "../utlis/checkAuth";

const BottleStockContext = createContext();

export const BottleStockProvider = ({ children }) => {

  const { enqueueSnackbar } = useSnackbar();

  const showToast = (mssg, v='success') => {
    enqueueSnackbar(mssg, { variant: v });
  };


  const [open, setOpen] = useState(false);


  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/bottle-stocks/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      });
      setStocks(res.data);
    } catch (err) {
      console.error(err);
      checkAuth(err)
    }
    setLoading(false);
  };



  const [stockData, setStockData] = useState({});

  const changeStockData = (e) => {
    setStockData({
      ...stockData,
      [e.target.name]: e.target.value,
    });
  };

  const addStock = async () => {
    setLoading(true)
    try{
      const res = await axios.post('/api/bottle-stocks/', stockData, {
        headers:{
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      });
      setStocks([res.data, ...stocks]);
      showToast("Successfully Added", "success")
      setOpen(false);
      return true
    }catch(err){
      console.log(err);
      if(err?.response?.data?.bottle_size == "bottle stock with this bottle size already exists."){
        showToast("Bottle already exists", "error");
        return
      }
      checkAuth(err)
      showToast("Something went wrong", "error")
    }finally{
      setLoading(false)
    }
  };


  const updateStock = async (id) => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/bottle-stocks/${id}/`, stockData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      });
      setStocks(stocks.map((stock) => (stock.id === id ? res.data : stock)));
      showToast("Stock updated successfully", "success");
      setOpen(false);
      return true;
    } catch (err) {
      console.error(err);
      showToast("Failed to update stock", "error");
      checkAuth(err)
    } finally {
      setLoading(false);
    }
  };


const deleteBottleStock = async (id) => {
  setLoading(true);
  try {
    await axios.delete(`/api/bottle-stocks/${id}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      }
    });
    setStocks(stocks.filter((stock) => stock.id !== id));
    showToast("Bottle stock deleted successfully", "success");
  } catch (err) {
    console.error(err);
    showToast("Failed to delete bottle stock", "error");
    checkAuth(err)
  } finally {
    setLoading(false);
  }
};


  return (
    <BottleStockContext.Provider
      value={{
        open, setOpen,
        stocks,
        loading,
        updateStock,

        stockData, setStockData, changeStockData, addStock,

        fetchStocks,

        deleteBottleStock,
      }}
    >
      {children}
    </BottleStockContext.Provider>
  );
};

export default BottleStockContext;
