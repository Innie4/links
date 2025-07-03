const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();

// POST /api/feedback
router.post('/', async (req, res) => {
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
      searchQuery: z.string().optional(),
      providerId: z.string().optional(),
      feedback: z.string().optional(),
      contactInfo: z.string().optional(),
    });

    const data = bodySchema.parse(req.body);

    const feedbackData = {
      type: data.type,
      searchQuery: data.searchQuery ?? '',
      providerId: data.providerId ?? '',
      feedbackText: data.message || data.feedback || '',
      contactInfo: data.email || data.contactInfo || '',
      status: 'pending',
      timestamp: new Date(data.context?.timestamp || new Date()),
      metadata: {
        ...data.context,
        userAgent: data.context?.userAgent ? 'provided' : undefined,
      },
    };

    const newFeedback = await prisma.userFeedback.create({
      data: feedbackData,
    });

    res.json({ feedback: newFeedback });
  } catch (error) {
    console.error('Error in feedback POST:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// GET /api/feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await prisma.userFeedback.findMany({
      orderBy: { timestamp: 'desc' },
    });
    res.json({ feedback });
  } catch (error) {
    console.error('Error in feedback GET:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

module.exports = router; 