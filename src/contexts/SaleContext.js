import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { checkAuth } from "../utlis/checkAuth";

const SaleContext = createContext();

export const SaleProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const showToast = (mssg, v = "success") => {
    enqueueSnackbar(mssg, { variant: v });
  };

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const dateFrom = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 7);
  const [salesParams, setSalesParams] = useState({
    date_from: dateFrom.toISOString().slice(0, 10),
    date_to: today.toISOString().slice(0, 10),
  });
  const handleChangeSalesParams = (e) => {
    setSalesParams({ ...salesParams, [e.target.name]: e.target.value });
  };

  const fetchSales = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/sales/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        params: salesParams
      });
      setSales(res.data);
    } catch (err) {
      console.error(err);
      checkAuth(err)
    } finally {
      setLoading(false);
    }
  };

  const [saleData, setSaleData] = useState({
    oil_type: "",
    bottle_size: "",
    quantity_sold: 0,
    total_profit: 0,
    sale_price: 0,
  });

  const [prevSaleData, setPrevSaleData] = useState(null);

  const handleSaleDataChange = (e) => {
    setSaleData({ ...saleData, [e.target.name]: e.target.value });
  };

  const addSale = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/sales/", saleData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      });
      setSales([res.data, ...sales]);
      showToast("Sale added successfully", "success");
      setOpen(false);
      setPrevSaleData(null);
      setSaleData({
        oil_type: "",
        bottle_size: "",
        quantity_sold: 0,
        total_profit: 0,
        sale_price: 0,
      });
      return true;
    } catch (err) {
      console.error(err);
      showToast("Failed to add sale", "error");
      checkAuth(err)
    } finally {
      setLoading(false);
    }
  };

  const updateSale = async (id) => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/sales/${id}/`, saleData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      });
      setSales(sales.map((sale) => (sale.id === id ? res.data : sale)));
      showToast("Sale updated successfully", "success");
      setOpen(false);
      setPrevSaleData(null);
      setSaleData({
        oil_type: "",
        bottle_size: "",
        quantity_sold: 0,
        total_profit: 0,
        sale_price: 0,
      });
      return true;
    } catch (err) {
      console.error(err);
      showToast("Failed to update sale", "error");
      checkAuth(err)
    } finally {
      setLoading(false);
    }
  };

  const deleteSale = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/sales/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      });
      setSales(sales.filter((sale) => sale.id !== id));
      showToast("Sale deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete sale", "error");
      checkAuth(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <SaleContext.Provider
      value={{
        loading,
        open,
        setOpen,

        sales,
        salesParams, setSalesParams,
        handleChangeSalesParams,
        fetchSales,

        saleData,
        setSaleData,
        prevSaleData,
        setPrevSaleData,
        handleSaleDataChange,
        addSale,

        updateSale,

        deleteSale,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};

export default SaleContext;
