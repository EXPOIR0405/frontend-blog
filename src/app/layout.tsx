'use client'
import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8 relative">
          {children}
          <Link 
            href="/blog/write"
            className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            글쓰기
          </Link>
        </main>
        <Footer />
      </body>
    </html>
  )
}