import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

type FeedbackType = 'general' | 'bug' | 'feature' | 'search_issue'

export async function POST(request: Request) {
  try {
    const bodySchema = z.object({
      type: z.enum(['general', 'bug', 'feature', 'search_issue']).default('general'),
      message: z.string().min(10, 'Feedback must be at least 10 characters'),
      email: z.string().email('Invalid email address').optional().or(z.literal('')),
      context: z.object({
        searchQuery: z.string().optional(),
        pageUrl: z.string().optional(),
        pathname: z.string().optional(),
        searchParams: z.record(z.string()).optional(),
        userAgent: z.string().optional(),
        screenResolution: z.string().optional(),
        timestamp: z.string().optional(),
      }).optional(),
      // Legacy fields (for backward compatibility)
      searchQuery: z.string().optional(),
      providerId: z.string().optional(),
      feedback: z.string().optional(),
      contactInfo: z.string().optional(),
    })

    const data = bodySchema.parse(await request.json())

    // Handle both new and legacy field structures
    const feedbackData = {
      type: data.type,
      searchQuery: data.searchQuery ?? '',
      providerId: data.providerId ?? '',
      feedbackText: data.message || data.feedback || '',
      contactInfo: data.email || data.contactInfo || '',
      status: 'pending' as const,
      timestamp: new Date(data.context?.timestamp || new Date()),
      metadata: {
        ...data.context,
        // Don't store sensitive information
        userAgent: data.context?.userAgent ? 'provided' : undefined,
      },
    }

    const newFeedback = await prisma.userFeedback.create({
      data: feedbackData,
    })

    return NextResponse.json({ feedback: newFeedback })
  } catch (error) {
    console.error('Error in feedback POST:', error)
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const feedback = await prisma.userFeedback.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    })

    return NextResponse.json({ feedback })
  } catch (error) {
    console.error('Error in feedback GET:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}
