import React from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaShareAlt, FaChevronRight } from 'react-icons/fa'
import dynamic from 'next/dynamic'
import EnhancedShareButtons from '@/components/EnhancedShareButtons'
import BackToTopButton from '@/components/BackToTopButton'
import RelatedPosts from '@/components/RelatedPosts'

const ReadingProgressBar = dynamic(() => import('@/components/ReadingProgressBar'), { ssr: false })

const getBlogbySlug = async (slug) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`, {
    cache: 'no-store'
  })

  const data = await response.json()
  return data
}

function getReadingTime(text) {
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 250));
}

const Blog = async ({ params }) => {
  const blogData = await getBlogbySlug(params.slug)
  const readingTime = getReadingTime(blogData.content)
  const publishDate = blogData.createdAt ? new Date(blogData.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Blogs
          </Link>
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/" className="hover:text-blue-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{blogData.title}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className='w-full flex justify-center mb-8'>
          <img className='w-full md:w-3/4 h-64 md:h-96 object-cover rounded-lg shadow-lg' src={blogData.hero_image} alt="Blog Image" />
        </div>

        {/* Enhanced Share Buttons */}
        <EnhancedShareButtons url={`${process.env.NEXT_PUBLIC_BASE_URL}/${params.slug}`} title={blogData.title} />
      </div>

      {/* Blog Content */}
      <div className='bg-white rounded-lg px-4 md:px-10 my-5 container mx-auto shadow-md'>
        <div className="flex flex-col items-center text-center py-8">
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-2'>{blogData.title}</h1>
          {blogData.subtitle && <h2 className='text-xl md:text-2xl text-gray-600 font-medium mb-4'>{blogData.subtitle}</h2>}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-4">
            {publishDate && <span>Published: {publishDate}</span>}
            <span>{readingTime} min read</span>
            {/* Add author info here if available */}
          </div>
        </div>
        <div
          className="prose prose-lg max-w-none text-gray-900 mx-auto pb-8"
          dangerouslySetInnerHTML={{ __html: blogData.content }}
        />
      </div>
      {/* Related Posts */}
      <div className="container mx-auto px-4">
        <RelatedPosts currentSlug={params.slug} />
      </div>
      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  )
}

export default Blog
