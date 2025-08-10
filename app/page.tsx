import { getPosts, getCategories } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import PostGrid from '@/components/PostGrid'
import CategoryList from '@/components/CategoryList'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPosts(6),
    getCategories()
  ])

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1)

  return (
    <div className="animate-fade-in">
      {featuredPost && <Hero post={featuredPost} />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-surf-900 mb-8">Browse by Category</h2>
          <CategoryList categories={categories} />
        </section>

        <section>
          <h2 className="text-3xl font-bold text-surf-900 mb-8">Recent Posts</h2>
          <PostGrid posts={recentPosts} />
        </section>
      </div>
    </div>
  )
}