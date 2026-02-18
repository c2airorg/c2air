'use client'

import { useState } from 'react'
import ScrollAnimation from '@/components/ScrollAnimation'

interface Resource {
  id: number
  title: string
  category: 'ai' | 'cybersecurity' | 'both'
  type: 'pdf' | 'video' | 'article' | 'course'
  description: string
  downloadLink: string
  size?: string
}

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'cybersecurity' | 'both'>('all')
  const [selectedType, setSelectedType] = useState<'all' | 'pdf' | 'video' | 'article' | 'course'>('all')

  const resources: Resource[] = [
    {
      id: 1,
      title: '100 AI Projects for 2026',
      category: 'ai',
      type: 'pdf',
      description: 'A comprehensive collection of 100 AI project ideas to help you build practical skills and enhance your portfolio.',
      downloadLink: '/resources/pdf/100 AI Projects for 2026.pdf',
      size: 'PDF'
    },
    {
      id: 2,
      title: '100+ AI Prompts to Transform Your Work',
      category: 'ai',
      type: 'pdf',
      description: 'Curated collection of powerful AI prompts designed to boost productivity and transform your workflow.',
      downloadLink: '/resources/pdf/100+AI prompts to transform your work.pdf',
      size: 'PDF'
    },
    {
      id: 3,
      title: 'First Responder Shell Cheatsheet',
      category: 'cybersecurity',
      type: 'pdf',
      description: 'Essential shell commands and quick reference guide for cybersecurity professionals and incident responders.',
      downloadLink: '/resources/pdf/First Responder Shell Cheatsheet .pdf',
      size: 'PDF'
    },
    {
      id: 4,
      title: 'Python AI ML Essentials 2026',
      category: 'ai',
      type: 'pdf',
      description: 'Complete guide to Python essentials for AI and Machine Learning, covering the latest tools and best practices for 2026.',
      downloadLink: '/resources/pdf/Python AI ML Essentials 2026.pdf',
      size: 'PDF'
    }
  ]

  const filteredResources = resources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory || resource.category === 'both'
    const typeMatch = selectedType === 'all' || resource.type === selectedType
    return categoryMatch && typeMatch
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return '📄'
      case 'video':
        return '🎥'
      case 'article':
        return '📝'
      case 'course':
        return '📚'
      default:
        return '📦'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai':
        return 'border-c2air-accent bg-slate-800/50'
      case 'cybersecurity':
        return 'border-c2air-accent-light bg-slate-800/50'
      case 'both':
        return 'border-c2air-accent bg-slate-800/50'
      default:
        return 'border-slate-700 bg-slate-800'
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-24 md:pt-28 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/19 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-[480px] h-[480px] bg-purple-500/18 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-[480px] h-[480px] bg-purple-500/17 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-[420px] h-[420px] bg-indigo-500/15 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollAnimation direction="up">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Resources</h1>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              Explore learning materials, guides, and resources to enhance your AI and Cybersecurity skills
            </p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation direction="up" delay={100}>
          <div className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Filter by Category</label>
            <div className="flex flex-wrap gap-3">
              {(['all', 'ai', 'cybersecurity', 'both'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${selectedCategory === category
                    ? category === 'ai' ? 'bg-c2air-accent text-slate-900' :
                      category === 'cybersecurity' ? 'bg-c2air-accent-light text-slate-900' :
                        category === 'both' ? 'bg-c2air-accent text-slate-900' :
                          'bg-slate-700 text-white'
                    : 'bg-slate-800 text-gray-300 border-2 border-slate-700 hover:bg-slate-700'
                    }`}
                >
                  {category === 'all' ? 'All Categories' :
                    category === 'ai' ? 'AI' :
                      category === 'cybersecurity' ? 'Cybersecurity' :
                        'Both'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Filter by Type</label>
            <div className="flex flex-wrap gap-3">
              {(['all', 'pdf', 'video', 'article', 'course'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${selectedType === type
                    ? 'bg-c2air-accent text-slate-900'
                    : 'bg-slate-800 text-gray-300 border-2 border-slate-700 hover:bg-slate-700'
                    }`}
                >
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          </div>
        </ScrollAnimation>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length === 0 ? (
            <ScrollAnimation direction="up" delay={200}>
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">No resources found matching your filters.</p>
              </div>
            </ScrollAnimation>
          ) : (
            filteredResources.map((resource, index) => (
              <ScrollAnimation key={resource.id} direction="up" delay={200 + (index * 50)}>
                <div className={`bg-slate-800/50 backdrop-blur-sm p-5 md:p-6 rounded-xl shadow-lg border-l-4 ${getCategoryColor(resource.category)} hover:shadow-xl transition-all h-full flex flex-col`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{getTypeIcon(resource.type)}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{resource.title}</h3>
                        <div className="flex gap-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${resource.category === 'ai' ? 'bg-c2air-accent text-slate-900' :
                            resource.category === 'cybersecurity' ? 'bg-c2air-accent-light text-slate-900' :
                              'bg-c2air-accent text-slate-900'
                            }`}>
                            {resource.category === 'ai' ? 'AI' :
                              resource.category === 'cybersecurity' ? 'Cybersecurity' :
                                'Both'}
                          </span>
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-slate-700 text-gray-300">
                            {resource.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4 flex-grow">{resource.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    {resource.size && (
                      <span className="text-xs text-gray-400">{resource.size}</span>
                    )}
                    <a
                      href={`/view-pdf?url=${encodeURIComponent(resource.downloadLink)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-c2air-accent text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-c2air-accent-light transition-colors inline-flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View PDF
                    </a>
                  </div>
                </div>
              </ScrollAnimation>
            ))
          )}
        </div>
        <ScrollAnimation direction="up" delay={300}>
          <div className="mt-12 bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Resource Guidelines</h2>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-start">
              <span className="text-c2air-accent mr-2">•</span>
              <span>All resources are free to view and use for educational purposes.</span>
            </p>
            <p className="flex items-start">
              <span className="text-c2air-accent-light mr-2">•</span>
              <span>Resources are regularly updated with the latest information and best practices.</span>
            </p>
            <p className="flex items-start">
              <span className="text-c2air-accent mr-2">•</span>
              <span>If you have suggestions for new resources, please contact us.</span>
            </p>
            <p className="flex items-start">
              <span className="text-c2air-accent-light mr-2">•</span>
              <span>Some resources may require community membership for access.</span>
            </p>
          </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}

