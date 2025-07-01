-- Create Categories table
CREATE TABLE "Category" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "icon" TEXT,
  "parentId" TEXT,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Category_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Category_name_key" UNIQUE ("name"),
  CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Create Providers table
CREATE TABLE "Provider" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "categoryId" TEXT NOT NULL,
  "subcategory" TEXT,
  "phone" TEXT,
  "whatsapp" TEXT,
  "email" TEXT,
  "address" TEXT NOT NULL,
  "operatingHours" TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "isActive" BOOLEAN DEFAULT true,
  "isFeatured" BOOLEAN DEFAULT false,
  "ratingAverage" REAL DEFAULT 0,
  "photos" TEXT[],
  "services" TEXT[],
  "prices" TEXT[],
  CONSTRAINT "Provider_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Provider_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create SearchLogs table
CREATE TABLE "SearchLog" (
  "id" TEXT NOT NULL,
  "query" TEXT NOT NULL,
  "resultsCount" INTEGER NOT NULL,
  "userIp" TEXT,
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "userAgent" TEXT,
  "successStatus" BOOLEAN NOT NULL,
  CONSTRAINT "SearchLog_pkey" PRIMARY KEY ("id")
);

-- Create FailedSearches table
CREATE TABLE "FailedSearch" (
  "id" TEXT NOT NULL,
  "query" TEXT NOT NULL,
  "userIp" TEXT,
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "feedbackProvided" BOOLEAN DEFAULT false,
  CONSTRAINT "FailedSearch_pkey" PRIMARY KEY ("id")
);

-- Create UserFeedback table
CREATE TABLE "UserFeedback" (
  "id" TEXT NOT NULL,
  "searchQuery" TEXT,
  "feedbackText" TEXT NOT NULL,
  "contactInfo" TEXT,
  "status" TEXT DEFAULT 'pending',
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UserFeedback_pkey" PRIMARY KEY ("id")
);

-- Create indexes for better query performance
CREATE INDEX "idx_provider_category" ON "Provider" ("categoryId");
CREATE INDEX "idx_provider_search" ON "Provider" ("name", "description", "services");
CREATE INDEX "idx_search_log_query" ON "SearchLog" ("query");
CREATE INDEX "idx_failed_search_query" ON "FailedSearch" ("query");
CREATE INDEX "idx_user_feedback_status" ON "UserFeedback" ("status");
