// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostGrid from '@/components/PostGrid'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.metadata.name} - Surf Travel Blog`,
    description: category.metadata.description || `Browse all ${category.metadata.name} posts`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="animate-fade-in">
      <div className="relative h-[300px] w-full overflow-hidden">
        {category.metadata.category_image ? (
          <img
            src={`${category.metadata.category_image.imgix_url}?w=2400&h=600&fit=crop&auto=format,compress`}
            alt={category.metadata.name}
            className="w-full h-full object-cover"
            width={1200}
            height={300}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-surf-400 to-surf-600" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{category.metadata.name}</h1>
            {category.metadata.description && (
              <p className="text-xl max-w-2xl mx-auto px-4">{category.metadata.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {posts.length} {posts.length === 1 ? 'Post' : 'Posts'} in {category.metadata.name}
            </h2>
            <PostGrid posts={posts} />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}