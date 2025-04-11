"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'

const BlogTable = ()=> {
  const [blogs, setblogs] = useState([]); //array of blogs

  useEffect(()=>{
    const fetchBlogs = async()=>{
      const response = await fetch("/api/blogs");
      const data = await response.json();
      setblogs(data);
    };
    fetchBlogs();
  },[])

  
  const handleDelete = async(slug)=>{
    const confirmation = window.prompt(`Enter "confirm" to delete.`);
    if(confirmation === "confirm"){
      await fetch(`/api/blogs/${slug}`,{
        method: 'DELETE',
      });
      setblogs((prev)=> prev.filter((blog)=> blog.slug!==slug));
    }
  }

  
  return (
    <div>
    <table className="w-full h-[60%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Slug
                </th>
                <th scope="col" className="px-6 py-3">
                    Created
                </th>
                <th scope="col" className="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
        {blogs.map((blog) => (
            <tr key={blog._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {blog.title}
              </th>
              <td className="px-6 py-4">{blog.slug}</td>
              <td className="px-6 py-4">{blog.createdAt.split("T")[0]}</td>
              <td className="px-6 py-4">
                <div className="actions flex gap-3">
                  <Link href={`/admin/edit-blog/${blog.slug}`} className="text-blue-600 hover:underline">Edit</Link>
                  <button 
                  onClick={()=>handleDelete(blog.slug)}
                  className="text-red-600 cursor-pointer hover:underline">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
</div>
  )
}

export default BlogTable
