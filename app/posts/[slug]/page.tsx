// app/posts/[slug]/page.tsx
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import AuthorCard from '@/components/AuthorCard'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts(100)
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.metadata.title,
    description: post.metadata.content.substring(0, 160) + '...',
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.content.substring(0, 160) + '...',
      images: post.metadata.featured_image ? [post.metadata.featured_image.imgix_url] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="animate-fade-in">
      {post.metadata.featured_image && (
        <div className="relative h-[400px] lg:h-[500px] w-full overflow-hidden">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=2400&h=1000&fit=crop&auto=format,compress`}
            alt={post.metadata.title}
            className="w-full h-full object-cover"
            width={1200}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{post.metadata.title}</h1>
              <div className="flex items-center gap-4 text-lg">
                {post.metadata.category && (
                  <span className="bg-surf-600 px-3 py-1 rounded-full text-sm">
                    {post.metadata.category.metadata.name}
                  </span>
                )}
                {post.metadata.location && (
                  <span className="flex items-center gap-1">
                    📍 {post.metadata.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose-surf mb-12">
          <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
        </div>

        {post.metadata.tags && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.split(',').map((tag: string) => (
                <span
                  key={tag.trim()}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {post.metadata.author && (
          <AuthorCard author={post.metadata.author} />
        )}
      </div>
    </article>
  )
}