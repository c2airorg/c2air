'use client'

import { useState } from 'react'
import ScrollAnimation from '@/components/ScrollAnimation'

interface Event {
  id: number
  title: string
  subtitle?: string
  month: string
  type: 'ai' | 'cybersecurity' | 'general'
  eventType: string
  description: string
  location: string
  tags: string[]
  focus?: string
  whoShouldAttend?: string
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEventType, setSelectedEventType] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTopic, setSelectedTopic] = useState<string>('all')

  const events: Event[] = [
    {
      id: 1,
      title: 'C2AIR Community Launch',
      month: 'JAN',
      type: 'general',
      eventType: 'Community Launch',
      description: 'C2AIR Community Launch marks the formal birth of the community. This launch event introduces our vision, mission, and roadmap, along with keynote talks on the future of AI and cybersecurity in India. Members meet the founding team, explore upcoming initiatives, and become part of the founding cohort shaping the community\'s culture and direction.',
      location: 'Kanpur, IN',
      tags: ['Community Building', 'Networking', 'Vision'],
      focus: 'Vision · Networking · Direction',
      whoShouldAttend: 'Students, educators, professionals, institutions'
    },
    {
      id: 2,
      title: 'AI Innovation Challenge',
      month: 'FEB',
      type: 'ai',
      eventType: 'Ideathon',
      description: 'AI Innovation Challenge is an AI-first Ideathon focused on problem-solving, reasoning, and intelligence design. Participants build machine learning or AI-driven solutions that simulate human decision-making, pattern recognition, or prediction—emphasizing logic, mathematics, and ethical thinking over tool dependency.',
      location: 'Kanpur, IN',
      tags: ['AI', 'Machine Learning', 'Hackathon', 'Problem Solving'],
      focus: 'AI fundamentals · Creativity · Team building',
      whoShouldAttend: 'College students, AI enthusiasts'
    },
    {
      id: 3,
      title: 'Summer of Intelligence',
      subtitle: 'Mathematics for AI',
      month: 'MAR',
      type: 'ai',
      eventType: 'Bootcamp',
      description: 'Summer of Intelligence is a focused learning initiative that strengthens the mathematical backbone of AI. Through guided sessions, problem-solving workshops, and intuitive explanations, participants build a deep understanding of linear algebra, probability, and optimization—the foundations that power real AI systems.',
      location: 'Online & Offline',
      tags: ['AI', 'Mathematics', 'Learning', 'Workshop'],
      focus: 'AI mathematics · Conceptual clarity',
      whoShouldAttend: 'School & college students, beginners in AI'
    },
    {
      id: 4,
      title: 'AI for Young Minds',
      month: 'APR',
      type: 'ai',
      eventType: 'Outreach Program',
      description: 'AI for Young Minds introduces school students to the ideas of intelligence, logic, and responsible technology. Through interactive sessions, demos, and simple projects, this program nurtures curiosity while promoting ethical awareness at an early stage.',
      location: 'Multiple Schools',
      tags: ['AI', 'Education', 'Outreach', 'Students'],
      focus: 'Awareness · Curiosity · Responsible tech',
      whoShouldAttend: 'School students & educators'
    },
    {
      id: 5,
      title: 'Campus Connect',
      month: 'MAY',
      type: 'general',
      eventType: 'College Meetup',
      description: 'Campus Connect brings the community to a new city, engaging directly with college students through talks, mini-workshops, and project showcases. The event bridges the gap between academic learning and industry expectations in AI and cybersecurity.',
      location: 'Kanpur, IN',
      tags: ['Networking', 'Community Building', 'Education'],
      focus: 'Student engagement · Networking',
      whoShouldAttend: 'College students, faculty, institutions'
    },
    {
      id: 6,
      title: 'Securing Public Systems',
      month: 'JUN',
      type: 'cybersecurity',
      eventType: 'Workshop',
      description: 'Securing Public Systems focuses on AI awareness, cybersecurity risks, and responsible deployment within government and public-sector environments. Sessions cover real-world risks, policy considerations, and practical safeguards for intelligent systems.',
      location: 'Government Offices, IN',
      tags: ['Cybersecurity', 'Government', 'Security', 'Policy'],
      focus: 'Governance · Awareness · Public impact',
      whoShouldAttend: 'Government officials, institutions, educators'
    },
    {
      id: 7,
      title: 'Intelligence Month',
      month: 'JUL',
      type: 'ai',
      eventType: 'Month Celebration',
      description: 'Intelligence Month is a month-long celebration of Artificial Intelligence featuring talks, workshops, research discussions, and community challenges. It highlights how AI is built, where it fails, and how it must be secured to create meaningful impact.',
      location: 'Multiple Locations',
      tags: ['AI', 'Community', 'Workshop', 'Research'],
      focus: 'AI innovation · Community learning',
      whoShouldAttend: 'All community members'
    },
    {
      id: 8,
      title: 'Build From Anywhere',
      month: 'AUG',
      type: 'general',
      eventType: 'Online Workshop',
      description: 'Build From Anywhere is a fully online, hands-on workshop where participants collaborate remotely to build and showcase AI or security projects. Designed for accessibility, this event ensures learning continues beyond physical boundaries.',
      location: 'Online',
      tags: ['Online', 'Workshop', 'Collaboration', 'Projects'],
      focus: 'Online collaboration · Skill building',
      whoShouldAttend: 'Remote learners, professionals, students'
    },
    {
      id: 9,
      title: 'Secure AI Challenge',
      month: 'SEP',
      type: 'cybersecurity',
      eventType: 'Hackathon + CTF',
      description: 'Secure AI Challenge is a hybrid cybersecurity event combining hackathons and Capture The Flag (CTF) competitions. Participants learn to secure AI systems, identify vulnerabilities in machine learning models, and implement robust security measures. The event focuses on defensive security practices, secure AI deployment, and protecting intelligent systems from threats.',
      location: 'Kanpur, IN',
      tags: ['Cybersecurity', 'CTF', 'Hackathon', 'Security', 'AI Security'],
      focus: 'AI Security · Defensive practices · Secure deployment',
      whoShouldAttend: 'Cybersecurity learners, developers, AI practitioners'
    },
    {
      id: 10,
      title: 'Cyber Shield',
      month: 'OCT',
      type: 'cybersecurity',
      eventType: 'Month Celebration',
      description: 'Cyber Shield is dedicated to strengthening cybersecurity awareness and skills. Throughout the month, the community hosts CTFs, workshops, incident analyses, and expert sessions focused on securing modern digital and AI-driven systems.',
      location: 'Multiple Locations',
      tags: ['Cybersecurity', 'CTF', 'Workshop', 'Security'],
      focus: 'Cyber resilience · Defense-first mindset',
      whoShouldAttend: 'Students, professionals, institutions'
    },
    {
      id: 11,
      title: 'Winter of Hacks',
      month: 'NOV',
      type: 'cybersecurity',
      eventType: 'CTF Festival',
      description: 'Winter of Hacks is an intensive cybersecurity festival featuring multiple CTF challenges, labs, and real-world security simulations. Participants sharpen their defensive skills while collaborating and competing in a high-energy environment.',
      location: 'Kanpur, IN',
      tags: ['Cybersecurity', 'CTF', 'Security', 'Competition'],
      focus: 'Hands-on security · Practical exposure',
      whoShouldAttend: 'Cybersecurity enthusiasts, teams'
    },
    {
      id: 12,
      title: 'Confluence 2026',
      month: 'DEC',
      type: 'general',
      eventType: 'Community Fest',
      description: 'Confluence is the community\'s flagship annual gathering. The event showcases top projects, celebrates contributors, hosts expert talks, and sets the vision for the year ahead. It is a celebration of learning, collaboration, and responsible innovation.',
      location: 'Kanpur, IN',
      tags: ['Community', 'Celebration', 'Networking', 'Showcase'],
      focus: 'Recognition · Reflection · Roadmap',
      whoShouldAttend: 'Entire community, partners, institutions'
    }
  ]

  const tagToTopicMap: { [key: string]: string } = {

    'AI': 'AI',
    'Machine Learning': 'AI',
    'AI Security': 'AI',

    'Cybersecurity': 'Cybersecurity',
    'Security': 'Cybersecurity',
    'CTF': 'Cybersecurity',

    'Community Building': 'Community',
    'Networking': 'Community',
    'Community': 'Community',
    'Celebration': 'Community',
    'Showcase': 'Community',

    'Education': 'Education',
    'Learning': 'Education',
    'Workshop': 'Education',
    'Outreach': 'Education',
    'Students': 'Education',

    'Hackathon': 'Hackathon',
    'Competition': 'Hackathon',
    'Problem Solving': 'Hackathon',

    'Research': 'Research',
    'Mathematics': 'Research',

    'Government': 'Governance & Policy',
    'Policy': 'Governance & Policy',

    'Vision': 'Community',
    'Online': 'Education',
    'Collaboration': 'Community',
    'Projects': 'Hackathon'
  }

  const getGeneralTopic = (tag: string): string => {
    return tagToTopicMap[tag] || tag
  }

  const allTopics = Array.from(new Set(
    events.flatMap(e => e.tags.map(getGeneralTopic))
  )).sort()

  const allCategories = Array.from(new Set(events.map(e => e.eventType)))

  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesEventType = selectedEventType === 'all' || event.type === selectedEventType

    const matchesCategory = selectedCategory === 'all' || event.eventType === selectedCategory

    const matchesTopic = selectedTopic === 'all' ||
      event.tags.some(tag => getGeneralTopic(tag) === selectedTopic)

    return matchesSearch && matchesEventType && matchesCategory && matchesTopic
  })

  const getEventTypeDisplay = (type: string) => {
    switch (type) {
      case 'ai': return 'AI'
      case 'cybersecurity': return 'Cybersecurity'
      case 'general': return 'General'
      default: return type.toUpperCase()
    }
  }

  const getEventLogo = (event: Event) => {
    const initials = event.title.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()
    return initials
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-24 md:pt-28 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[480px] h-[480px] bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-1/4 w-[480px] h-[480px] bg-purple-500/18 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/5 w-[520px] h-[520px] bg-blue-500/16 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-2/3 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollAnimation direction="up">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Events</h1>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
              Security in AI · AI for Security
            </p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation direction="up" delay={100}>
          <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a city or region"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-slate-800 border-2 border-slate-700 rounded-lg focus:border-c2air-accent focus:outline-none text-white placeholder-gray-400"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg focus:border-c2air-accent focus:outline-none appearance-none cursor-pointer text-white"
              >
                <option value="all">All</option>
                <option value="ai">AI</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="general">General</option>
              </select>
            </div>
            <div className="flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg focus:border-c2air-accent focus:outline-none appearance-none cursor-pointer text-white"
              >
                <option value="all">All</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg focus:border-c2air-accent focus:outline-none appearance-none cursor-pointer text-white"
              >
                <option value="all">All topics</option>
                {allTopics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
          </div>
          </div>
        </ScrollAnimation>
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <ScrollAnimation direction="up" delay={200}>
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No events found matching your search criteria.</p>
              </div>
            </ScrollAnimation>
          ) : (
            filteredEvents.map((event, index) => (
              <ScrollAnimation key={event.id} direction="up" delay={200 + (index * 50)}>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-5 md:p-6 hover:border-c2air-accent/50 hover:shadow-xl transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl ${event.type === 'ai' ? 'bg-c2air-accent' :
                      event.type === 'cybersecurity' ? 'bg-c2air-accent' :
                        'bg-c2air-accent-light'
                      }`}>
                      {getEventLogo(event)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-2">
                      <span className="font-semibold">{event.month} 2026</span>
                      <span className="mx-2">-</span>
                      <span className="uppercase">{getEventTypeDisplay(event.eventType)}</span>
                      <span className="mx-2">-</span>
                      <span>{event.location}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    {event.subtitle && (
                      <p className="text-base md:text-lg text-c2air-accent mb-2">{event.subtitle}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {event.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-900/60 text-gray-200 text-sm rounded-full border border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4">
                      {event.description}
                    </p>
                  </div>
                </div>
                </div>
              </ScrollAnimation>
            ))
          )}
        </div>
        <ScrollAnimation direction="up" delay={300}>
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-300 italic">
              "From curiosity to capability—our events are designed to help you build, secure, and lead the future of intelligent systems."
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}
