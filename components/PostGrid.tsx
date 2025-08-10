import Link from 'next/link'
import { Post } from '@/types'

interface PostGridProps {
  posts: Post[]
}

export default function PostGrid({ posts }: PostGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow animate-fade-in"
        >
          {post.metadata.featured_image && (
            <Link href={`/posts/${post.slug}`}>
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={post.metadata.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                width={400}
                height={200}
              />
            </Link>
          )}
          
          <div className="p-6">
            {post.metadata.category && (
              <Link
                href={`/categories/${post.metadata.category.slug}`}
                className="text-surf-600 text-sm font-medium hover:text-surf-700"
              >
                {post.metadata.category.metadata.name}
              </Link>
            )}
            
            <h3 className="mt-2 mb-3">
              <Link
                href={`/posts/${post.slug}`}
                className="text-xl font-bold text-gray-900 hover:text-surf-600 transition-colors"
              >
                {post.metadata.title}
              </Link>
            </h3>
            
            <p className="text-gray-600 line-clamp-3 mb-4">
              {post.metadata.content.replace(/[#*]/g, '').substring(0, 150)}...
            </p>
            
            <div className="flex items-center justify-between">
              {post.metadata.author && (
                <Link
                  href={`/authors/${post.metadata.author.slug}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-surf-600"
                >
                  {post.metadata.author.metadata.profile_photo && (
                    <img
                      src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={post.metadata.author.metadata.name}
                      className="w-8 h-8 rounded-full object-cover"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{post.metadata.author.metadata.name}</span>
                </Link>
              )}
              
              <time className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}