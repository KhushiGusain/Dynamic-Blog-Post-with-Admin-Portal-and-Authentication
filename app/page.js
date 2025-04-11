"use client"
import React, { useRef } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import {signIn, useSession, signOut} from 'next-auth/react'
import { MdLockPerson } from "react-icons/md";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEyeSlash } from "react-icons/fa";


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
  },[status])

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

  return (
    <div>

      <div className="container  min-h-screen mx-auto items-center justify-center flex">
        <div className="card h-[60vh] w-[50vh] bg-white flex rounded-xl flex-col items-center ">
          <div className="logo flex flex-col items-center justify-center gap-1 w-full">
            <div className="logo flex justify-center pt-5 items-center">
            <img  width={200} height={200} src="/images/ezlearn.png" alt="logo" />
            </div>
          </div>
          <div className="form mt-3">
            <h1 className='font-bold text-center text-black text-xl'>Admin Panel</h1>
            <h2 className='font-bold w-full text-md text-black'>Sign in to your account</h2>
            <div className="inputs mt-3 gap-2 flex flex-col">
            <input className='border border-gray-400 rounded-md px-2 py-1 placeholder: text-gray-950 text-sm' 
            value={form.email}
            onChange={(e)=>{setform({...form, email: e.target.value})}}
            type="text" 
            placeholder='Email' />

            <div className='relative'>
            <input className='border border-gray-400 rounded-md px-2 py-1 placeholder: text-gray-950 text-sm' 
            value={form.password}
            ref={passwordRef}
            onChange={(e)=>{setform({...form, password: e.target.value})}}
            type={showpassword?"text":"password"} 
            placeholder='Password'/>

            {showpassword? (<FaEyeSlash
            onClick={handleToggle}
             className='text-black absolute cursor-pointer right-1 bottom-1.5 '  /> ): (<FaEye onClick={handleToggle}
            className='text-black absolute cursor-pointer right-1 bottom-1.5 ' />)}
            </div>

            <span className='flex justify-end text-xs cursor-pointer text-blue-500 font-bold '>Forgot Password?</span>
            </div>
            <button 
            className='rounded-lg bg-blue-500 px-2 py-1 w-full my-2 cursor-pointer'
            onClick={handleSignIn}
            >Sign in</button>
          </div>
          <div className='flex gap-1'>
          <MdLockPerson size={15} className='text-slate-400' />
          <p className='text-xs text-slate-400 font-bold'>Admin access only</p>
          </div>
        </div>
      </div> 
    </div>
  )
}


