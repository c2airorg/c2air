'use client'

import Link from 'next/link'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <section className="relative z-20 min-h-screen flex items-center justify-center pt-32 md:pt-40 pb-32 md:pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-[480px] h-[480px] bg-purple-500/18 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/5 w-[520px] h-[520px] bg-blue-500/16 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-2/3 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/3 w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-3xl"></div>
        </div>
        <div className="hero-cuboid-3d">
          <div className="cuboid-3d">
            <div className="cuboid-face cuboid-front"></div>
            <div className="cuboid-face cuboid-back"></div>
            <div className="cuboid-face cuboid-top"></div>
            <div className="cuboid-face cuboid-bottom"></div>
            <div className="cuboid-face cuboid-left"></div>
            <div className="cuboid-face cuboid-right"></div>
            <div className="neural-network-container">
              <svg className="neural-network-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
                <line x1="150" y1="200" x2="300" y2="150" className="neural-line" />
                <line x1="150" y1="200" x2="300" y2="250" className="neural-line" />
                <line x1="150" y1="200" x2="300" y2="350" className="neural-line" />
                <line x1="150" y1="200" x2="300" y2="450" className="neural-line" />
                <line x1="150" y1="300" x2="300" y2="150" className="neural-line" />
                <line x1="150" y1="300" x2="300" y2="250" className="neural-line" />
                <line x1="150" y1="300" x2="300" y2="350" className="neural-line" />
                <line x1="150" y1="300" x2="300" y2="450" className="neural-line" />
                <line x1="150" y1="400" x2="300" y2="150" className="neural-line" />
                <line x1="150" y1="400" x2="300" y2="250" className="neural-line" />
                <line x1="150" y1="400" x2="300" y2="350" className="neural-line" />
                <line x1="150" y1="400" x2="300" y2="450" className="neural-line" />
                <line x1="300" y1="150" x2="500" y2="200" className="neural-line" />
                <line x1="300" y1="150" x2="500" y2="300" className="neural-line" />
                <line x1="300" y1="150" x2="500" y2="400" className="neural-line" />
                <line x1="300" y1="250" x2="500" y2="200" className="neural-line" />
                <line x1="300" y1="250" x2="500" y2="300" className="neural-line" />
                <line x1="300" y1="250" x2="500" y2="400" className="neural-line" />
                <line x1="300" y1="350" x2="500" y2="200" className="neural-line" />
                <line x1="300" y1="350" x2="500" y2="300" className="neural-line" />
                <line x1="300" y1="350" x2="500" y2="400" className="neural-line" />
                <line x1="300" y1="450" x2="500" y2="200" className="neural-line" />
                <line x1="300" y1="450" x2="500" y2="300" className="neural-line" />
                <line x1="300" y1="450" x2="500" y2="400" className="neural-line" />
                <line x1="500" y1="200" x2="650" y2="250" className="neural-line" />
                <line x1="500" y1="200" x2="650" y2="350" className="neural-line" />
                <line x1="500" y1="300" x2="650" y2="250" className="neural-line" />
                <line x1="500" y1="300" x2="650" y2="350" className="neural-line" />
                <line x1="500" y1="400" x2="650" y2="250" className="neural-line" />
                <line x1="500" y1="400" x2="650" y2="350" className="neural-line" />
                <circle cx="150" cy="200" r="10" className="neural-node neural-node-input neural-node-1" />
                <circle cx="150" cy="300" r="10" className="neural-node neural-node-input neural-node-2" />
                <circle cx="150" cy="400" r="10" className="neural-node neural-node-input neural-node-3" />
                <circle cx="300" cy="150" r="10" className="neural-node neural-node-hidden neural-node-4" />
                <circle cx="300" cy="250" r="10" className="neural-node neural-node-hidden neural-node-5" />
                <circle cx="300" cy="350" r="10" className="neural-node neural-node-hidden neural-node-6" />
                <circle cx="300" cy="450" r="10" className="neural-node neural-node-hidden neural-node-7" />
                <circle cx="500" cy="200" r="10" className="neural-node neural-node-hidden neural-node-8" />
                <circle cx="500" cy="300" r="12" className="neural-node neural-node-hidden neural-node-center" />
                <circle cx="500" cy="400" r="10" className="neural-node neural-node-hidden neural-node-9" />
                <circle cx="650" cy="250" r="10" className="neural-node neural-node-output neural-node-10" />
                <circle cx="650" cy="350" r="10" className="neural-node neural-node-output neural-node-11" />
              </svg>
            </div>
          </div>
        </div>
        <div className="hero-color-overlay"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 md:mb-10 leading-[1.1] tracking-tight">
            <span className="text-white">Where Intelligence</span>
            <br />
            <span className="text-c2air-accent">Meets Security</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed font-light">
            AI without Cyber Security is fragile, Cyber Security without AI is incomplete. Welcome to C2AIR,
            a research community built from an amalgamation of researchers, academia and industry experts holding
            diverse experience in the Artificial Intelligence and Cyber Security domain.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/events"
              className="bg-c2air-accent border-2 border-c2air-accent text-slate-900 px-8 py-4 rounded-md font-medium hover:bg-c2air-accent-light hover:border-c2air-accent-light transition-all text-base md:text-lg shadow-lg hover:shadow-xl hover:shadow-c2air-accent/30"
            >
              Explore Events →
            </Link>
            <Link
              href="/join-community"
              className="bg-transparent border-2 border-c2air-accent/50 text-c2air-accent px-8 py-4 rounded-md font-medium hover:bg-c2air-accent hover:text-slate-900 hover:border-c2air-accent transition-all text-base md:text-lg"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>
      <section className="relative z-10 py-20 md:py-28 lg:py-32 bg-slate-900 border-t border-slate-800/50 border-b border-slate-800/50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/2 w-[500px] h-[500px] bg-c2air-accent/19 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 -left-20 w-[460px] h-[460px] bg-purple-500/17 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500/18 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-1/2 w-[420px] h-[420px] bg-indigo-500/14 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollAnimation direction="up">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">What We Do</h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                C2AIR builds a trusted ecosystem where Artificial Intelligence and Cybersecurity are learned, practiced, and advanced together.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <ScrollAnimation direction="up" delay={100}>
              <div className="group flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-c2air-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Learn by Building</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                  We deliver hands-on learning through workshops, guided labs, and real-world projects that help members move beyond theory into practical capability.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={200}>
              <div className="group flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-c2air-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.1-2.4l.547-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Advance Research & Practice</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                  We promote research-driven thinking through paper reading groups, applied research projects, and discussions focused on responsible and secure innovation.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={300}>
              <div className="group flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-c2air-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 .806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Run Challenges & Simulations</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                  We host hackathons, Capture The Flag (CTF) challenges, and AI/ML labs to develop real-world readiness in AI and cybersecurity.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={400}>
              <div className="group flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-c2air-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Promote Responsible Technology</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                  Our philosophy is that the foundation of any technology is built on trust, ethics and secure-by-design approach. Our mission is to inculcate this ideology all across our community and its peers.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={500}>
              <div className="group flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-c2air-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Build Community & Foster Mentorship</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                  We connect learners, mentors, industry experts and academia, enabling collaboration, knowledge sharing, and leadership growth within the community.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={600}>
              <div className="group flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-c2air-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Engage Institutions & Public Sector</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                  We work with educational/research institutions, PSUs and government bodies to support awareness, upskilling, and secure adoption of intelligent systems.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
      <section className="relative z-10 py-12 md:py-16 lg:py-20 bg-slate-950 border-b border-slate-800/50 overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollAnimation direction="up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-6 tracking-tight">Industry–Academia Collaboration</h2>
            <div className="max-w-6xl mx-auto">
              <p className="text-lg md:text-xl text-gray-300 mb-10 text-center leading-relaxed font-light">
                The gap between academic learning and industry needs is real. Our research community bridges this divide by
                creating structured pathways where academic foundations meet real-world application, ensuring learners
                develop capabilities that matter in practice.
              </p>
            </div>
          </ScrollAnimation>

          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <ScrollAnimation direction="up" delay={100}>
                <div className="group glass-card p-6 md:p-7">
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-c2air-accent transition-colors duration-300">Curriculum Alignment</h3>
                    <p className="text-gray-200 leading-relaxed text-base md:text-lg">
                      We work with academic institutions to align learning paths with industry requirements. This ensures
                      that theoretical knowledge connects directly to practical skills needed in AI and Cybersecurity roles.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="up" delay={200}>
                <div className="group glass-card p-6 md:p-7">
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-c2air-accent transition-colors duration-300">Industry-Guided Projects</h3>
                    <p className="text-gray-200 leading-relaxed text-base md:text-lg">
                      Real-world problems drive our project work. Industry practitioners contribute challenges, review solutions,
                      and provide feedback that reflects actual workplace expectations.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="up" delay={300}>
                <div className="group glass-card p-6 md:p-7">
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-c2air-accent transition-colors duration-300">Expert Engagement</h3>
                    <p className="text-gray-200 leading-relaxed text-base md:text-lg">
                      Regular sessions with industry experts and researchers expose learners to current practices, emerging
                      challenges, and responsible approaches to building and securing intelligent systems.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="up" delay={400}>
                <div className="group glass-card p-6 md:p-7">
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-c2air-accent transition-colors duration-300">Research Exposure</h3>
                    <p className="text-gray-200 leading-relaxed text-base md:text-lg">
                      Learners engage with cutting-edge research through paper reading groups and collaborative projects.
                      This exposure to academic rigor combined with practical application builds deeper understanding.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 py-20 md:py-28 lg:py-32 bg-slate-900 border-b border-slate-800/50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-30 right-1/4 w-[500px] h-[500px] bg-c2air-accent/19 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 -left-20 w-[460px] h-[460px] bg-purple-500/17 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500/18 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/2 w-[420px] h-[420px] bg-indigo-500/14 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollAnimation direction="up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-16 tracking-tight">Yearly Activity Plan</h2>
          </ScrollAnimation>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              { month: "January", activity: "C2AIR Community Launch", subtitle: "Community Launch · Offline" },
              { month: "February", activity: "AI Innovation Challenge", subtitle: "AI Ideathon" },
              { month: "March", activity: "Summer of Intelligence", subtitle: "Mathematics for AI" },
              { month: "April", activity: "AI for Young Minds", subtitle: "School Outreach Program" },
              { month: "May", activity: "Campus Connect", subtitle: "College Meetup · Kanpur" },
              { month: "June", activity: "Securing Public Systems", subtitle: "Government & Institutional Outreach" },
              { month: "July", activity: "Intelligence Month", subtitle: "AI Month Celebration" },
              { month: "August", activity: "Build From Anywhere", subtitle: "Online Workshop / Masterclass" },
              { month: "September", activity: "Secure AI Challenge", subtitle: "Hackathon + CTF" },
              { month: "October", activity: "Cyber Shield", subtitle: "Cybersecurity Month" },
              { month: "November", activity: "Winter of Hacks", subtitle: "CTF Festival" },
              { month: "December", activity: "Confluence 2026", subtitle: "Annual Community Fest" }
            ].map((item, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 50}>
                <div className="group text-center">
                  <h3 className="text-base md:text-lg font-medium mb-3 text-c2air-accent uppercase tracking-wide">{item.month}</h3>
                  <p className="text-white font-medium mb-2 text-lg md:text-xl">{item.activity}</p>
                  {item.subtitle && (
                    <p className="text-gray-400 text-sm md:text-base">{item.subtitle}</p>
                  )}
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
