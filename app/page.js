"use client"
import React, { useRef } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import {signIn, useSession, signOut} from 'next-auth/react'
import { MdLockPerson } from "react-icons/md";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEyeSlash } from "react-icons/fa";
import Image from 'next/image';


export default function Home() {
  const router = useRouter();
  const {data: session, status} = useSession();
  const [form, setform] = useState({email:"", password:""});
  const passwordRef = useRef();
  const [showpassword, setshowpassword] = useState(false);

  const handleToggle =()=>{
    setshowpassword(!showpassword);
  }

  useEffect(()=>{
    if(status === "authenticated"){
        router.push("/admin/dashboard")
    }
  },[status, router])

  const handleSignIn = async(e) =>{
    e.preventDefault();
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    console.log("SignIn Result:", result);

    if(result?.ok){
        console.log("redirecting to dashboard!")
      router.push("/admin/dashboard");
    }
    else{
      toast.error(' Login Failed!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }

  }

  const handleDemoLogin = () => {
    setform({
      email: "demo@ezlearn.in",
      password: "demo123"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container min-h-screen mx-auto items-center justify-center flex p-4">
        <div className="card w-full max-w-md bg-white flex rounded-2xl flex-col items-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="logo flex flex-col items-center justify-center gap-1 w-full p-6">
            <div className="logo flex justify-center items-center">
              <Image width={180} height={180} src="/images/ezlearn.png" alt="logo" className="hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
          <div className="form w-full px-8 pb-8">
            <h1 className='font-bold text-center text-gray-800 text-2xl mb-1'>Admin Panel</h1>
            <h2 className='font-medium text-center text-gray-600 text-sm mb-6'>Sign in to your account</h2>
            <div className="inputs space-y-4">
              <div className="relative">
                <input 
                  className='w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200' 
                  value={form.email}
                  onChange={(e)=>{setform({...form, email: e.target.value})}}
                  type="text" 
                  placeholder='Email'
                />
              </div>

              <div className='relative'>
                <input 
                  className='w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200' 
                  value={form.password}
                  ref={passwordRef}
                  onChange={(e)=>{setform({...form, password: e.target.value})}}
                  type={showpassword?"text":"password"} 
                  placeholder='Password'
                />
                <button
                  onClick={handleToggle}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200'
                >
                  {showpassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>

              <span className='flex justify-end text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition-colors duration-200'>Forgot Password?</span>
            </div>

            <div className="space-y-3 mt-6">
              <button 
                className='w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200'
                onClick={handleSignIn}
              >
                Sign in
              </button>
              <button 
                className='w-full rounded-lg border-2 border-blue-600 px-4 py-3 text-blue-600 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200'
                onClick={handleDemoLogin}
              >
                Use Demo Account
              </button>
            </div>
          </div>
          <div className='flex items-center gap-2 pb-6'>
            <MdLockPerson size={16} className='text-gray-400' />
            <p className='text-sm text-gray-400 font-medium'>Admin access only</p>
          </div>
        </div>
      </div> 
    </div>
  )
}


