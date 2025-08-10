import Link from 'next/link'
import { Post } from '@/types'

interface HeroProps {
  post: Post
}

export default function Hero({ post }: HeroProps) {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {post.metadata.featured_image && (
        <img
          src={`${post.metadata.featured_image.imgix_url}?w=2400&h=1200&fit=crop&auto=format,compress`}
          alt={post.metadata.title}
          className="absolute inset-0 w-full h-full object-cover"
          width={1200}
          height={600}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      
      <div className="relative h-full flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white">
          <div className="max-w-3xl">
            {post.metadata.category && (
              <Link
                href={`/categories/${post.metadata.category.slug}`}
                className="inline-block bg-surf-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 hover:bg-surf-700 transition-colors"
              >
                {post.metadata.category.metadata.name}
              </Link>
            )}
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 animate-slide-up">
              {post.metadata.title}
            </h1>
            <p className="text-xl mb-6 text-gray-200 line-clamp-2">
              {post.metadata.content.replace(/[#*]/g, '').substring(0, 200)}...
            </p>
            <Link
              href={`/posts/${post.slug}`}
              className="inline-flex items-center gap-2 bg-white text-surf-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Read More
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}