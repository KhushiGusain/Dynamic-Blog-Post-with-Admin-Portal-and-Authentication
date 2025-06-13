"use client"
import { FaShareAlt, FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaLink } from 'react-icons/fa'
import { useState } from 'react'

const EnhancedShareButtons = ({ url, title }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        title="Share on Twitter"
      >
        <FaTwitter />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
        title="Share on Facebook"
      >
        <FaFacebook />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 px-3 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition-colors"
        title="Share on LinkedIn"
      >
        <FaLinkedin />
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        title="Share on WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 px-3 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors relative"
        title="Copy Link"
      >
        <FaLink />
        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1">Copied!</span>
        )}
      </button>
    </div>
  )
}

export default EnhancedShareButtons 