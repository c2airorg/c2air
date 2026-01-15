'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import Logo from './Logo'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const libraryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (libraryRef.current && !libraryRef.current.contains(event.target as Node)) {
        setIsLibraryOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-slate-800/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg'
        : 'bg-slate-800/95 backdrop-blur-xl'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Logo className="w-16 h-16 md:w-20 md:h-20 transition-transform group-hover:scale-105" />
            </div>
            <div className="flex flex-col hidden sm:block">
              <span className="text-base text-gray-400 leading-tight whitespace-nowrap block">
                Community for Cybersecurity &
              </span>
              <span className="text-base text-gray-400 leading-tight whitespace-nowrap block">
                Artificial Intelligence Research
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-1">
            <Link
              href="/"
              className="relative px-4 py-2 text-base font-medium text-gray-300 hover:text-white transition-colors group"
            >
              <span className="relative z-10">Home</span>
              <span className="absolute inset-0 bg-slate-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-0"></span>
            </Link>

            <Link
              href="/about"
              className="relative px-4 py-2 text-base font-medium text-gray-300 hover:text-white transition-colors group"
            >
              <span className="relative z-10">About</span>
              <span className="absolute inset-0 bg-slate-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-0"></span>
            </Link>

            <Link
              href="/events"
              className="relative px-4 py-2 text-base font-medium text-gray-300 hover:text-white transition-colors group"
            >
              <span className="relative z-10">Events</span>
              <span className="absolute inset-0 bg-slate-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-0"></span>
            </Link>

            <Link
              href="/join-chapter"
              className="relative px-4 py-2 text-base font-medium text-gray-300 hover:text-white transition-colors group"
            >
              <span className="relative z-10">Join Chapter</span>
              <span className="absolute inset-0 bg-slate-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-0"></span>
            </Link>

            <Link
              href="/contact"
              className="relative px-4 py-2 text-base font-medium text-gray-300 hover:text-white transition-colors group"
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 bg-slate-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-0"></span>
            </Link>
            <div className="relative" ref={libraryRef}>
              <button
                onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                className={`relative flex items-center gap-1.5 px-4 py-2 text-base font-medium transition-all rounded-lg ${isLibraryOpen
                    ? 'bg-slate-800 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                  }`}
              >
                <span>Library</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isLibraryOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLibraryOpen && (
                <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100">
                  <Link
                    href="/resources"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors text-base font-medium"
                    onClick={() => setIsLibraryOpen(false)}
                  >
                    Resources
                  </Link>
                  <Link
                    href="/blog"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors text-base font-medium border-t border-gray-100"
                    onClick={() => setIsLibraryOpen(false)}
                  >
                    Blog
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="px-4 pb-6 pt-2 bg-slate-900/98 backdrop-blur-xl border-t border-slate-800/50">
          <div className="space-y-1">
            <Link
              href="/"
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/events"
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/join-chapter"
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Join Chapter
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2">
              <button
                onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg text-lg font-medium transition-colors"
              >
                <span>Library</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isLibraryOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLibraryOpen && (
                <div className="mt-1 ml-4 space-y-1">
                  <Link
                    href="/resources"
                    className="block px-4 py-2.5 text-gray-400 hover:text-white hover:bg-slate-800/50 rounded-lg text-base font-medium transition-colors"
                    onClick={() => {
                      setIsOpen(false)
                      setIsLibraryOpen(false)
                    }}
                  >
                    Resources
                  </Link>
                  <Link
                    href="/blog"
                    className="block px-4 py-2.5 text-gray-400 hover:text-white hover:bg-slate-800/50 rounded-lg text-base font-medium transition-colors"
                    onClick={() => {
                      setIsOpen(false)
                      setIsLibraryOpen(false)
                    }}
                  >
                    Blog
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
