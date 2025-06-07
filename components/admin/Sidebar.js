"use client"
import React from 'react'
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineNoteAlt } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleCreateBlogPage = () => {
    router.push("/admin/create-blog")
  }

  const handleDashboard = () => {
    router.push("/admin/dashboard")
  }

  return (
    <div className="h-full">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <img 
            className='w-12 h-12 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200' 
            src="/images/ezlearnlogo.png" 
            alt="logo" 
          />
          <div>
            <div className='font-bold text-gray-800'>EzLearn Blog</div>
            <div className='text-sm text-gray-500'>Admin Panel</div>
          </div>
        </div>

        <nav className="space-y-1">
          <button 
            onClick={handleDashboard}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              pathname.includes("/admin/dashboard") 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MdDashboardCustomize size={20}/>
            <span className="font-medium">Dashboard</span>
          </button>

          <button 
            onClick={handleCreateBlogPage}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              pathname.includes("/admin/create-blog") 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MdOutlineNoteAlt size={20}/>
            <span className="font-medium">Create New Blog</span>
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
