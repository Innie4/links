import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Search providers
export async function POST(request: Request) {
  try {
    const bodySchema = z.object({
      query: z.string().optional(),
      category: z.string().optional(),
      priceRange: z.object({
        min: z.number(),
        max: z.number(),
      }).optional(),
      location: z.string().optional(),
    })

    const { query, category, priceRange, location } = bodySchema.parse(
      await request.json()
    )

    const providers = await prisma.provider.findMany({
      where: {
        AND: [
          query ? {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { services: { has: query } },
            ],
          } : {},
          category ? { category: { id: category } } : {},
          location ? {
            address: { contains: location, mode: 'insensitive' },
          } : {},
          { isActive: true },
        ],
      },
      include: {
        category: true,
      },
      orderBy: {
        ratingAverage: 'desc',
      },
    })

    // Filter by price range in JS if needed
    const filteredProviders = priceRange
      ? providers.filter((provider) =>
          Array.isArray(provider.prices) && provider.prices.some((price) => {
            const num = Number(price)
            return !isNaN(num) && num >= priceRange.min && num <= priceRange.max
          })
        )
      : providers

    return NextResponse.json({ providers: filteredProviders })
  } catch (error) {
    console.error('Error in providers POST:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
}

// Get provider by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const provider = await prisma.provider.findUnique({
      where: { id: params.id },
      include: {
        category: true,
      },
    })

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(provider)
  } catch (error) {
    console.error('Error in providers GET:', error)
    return NextResponse.json(
      { error: 'Failed to fetch provider' },
      { status: 500 }
    )
  }
}
