import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'

export default async function Header() {
  const categories = await getCategories()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏄</span>
            <span className="text-xl font-bold text-surf-900">Surf Travel Blog</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-surf-600 transition-colors"
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-gray-700 hover:text-surf-600 transition-colors"
              >
                {category.metadata.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}