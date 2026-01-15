'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function PDFViewerContent() {
    const searchParams = useSearchParams()
    const fileUrl = searchParams.get('url')

    if (!fileUrl) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-lg mb-4">No file URL provided</p>
                    <a href="/resources" className="text-c2air-accent hover:underline">
                        Go back to Resources
                    </a>
                </div>
            </div>
        )
    }

    const isPdf = fileUrl.toLowerCase().endsWith('.pdf')
    const isDocx = fileUrl.toLowerCase().endsWith('.docx')

    let viewerUrl = fileUrl

    if (typeof window !== 'undefined') {
        const fullUrl = window.location.origin + fileUrl

        if (isDocx) {
            viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fullUrl)}`
        } else {
            viewerUrl = fullUrl
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-4">
                    <a
                        href="/resources"
                        className="inline-flex items-center gap-2 text-c2air-accent hover:text-c2air-accent-light transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Resources
                    </a>
                </div>
                <div className="bg-white rounded-lg shadow-xl overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
                    <iframe
                        src={viewerUrl}
                        className="w-full h-full border-0"
                        title="Document Viewer"
                    />
                </div>
            </div>
        </div>
    )
}

export default function PDFViewerPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-c2air-accent mb-4"></div>
                    <p className="text-white">Loading PDF viewer...</p>
                </div>
            </div>
        }>
            <PDFViewerContent />
        </Suspense>
    )
}

