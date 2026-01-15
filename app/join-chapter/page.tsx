'use client'

import { useState, useEffect, useRef } from 'react'
import ScrollAnimation from '@/components/ScrollAnimation'

interface Chapter {
  id: number
  name: string
  location: string
  city: string
  members: number
  lead: string
  coLead?: string
  status?: 'active' | 'starting-soon'
  formLink: string
  coordinates?: [number, number]
}

const chapters: Chapter[] = [
  {
    id: 1,
    name: 'CSJM University',
    location: 'Kanpur, UP',
    city: 'Kanpur',
    members: 100,
    status: 'active',
    formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfm3_B-vYDUTBQM1-B_YpmKYrHBD8oXqccjEkn4KNRUaSOzWw/viewform?usp=publish-editor',
    coordinates: [26.4499, 80.3319]
  },
  {
    id: 2,
    name: 'HBTU Kanpur',
    location: 'Kanpur, UP',
    city: 'Kanpur',
    members: 85,

    status: 'active',
    formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdGC9tHQBk6oqL84S49OsF6MU1cTiRFbBZS9f2xTYGxWZTo-w/viewform?usp=publish-editor',
    coordinates: [26.4569, 80.3319]
  },
  {
    id: 3,
    name: 'Thapar Institute of Engineering and Technology',
    location: 'Patiala, Punjab',
    city: 'Patiala',
    members: 85,
    status: 'active',
    formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeGwu0AVSfKQ8uJmzkzdbjE0uplxkrZ1Gpie0Kz9YUuHEanPA/viewform?usp=publish-editor',
    coordinates: [31.6339, 75.6721]
  }
]

export default function JoinChapterPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const chapterCardsRef = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const [mapLoaded, setMapLoaded] = useState(false)
  const [showIndiaView, setShowIndiaView] = useState(false)

  const scrollToChapter = (chapterId: number) => {
    const cardElement = chapterCardsRef.current[chapterId]
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      cardElement.classList.add('ring-2', 'ring-c2air-accent', 'ring-offset-2', 'ring-offset-slate-900')
      setTimeout(() => {
        cardElement.classList.remove('ring-2', 'ring-c2air-accent', 'ring-offset-2', 'ring-offset-slate-900')
      }, 2000)
    }
  }

  useEffect(() => {
    if (mapRef.current && !mapLoaded) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = () => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)

        const L = (window as any).L
        if (L && mapRef.current) {
          const map = L.map(mapRef.current).setView([26.5, 80.5], 8)
          mapInstanceRef.current = map

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
          }).addTo(map)

          chapters.forEach((chapter) => {
            if (chapter.coordinates) {
              const markerColor = chapter.status === 'active' ? '#00D9FF' : '#FFA500'
              const marker = L.circleMarker(chapter.coordinates, {
                radius: 12,
                fillColor: markerColor,
                color: '#fff',
                weight: 3,
                opacity: 1,
                fillOpacity: 0.9
              }).addTo(map)

              marker.on('mouseover', function () {
                this.setStyle({
                  radius: 16,
                  fillOpacity: 1
                })
              })

              marker.on('mouseout', function () {
                this.setStyle({
                  radius: 12,
                  fillOpacity: 0.9
                })
              })

              const chapterBrandName = `C2AIR ${chapter.name} Chapter`

              marker.bindTooltip(chapterBrandName, {
                permanent: false,
                direction: 'top',
                offset: [0, -10],
                className: 'custom-tooltip'
              })

              const statusBadge = chapter.status === 'active'
                ? '<span style="display: inline-block; background: #10b981; color: white; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 600; margin-left: 8px;">ACTIVE</span>'
                : '<span style="display: inline-block; background: #f59e0b; color: white; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 600; margin-left: 8px;">STARTING SOON</span>'

              const popupDiv = L.DomUtil.create('div', 'custom-popup-content')
              popupDiv.innerHTML = `
                <div style="color: #1e293b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; min-width: 200px; padding: 4px;">
                  <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">
                    <div style="font-size: 11px; color: #00D9FF; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; font-weight: 700;">C2AIR Chapter</div>
                    <strong style="font-size: 16px; color: #0f172a; display: block; margin-bottom: 4px;">${chapterBrandName}</strong>
                    ${statusBadge}
                  </div>
                  <div style="margin-bottom: 12px;">
                    <div style="font-size: 12px; color: #475569; margin-bottom: 4px;">
                      <strong>📍 Location:</strong> ${chapter.location}
                    </div>
                    <div style="font-size: 12px; color: #475569; margin-bottom: 4px;">
                      <strong>👥 Members:</strong> ${chapter.members}
                    </div>
                  </div>
                  <div style="display: flex; gap: 8px; margin-top: 12px;">
                    <button 
                      class="join-chapter-btn"
                      data-form-link="${chapter.formLink}"
                      style="flex: 1; background: #00D9FF; color: #0f172a; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 12px; cursor: pointer; transition: all 0.2s;"
                    >
                      Join Chapter
                    </button>
                    <button 
                      class="view-details-btn"
                      data-chapter-id="${chapter.id}"
                      style="flex: 1; background: #334155; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 12px; cursor: pointer; transition: all 0.2s;"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              `

              L.DomEvent.on(popupDiv, 'click', (e: any) => {
                L.DomEvent.stopPropagation(e)
              })

              const joinBtn = popupDiv.querySelector('.join-chapter-btn')
              const viewBtn = popupDiv.querySelector('.view-details-btn')

              if (joinBtn) {
                L.DomEvent.on(joinBtn, 'click', () => {
                  window.open(chapter.formLink, '_blank', 'noopener,noreferrer')
                })
                joinBtn.addEventListener('mouseenter', function (this: HTMLElement) {
                  this.style.background = '#00b8e6'
                  this.style.transform = 'scale(1.05)'
                })
                joinBtn.addEventListener('mouseleave', function (this: HTMLElement) {
                  this.style.background = '#00D9FF'
                  this.style.transform = 'scale(1)'
                })
              }

              if (viewBtn) {
                L.DomEvent.on(viewBtn, 'click', () => {
                  map.closePopup()
                  setTimeout(() => {
                    scrollToChapter(chapter.id)
                  }, 100)
                })
                viewBtn.addEventListener('mouseenter', function (this: HTMLElement) {
                  this.style.background = '#475569'
                  this.style.transform = 'scale(1.05)'
                })
                viewBtn.addEventListener('mouseleave', function (this: HTMLElement) {
                  this.style.background = '#334155'
                  this.style.transform = 'scale(1)'
                })
              }

              marker.bindPopup(popupDiv, {
                maxWidth: 250,
                className: 'custom-popup'
              })

              marker.on('click', () => {
                setTimeout(() => {
                  scrollToChapter(chapter.id)
                }, 300)
              })
            }
          })

            ; (window as any).scrollToChapter = scrollToChapter

          setMapLoaded(true)
        }
      }
      document.body.appendChild(script)

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
        delete (window as any).scrollToChapter
      }
    }
  }, [mapLoaded])

  const toggleIndiaView = () => {
    if (mapInstanceRef.current) {
      if (showIndiaView) {
        mapInstanceRef.current.setView([26.5, 80.5], 8, { animate: true, duration: 1.0 })
        setShowIndiaView(false)
      } else {
        mapInstanceRef.current.setView([20.5937, 78.9629], 5, { animate: true, duration: 1.0 })
        setShowIndiaView(true)
      }
    }
  }

  const handleJoinChapter = (formLink: string) => {
    window.open(formLink, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-24 md:pt-28 pb-12 relative overflow-hidden">
      {/* Background gradient shapes for glassmorphism effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-1/4 w-[480px] h-[480px] bg-blue-500/18 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/5 w-[520px] h-[520px] bg-purple-500/16 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/3 w-[450px] h-[450px] bg-purple-500/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-2/3 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollAnimation direction="up">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">Join a Chapter</h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              Connect with your local C2AIR chapter and become part of a community that's building
              the future of AI and Cybersecurity. Select your university or institution to get started.
            </p>
          </div>
        </ScrollAnimation>

        {/* Chapter Map */}
        <ScrollAnimation direction="up" delay={100}>
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Chapter Locations</h2>
              <button
                onClick={toggleIndiaView}
                disabled={!mapLoaded}
                className="flex items-center gap-2 bg-c2air-accent text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-c2air-accent-light transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base whitespace-nowrap"
              >
                {showIndiaView ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                    </svg>
                    View Chapters
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View India Map
                  </>
                )}
              </button>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden relative">
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 z-10">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-c2air-accent mb-4"></div>
                    <p className="text-gray-400">Loading map...</p>
                  </div>
                </div>
              )}
              <div ref={mapRef} className="w-full h-[500px] md:h-[600px] rounded-2xl" style={{ zIndex: 1 }} />
              <div className="p-4 bg-slate-900/80 border-t border-slate-700/50">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-c2air-accent"></div>
                    <span className="text-gray-300">Active Chapter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-gray-300">Starting Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={200}>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {chapters.map((chapter, index) => (
              <ScrollAnimation key={chapter.id} direction="up" delay={300 + index * 100}>
                <div
                  ref={(el) => { chapterCardsRef.current[chapter.id] = el }}
                  className="group relative glass-card p-6 overflow-hidden"
                >
                  {/* Gradient Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-c2air-accent via-c2air-accent-light to-c2air-accent"></div>

                  {/* Status Badge */}
                  {chapter.status === 'active' && (
                    <div className="absolute top-6 right-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                        Active
                      </span>
                    </div>
                  )}
                  {chapter.status === 'starting-soon' && (
                    <div className="absolute top-6 right-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-medium rounded-full">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                        Starting Soon
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    {/* University Name */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-c2air-accent transition-colors pr-24">
                      {chapter.name}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center text-gray-400 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{chapter.location}</span>
                    </div>
                  </div>

                  {/* Members Count */}
                  <div className="mb-6">
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 inline-block">
                      <div className="text-2xl font-bold text-white mb-1">{chapter.members}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">Members</div>
                    </div>
                  </div>

                  {/* Join Button */}
                  <button
                    onClick={() => handleJoinChapter(chapter.formLink)}
                    className="w-full bg-c2air-accent text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-c2air-accent-light hover:shadow-lg hover:shadow-c2air-accent/20 transition-all"
                  >
                    Join Chapter
                  </button>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>

        {/* Additional Information */}
        <ScrollAnimation direction="up" delay={400}>
          <div className="glass-card p-8 md:p-10">
            <ScrollAnimation direction="up" delay={500}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">Why Join a Chapter?</h2>
            </ScrollAnimation>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollAnimation direction="up" delay={600}>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-c2air-accent/20 rounded-lg flex items-center justify-center">
                      <span className="text-c2air-accent font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Local Community</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed ml-11">
                    Connect with peers and mentors in your area for regular meetups and collaboration.
                  </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={700}>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-c2air-accent/20 rounded-lg flex items-center justify-center">
                      <span className="text-c2air-accent font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Hands-On Learning</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed ml-11">
                    Participate in workshops, hackathons, and CTF challenges organized by your chapter.
                  </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={800}>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-c2air-accent/20 rounded-lg flex items-center justify-center">
                      <span className="text-c2air-accent font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Career Growth</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed ml-11">
                    Access to industry connections, internships, and job opportunities through the community.
                  </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={900}>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-c2air-accent/20 rounded-lg flex items-center justify-center">
                      <span className="text-c2air-accent font-bold">4</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Leadership Opportunities</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed ml-11">
                    Take on leadership roles, organize events, and mentor others in your chapter.
                  </p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </ScrollAnimation>

        {/* Don't See Your University? */}
        <ScrollAnimation direction="up" delay={1000}>
          <div className="mt-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Don't see a chapter in your proximity?</h2>
            <p className="text-gray-400 mb-6 text-lg">
              We're always expanding! Contact us to start a new chapter at your institution.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe0Kje1Ono1N-9Jwgx3iB5iWoVcSnf_pbk-jE0KgFDNWAqDRA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-c2air-accent text-slate-900 px-8 py-4 rounded-md font-medium hover:bg-c2air-accent-light transition-colors"
            >
              Contact Us
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}
