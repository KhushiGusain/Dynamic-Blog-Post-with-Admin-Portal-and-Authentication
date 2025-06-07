import React from 'react'
import BlogTable from '@/components/admin/BlogTable';
import Avatar from '@/components/admin/Avatar';
import CreateBlogButton from '@/components/admin/CreateBlogButton';
import Sidebar from '@/components/admin/Sidebar';

const Dashboard = async() => {
  return (
    <div className='min-h-screen flex bg-gray-50'>
      <div className="sidebar w-64 bg-white shadow-lg">
        <Sidebar/>
      </div>
      <div className="mainbar flex-1">
        <div className='bg-white shadow-sm'>
          <div className='px-6 py-4 flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-gray-800'>Dashboard</h1>
            <Avatar/>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <CreateBlogButton/>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Blog Posts</h2>
              <BlogTable/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
