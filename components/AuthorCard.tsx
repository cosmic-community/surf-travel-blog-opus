import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
      <div className="flex items-start gap-4">
        {author.metadata.profile_photo && (
          <Link href={`/authors/${author.slug}`}>
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={author.metadata.name}
              className="w-20 h-20 rounded-full object-cover"
              width={80}
              height={80}
            />
          </Link>
        )}
        <div className="flex-grow">
          <Link
            href={`/authors/${author.slug}`}
            className="text-xl font-bold text-surf-900 hover:text-surf-700 transition-colors"
          >
            {author.metadata.name}
          </Link>
          {author.metadata.bio && (
            <p className="text-gray-700 mt-2">{author.metadata.bio}</p>
          )}
          {author.metadata.instagram && (
            <a
              href={`https://instagram.com/${author.metadata.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-surf-600 hover:text-surf-700 mt-3"
            >
              <span>@{author.metadata.instagram}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}