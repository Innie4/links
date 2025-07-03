import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTheme } from './theme-provider'

interface FeedbackFormProps {
  searchQuery?: string
  providerId?: string
}

export function FeedbackForm({ searchQuery, providerId }: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchQuery: searchQuery || '',
      providerId: providerId || '',
      feedback: '',
      contactInfo: '',
    },
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit feedback')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="p-6 bg-green-50 dark:bg-green-900 rounded-lg">
        <h3 className="text-green-700 dark:text-green-200 font-medium">
          Thank you for your feedback!
        </h3>
        <p className="text-green-600 dark:text-green-300 mt-2">
          We appreciate your input and will use it to improve our service.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Your Feedback
          </label>
          <textarea
            {...register('feedback', { required: 'Feedback is required' })}
            id="feedback"
            rows={4}
            className={`
              mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700
              shadow-sm focus:border-primary-500 dark:focus:border-primary-400
              focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm
              ${errors.feedback ? 'border-red-500' : ''}
            `}
            placeholder="Please share your thoughts..."
          />
          {errors.feedback && (
            <p className="mt-1 text-sm text-red-600">
              {errors.feedback.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contactInfo"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Contact Information (optional)
          </label>
          <input
            {...register('contactInfo')}
            type="text"
            id="contactInfo"
            className={`
              mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700
              shadow-sm focus:border-primary-500 dark:focus:border-primary-400
              focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm
            `}
            placeholder="Email or phone number"
          />
        </div>

        {searchQuery && (
          <input
            {...register('searchQuery')}
            type="hidden"
            value={searchQuery}
          />
        )}

        {providerId && (
          <input
            {...register('providerId')}
            type="hidden"
            value={providerId}
          />
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full flex justify-center py-2 px-4 border border-transparent
            rounded-md shadow-sm text-sm font-medium text-white
            bg-primary-600 hover:bg-primary-700 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}
    </form>
  )
}
