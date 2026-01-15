'use client'

import { useState, useEffect } from 'react'
import ScrollAnimation from '@/components/ScrollAnimation'

declare global {
    interface Window {
        emailjs: any
    }
}

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
        script.async = true
        script.onload = () => {

            window.emailjs.init('ujS5FBFUFf-blfMeQ')
        }
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')
        setErrorMessage('')

        if (!window.emailjs) {
            setErrorMessage('Email service is loading. Please try again in a moment.')
            setIsSubmitting(false)
            setSubmitStatus('error')
            return
        }

        try {

            await window.emailjs.send(
                'service_mk2ptjq',
                'template_nx5y86r',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject || 'Contact Form Submission',
                    message: formData.message,
                    to_email: 'c2airorg@gmail.com'
                }
            )

            setFormData({ name: '', email: '', subject: '', message: '' })
            setSubmitStatus('success')
            setTimeout(() => setSubmitStatus('idle'), 5000)
        } catch (error: any) {setErrorMessage('Failed to send message. Please try again or contact us directly at c2airorg@gmail.com')
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 pt-32 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-30 left-1/4 w-[500px] h-[500px] bg-blue-500/19 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -right-20 w-[460px] h-[460px] bg-purple-500/17 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-2/3 w-96 h-96 bg-c2air-accent/18 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-purple-500/18 rounded-full blur-3xl"></div>
                <div className="absolute top-2/3 right-1/2 w-[420px] h-[420px] bg-indigo-500/14 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollAnimation direction="up">
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            Get in Touch
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Have a question, want to collaborate, or need more information? We'd love to hear from you.
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                    <ScrollAnimation direction="up" delay={200}>
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-c2air-accent focus:outline-none text-white placeholder-gray-500"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-c2air-accent focus:outline-none text-white placeholder-gray-500"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-c2air-accent focus:outline-none text-white placeholder-gray-500"
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-c2air-accent focus:outline-none text-white placeholder-gray-500 resize-none"
                                        placeholder="Your message here..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-c2air-accent text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-c2air-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>

                                {submitStatus === 'success' && (
                                    <p className="text-green-400 text-sm text-center">
                                        Message sent successfully! We'll get back to you soon.
                                    </p>
                                )}

                                {submitStatus === 'error' && (
                                    <p className="text-red-400 text-sm text-center">
                                        {errorMessage || 'Failed to send message. Please try again.'}
                                    </p>
                                )}
                            </form>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation direction="up" delay={300}>
                        <div className="space-y-8">
                            <div className="glass-card p-6 md:p-8">
                                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Connect With Us</h2>
                                <p className="text-gray-400 mb-8">
                                    Follow us on social media to stay updated with our latest news, events, and community updates.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="https://www.whatsapp.com/channel/0029Vb76sZ630LKNWRWs7h0l"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
                                        style={{ backgroundColor: '#25D366' }}
                                        aria-label="Join WhatsApp"
                                    >
                                        <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://t.me/+RoIQt45kqH0yMDVl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
                                        style={{ backgroundColor: '#0088cc' }}
                                        aria-label="Join Telegram"
                                    >
                                        <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
                                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.686z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/c2air"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
                                        style={{ backgroundColor: '#0077B5' }}
                                        aria-label="Follow on LinkedIn"
                                    >
                                        <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://x.com/c2air.org"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl bg-black"
                                        aria-label="Follow on X"
                                    >
                                        <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@C2AIRorg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
                                        style={{ backgroundColor: '#FF0000' }}
                                        aria-label="Subscribe on YouTube"
                                    >
                                        <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/c2airorg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
                                        style={{ background: 'linear-gradient(45deg, #833AB4, #FD1D1D, #FCB045)' }}
                                        aria-label="Follow on Instagram"
                                    >
                                        <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="glass-card p-6 md:p-8">
                                <h3 className="text-xl font-semibold text-white mb-4">Other Ways to Reach Us</h3>
                                <div className="space-y-4 text-gray-400">
                                    <p>
                                        <strong className="text-white">Email:</strong>{' '}
                                        <a href="mailto:contact@c2air.org" className="text-c2air-accent hover:underline">
                                            c2airorg@gmail.com
                                        </a>
                                    </p>
                                    <p>
                                        <strong className="text-white">Community:</strong> Join our WhatsApp channel for updates and discussions.
                                    </p>
                                    <p>
                                        <strong className="text-white">Social Media:</strong> Follow us on LinkedIn, X, YouTube, and Instagram for the latest news.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        </div>
    )
}

