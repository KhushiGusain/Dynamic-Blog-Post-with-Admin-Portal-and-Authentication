"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { toast, Bounce } from 'react-toastify';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import Avatar from '@/components/admin/Avatar';
import TiptapEditor from '@/components/admin/TiptapEditor';

const EditBlog = () => {
  const [date, setdate] = useState('');
  const [form, setform] = useState({ slug: "", title: "", subtitle: "", content: "", hero_image: "" });
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;

  useEffect(() => {
    setdate(new Date().toLocaleDateString());

    const fetchBlogData = async () => {
      if (!slug) return;

      try {
        const response = await fetch(`/api/blogs/${slug}`);
        const data = await response.json();
        if (data) {
          setform({
            slug: data.slug,
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            hero_image: data.hero_image
          });
        }
      } catch (err) {
        console.error("Couldn't fetch blog data", err);
      }
    };

    fetchBlogData();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.slug || !form.title || !form.content || !form.hero_image) {
      alert("Required Field is Mandatory");
      return;
    }

    if (/[^a-z-0-9]/.test(form.slug)) {
      alert("Invalid Slug");
      return;
    }

    const response = await fetch(`/api/blogs/${form.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      toast.success("Blog updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
      setform({ slug: "", title: "", subtitle: "", content: "", hero_image: "" });
      router.push("/admin/dashboard");
    } else {
      toast.error(`Blog couldn't be updated`, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return(
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


          <div className='w-full'>
                <form className=' mx-10 my-5'>
                  <div className="mb-4">
                      <label htmlFor="slug" className="block mb-2 text-sm  text-gray-800">Slug</label>
                      <input type="text" id="slug" 
                      value={form.slug}
                      onChange={(e)=>setform({...form, slug: e.target.value})}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 w-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g: how-to-learn-dsa" required disabled/>
                  </div>
                        
                  <div className="mb-4">
                      <label htmlFor="title" className="block mb-2 text-sm text-gray-800">Title</label>
                          <input type="text" id="title" 
                          value={form.title}
                          onChange={(e)=>setform({...form, title: e.target.value})}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
          
                  <div className="mb-4">
                      <label htmlFor="Subtitle" className=" mb-2 text-sm  flex font-medium text-gray-800">Subtitle <p className='mx-1'>(Optional)</p></label>
                          <input type="text" id="Subtitle" 
                          value={form.subtitle}
                          onChange={(e)=>setform({...form, subtitle: e.target.value})}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
          
                  <div className='mb-4'>
                  <label className=" mb-2 text-sm  flex font-medium text-gray-800">Content</label>
                  <TiptapEditor 
                  value={form.content}
                  onChange={(content)=>setform({...form, content: content})} />
                </div>
          
                <div className="mb-4">
                      <label htmlFor="heroimg" className="block mb-2 text-sm  text-gray-800">Hero Image</label>
                      <input type="text" id="heroimg" 
                      value={form.hero_image}
                      onChange={(e)=>setform({...form, hero_image: e.target.value})}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 w-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter hero image URL" required />
                  </div>
          
                  {/* <div className="mb-4">
                      <label htmlFor="inlineimg" className="block mb-2 text-sm  text-gray-800">Inline Image</label>
                      <input type="text" id="slug" 
                      value={form.}
                      onChange={(e)=>setform({...form, slug: e.target.value})}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 w-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g: how-to-learn-dsa" required />
                  </div> */}
          
                  <div className='flex text-black items-center justify-end mr-3 text-xs'>
                    {`Edited on: ${date}`}
                  </div>
                  <div className='flex text-black items-center justify-end mr-3 text-xs'>
                  Editor: {session.user.email}
                  </div>
                  </form>
                  <div className="buttons flex gap-2 items-center mr-10 mb-10 justify-end">
                      <button type="submit" 
                      onClick={handleSubmit}
                      className="text-white mt-2 mr-3 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                      {/* <button type="save" className="text-white mt-5  cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button> */}
          
                  </div>
                  
              </div>



          </div>


        </div>
      </div>
  )
};

export default EditBlog;
