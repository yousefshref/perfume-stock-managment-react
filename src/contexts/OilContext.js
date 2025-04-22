// contexts/OilContext.js
import { createContext, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { checkAuth } from '../utlis/checkAuth';

const OilContext = createContext();

export const OilProvider = ({ children }) => {

  const { enqueueSnackbar } = useSnackbar();

  const showToast = (mssg, v='success') => {
    enqueueSnackbar(mssg, { variant: v });
  };


  const [oils, setOils] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOils = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/oil-types/', {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      });
      setOils(res.data);
    } catch (err) {
      console.error(err);
      checkAuth(err)
    }
    setLoading(false);
  };


  const [name, setName] = useState('')
  const [quantity_grams, setQuantityGrams] = useState(10)

  const addOil = async () => {
    setLoading(true)
    try{
      const res = await axios.post('/api/oil-types/', {
        name, quantity_grams
      }, {
        headers:{
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      });
      setOils([res.data, ...oils]);
      showToast("Successfully Added", "success")
      
      setName('');
      setQuantityGrams(10);
      return true
    }catch(err){
      console.log(err);
      showToast("Something went wrong", "error")
      checkAuth(err)
    }finally{
      setLoading(false)
    }
  };
  
  
  const [updateOilObj, setUpdateOilObj] = useState({})
  const updateOil = async () => {
    setLoading(true)
    try{
      const res = await axios.put(`/api/oil-types/${updateOilObj?.id}/`, {
        name, quantity_grams
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      });
      setOils(oils.map(oil => oil.id === updateOilObj?.id ? res.data : oil));
      showToast("Successfully Updated", "success")
      return true
    }catch(err){
      console.log(err);
      showToast("Something went wrong", "error")
      checkAuth(err)
    }finally{
      setLoading(false)
    }
  };

  const deleteOil = async (id) => {
    await axios.delete(`/api/oil-types/${id}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      }
    });
    setOils(oils.filter(oil => oil.id !== id));
  };


  return (
    <OilContext.Provider value={{ 
      oils, 
      loading,
      fetchOils,
      name, setName,
      quantity_grams, setQuantityGrams,
      addOil, 

      updateOilObj, setUpdateOilObj,
      updateOil, 

      deleteOil
     }}>
      {children}
    </OilContext.Provider>
  );
};

export default OilContext;