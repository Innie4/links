import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const stats = await Promise.all([
      prisma.provider.count({ where: { isActive: true } }),
      prisma.provider.count({ where: { isActive: true } }),
      prisma.provider.count({ where: { isActive: false } }),
      prisma.searchLog.count(),
      prisma.failedSearch.count(),
      prisma.userFeedback.count(),
      prisma.provider.count({
        where: {
          createdAt: {
            gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
      }),
    ])

    return NextResponse.json({
      stats: {
        totalProviders: stats[0],
        activeProviders: stats[1],
        pendingProviders: stats[2],
        totalSearches: stats[3],
        failedSearches: stats[4],
        userFeedback: stats[5],
        newProviders: stats[6],
      },
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    )
  }
}
