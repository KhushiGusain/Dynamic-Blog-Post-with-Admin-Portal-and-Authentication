"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { FaArrowLeft, FaEdit } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const Blogs = () => {
  const [blogs, setblogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setblogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const getPreview = (html, maxLength = 170) => {
    const tempdiv = document.createElement("div");
    tempdiv.innerHTML = html;
    const text = tempdiv.textContent || tempdiv.innerText || '';
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <FaArrowLeft className="mr-2" />
              Back to Home
            </Link>
            {session && (
              <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
                <FaEdit className="mr-2" />
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>

        <div className="text-center mb-12">
          <img width={200} height={200} src="/images/ezlearn.png" alt="logo" className="mx-auto mb-4" />
          <h1 className='text-3xl font-bold text-gray-900'>All Blog Posts</h1>
          <p className="text-gray-600 mt-2">Discover our latest articles and insights</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className='relative'>
                  <img 
                    className='w-full h-48 object-cover' 
                    src={blog.hero_image} 
                    alt={blog.title}
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm">
                    {Math.ceil(blog.content.split(/\s+/).length / 250)} min read
                  </div>
                </div>
                <div className="p-6">
                  <h2 className='font-bold text-xl mb-2 text-gray-900'>{blog.title}</h2>
                  {blog.subtitle && (
                    <p className="text-gray-600 text-sm mb-3">{blog.subtitle}</p>
                  )}
                  <p className='text-gray-600 mb-4'>{getPreview(blog.content, 150)}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{formatDate(blog.createdAt)}</span>
                    <Link 
                      href={`/${blog.slug}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blogs
