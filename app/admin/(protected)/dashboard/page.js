import React from 'react'
import BlogTable from '@/components/admin/BlogTable';
import Avatar from '@/components/admin/Avatar';
import CreateBlogButton from '@/components/admin/CreateBlogButton';
import Sidebar from '@/components/admin/Sidebar';

const Dashboard = async() => {
  return (
    <div className='min-h-screen flex'>
      <div className="sidebar w-[20%]  bg-slate-400">
        <Sidebar/>
      </div>
      <div className="mainbar w-[80%]">
        <div className='font-bold text-xl p-3 flex justify-between  text-black'>
          <h1 className='my-2'>Dashboard</h1>
            <Avatar/>
          </div>
          <hr className='text-slate-500' />
          <CreateBlogButton/>
          <div className="blogs mx-10 flex h-[60%] my-2">

          {/* table */}
          <div className="relative w-full overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
            <BlogTable/>
          </div>


          </div>
      </div>

    </div>
  )
}

export default Dashboard
