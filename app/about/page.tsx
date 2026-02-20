'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function AboutPage() {
    const [activeSection, setActiveSection] = useState('story')
    const [activePeopleTab, setActivePeopleTab] = useState('Backed by')
    const isScrollingRef = React.useRef(false)

    useEffect(() => {
        let ticking = false
        let lastActiveSection = 'story'

        const handleScroll = () => {

            if (isScrollingRef.current) return

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const sections = ['story', 'mission', 'vision', 'pillars', 'approach', 'people']
                    const viewportTop = window.scrollY + 150
                    const viewportBottom = window.scrollY + window.innerHeight
                    let currentSection = 'story'
                    let maxVisible = 0

                    for (let i = 0; i < sections.length; i++) {
                        const element = document.getElementById(sections[i])
                        if (element) {
                            const rect = element.getBoundingClientRect()
                            const elementTop = rect.top + window.scrollY
                            const elementBottom = elementTop + rect.height

                            const visibleTop = Math.max(viewportTop, elementTop)
                            const visibleBottom = Math.min(viewportBottom, elementBottom)
                            const visibleHeight = Math.max(0, visibleBottom - visibleTop)

                            if (visibleHeight > maxVisible && visibleHeight > 100) {
                                maxVisible = visibleHeight
                                currentSection = sections[i]
                            }
                        }
                    }

                    if (maxVisible === 0) {
                        let closestDistance = Infinity
                        for (let i = 0; i < sections.length; i++) {
                            const element = document.getElementById(sections[i])
                            if (element) {
                                const rect = element.getBoundingClientRect()
                                const elementTop = rect.top + window.scrollY
                                const distance = Math.abs(elementTop - viewportTop)

                                if (distance < closestDistance && rect.top < window.innerHeight) {
                                    closestDistance = distance
                                    currentSection = sections[i]
                                }
                            }
                        }
                    }

                    if (currentSection !== lastActiveSection) {
                        setActiveSection(currentSection)
                        lastActiveSection = currentSection
                    }

                    ticking = false
                })
                ticking = true
            }
        }

        handleScroll()

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToSection = (sectionId: string) => {

        setActiveSection(sectionId)

        isScrollingRef.current = true

        const element = document.getElementById(sectionId)
        if (element) {
            const offset = 120
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })

            setTimeout(() => {
                isScrollingRef.current = false

                setActiveSection(sectionId)
            }, 800)
        }
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <div className="flex">
                <aside className="hidden lg:block fixed left-0 top-24 w-64 border-r border-gray-800 bg-slate-900/50 backdrop-blur-sm z-10 overflow-y-auto" style={{ height: 'calc(100vh - 6rem)', maxHeight: 'calc(100vh - 6rem)' }}>
                    <nav className="p-6 pb-32 space-y-2">
                        <button
                            onClick={() => scrollToSection('story')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-500 ease-in-out ${activeSection === 'story'
                                ? 'bg-slate-800/60 backdrop-blur-md text-white border border-white/10 shadow-lg shadow-c2air-accent/10'
                                : 'text-gray-400 border border-transparent hover:text-white hover:bg-slate-800/30 hover:backdrop-blur-sm'
                                }`}
                        >
                            Story
                        </button>
                        <button
                            onClick={() => scrollToSection('mission')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-500 ease-in-out ${activeSection === 'mission'
                                ? 'bg-slate-800/60 backdrop-blur-md text-white border border-white/10 shadow-lg shadow-c2air-accent/10'
                                : 'text-gray-400 border border-transparent hover:text-white hover:bg-slate-800/30 hover:backdrop-blur-sm'
                                }`}
                        >
                            Mission
                        </button>
                        <button
                            onClick={() => scrollToSection('vision')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-500 ease-in-out ${activeSection === 'vision'
                                ? 'bg-slate-800/60 backdrop-blur-md text-white border border-white/10 shadow-lg shadow-c2air-accent/10'
                                : 'text-gray-400 border border-transparent hover:text-white hover:bg-slate-800/30 hover:backdrop-blur-sm'
                                }`}
                        >
                            Vision
                        </button>
                        <button
                            onClick={() => scrollToSection('pillars')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-500 ease-in-out ${activeSection === 'pillars'
                                ? 'bg-slate-800/60 backdrop-blur-md text-white border border-white/10 shadow-lg shadow-c2air-accent/10'
                                : 'text-gray-400 border border-transparent hover:text-white hover:bg-slate-800/30 hover:backdrop-blur-sm'
                                }`}
                        >
                            Four Pillars
                        </button>
                        <button
                            onClick={() => scrollToSection('approach')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-500 ease-in-out ${activeSection === 'approach'
                                ? 'bg-slate-800/60 backdrop-blur-md text-white border border-white/10 shadow-lg shadow-c2air-accent/10'
                                : 'text-gray-400 border border-transparent hover:text-white hover:bg-slate-800/30 hover:backdrop-blur-sm'
                                }`}
                        >
                            Our Approach
                        </button>
                        <button
                            onClick={() => scrollToSection('people')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-500 ease-in-out ${activeSection === 'people'
                                ? 'bg-slate-800/60 backdrop-blur-md text-white border border-white/10 shadow-lg shadow-c2air-accent/10'
                                : 'text-gray-400 border border-transparent hover:text-white hover:bg-slate-800/30 hover:backdrop-blur-sm'
                                }`}
                        >
                            People
                        </button>
                    </nav>
                </aside>
                <main className="flex-1 lg:ml-64">
                    <section id="story" className="relative pt-32 md:pt-40 pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 bg-slate-900 border-b border-slate-800/50">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-30 left-1/4 w-[500px] h-[500px] bg-c2air-accent/19 rounded-full blur-3xl"></div>
                            <div className="absolute top-1/3 -right-20 w-[460px] h-[460px] bg-purple-500/17 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500/18 rounded-full blur-3xl"></div>
                            <div className="absolute top-2/3 left-1/2 w-[420px] h-[420px] bg-indigo-500/14 rounded-full blur-3xl"></div>
                        </div>
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-40 -left-40 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl"></div>
                            <div className="absolute top-1/2 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                        </div>

                        <div className="max-w-5xl mx-auto">
                            <ScrollAnimation direction="up">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.15] tracking-tight">
                                    Towards a Secure and Intelligent Digital Future.
                                </h1>
                            </ScrollAnimation>
                            <ScrollAnimation direction="up" delay={200}>
                                <div className="space-y-6 text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed font-light max-w-4xl">
                                    <p>
                                        In a world facing unprecedented challenges, where AI is accelerating at breakneck speed while Cybersecurity threats grow more sophisticated and pervasive. <br />

                                        <strong className="text-white font-medium">C2AIR</strong> (Community for Cybersecurity & AI Research) emerges as India's first one-stop juncture for  integrating <strong className="text-white font-medium"> AI</strong> and  <strong className="text-white font-medium">
                                            Cybersecurity</strong>
                                        .
                                    </p>
                                    <p>
                                        As a volunteer-driven, non-partisan collective, we unite students, educators, researchers, industry experts, mentors, and institutions to tackle this dual-edged reality: harnessing AI's potential while fortifying it against vulnerabilities, strengthening Cybersecurity and making it efficient using AI
                                    </p>
                                </div>
                            </ScrollAnimation>
                        </div>
                    </section>
                    <section id="mission" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-800/50 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-10 right-1/3 w-[480px] h-[480px] bg-purple-500/18 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-1/4 left-1/5 w-[520px] h-[520px] bg-blue-500/16 rounded-full blur-3xl"></div>
                            <div className="absolute top-1/2 left-2/3 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-20 right-1/4 w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-3xl"></div>
                        </div>
                        <div className="max-w-5xl mx-auto relative z-10">
                            <ScrollAnimation direction="up">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">Our Mission</h2>
                            </ScrollAnimation>
                            <ScrollAnimation direction="up" delay={200}>
                                <div className="space-y-6 text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-4xl">
                                    <p>
                                        To transform aspiring learners into industry-ready, trusted professionals in the field of AI and Cybersecurity through hands-on projects, real-world challenges, peer-led mentorship, and integrated learning that embeds security, ethics, and responsibility from the start.
                                    </p>
                                    <p>
                                        We achieve this through collaborations across industry, academia, government, and communities—building for the nation by fostering talent that drives innovation and safeguards our digital ecosystem.
                                    </p>
                                </div>
                            </ScrollAnimation>
                        </div>
                    </section>
                    <section id="vision" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-900 border-b border-slate-800/50 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-20 left-1/3 w-[500px] h-[500px] bg-blue-500/19 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-1/3 -right-30 w-[460px] h-[460px] bg-purple-500/17 rounded-full blur-3xl"></div>
                            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-c2air-accent/18 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-10 left-1/2 w-[420px] h-[420px] bg-indigo-500/14 rounded-full blur-3xl"></div>
                        </div>
                        <div className="max-w-5xl mx-auto relative z-10">
                            <ScrollAnimation direction="up">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">Our Vision</h2>
                            </ScrollAnimation>
                            <ScrollAnimation direction="up" delay={200}>
                                <div className="space-y-8">
                                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-4xl">
                                        To train and empower <strong className="text-white font-medium">10,000+ Cybersecurity</strong> and <strong className="text-white font-medium">AI</strong> professionals in the next 5 years, making India a global leader in secure, resilient and intelligent technology. <br></br> By bridging the industry-academia gaps and promoting collaboration across the nation, <br></br>we aim to position our native land, India that is Bharat, as a global  hub for responsible, ethical, and sustainable  <strong className="text-white font-medium"> AI</strong> and  <strong className="text-white font-medium">
                                            Cybersecurity</strong> excellence.
                                    </p>

                                </div>
                            </ScrollAnimation>
                        </div>
                    </section>
                    <section id="pillars" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-800/50 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-1/3 right-1/5 w-[480px] h-[480px] bg-purple-500/18 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-1/4 -left-20 w-[520px] h-[520px] bg-blue-500/16 rounded-full blur-3xl"></div>
                            <div className="absolute top-20 left-1/2 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-1/3 right-1/3 w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-3xl"></div>
                        </div>
                        <div className="max-w-5xl mx-auto relative z-10">
                            <ScrollAnimation direction="up">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 tracking-tight">Four Pillars</h2>
                            </ScrollAnimation>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <ScrollAnimation direction="up" delay={100}>
                                    <div className="glass-card p-6 md:p-8 group h-full flex flex-col">
                                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 group-hover:text-c2air-accent transition-colors duration-300">Integrated Innovation</h3>
                                        <p className="text-gray-300 leading-relaxed text-base md:text-lg flex-grow">
                                            Seamlessly merging AI and cybersecurity to create resilient systems that are intelligent by design and secure by default—addressing the fragility of standalone approaches.
                                        </p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation direction="up" delay={200}>
                                    <div className="glass-card p-6 md:p-8 group h-full flex flex-col">
                                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 group-hover:text-c2air-accent transition-colors duration-300">Hands-On Mastery</h3>
                                        <p className="text-gray-300 leading-relaxed text-base md:text-lg flex-grow">
                                            Prioritizing practical building through guided labs, real-world projects, hackathons, and CTFs, turning theoretical knowledge into deployable skills that employers value.
                                        </p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation direction="up" delay={300}>
                                    <div className="glass-card p-6 md:p-8 group h-full flex flex-col">
                                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 group-hover:text-c2air-accent transition-colors duration-300">Collaborative Ecosystem</h3>
                                        <p className="text-gray-300 leading-relaxed text-base md:text-lg flex-grow">
                                            Fostering peer mentorship, leadership growth, and cross-sector partnerships to accelerate learning, share expertise, and build a supportive network that scales beyond individuals.
                                        </p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation direction="up" delay={400}>
                                    <div className="glass-card p-6 md:p-8 group h-full flex flex-col">
                                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 group-hover:text-c2air-accent transition-colors duration-300">Impactful Outcomes</h3>
                                        <p className="text-gray-300 leading-relaxed text-base md:text-lg flex-grow">
                                            Delivering measurable results like strong portfolios, industry exposure, internships, and career pathways—ensuring our members contribute to national security and technological advancement.
                                        </p>
                                    </div>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </section>
                    <section id="approach" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-900 border-b border-slate-800/50 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-20 right-1/3 w-[480px] h-[480px] bg-purple-500/18 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-1/4 left-1/5 w-[520px] h-[520px] bg-blue-500/16 rounded-full blur-3xl"></div>
                            <div className="absolute top-1/2 left-2/3 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-20 right-1/4 w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-3xl"></div>
                        </div>
                        <div className="max-w-5xl mx-auto relative z-10">
                            <ScrollAnimation direction="up">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 tracking-tight">Our Approach</h2>
                            </ScrollAnimation>
                            <div className="space-y-12">
                                <ScrollAnimation direction="up" delay={100}>
                                    <div className="flex items-start gap-6 group">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-10 h-10 rounded-full bg-c2air-accent/20 flex items-center justify-center group-hover:bg-c2air-accent/30 transition-colors duration-300">
                                                <svg className="w-6 h-6 text-c2air-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-c2air-accent transition-colors duration-300">Community-First</h3>
                                            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                                                We believe collaboration outperforms competition; our ecosystem turns learners into mentors and ideas into real-world solutions.
                                            </p>
                                        </div>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation direction="up" delay={200}>
                                    <div className="flex items-start gap-6 group">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-10 h-10 rounded-full bg-c2air-accent/20 flex items-center justify-center group-hover:bg-c2air-accent/30 transition-colors duration-300">
                                                <svg className="w-6 h-6 text-c2air-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-c2air-accent transition-colors duration-300">Projects Over Buzzwords</h3>
                                            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                                                Focus on what matters: building, testing, and securing systems that solve actual problems, not chasing fleeting trends.
                                            </p>
                                        </div>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation direction="up" delay={300}>
                                    <div className="flex items-start gap-6 group">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-10 h-10 rounded-full bg-c2air-accent/20 flex items-center justify-center group-hover:bg-c2air-accent/30 transition-colors duration-300">
                                                <svg className="w-6 h-6 text-c2air-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-c2air-accent transition-colors duration-300">Ethics and Security Integrated</h3>
                                            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                                                Every innovation starts with responsibility—ensuring AI is ethical, inclusive, and protected against threats.
                                            </p>
                                        </div>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation direction="up" delay={400}>
                                    <div className="flex items-start gap-6 group">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-10 h-10 rounded-full bg-c2air-accent/20 flex items-center justify-center group-hover:bg-c2air-accent/30 transition-colors duration-300">
                                                <svg className="w-6 h-6 text-c2air-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-c2air-accent transition-colors duration-300">Nation-Building Focus</h3>
                                            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                                                Rooted in India, we leverage industry-academia ties to upskill talent, drive research, and contribute to a self-reliant digital future.
                                            </p>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </section>
                    <section id="people" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-900 border-b border-slate-800/50 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-10 -left-30 w-[480px] h-[480px] bg-purple-500/18 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-1/3 right-1/4 w-[520px] h-[520px] bg-blue-500/20 rounded-full blur-3xl"></div>
                            <div className="absolute top-1/2 left-1/5 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-20 right-1/3 w-[450px] h-[450px] bg-indigo-500/20 rounded-full blur-3xl"></div>
                        </div>
                        <div className="max-w-5xl mx-auto relative z-10">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 tracking-tight">People</h2>
                            <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-800">
                                <button
                                    onClick={() => setActivePeopleTab('Backed by')}
                                    className={`px-6 py-3 text-base font-medium transition-colors border-b-2 ${activePeopleTab === 'Backed by'
                                        ? 'border-c2air-accent text-white'
                                        : 'border-transparent text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Backed by
                                </button>
                                <button
                                    onClick={() => setActivePeopleTab('team')}
                                    className={`px-6 py-3 text-base font-medium transition-colors border-b-2 ${activePeopleTab === 'team'
                                        ? 'border-c2air-accent text-white'
                                        : 'border-transparent text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Team
                                </button>
                                <button
                                    onClick={() => setActivePeopleTab('chapter-leads')}
                                    className={`px-6 py-3 text-base font-medium transition-colors border-b-2 ${activePeopleTab === 'chapter-leads'
                                        ? 'border-c2air-accent text-white'
                                        : 'border-transparent text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Chapter Leads
                                </button>
                            </div>
                            {activePeopleTab === 'Backed by' && (
                                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/backedby/dotslashtx.jpeg"
                                                alt="Prasenjit Gautam"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center top' }}
                                            />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white mb-2">Prasenjit Gautam</h4>
                                        <p className="text-gray-400 mb-4">CEO @ Vallum Research</p>
                                        <a
                                            href="https://www.linkedin.com/in/dotslashtx"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-c2air-accent hover:text-c2air-accent-light transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            <span>LinkedIn</span>
                                        </a>
                                    </div>
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/backedby/JyotiNigam.png"
                                                alt="Jyoti Nigam"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center top' }}
                                            />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white mb-2">Jyoti Nigam</h4>
                                        <p className="text-gray-400 mb-4">Data Scientist @ UpGrad SOT</p>
                                        <a
                                            href="https://www.linkedin.com/in/jyotinigam-phoenix/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-c2air-accent hover:text-c2air-accent-light transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            <span>LinkedIn</span>
                                        </a>
                                    </div>
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/backedby/NanakSinghKhurana.jpeg"
                                                alt="Nanak Singh Khurana"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center top' }}
                                            />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white mb-2">Nanak Singh Khurana</h4>
                                        <p className="text-gray-400 mb-4">Security Consultant @ Prescient Security</p>
                                        <a
                                            href="https://www.linkedin.com/in/nanak-singh-khurana/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-c2air-accent hover:text-c2air-accent-light transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            <span>LinkedIn</span>
                                        </a>
                                    </div>
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/backedby/KartikeyJain-SecurityConsultant.jpeg"
                                                alt="Kartikey Jain"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center top' }}
                                            />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white mb-2">Kartikey Jain</h4>
                                        <p className="text-gray-400 mb-4">Security Consultant</p>
                                        <a
                                            href="https://www.linkedin.com/in/kartikeyj96/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-c2air-accent hover:text-c2air-accent-light transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            <span>LinkedIn</span>
                                        </a>
                                    </div>
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/backedby/YashVardhanTripathi-Lead - AI Security @ Procedure.jpeg"
                                                alt="Yash Vardhan Tripathi"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center top' }}
                                            />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white mb-2">Yash Vardhan Tripathi</h4>
                                        <p className="text-gray-400 mb-4">Lead - AI Security @ Procedure</p>
                                        <a
                                            href="https://www.linkedin.com/in/yash-vardhan-tripathi11/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-c2air-accent hover:text-c2air-accent-light transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            <span>LinkedIn</span>
                                        </a>
                                    </div>
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/backedby/KartikeySingh-SecurityResearcher.png"
                                                alt="Kartik Singh"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center top' }}
                                            />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white mb-2">Kartik Singh</h4>
                                        <p className="text-gray-400 mb-4">Security Analyst @ ChargePoint</p>
                                        <a
                                            href="https://www.linkedin.com/in/kartik00013/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-c2air-accent hover:text-c2air-accent-light transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            <span>LinkedIn</span>
                                        </a>
                                    </div>
                                </div>
                            )}
                            {activePeopleTab === 'team' && (
                               <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/team_members/Anshika_Pandey.jpeg"
                                                alt="Anshika Pandey"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center center' }}
                                            />
                                        </div>
                                        <h5 className="text-2xl font-bold text-white mb-2">Anshika Pandey</h5>
                                    
                                       
                                    </div>
                                     <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/team_members/divyanshu_singh.jpeg"
                                                alt="Divyanshu Singh"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center top' }}
                                            />
                                        </div>
                                        <h5 className="text-2xl font-bold text-white mb-2">Divyanshu Singh</h5>
                                    
                                       
                                    </div>
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/team_members/Shruti_Prajapati.jpeg"
                                                alt="Shruti Prajapati"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center top' }}
                                            />
                                        </div>
                                        <h5 className="text-2xl font-bold text-white mb-2">Shruti Prajapati</h5>
                                    
                                       
                                    </div>
                                        
                                     <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/team_members/Anshita_singh.jpeg"
                                                alt="Anshita Singh"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center center' }}
                                            />
                                        </div>
                                        <h5 className="text-2xl font-bold text-white mb-2">Anshita Singh</h5>
                                    
                                       
                                    </div>
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/team_members/shivendra_kushwaha.jpeg"
                                                alt="Shivendra Kushwaha"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center center' }}
                                            />
                                        </div>
                                        <h5 className="text-2xl font-bold text-white mb-2">Shivendra Kushwaha</h5>
                                    
                                       
                                    </div>
                                        
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/team_members/Ishita_Shukla.jpeg"
                                                alt="Ishita Shukla"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center center' }}
                                            />
                                        </div>
                                        <h5 className="text-2xl font-bold text-white mb-2">Ishita Shukla</h5>
                                    
                                       
                                    </div>
                                    
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/team_members/Rishita_Singh.jpeg"
                                                alt="Rishita Singh"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center center' }}
                                            />
                                        </div>
                                        <h5 className="text-2xl font-bold text-white mb-2">Rishita Singh</h5>
                                    
                                       
                                    </div>
                                    
                                         <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/team_members/Aryan_singh.jpeg"
                                                alt="Aryan Singh"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center center' }}
                                            />
                                        </div>
                                        <h5 className="text-2xl font-bold text-white mb-2">Aryan Singh</h5>
                                    
                                       
                                    </div>
                                     <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/team_members/Ananya_Chauhan.jpeg"
                                                alt="Ananya Chauhan"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center center' }}
                                            />
                                        </div>
                                        <h5 className="text-2xl font-bold text-white mb-2">Ananya Chauhan</h5>
                                    
                                       
                                    </div>
                                     
                                     <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-slate-800 ring-4 ring-slate-700 relative">
                                            <Image
                                                src="/team/team_members/jeetu_singh.jpeg"
                                                alt="Jeetu Singh"
                                                width={160}
                                                height={160}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                style={{ objectPosition: 'center center' }}
                                            />
                                        </div>
                                        <h5 className="text-2xl font-bold text-white mb-2">Jeetu Singh</h5>
                                    
                                       
                                    </div>
                                    
                                    </div>
                            )}
                            {activePeopleTab === 'chapter-leads' && (
                                <div className="text-center py-12">
                                    <p className="text-gray-400 text-lg">Chapter leads information will be added soon.</p>
                                </div>
                            )}
                        </div>
                    </section>
                    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-800/50 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-30 left-1/4 w-[500px] h-[500px] bg-blue-500/19 rounded-full blur-3xl"></div>
                            <div className="absolute top-1/2 -right-20 w-[460px] h-[460px] bg-purple-500/17 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-1/4 left-2/3 w-96 h-96 bg-c2air-accent/18 rounded-full blur-3xl"></div>
                            <div className="absolute top-2/3 right-1/3 w-[420px] h-[420px] bg-indigo-500/14 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/25 rounded-full blur-3xl"></div>
                        </div>
                        <div className="max-w-5xl mx-auto relative z-10">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                                We're crafting a future where <span className="bg-gradient-to-b from-[#FF6600] via-[#FFFFFF] to-[#155724] bg-clip-text text-transparent">India</span> leads in secure, intelligent technology.
                            </h2>
                            <div className="space-y-8 mt-12">
                                <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                                    Have a question?<br />
                                    Want to collaborate, start a club, or partner for social impact?<br />
                                    Ready to mentor, build, or contribute?
                                </p>
                                <p className="text-xl md:text-2xl font-medium text-c2air-accent">
                                    Reach out! Let's secure India's digital tomorrow together.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                                    <Link
                                        href="https://whatsapp.com/channel/0029Vb76sZ630LKNWRWs7h0l"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-c2air-accent text-slate-900 px-8 py-4 rounded-md font-medium hover:bg-c2air-accent-light transition-colors text-base md:text-lg"
                                    >
                                        Join Community
                                    </Link>
                                    <Link
                                        href="/events"
                                        className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-md font-medium hover:border-c2air-accent hover:text-c2air-accent transition-all text-base md:text-lg"
                                    >
                                        Explore Events
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    )
}
