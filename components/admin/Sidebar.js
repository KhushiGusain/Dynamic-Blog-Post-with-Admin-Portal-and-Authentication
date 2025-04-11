"use client"
import React, { useState } from 'react'
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineNoteAlt } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleCreateBlogPage = ()=>{
    router.push("/admin/create-blog")
  }

  const handleDashboard = () =>{
    router.push("/admin/dashboard")
  }
  return (
    <div>
        <div className='mt-2'>
        <div className="logo flex items-end gap-2 my-3">
          <img className='ml-5 mt-5 border border-green-200 rounded-md' width={60} height={60} src="/images/ezlearnlogo.png" alt="logo" />
          <div className="text flex flex-col justify-center">
          <div className='font-bold text-lg text-black'>EzLearn Blog</div>
          <div className='text-sm font-semibold text-black'>Admin</div>
          </div>
        </div>
        <div className="options mt-8 ml-5 space-y-2">
          <div className={`option1 flex gap-2 mr-1 cursor-pointer text-black p-2 rounded-lg hover:bg-blue-400 hover:border-gray-400 hover:border ${pathname.includes("/admin/dashboard") ? 'bg-blue-400':''}`}>
            <MdDashboardCustomize size={23}/>
            <button 
            onClick={handleDashboard}
            className="text-lg cursor-pointer font-bold">Dashboard</button>
          </div>
          <div className={`option1 flex gap-2 mr-1 cursor-pointer text-black p-2 rounded-lg hover:bg-blue-400 hover:border-gray-400 hover:border  ${pathname.includes("/admin/create-blog") ? 'bg-blue-400':''} `}>
            <MdOutlineNoteAlt size={23}/>
            <button 
            onClick={handleCreateBlogPage}
            className='text-lg cursor-pointer font-bold '>Create New Blog</button>
          </div>
        </div>
        </div>
      </div>
  )
}

export default Sidebar
