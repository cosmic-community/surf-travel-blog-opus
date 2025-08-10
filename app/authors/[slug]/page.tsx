// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAuthors } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostGrid from '@/components/PostGrid'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.metadata.name} - Surf Travel Blog`,
    description: author.metadata.bio || `Posts by ${author.metadata.name}`,
  }
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-r from-surf-50 to-surf-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {author.metadata.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                width={128}
                height={128}
              />
            )}
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-bold text-surf-900 mb-2">{author.metadata.name}</h1>
              {author.metadata.bio && (
                <p className="text-gray-700 text-lg mb-4">{author.metadata.bio}</p>
              )}
              {author.metadata.instagram && (
                <a
                  href={`https://instagram.com/${author.metadata.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-surf-600 hover:text-surf-700"
                >
                  <span>@{author.metadata.instagram}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Posts by {author.metadata.name}
            </h2>
            <PostGrid posts={posts} />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts by this author yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}