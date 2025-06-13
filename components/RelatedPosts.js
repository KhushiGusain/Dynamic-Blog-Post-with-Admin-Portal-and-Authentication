'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const RelatedPosts = ({ currentSlug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        const posts = await response.json()
        
        // Filter out current post and get 3 random posts
        const filteredPosts = posts
          .filter(post => post.slug !== currentSlug)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
        
        setRelatedPosts(filteredPosts)
      } catch (error) {
        console.error('Error fetching related posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedPosts()
  }, [currentSlug])

  if (loading) {
    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Related Posts</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Related Posts</h2>
      <div className="space-y-4">
        {relatedPosts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/${post.slug}`}
            className="block hover:bg-gray-100 p-2 rounded transition-colors"
          >
            <h3 className="font-medium text-gray-900">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedPosts 