import Link from 'next/link'
import { Category } from '@/types'

interface CategoryListProps {
  categories: Category[]
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
        >
          {category.metadata.category_image ? (
            <img
              src={`${category.metadata.category_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={category.metadata.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={400}
              height={300}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-surf-400 to-surf-600" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{category.metadata.name}</h3>
            {category.metadata.description && (
              <p className="text-sm text-gray-200 line-clamp-2">
                {category.metadata.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}