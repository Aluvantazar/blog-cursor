import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import Link from 'next/link'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    return `<pre class="language-${lang}"><code>${str}</code></pre>`
  }
})

interface PostParams {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }))
}

export default function Post({ params }: PostParams) {
  const { slug } = params
  const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post not found</h1>
        <p className="text-gray-600 mb-8">The requested post does not exist.</p>
        <Link href="/" className="text-indigo-600 hover:text-indigo-700 transition-colors">
          ← Back to home
        </Link>
      </div>
    )
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const contentHtml = md.render(content)

  return (
    <article>
      <header className="mb-8 pb-8 border-b border-gray-200">
        <Link href="/" className="text-indigo-600 hover:text-indigo-700 transition-colors mb-8 block">
          ← Back to home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
          {data.title || slug}
        </h1>
        {data.date && (
          <time className="text-gray-500">
            {new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        )}
      </header>
      
      <div className="prose prose-lg prose-indigo mx-auto">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </article>
  )
} 