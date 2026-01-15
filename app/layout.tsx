import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'C2AIR - Community for Cybersecurity & Artificial Intelligence Research',
  description: 'A community focused on Artificial Intelligence and Cybersecurity, built to help learners become job-ready, confident, and responsible technology professionals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl bg-gradient-shape"></div>
          <div className="absolute top-1/4 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl bg-gradient-shape-delay-1"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bg-gradient-shape-delay-2"></div>
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl bg-gradient-shape-delay-05"></div>
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl bg-gradient-shape-delay-15"></div>
        </div>
        <Navigation />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

