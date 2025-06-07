import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const getBlogbySlug = async (slug) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`, {
    cache: 'no-store'
  })

  const data = await response.json()
  return data
}

const Blog = async ({ params }) => {
  const blogData = await getBlogbySlug(params.slug)

  return (
    <div className=" min-h-screen">

      <nav className='bg-white flex justify-between py-5 px-10 container rounded-xl mx-auto'>
        <Image width={170} height={170} src="/images/ezlearn.png" alt="logo" />
        <ul className='flex gap-5 cursor-pointer text-black py-4'>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/courses">Courses</Link></li>
          <li><Link href="/blogs">Blogs</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
          <li><Link href="/login">Login</Link></li>
        </ul>
      </nav>

      <div className=' bg-white rounded-lg px-10 my-5 container mx-auto'>
        <h1 className='text-4xl py-3 text-black font-bold'>{blogData.title}</h1>
        {blogData.subtitle && <h2 className='text-xl py-2 text-gray-700 font-semibold'>{blogData.subtitle}</h2>}

        <div className='h-72 my-10 flex items-center justify-center'>
          <Image
            src={blogData.hero_image || "/images/default-blog.jpg"}
            alt={blogData.title}
            width={800}
            height={400}
            className="w-3/4 h-full object-cover rounded-lg shadow-md"
          />
        </div>

        <div
          className="tiptap prose prose-lg max-w-none text-gray-900"
          dangerouslySetInnerHTML={{ __html: blogData.content }}
        />
      </div>
    </div>
  )
}

export default Blog
