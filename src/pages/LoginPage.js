import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'

const LoginPage = () => {
  const {
    username, setUsername,
    password, setPassword,
    loginFunction, loading,
  } = useContext(AuthContext)

  return (
    <div className='p-3 h-[100vh] flex flex-col justify-center items-center w-fill max-w-[1000px] mx-auto'>
      <div className='my-auto h-fit bg-white w-full max-w-[600px] mx-auto'>
        <form onSubmit={(e) => {
          e.preventDefault()
          if(loading) return
          loginFunction()
        }} className='w-full'>
          <div className='w-full space-y-1.5'>
            <p>Username</p>
            <input value={username} onChange={e => setUsername(e.target.value)} className='inpt' />
          </div>
          <div className='w-full space-y-1.5 mt-5'>
            <p>Password</p>
            <input value={password} onChange={e => setPassword(e.target.value)} className='inpt' />
          </div>

          <button className='btn-green mt-10'>
            {loading ? "Loading..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
