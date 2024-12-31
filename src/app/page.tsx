import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

function getPostMetadata() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory)
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
    }
  })

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export default function Home() {
  const posts = getPostMetadata()

  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Modern Blog</h1>
        <p className="text-xl text-gray-600">Discover interesting stories and insights</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.length === 0 ? (
          <div className="col-span-2 post-card">
            <p className="text-gray-600 text-center">
              No posts yet. Add .md files to the posts directory to get started.
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="post-card block">
              <article>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-gray-500 mb-3 block">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {post.excerpt && (
                  <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                )}
                <span className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                  Read more →
                </span>
              </article>
            </Link>
          ))
        )}
      </div>
    </div>
  )
} 