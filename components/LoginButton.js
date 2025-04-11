"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

const LoginButton = () => {
    const router = useRouter();
    const handleLogin = async()=>{
    router.push("/")
  }
  return (
    <div>
      <button 
          onClick={handleLogin}
          type="button" 
          className="text-white bg-gradient-to-r cursor-pointer from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-bold rounded-lg text-lg px-10 py-2.5 text-center me-2 mb-2">Login</button>
          
    </div>
  )
}

export default LoginButton
