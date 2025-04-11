import React from 'react'
import Sidebar from '@/components/admin/Sidebar'
import BlogForm from '@/components/admin/BlogForm'
import Avatar from '@/components/admin/Avatar'

const createBlog = () => {
  return (
    <div className='min-h-screen flex'>
      <div className="sidebar w-[20%] bg-slate-400">
        <Sidebar/>
      </div>
      <div className=" w-[80%]">
      <div className='font-bold text-xl p-3 flex justify-between  text-black'>
          <h1 className='my-2'>Admin Blog Form</h1>
            <Avatar/>
          </div>
        <hr className='text-slate-500' />

        <div className="flex-col items-center justify-center flex">
          <BlogForm/>
          </div>
        </div>
      </div>

  )
}

export default createBlog
