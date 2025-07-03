const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET /api/search/suggestions?q=searchTerm
router.get('/', async (req, res) => {
  try {
    const q = req.query.q || '';
    if (!q || typeof q !== 'string' || q.length < 2) {
      return res.json({ suggestions: [] });
    }
    const suggestions = await prisma.provider.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { category: { contains: q, mode: 'insensitive' } },
          { address: { contains: q, mode: 'insensitive' } },
        ],
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        category: true,
        address: true,
      },
      take: 10,
    });
    res.json({ suggestions });
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

module.exports = router; 