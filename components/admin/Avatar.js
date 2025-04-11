"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

const Avatar = () => {
    const {data: session, status} = useSession();
    const [drop, setdrop] = useState(false)

    useEffect(()=>{
        if(drop){
            setTimeout(() => {
                setdrop(false);
            }, 3000);
        }
    },[drop])
  return (
    <div
    onClick={()=>setdrop(!drop)} 
    className='flex gap-2 justify-center items-center mx-2 cursor-pointer border bg-slate-50 border-slate-500 rounded-lg p-2'>
    <h2 className='text-xs rounded-xs '>{session.user.email}</h2>
    <img className='border-2 font-bold border-slate-500 rounded-full p-1' width={30} height={30} src="/images/wired-outline-21-avatar-hover-jumping.png" alt="avatar" />
    
    {drop && <> <div id="dropdownDelay" className="z-10 w-fit absolute top-14 my-1 right-5 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
      <li>
        <button 
        onClick={()=>{signOut()}}
        className='className="block text-right px-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Sign out</button>
      </li>
    </ul>
</div>
    </>      
    }
    </div>
  )
}

export default Avatar
