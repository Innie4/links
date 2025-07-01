import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json({ suggestions: [] })
    }

    // Search providers
    const providers = await prisma.provider.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { services: { has: query } },
        ],
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        category: {
          select: {
            name: true,
          },
        },
        address: true,
      },
      take: 5,
    })

    // Search categories
    const categories = await prisma.category.findMany({
      where: {
        name: { contains: query, mode: 'insensitive' },
      },
      select: {
        id: true,
        name: true,
      },
      take: 5,
    })

    // Combine and format suggestions
    const suggestions = [
      ...providers.map((provider: any) => ({
        id: provider.id,
        name: provider.name,
        category: provider.category.name,
        address: provider.address,
        type: 'provider',
      })),
      ...categories.map((category: any) => ({
        id: category.id,
        name: category.name,
        type: 'category',
      })),
    ]

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Error in search suggestions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    )
  }
}
