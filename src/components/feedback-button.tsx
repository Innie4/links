'use client'

import { useState } from 'react'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import FeedbackSurvey from './feedback-survey'

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [context, setContext] = useState({})

  const openFeedback = (type: 'general' | 'bug' | 'feature' | 'search_issue' = 'general') => {
    // Capture current page context
    const currentContext = {
      pageUrl: window.location.href,
      pathname: window.location.pathname,
      searchParams: Object.fromEntries(new URLSearchParams(window.location.search)),
      timestamp: new Date().toISOString(),
      type,
    }
    
    setContext(currentContext)
    setIsOpen(true)
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => openFeedback('general')}
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 p-3 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform hover:scale-110"
            aria-label="Provide feedback"
            title="Share your feedback"
          >
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
          </button>
          
          {/* Quick feedback options that appear on hover */}
          <div className="space-y-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => openFeedback('bug')}
              className="inline-flex items-center rounded-full bg-red-500 px-3 py-2 text-xs font-medium text-white shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-transform hover:scale-105"
              title="Report a bug"
            >
              🐞 Bug
            </button>
            <button
              onClick={() => openFeedback('feature')}
              className="inline-flex items-center rounded-full bg-green-500 px-3 py-2 text-xs font-medium text-white shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-transform hover:scale-105"
              title="Request a feature"
            >
              ✨ Feature
            </button>
          </div>
        </div>
      </div>

      <FeedbackSurvey 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        context={context}
      />
    </>
  )
}
