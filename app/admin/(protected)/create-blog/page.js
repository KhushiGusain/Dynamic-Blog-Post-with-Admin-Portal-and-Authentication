import React from 'react'
import Sidebar from '@/components/admin/Sidebar'
import BlogForm from '@/components/admin/BlogForm'
import Avatar from '@/components/admin/Avatar'

const createBlog = () => {
  return (
    <div className='min-h-screen flex bg-gray-50'>
      <div className="sidebar w-64 bg-white shadow-lg">
        <Sidebar/>
      </div>
      <div className="mainbar flex-1">
        <div className='bg-white shadow-sm'>
          <div className='px-6 py-4 flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-black'>Create New Blog</h1>
            <Avatar/>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <BlogForm/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default createBlog
