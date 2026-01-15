'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

declare global {
  interface Window {
    emailjs: any
  }
}

export default function Footer() {
  const pathname = usePathname()
  const isAboutPage = pathname === '/about'
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (!publicKey) return

    if (window.emailjs && window.emailjs.init) {
      try {
        window.emailjs.init(publicKey)
      } catch (e) {
        return
      }
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
    script.async = true
    script.onload = () => {
      try {
        window.emailjs.init(publicKey)
      } catch (e) {
        return
      }
    }
    document.body.appendChild(script)
  }, [])

  const sendSubscriptionEmails = async () => {
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const newsletterTemplateId = process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID
      const contactTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID

      if (!serviceId || !newsletterTemplateId || !contactTemplateId) {
        throw new Error('EmailJS configuration is missing')
      }

      await window.emailjs.send(
        serviceId,
        newsletterTemplateId,
        {
          to_email: email,
          from_name: 'C2AIR',
          from_email: email,
          subject: 'Thank You for Subscribing to Our Newsletter',
          message: `Thank you for subscribing to our newsletter! We're excited to keep you updated on upcoming workshops, challenges, projects, and opportunities to collaborate. Stay tuned for exciting updates from C2AIR!`,
          reply_to: 'c2airorg@gmail.com'
        }
      )

      await window.emailjs.send(
        serviceId,
        contactTemplateId,
        {
          to_email: 'c2airorg@gmail.com',
          from_name: 'Newsletter Subscription',
          from_email: email,
          subject: 'New Newsletter Subscription',
          message: `A new subscriber has joined the newsletter:\n\nEmail: ${email}\n\nDate: ${new Date().toLocaleString()}`,
          reply_to: email
        }
      )

      setEmail('')
      setSubscribeStatus('success')
      setTimeout(() => setSubscribeStatus('idle'), 5000)
    } catch (error: any) {
      setErrorMessage(`Failed to subscribe: ${error.text || error.message || 'Unknown error'}. Please try again.`)
      setSubscribeStatus('error')
    } finally {
      setIsSubscribing(false)
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address')
      setSubscribeStatus('error')
      setIsSubscribing(false)
      return
    }

    setIsSubscribing(true)
    setSubscribeStatus('idle')
    setErrorMessage('')

    const checkEmailJS = (retries = 5): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.emailjs && window.emailjs.send) {
          resolve()
          return
        }

        if (retries === 0) {
          reject(new Error('EmailJS failed to load'))
          return
        }

        setTimeout(() => {
          checkEmailJS(retries - 1).then(resolve).catch(reject)
        }, 500)
      })
    }

    try {
      await checkEmailJS()
      await sendSubscriptionEmails()
    } catch (error: any) {
      setErrorMessage('Email service is not available. Please try again in a moment or contact us directly.')
      setSubscribeStatus('error')
      setIsSubscribing(false)
    }
  }

  return (
    <footer className={`bg-slate-800 border-t border-slate-700/30 text-white relative z-30 ${isAboutPage ? 'lg:ml-64' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4 text-white text-lg">Subscribe to our newsletter</h4>
            <p className="text-gray-400 text-base mb-4">
              Stay updated on upcoming workshops, challenges, projects, and opportunities to collaborate.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-md focus:border-c2air-accent focus:outline-none text-white placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="bg-c2air-accent text-slate-900 px-6 py-3 rounded-md font-medium text-base hover:bg-c2air-accent-light transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {subscribeStatus === 'success' && (
              <p className="text-green-400 text-base mt-2">
                Thank you for subscribing! Check your email for confirmation.
              </p>
            )}
            {subscribeStatus === 'error' && (
              <p className="text-red-400 text-base mt-2">
                {errorMessage || 'Failed to subscribe. Please try again.'}
              </p>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white text-lg">Quick Links</h4>
            <ul className="space-y-2 text-base">
              <li>
                <Link href="/" className="text-gray-300 hover:text-c2air-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-c2air-accent transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/join-chapter" className="text-gray-300 hover:text-c2air-accent transition-colors">
                  Join Chapter
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-c2air-accent transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-c2air-accent transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white text-lg">Connect</h4>
            <p className="text-gray-300 text-base mb-4">
              Join our community and stay updated
            </p>
            <div className="flex flex-wrap gap-4 mb-4">
              <a
                href="https://www.linkedin.com/company/c2air"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-c2air-accent transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://x.com/c2airorg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-c2air-accent transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@C2AIRorg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-c2air-accent transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/c2airorg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-c2air-accent transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.whatsapp.com/channel/0029Vb76sZ630LKNWRWs7h0l"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-c2air-accent transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <a
                href="https://t.me/+RoIQt45kqH0yMDVl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-c2air-accent transition-colors"
                aria-label="Telegram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.686z" />
                </svg>
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 C2AIR. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
