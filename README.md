# Links Local Search Platform

A local search and discovery platform for providers in Anyigba.

## Features

- Advanced search with autocomplete and suggestions
- Category-based browsing
- Filter options (price range, location, ratings, availability)
- Geolocation-based results showing nearest providers
- Detailed provider profiles with:
  - Business name and description
  - Contact information (phone, WhatsApp, email)
  - Physical address/location
  - Operating hours
  - Services/products offered
  - Pricing information
  - Photos/gallery
  - One-click phone number copying to clipboard
  - WhatsApp direct messaging integration
  - Google Maps integration for directions
- User Experience Features:
  - Responsive design for mobile and desktop
  - Fast loading with optimized images
  - Offline capability for recently viewed listings
  - Dark/Light mode toggle
  - Multi-language support (English, local languages)
- Feedback & Analytics System:
  - Failed search tracking with automatic logging
  - User feedback forms for unmet needs
  - Search analytics dashboard for admin
  - Popular search terms tracking
  - User behavior analytics
- Admin Dashboard:
  - Provider management (add, edit, delete listings)
  - Database updates and bulk imports
  - Search analytics and failed request monitoring
  - User feedback management
  - Content moderation tools
- Additional Features:
  - Rating and review system
  - Favorites/Bookmarks for users
  - Recently viewed providers
  - Social sharing of provider listings
  - Promotional banners for featured providers
  - Newsletter signup for updates

## Tech Stack

- Frontend:
  - React.js with Next.js 14
  - Tailwind CSS for rapid UI development
  - Zustand for state management
  - Headless UI for UI components
  - React Hook Form for form handling
- Backend:
  - Node.js with Express.js
  - Prisma ORM for database operations
  - JWT for authentication
- Database:
  - PostgreSQL
  - Elasticsearch (optional) for advanced search features
- Additional Services:
  - Cloudinary: Image storage and optimization
  - SendGrid/Mailgun: Email notifications
  - Google Maps API: Location services
  - Google Analytics + Mixpanel: User behavior tracking

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory with:
```
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/links_search"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Google Maps API Key
NEXT_PUBLIC_MAPS_API_KEY="your_google_maps_api_key"

# Email Configuration (for feedback)
NEXT_PUBLIC_EMAIL_PROVIDER="sendgrid"
NEXT_PUBLIC_EMAIL_API_KEY="your_email_api_key"

# JWT Configuration
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# Analytics Configuration
NEXT_PUBLIC_ANALYTICS_ID="your_analytics_id"

# Rate Limiting
NEXT_PUBLIC_RATE_LIMIT_WINDOW="15"
NEXT_PUBLIC_RATE_LIMIT_MAX_REQUESTS="100"
```

3. Generate Prisma client:
```bash
npx prisma generate
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Seed the database with initial data:
```bash
npx prisma db seed
```

6. Start the development server:
```bash
npm run dev
```

## Project Structure

```
├── src/
│   ├── app/         # Next.js app directory
│   │   ├── api/     # API routes
│   │   ├── admin/   # Admin dashboard pages
│   │   └── provider/ # Provider profile pages
│   ├── components/   # Reusable React components
│   │   ├── feedback/ # Feedback components
│   │   ├── search/   # Search components
│   │   └── ui/       # UI primitives
│   ├── lib/         # Utility functions and configurations
│   │   ├── api/     # API utilities
│   │   └── utils/   # Helper functions
│   ├── styles/      # Global styles
│   └── types/       # TypeScript types
├── prisma/          # Database schema and migrations
│   ├── migrations/  # Database migrations
│   └── seed.ts      # Database seed data
└── public/         # Static assets
    ├── images/     # Static images
    └── icons/      # App icons
```

## Development

### Local Development

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

Run tests with:
```bash
npm run test
```

### Linting

Run linting with:
```bash
npm run lint
```

## Deployment

The project is configured for deployment on Vercel. To deploy:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy using Vercel's deployment pipeline

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

Please make sure to update tests as appropriate.

## License

MIT

## Support

For support, please contact support@links-local.com or create an issue in the GitHub repository.
