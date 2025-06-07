"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import TiptapEditor from './TiptapEditor';
import { useSession } from 'next-auth/react';
import { toast, Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';

const BlogForm = () => {
  const [date, setdate] = useState('')
  const [form, setform] = useState({slug:"", title:"", subtitle:"", content:"", hero_image:""})
  const {data: session} = useSession();
  const router = useRouter();

  useEffect(() => {
    setdate(new Date().toLocaleDateString());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = {
      ...form
    };

    if(!form.slug || !form.title || !form.content || !form.hero_image){
      toast.error("Please fill in all required fields", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    
    const res = await fetch(`/api/blogs/${form.slug}`);
    if (res.status === 200) {
      toast.error("Slug already exists. Please choose a different one.", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if(/[^a-z-0-9]/.test(form.slug)){
      toast.error("Invalid Slug. Use only lowercase letters, numbers, and hyphens.", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await fetch("/api/blogs", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });
      
      if(response?.ok){
        toast.success("Blog saved successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        setform({slug:"", title:"", subtitle:"", content:"", hero_image:""});
        router.push("/admin/dashboard");
      }
      else{
        toast.error("Failed to save blog. Please try again.", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-black mb-1">
              Slug <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="slug" 
              value={form.slug}
              onChange={(e) => setform({...form, slug: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-black placeholder-gray-500"
              placeholder="e.g: how-to-learn-dsa"
              required
            />
            <p className="mt-1 text-sm text-gray-600">Use lowercase letters, numbers, and hyphens only</p>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-black mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="title" 
              value={form.title}
              onChange={(e) => setform({...form, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-black mb-1">
              Subtitle <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input 
              type="text" 
              id="subtitle" 
              value={form.subtitle}
              onChange={(e) => setform({...form, subtitle: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-black"
            />
          </div>

          <div>
            <label htmlFor="heroimg" className="block text-sm font-medium text-black mb-1">
              Hero Image URL <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="heroimg" 
              value={form.hero_image}
              onChange={(e) => setform({...form, hero_image: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-black placeholder-gray-500"
              placeholder="Enter hero image URL"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Content <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <TiptapEditor 
                value={form.content}
                onChange={(content) => setform({...form, content: content})}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-black">
          <p>Created on: {date}</p>
          <p>Editor: {session?.user?.email}</p>
        </div>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Create Blog
          </button>
        </div>
      </div>
    </form>
  )
}

export default BlogForm


