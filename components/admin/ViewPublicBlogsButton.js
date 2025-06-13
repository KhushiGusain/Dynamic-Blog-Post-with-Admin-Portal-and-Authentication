"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { FaEye } from 'react-icons/fa'

const ViewPublicBlogsButton = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/blogs')}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
    >
      <FaEye className="mr-2" />
      View Public Blogs
    </button>
  )
}

export default ViewPublicBlogsButton 