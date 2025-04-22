import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { checkAuth } from "../utlis/checkAuth";

const BottleContext = createContext();

export const BottleProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (mssg, v = "success") => {
    enqueueSnackbar(mssg, { variant: v });
  };

  const [open, setOpen] = useState(false);

  const [bottles, setBottles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBottles = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/bottle-sizes/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      });
      setBottles(res.data);
    } catch (err) {
      console.error(err);
      checkAuth(err)
    } finally {
      setLoading(false);
    }
  };

  const [bottleData, setBottleData] = useState({});

  const handleBottleChange = (e) => {
    setBottleData({
      ...bottleData,
      [e.target.name]: e.target.value,
    });
  };

  const addBottle = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/bottle-sizes/", bottleData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      });
      setBottles([res.data, ...bottles]);
      showToast("Successfully Added", "success");
      setOpen(false);
      return true;
    } catch (err) {
      console.log(err);
      showToast("Something went wrong", "error");
      checkAuth(err)
    } finally {
      setLoading(false);
    }
  };

  const updateBottle = async (id) => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/bottle-sizes/${id}/`, bottleData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      });
      setBottles(
        bottles.map((bottle) => (bottle.id === id ? res.data : bottle))
      );
      showToast("Bottle updated successfully", "success");
      setOpen(false);
      return true;
    } catch (err) {
      console.error(err);
      showToast("Failed to update bottle", "error");
      checkAuth(err)
    } finally {
      setLoading(false);
    }
  };

  const deleteBottle = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/bottle-sizes/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      });
      setBottles(bottles.filter((bottle) => bottle.id !== id));
      showToast("Bottle deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete bottle", "error");
      checkAuth(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottleContext.Provider
      value={{
        open,
        setOpen,
        fetchBottles,
        bottles,
        loading,

        handleBottleChange,

        bottleData,
        setBottleData,

        addBottle,

        updateBottle,

        deleteBottle,
        fetchBottles,
      }}
    >
      {children}
    </BottleContext.Provider>
  );
};

export default BottleContext;
