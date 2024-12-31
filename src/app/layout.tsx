import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Blog',
  description: 'A modern markdown blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <nav className="bg-white border-b border-gray-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <a href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    Modern Blog
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/" className="nav-link">Home</a>
                  <a href="/about" className="nav-link">About</a>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </main>

          <footer className="bg-white border-t border-gray-100 py-8 mt-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500">
                © {new Date().getFullYear()} Modern Blog. Built with Next.js and Markdown.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 