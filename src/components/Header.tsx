'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <h1 className="text-2xl font-bold">
            <Link href="/" className="hover:text-gray-600">
              WENIVLOG
            </Link>
          </h1>

          {/* 모바일 메뉴 버튼 */}
          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex gap-8">
              <Link href="/about" className="hover:text-gray-600">
                About
              </Link>
              <Link href="/blog" className="hover:text-gray-600">
                Blog
              </Link>
              <Link href="/contact" className="hover:text-gray-600">
                Contact
              </Link>
            </nav>

            {/* 검색창 */}
            <div className="relative">
              <input
                type="text"
                placeholder="Keyword"
                className="pl-4 pr-10 py-1 bg-gray-50 rounded-full w-[200px] focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
          <nav className="flex flex-col gap-4">
            <Link href="/about" className="hover:text-gray-600">
              About
            </Link>
            <Link href="/blog" className="hover:text-gray-600">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-gray-600">
              Contact
            </Link>
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Keyword"
                className="w-full pl-4 pr-10 py-2 bg-gray-50 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
