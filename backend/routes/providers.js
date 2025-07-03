const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();

// POST /api/providers (search providers)
router.post('/', async (req, res) => {
  try {
    const bodySchema = z.object({
      query: z.string().optional(),
      category: z.string().optional(),
      priceRange: z.object({
        min: z.number(),
        max: z.number(),
      }).optional(),
      location: z.string().optional(),
    });

    const { query, category, priceRange, location } = bodySchema.parse(req.body);

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
    });

    // Filter by price range in JS if needed
    const filteredProviders = priceRange
      ? providers.filter((provider) =>
          Array.isArray(provider.prices) && provider.prices.some((price) => {
            const num = Number(price);
            return !isNaN(num) && num >= priceRange.min && num <= priceRange.max;
          })
        )
      : providers;

    res.json({ providers: filteredProviders });
  } catch (error) {
    console.error('Error in providers POST:', error);
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
});

// GET /api/providers/:id (get provider by ID)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await prisma.provider.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    res.json(provider);
  } catch (error) {
    console.error('Error in providers GET:', error);
    res.status(500).json({ error: 'Failed to fetch provider' });
  }
});

module.exports = router; 