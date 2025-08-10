# Surf Travel Blog

![Surf Travel Blog](https://imgix.cosmicjs.com/2cca3b00-761f-11f0-a051-23c10f41277a-photo-1502680390469-be75c86b636f-1754853669461.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive surf travel blog built with Next.js 15 and TypeScript, powered by [Cosmic](https://www.cosmicjs.com). This application showcases surf destinations, gear reviews, and travel tips with a beautiful, performant interface.

## ✨ Features

- 🏄 Dynamic blog posts with rich markdown content
- 📸 Stunning hero sections with optimized images
- 👤 Author profiles with bio and social links
- 🏷️ Category-based content organization
- 📱 Fully responsive design for all devices
- ⚡ Lightning-fast performance with Next.js 15
- 🔍 SEO-optimized pages
- 🎨 Modern UI with Tailwind CSS

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6898ec38cb41bbbd80e22fcb&clone_repository=6898faffb9c8511fa3f67d95)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a surf travel blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [Cosmic](https://www.cosmicjs.com)
- **Deployment**: Optimized for Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- [Bun](https://bun.sh/) package manager (recommended) or npm
- A Cosmic account with a configured bucket

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd surf-travel-blog
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Cosmic SDK Examples

This application demonstrates various Cosmic SDK features:

### Fetching Posts with Relationships
```typescript
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Includes author and category objects
  .sort('-created_at')
  .limit(10)
```

### Getting a Single Post
```typescript
const post = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: 'your-post-slug'
  })
  .depth(1)
```

### Filtering by Category
```typescript
const posts = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.category': categoryId
  })
  .depth(1)
```

## 🌐 Cosmic CMS Integration

This blog is fully integrated with Cosmic CMS:

1. **Content Management**: All posts, authors, and categories are managed in Cosmic
2. **Media Handling**: Images are served via Cosmic's imgix integration for optimization
3. **Real-time Updates**: Content changes in Cosmic are immediately reflected on the site
4. **Type Safety**: Full TypeScript support with typed content models

## 🚢 Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Create a new site in [Netlify](https://netlify.com)
3. Add your environment variables
4. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`

### Environment Variables

Make sure to set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) and [Next.js](https://nextjs.org)
<!-- README_END -->