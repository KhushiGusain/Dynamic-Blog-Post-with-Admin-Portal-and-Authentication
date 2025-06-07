"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const BlogTable = () => {
  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async() => {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      setblogs(data);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async(slug) => {
    const confirmation = window.prompt(`Enter "confirm" to delete.`);
    if(confirmation === "confirm") {
      await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE',
      });
      setblogs((prev) => prev.filter((blog) => blog.slug !== slug));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-600">
              Title
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-600">
              Slug
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-600">
              Created
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {blogs.map((blog) => (
            <tr key={blog._id} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{blog.title}</div>
              </td>
              <td className="px-6 py-4 text-gray-600">{blog.slug}</td>
              <td className="px-6 py-4 text-gray-600">{blog.createdAt.split("T")[0]}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <Link 
                    href={`/admin/edit-blog/${blog.slug}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <FaEdit size={18} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(blog.slug)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    <FaTrash size={18} />
                  </button>
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
