import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Image
          src="/images/ezlearn.png"
          alt="EzLearn Logo"
          width={200}
          height={200}
          className="mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link 
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 