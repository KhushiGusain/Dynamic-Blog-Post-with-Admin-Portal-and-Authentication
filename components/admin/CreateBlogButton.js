"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const CreateBlogButton = () => {
  const router = useRouter();
  const handleCreate = ()=>{
    router.push("/admin/create-blog");
  }
  return (
    <div>
      <div className='h-[10%] flex items-center justify-end px-5'>
          <button 
          onClick={handleCreate}
          type="button" 
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-bold rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 mt-2 mr-6 cursor-pointer">Create New Blog</button>
          </div>
    </div>
  )
}

export default CreateBlogButton
