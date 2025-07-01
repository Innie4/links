import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  {
    name: 'Food & Dining',
    description: 'Restaurants, cafes, and food delivery services',
    icon: '🍽️',
    subcategories: ['Restaurants', 'Cafes', 'Bakeries', 'Food Delivery'],
  },
  {
    name: 'Housing',
    description: 'Real estate and housing services',
    icon: '🏠',
    subcategories: ['Rentals', 'Real Estate', 'Home Services'],
  },
  {
    name: 'Stationery',
    description: 'School and office supplies',
    icon: '📝',
    subcategories: ['School Supplies', 'Office Supplies', 'Printing'],
  },
  {
    name: 'Fashion',
    description: 'Clothing and accessories',
    icon: '🛍️',
    subcategories: ['Clothing', 'Accessories', 'Shoes'],
  },
  {
    name: 'Tech Repair',
    description: 'Mobile and computer repair services',
    icon: '🔧',
    subcategories: ['Mobile Repair', 'Computer Repair', 'Electronics'],
  },
]

const providers = [
  {
    name: "John's Restaurant",
    description: "Local restaurant serving Nigerian cuisine",
    categoryId: "food",
    subcategory: "Restaurants",
    phone: "+234 801 234 5678",
    whatsapp: "+234 801 234 5678",
    email: "info@johnsrestaurant.com",
    address: "123 Main Street, Anyigba",
    operatingHours: "8:00 AM - 10:00 PM",
    photos: [
      "https://example.com/restaurant1.jpg",
      "https://example.com/restaurant2.jpg",
    ],
    services: ["Food Delivery", "Dine In", "Takeaway"],
    prices: ["1000-2000", "2000-3000"],
  },
  {
    name: "TechFix Hub",
    description: "Professional mobile and computer repair services",
    categoryId: "tech-repair",
    subcategory: "Mobile Repair",
    phone: "+234 802 345 6789",
    whatsapp: "+234 802 345 6789",
    email: "support@techfixhub.com",
    address: "456 Tech Street, Anyigba",
    operatingHours: "9:00 AM - 6:00 PM",
    photos: [
      "https://example.com/techfix1.jpg",
      "https://example.com/techfix2.jpg",
    ],
    services: ["Mobile Repair", "Computer Repair", "Data Recovery"],
    prices: ["500-1000", "1000-2000"],
  },
  // Add more providers as needed
]

async function main() {
  // Create categories
  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name,
        description: category.description,
        icon: category.icon,
      },
    })
  }

  // Create providers
  for (const provider of providers) {
    await prisma.provider.create({
      data: {
        name: provider.name,
        description: provider.description,
        categoryId: provider.categoryId,
        subcategory: provider.subcategory,
        phone: provider.phone,
        whatsapp: provider.whatsapp,
        email: provider.email,
        address: provider.address,
        operatingHours: provider.operatingHours,
        photos: provider.photos,
        services: provider.services,
        prices: provider.prices,
        isActive: true,
        ratingAverage: 4.5,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
