import { createBucketClient } from '@cosmicjs/sdk'
import { Post, Author, Category, hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

export async function getPosts(limit?: number): Promise<Post[]> {
  try {
    const query = { type: 'posts' }
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .sort('-created_at')
      .limit(limit || 10)
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching posts:', error)
    throw new Error('Failed to fetch posts')
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'posts',
        slug
      })
      .depth(1)
    
    return response.object as Post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching post:', error)
    throw new Error('Failed to fetch post')
  }
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching posts by category:', error)
    throw new Error('Failed to fetch posts by category')
  }
}

export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching posts by author:', error)
    throw new Error('Failed to fetch posts by author')
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug
      })
    
    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching category:', error)
    throw new Error('Failed to fetch category')
  }
}

export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Author[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching authors:', error)
    throw new Error('Failed to fetch authors')
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'authors',
        slug
      })
    
    return response.object as Author
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching author:', error)
    throw new Error('Failed to fetch author')
  }
}