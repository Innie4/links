

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

type FeedbackType = 'general' | 'bug' | 'feature' | 'search_issue'

interface FeedbackSurveyProps {
  isOpen: boolean
  onClose: () => void
  context?: {
    searchQuery?: string
    pageUrl?: string
  }
}

export default function FeedbackSurvey({ isOpen, onClose, context = {} }: FeedbackSurveyProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('general')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: feedbackType,
          message,
          email: email || undefined,
          context: {
            ...context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
          },
        }),
      })

      if (!response.ok) throw new Error('Failed to submit feedback')
      
      setIsSuccess(true)
      setMessage('')
      setEmail('')
      
      // Close the dialog after 2 seconds
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div>
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {isSuccess ? 'Thank you!' : 'Share your feedback'}
              </Dialog.Title>
              
              {isSuccess ? (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Your feedback has been submitted. We appreciate your input!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      What type of feedback do you have?
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      {[
                        { value: 'general', label: 'General' },
                        { value: 'bug', label: 'Report a bug' },
                        { value: 'feature', label: 'Feature request' },
                        { value: 'search_issue', label: 'Search issue' },
                      ].map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFeedbackType(type.value as FeedbackType)}
                          className={`inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                            feedbackType === type.value
                              ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Your {feedbackType === 'bug' ? 'bug report' : 'feedback'}
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        rows={4}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={`Tell us about your ${feedbackType}...`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email (optional)
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Only if you'd like us to follow up with you.
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting || !message}
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit feedback'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
