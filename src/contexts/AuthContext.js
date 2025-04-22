import axios from 'axios';
import { useSnackbar } from 'notistack';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../utlis/checkAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  axios.defaults.baseURL = 'https://perfumestockmanagment.pythonanywhere.com/';

  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar();

  const showToast = (mssg, v='success') => {
    enqueueSnackbar(mssg, { variant: v });
  };

  const [user, setUser] = useState({})

  const getUser = () => {

  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const loginFunction = async() => {
    setLoading(true)
    try{
      const res = await axios.post('api/login/', {
        username, password
      })
      showToast("Successfully Logged In","success")
      localStorage.setItem('token', res.data.token)
      navigate('/')
    }catch (err){
      showToast("Something went wrong","error")
      console.log(err);
      checkAuth(err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      username, setUsername,
      password, setPassword,
      loading, setLoading,
      loginFunction,
     }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;