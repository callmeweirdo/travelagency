# Phase 1: Foundation & Setup (Weeks 1-2)

**Objective:** Establish project foundation with all core technologies configured  
**Duration:** 2 Weeks  
**Status:** 🔴 Not Started

---

## Week 1: Environment & Configuration

### Day 1-2: Project Initialization

#### Tasks
- [ ] Create project folder structure
- [ ] Initialize Next.js 15 project with TypeScript
  ```bash
  npx shadcn@latest init --yes --template next --base-color slate
  ```
- [ ] Configure project metadata (name, description, author)
- [ ] Initialize Git repository
- [ ] Create `.gitignore` with Next.js + Node patterns
- [ ] Create initial `README.md` with setup instructions

#### Deliverables
- Repository initialized
- Next.js project running locally
- Basic folder structure in place

#### Acceptance Criteria
- [ ] `npm run dev` starts without errors
- [ ] Project accessible at `localhost:3000`
- [ ] Git repository initialized with initial commit

---

### Day 3-4: Tailwind & shadcn/ui Setup

#### Tasks
- [ ] Configure Tailwind CSS theme
  - Primary colors (Nigerian green theme)
  - Custom fonts (Inter + local)
  - Spacing and breakpoints
- [ ] Install shadcn/ui CLI and configure
- [ ] Install base components:
  ```bash
  npx shadcn add button card dialog dropdown-menu form input label select
  ```
- [ ] Create custom theme tokens
- [ ] Set up Tailwind plugins (forms, typography, line-clamp)

#### Deliverables
- Custom Tailwind theme configured
- Base UI components installed and working

#### Acceptance Criteria
- [ ] Custom colors applied correctly
- [ ] Components render without errors
- [ ] Theme is consistent across components

---

### Day 5-7: Development Tools Setup

#### Tasks
- [ ] Configure ESLint with Next.js + TypeScript rules
- [ ] Configure Prettier with Tailwind plugin
- [ ] Set up Husky pre-commit hooks
- [ ] Configure lint-staged
- [ ] Add commitlint with conventional commits
- [ ] Set up VS Code settings and extensions
- [ ] Configure import sorting

#### Deliverables
- Linting and formatting configured
- Git hooks active
- Development environment standardized

#### Acceptance Criteria
- [ ] ESLint passes without errors
- [ ] Prettier formats on save
- [ ] Pre-commit hooks run successfully
- [ ] Commits follow conventional format

---

## Week 2: Database & CMS Setup

### Day 8-9: Database Configuration

#### Tasks
- [ ] Set up PostgreSQL database (local or cloud)
- [ ] Install Prisma CLI and client
  ```bash
  npm install prisma @prisma/client
  npx prisma init
  ```
- [ ] Create initial schema.prisma with core models
- [ ] Set up database connection
- [ ] Configure environment variables for database
- [ ] Run initial migration
  ```bash
  npx prisma migrate dev --name init
  ```
- [ ] Test database connection

#### Database Schema (Initial)

```prisma
// User model
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  firstName     String
  lastName      String
  phone         String?
  role          Role      @default(USER)
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  bookings      Booking[]
}

enum Role {
  USER
  ADMIN
  AGENT
}

// Core models for relationships
model Booking {
  id        String   @id @default(cuid())
  status    BookingStatus @default(PENDING)
  total     Decimal  @db.Decimal(10, 2)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}
```

#### Deliverables
- PostgreSQL database connected
- Prisma schema defined
- Initial migration applied

#### Acceptance Criteria
- [ ] Prisma Studio opens without errors
- [ ] Can create/read/update/delete test records
- [ ] Migrations run successfully

---

### Day 10-11: Payload CMS Setup

#### Tasks
- [ ] Install Payload CMS dependencies
  ```bash
  npm install @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical
  ```
- [ ] Create payload.config.ts
- [ ] Configure Payload with PostgreSQL adapter
- [ ] Set up initial collections:
  - Users (for admin)
  - Media
  - Destinations
- [ ] Configure access control basics
- [ ] Set up admin panel routing
- [ ] Configure upload functionality

#### Payload Configuration Structure

```typescript
// src/payload/payload.config.ts
import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import Users from './collections/Users'
import Media from './collections/Media'
import Destinations from './collections/Destinations'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  collections: [Users, Media, Destinations],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
})
```

#### Deliverables
- Payload CMS installed and configured
- Admin panel accessible
- Initial collections created

#### Acceptance Criteria
- [ ] `/admin` route loads Payload CMS
- [ ] Can create admin user
- [ ] Can upload media files

---

### Day 12-14: Seeding & Final Setup

#### Tasks
- [ ] Create seed data script (`prisma/seed.ts`)
- [ ] Seed destinations (Nigerian and international)
- [ ] Seed sample users
- [ ] Seed airlines data
- [ ] Create npm seed script
  ```json
  "db:seed": "tsx prisma/seed.ts"
  ```
- [ ] Document local setup process
- [ ] Test complete setup flow on fresh clone
- [ ] Create troubleshooting guide

#### Seed Data Includes

```typescript
// Sample destinations
const destinations = [
  {
    name: 'Lagos',
    country: 'Nigeria',
    type: 'CITY',
    description: 'Commercial capital of Nigeria...',
    image: '/images/destinations/lagos.jpg',
  },
  {
    name: 'Abuja',
    country: 'Nigeria',
    type: 'CITY',
    description: 'Capital city of Nigeria...',
    image: '/images/destinations/abuja.jpg',
  },
  // ... more destinations
]

// Sample airlines
const airlines = [
  { name: 'Air Peace', code: 'P4', country: 'Nigeria' },
  { name: 'Arik Air', code: 'W3', country: 'Nigeria' },
  { name: 'Dana Air', code: '9J', country: 'Nigeria' },
  // ... more airlines
]
```

#### Deliverables
- Seed script created and tested
- Sample data populated
- Documentation complete

#### Acceptance Criteria
- [ ] `npm run db:seed` populates database
- [ ] All seeded data visible in Prisma Studio
- [ ] Fresh setup completes in < 10 minutes

---

## Phase 1 Deliverables Summary

| Deliverable | Status | Location |
|-------------|--------|----------|
| Next.js Project | 🔲 | Root directory |
| Tailwind Theme | 🔲 | `tailwind.config.ts` |
| UI Components | 🔲 | `src/components/ui/` |
| Database Schema | 🔲 | `prisma/schema.prisma` |
| Payload CMS | 🔲 | `src/payload/` |
| Seed Data | 🔲 | `prisma/seed.ts` |
| Dev Tools Config | 🔲 | Root config files |
| Documentation | 🔲 | `README.md` |

---

## Success Criteria

- [ ] `npm run dev` starts all services
- [ ] Database migrations run successfully
- [ ] Payload admin accessible at `/admin`
- [ ] shadcn/ui components render correctly
- [ ] TypeScript compiles without errors
- [ ] ESLint and Prettier pass
- [ ] Complete setup achievable from README

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Node.js version conflicts | High | Use Volta/Node 20 LTS |
| Payload CMS setup issues | Medium | Follow official docs, use Discord |
| Database connection fails | High | Test with local Postgres first |

---

## Next Phase Handoff

Upon completion of Phase 1, the following should be ready for Phase 2:

1. ✅ Working development environment
2. ✅ Database schema with migrations
3. ✅ Payload CMS admin panel
4. ✅ Base UI component library
5. ✅ Project structure established
6. ✅ Environment variables documented

---

*Phase Start Date: TBD*  
*Target Completion: TBD + 2 weeks*  
*Last Updated: 2026-04-13*
