"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useState } from 'react'

const Blogs = () => {

  const [blogs, setblogs] = useState([]);

  useEffect(()=>{
      const fetchBlogs = async()=>{
          const response = await fetch("/api/blogs");
          const data = await response.json();
          setblogs(data);
      }
      fetchBlogs();
  },[])

  const getPreview =(html, maxLength=170)=>{
    const tempdiv = document.createElement("div");
    tempdiv.innerHTML = html;
    const text = tempdiv.textContent || tempdiv.innerText || '';
    return text.length > maxLength ? text.slice(0, maxLength)+"...":text;


  }

return (
      <div className='blog-list p-5 w-full'>
          <div className="heading container mx-auto flex flex-col justify-center space-y-2 rounded-lg bg-white items-center">
              <img width={200} height={200} src="/images/ezlearn.png" alt="logo" />
              <h1 className='text-black font-bold text-xl'>All Blog Posts</h1>
          </div>

      
          <div className="cards container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-5 mx-auto py-4 px-4">
              {/* Card 1 */}
          {blogs.map((blog)=>(
              <div key={blog.slug} className="card col-span-1 rounded-lg bg-white">
                  <div className='w-full'>
                      <img className='w-full h-36 object-cover rounded-t-lg' src={blog.hero_image} alt="hero"/>
                      <div className="details gap-1 flex flex-col text-black m-2">
                          <h2 className='font-bold text-lg'>{blog.title}</h2>
                          <p className='text-xs'>{getPreview(blog.content, 170)}</p>
                          <p className='text-xs'>{blog.createdAt.split("T")[0]}</p>
                          <p className='text-xs'>{`${Math.ceil(blog.content.split(/\s+/).length/250)} min read time`}</p>
                          <Link className='text-sm my-1 text-blue-600 hover:underline' href={`/${blog.slug}`}>Read More</Link>
                      </div>
                  </div>
              </div>
          ))}
  
          </div>
      </div>
)
}

export default Blogs
