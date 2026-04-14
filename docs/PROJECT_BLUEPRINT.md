# NaijaTravel Pro - Comprehensive Project Blueprint

## Project Overview

**Platform Name:** NaijaTravel Pro  
**Tagline:** "Your Gateway to Seamless Nigerian & International Travel"  
**Description:** A full-featured travel agency platform tailored for the Nigerian market, offering flight bookings, hotel reservations, tour packages, visa services, and travel insurance with Nigeria-specific payment solutions and localizations.

---

## 1. PROJECT TRACKING FILES

### PROGRESS.md
**Purpose:** Overall project progress tracking and milestone completion  
**Contents:**
- Project status overview with percentage completion
- Current phase indicator with visual progress bar
- Completed milestones with dates
- Blockers and dependencies
- Weekly progress summaries
- Team velocity metrics
- Risk assessment and mitigation

### DECISIONS.md
**Purpose:** Architecture and technical decision records (ADRs)  
**Contents:**
- Decision ID and date
- Context/Problem statement
- Options considered with pros/cons
- Decision made with justification
- Consequences (positive/negative)
- Status (proposed/accepted/deprecated/superseded)
- Sample entries for:
  - Why Payload CMS over Strapi
  - Why Redux Toolkit over Zustand
  - Database choice (PostgreSQL)
  - Authentication strategy
  - Payment gateway selection
  - Deployment platform choice

### TODO.md
**Purpose:** Current sprint tasks and immediate action items  
**Contents:**
- Sprint number and dates
- Tasks organized by priority (P0, P1, P2, P3)
- Task assignments (if team-based)
- Task status (not started/in progress/review/done)
- Definition of Done criteria
- Quick wins list
- Technical debt tracking

### PHASE-1.md - Foundation & Setup
**Purpose:** Detailed phase 1 implementation plan  
**Contents:**
- Phase objectives and success criteria
- Week-by-week breakdown
- Specific deliverables with acceptance criteria
- Technical setup instructions
- Environment configuration
- Initial data seeding plan
- Testing strategy for phase 1

### PHASE-2.md - Core Features Development
**Purpose:** Core platform features implementation  
**Contents:**
- User authentication & authorization specs
- Basic booking flow diagrams
- Database schema implementations
- API endpoint specifications
- Frontend component development list
- Integration points and external APIs
- Testing scenarios

### PHASE-3.md - CMS & Advanced Features
**Purpose:** Content management and business logic  
**Contents:**
- Payload CMS configuration
- Pricing engine specifications
- Package management system
- Vendor/partner integration
- Advanced search and filters
- Booking management dashboard
- Admin panel features

### PHASE-4.md - Real-time & Experience
**Purpose:** Animations, real-time features, and UX enhancements  
**Contents:**
- Framer Motion animation specifications
- Real-time booking updates (WebSocket/Pusher)
- Notification system architecture
- Performance optimization plan
- Accessibility improvements
- Mobile responsiveness checklist
- Progressive Web App features

### PHASE-5.md - Polish & Deployment
**Purpose:** Production readiness and launch  
**Contents:**
- Security audit checklist
- Performance benchmarking
- SEO optimization plan
- Monitoring and analytics setup
- Deployment pipeline configuration
- Backup and disaster recovery
- Post-launch support plan

---

## 2. PROJECT STRUCTURE

```
naijatravel-pro/
│
├── 📁 .github/
│   ├── workflows/
│   │   ├── ci.yml                 # Continuous Integration
│   │   └── deploy.yml             # Deployment automation
│   └── PULL_REQUEST_TEMPLATE.md
│
├── 📁 .vscode/
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
│
├── 📁 prisma/
│   ├── schema.prisma              # Main database schema
│   ├── migrations/                # Database migrations
│   ├── seed.ts                    # Database seeding
│   └── seed-data/                 # Seed data files
│       ├── users.json
│       ├── destinations.json
│       └── packages.json
│
├── 📁 src/
│   │
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── (auth)/                # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   └── verify-email/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (main)/                # Main site route group
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── destinations/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── flights/
│   │   │   │   ├── page.tsx
│   │   │   │   └── search/
│   │   │   │       └── page.tsx
│   │   │   ├── hotels/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── packages/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── visa-services/
│   │   │   │   └── page.tsx
│   │   │   ├── travel-insurance/
│   │   │   │   └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── faq/
│   │   │   │   └── page.tsx
│   │   │   ├── terms/
│   │   │   │   └── page.tsx
│   │   │   └── privacy/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/           # User dashboard route group
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── bookings/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── wallet/
│   │   │   │   └── page.tsx
│   │   │   ├── saved/
│   │   │   │   └── page.tsx
│   │   │   └── support/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/                   # API Routes
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── webhook/
│   │   │   │   ├── paystack/
│   │   │   │   │   └── route.ts
│   │   │   │   └── twilio/
│   │   │   │       └── route.ts
│   │   │   ├── search/
│   │   │   │   └── route.ts
│   │   │   ├── bookings/
│   │   │   │   └── route.ts
│   │   │   ├── payments/
│   │   │   │   └── route.ts
│   │   │   └── upload/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx             # Root layout
│   │   ├── globals.css
│   │   └── not-found.tsx
│   │
│   ├── 📁 components/             # React Components
│   │   │
│   │   ├── 📁 ui/                 # shadcn/ui components (auto-generated)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── table.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── command.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── alert.tsx
│   │   │
│   │   ├── 📁 layout/             # Layout components
│   │   │   ├── header/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── NavLinks.tsx
│   │   │   │   ├── MobileMenu.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── UserMenu.tsx
│   │   │   ├── footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── FooterLinks.tsx
│   │   │   │   └── NewsletterForm.tsx
│   │   │   ├── sidebar/
│   │   │   │   └── Sidebar.tsx
│   │   │   └── navigation/
│   │   │       ├── MainNav.tsx
│   │   │       └── DashboardNav.tsx
│   │   │
│   │   ├── 📁 sections/           # Page section components
│   │   │   ├── hero/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── HeroCarousel.tsx
│   │   │   │   └── SearchWidget.tsx
│   │   │   ├── features/
│   │   │   │   └── FeaturesSection.tsx
│   │   │   ├── destinations/
│   │   │   │   ├── DestinationsGrid.tsx
│   │   │   │   ├── DestinationCard.tsx
│   │   │   │   └── DestinationFilter.tsx
│   │   │   ├── packages/
│   │   │   │   ├── PackagesList.tsx
│   │   │   │   ├── PackageCard.tsx
│   │   │   │   └── PackageDetails.tsx
│   │   │   ├── testimonials/
│   │   │   │   └── TestimonialsSection.tsx
│   │   │   ├── cta/
│   │   │   │   └── CTASection.tsx
│   │   │   └── newsletter/
│   │   │       └── NewsletterSection.tsx
│   │   │
│   │   ├── 📁 booking/            # Booking flow components
│   │   │   ├── FlightSearchForm.tsx
│   │   │   ├── HotelSearchForm.tsx
│   │   │   ├── PackageSearchForm.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   ├── BookingForm.tsx
│   │   │   ├── PassengerForm.tsx
│   │   │   ├── PaymentForm.tsx
│   │   │   ├── BookingSummary.tsx
│   │   │   └── ConfirmationCard.tsx
│   │   │
│   │   ├── 📁 auth/               # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── ResetPasswordForm.tsx
│   │   │   ├── SocialAuth.tsx
│   │   │   └── AuthGuard.tsx
│   │   │
│   │   ├── 📁 dashboard/          # Dashboard components
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── BookingHistory.tsx
│   │   │   ├── BookingDetails.tsx
│   │   │   ├── UserProfileForm.tsx
│   │   │   ├── WalletBalance.tsx
│   │   │   └── SavedItems.tsx
│   │   │
│   │   ├── 📁 shared/             # Shared/reusable components
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Rating.tsx
│   │   │   ├── PriceDisplay.tsx
│   │   │   ├── NairaIcon.tsx
│   │   │   ├── CurrencyConverter.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── ImageGallery.tsx
│   │   │   ├── ShareButtons.tsx
│   │   │   └── SEO.tsx
│   │   │
│   │   └── 📁 animations/         # Animation components
│   │       ├── FadeIn.tsx
│   │       ├── SlideIn.tsx
│   │       ├── StaggerContainer.tsx
│   │       ├── PageTransition.tsx
│   │       ├── ScrollReveal.tsx
│   │       └── AnimatedCounter.tsx
│   │
│   ├── 📁 lib/                    # Utility libraries
│   │   ├── utils.ts               # General utilities
│   │   ├── prisma.ts              # Prisma client
│   │   ├── payload.ts             # Payload CMS client
│   │   ├── paystack.ts            # Paystack integration
│   │   ├── twilio.ts              # SMS service
│   │   ├── email.ts               # Email service
│   │   ├── cloudinary.ts          # Image upload
│   │   ├── redis.ts               # Redis client
│   │   ├── auth.ts                # Auth configuration
│   │   ├── api-client.ts          # API client wrapper
│   │   ├── constants.ts           # App constants
│   │   ├── validation.ts          # Zod schemas
│   │   └── helpers.ts             # Helper functions
│   │
│   ├── 📁 hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useBooking.ts
│   │   ├── useSearch.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollPosition.ts
│   │   ├── useToast.ts
│   │   ├── useCurrency.ts
│   │   └── useRealtime.ts
│   │
│   ├── 📁 store/                  # Redux Toolkit store
│   │   ├── index.ts               # Store configuration
│   │   ├── provider.tsx           # Redux provider
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── bookingSlice.ts
│   │   │   ├── searchSlice.ts
│   │   │   ├── cartSlice.ts
│   │   │   ├── uiSlice.ts
│   │   │   └── notificationsSlice.ts
│   │   └── middleware/
│   │       ├── logger.ts
│   │       └── api.ts
│   │
│   ├── 📁 types/                  # TypeScript types
│   │   ├── index.ts               # Main exports
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── booking.ts
│   │   ├── flight.ts
│   │   ├── hotel.ts
│   │   ├── package.ts
│   │   ├── payment.ts
│   │   ├── destination.ts
│   │   ├── api.ts
│   │   └── payload.ts
│   │
│   ├── 📁 styles/                 # Additional styles
│   │   ├── animations.css
│   │   ├── utilities.css
│   │   └── print.css
│   │
│   └── 📁 payload/                # Payload CMS configuration
│       ├── payload.config.ts
│       ├── collections/
│       │   ├── Users.ts
│       │   ├── Destinations.ts
│       │   ├── TravelPackages.ts
│       │   ├── Bookings.ts
│       │   ├── Payments.ts
│       │   ├── BlogPosts.ts
│       │   ├── Testimonials.ts
│       │   ├── FAQ.ts
│       │   ├── Airlines.ts
│       │   ├── Hotels.ts
│       │   ├── TourOperators.ts
│       │   ├── VisaServices.ts
│       │   └── Media.ts
│       ├── globals/
│       │   ├── SiteSettings.ts
│       │   ├── Navigation.ts
│       │   ├── Homepage.ts
│       │   └── Footer.ts
│       ├── hooks/
│       │   ├── beforeBooking.ts
│       │   └── afterPayment.ts
│       ├── endpoints/
│       │   ├── search.ts
│       │   └── availability.ts
│       └── utilities/
│           ├── pricing.ts
│           └── notifications.ts
│
├── 📁 public/                     # Static assets
│   ├── images/
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── destinations/
│   │   ├── airlines/
│   │   └── icons/
│   ├── fonts/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
│
├── 📁 tests/                      # Test files
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
│
├── 📁 scripts/                    # Utility scripts
│   ├── setup.sh
│   ├── seed-db.ts
│   └── deploy.sh
│
├── 📄 .env.example                # Environment variables template
├── 📄 .env.local                  # Local environment (gitignored)
├── 📄 .gitignore
├── 📄 .eslintrc.json
├── 📄 .prettierrc
├── 📄 next.config.js
├── 📄 tailwind.config.ts
├── 📄 tsconfig.json
├── 📄 components.json             # shadcn/ui config
├── 📄 package.json
├── 📄 pnpm-lock.yaml
├── 📄 README.md
├── 📄 PROGRESS.md
├── 📄 DECISIONS.md
├── 📄 TODO.md
├── 📄 PHASE-1.md
├── 📄 PHASE-2.md
├── 📄 PHASE-3.md
├── 📄 PHASE-4.md
└── 📄 PHASE-5.md
```

---

## 3. PHASE BREAKDOWN

### 📌 PHASE 1: Foundation & Setup (Weeks 1-2)

**Objective:** Establish project foundation with all core technologies configured

#### Week 1: Environment & Configuration
- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Configure Tailwind CSS with custom theme
- [ ] Install and configure shadcn/ui
- [ ] Set up ESLint and Prettier
- [ ] Initialize Git repository
- [ ] Create project documentation files (PROGRESS, TODO, DECISIONS)
- [ ] Set up folder structure as defined above

#### Week 2: Database & CMS Setup
- [ ] Initialize Prisma with PostgreSQL schema
- [ ] Configure Payload CMS
- [ ] Create core database collections
- [ ] Set up database migrations
- [ ] Create seed data
- [ ] Configure environment variables
- [ ] Set up database hosting (Supabase/Railway)
- [ ] Test database connections

**Deliverables:**
- Working development environment
- Database schema deployed
- Payload CMS admin accessible
- Project tracking files active

---

### 📌 PHASE 2: Core Features Development (Weeks 3-5)

**Objective:** Build essential platform features for user interaction

#### Week 3: Authentication & User Management
- [ ] Implement NextAuth.js or Payload Auth
- [ ] Create login/register pages
- [ ] Build authentication forms
- [ ] Set up email verification
- [ ] Implement password reset flow
- [ ] Create user profile management
- [ ] Set up protected routes
- [ ] Add social login (Google)

#### Week 4: Search & Discovery
- [ ] Build flight search form
- [ ] Build hotel search form
- [ ] Build package search form
- [ ] Implement search results display
- [ ] Add filters (price, date, rating)
- [ ] Create sorting options
- [ ] Implement pagination
- [ ] Add search history

#### Week 5: Booking Flow
- [ ] Create booking form components
- [ ] Build passenger information form
- [ ] Implement booking summary
- [ ] Create booking confirmation flow
- [ ] Set up booking status tracking
- [ ] Build booking details page
- [ ] Add booking modification/cancellation
- [ ] Implement booking emails

**Deliverables:**
- Full user authentication system
- Multi-type search functionality
- Complete booking flow
- User dashboard basic version

---

### 📌 PHASE 3: CMS & Advanced Features (Weeks 6-8)

**Objective:** Implement content management and business logic

#### Week 6: Payload CMS Integration
- [ ] Configure all CMS collections
- [ ] Build custom CMS fields for travel data
- [ ] Create content relationships
- [ ] Set up media upload handling
- [ ] Configure access control
- [ ] Build custom CMS views
- [ ] Implement content versioning
- [ ] Set up content workflows

#### Week 7: Pricing Engine & Packages
- [ ] Build dynamic pricing calculator
- [ ] Implement seasonal pricing
- [ ] Create discount/coupon system
- [ ] Build package builder
- [ ] Add multi-currency support (₦ focus)
- [ ] Implement price alerts
- [ ] Create special offers management
- [ ] Build fare comparison tool

#### Week 8: Admin & Management
- [ ] Create admin dashboard
- [ ] Build booking management interface
- [ ] Implement user management
- [ ] Add reporting and analytics
- [ ] Create content approval workflow
- [ ] Build notification center
- [ ] Add bulk operations
- [ ] Implement audit logging

**Deliverables:**
- Fully configured Payload CMS
- Dynamic pricing system
- Admin management panel
- Content management workflows

---

### 📌 PHASE 4: Real-time & Experience (Weeks 9-11)

**Objective:** Enhance user experience with animations and real-time features

#### Week 9: Animations & Interactions
- [ ] Implement Framer Motion page transitions
- [ ] Add scroll-triggered animations
- [ ] Build micro-interactions
- [ ] Create loading animations
- [ ] Add hover effects
- [ ] Implement skeleton loaders
- [ ] Build progress indicators
- [ ] Add success/error animations

#### Week 10: Real-time Features
- [ ] Set up WebSocket/Pusher integration
- [ ] Implement real-time booking updates
- [ ] Build notification system
- [ ] Add live chat support widget
- [ ] Create real-time price updates
- [ ] Implement availability alerts
- [ ] Add collaborative features
- [ ] Build activity feeds

#### Week 11: Advanced UX
- [ ] Implement Progressive Web App features
- [ ] Add offline support
- [ ] Create advanced search filters
- [ ] Build comparison tools
- [ ] Implement wishlist/favorites
- [ ] Add share functionality
- [ ] Create personalized recommendations
- [ ] Build trip planner tool

**Deliverables:**
- Smooth animated interfaces
- Real-time update system
- Enhanced user engagement features
- PWA capabilities

---

### 📌 PHASE 5: Polish & Deployment (Weeks 12-13)

**Objective:** Prepare platform for production launch

#### Week 12: Optimization & Security
- [ ] Performance optimization (Core Web Vitals)
- [ ] Image optimization and lazy loading
- [ ] Code splitting and bundle optimization
- [ ] Security audit and hardening
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Set up security headers
- [ ] Conduct penetration testing

#### Week 13: Launch Preparation
- [ ] SEO optimization and meta tags
- [ ] Create sitemap and robots.txt
- [ ] Set up Google Analytics
- [ ] Configure error tracking (Sentry)
- [ ] Set up monitoring (Vercel/LogRocket)
- [ ] Create backup strategy
- [ ] Write deployment documentation
- [ ] Deploy to production
- [ ] Conduct UAT testing
- [ ] Plan marketing launch

**Deliverables:**
- Production-ready application
- Deployed and accessible platform
- Monitoring and analytics active
- Complete documentation

---

## 4. TECHNOLOGY STACK

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | React framework with App Router |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Node.js | 20.x LTS | Runtime environment |

### Styling & UI
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 4.x | Utility-first CSS |
| shadcn/ui | Latest | Component library |
| Framer Motion | 11.x | Animations |
| Lucide React | Latest | Icons |
| clsx / tailwind-merge | Latest | Class utilities |

### Backend & CMS
| Technology | Version | Purpose |
|------------|---------|---------|
| Payload CMS | 3.x | Headless CMS |
| Prisma | 6.x | ORM |
| PostgreSQL | 15+ | Database |
| Redis | 7.x | Caching/Sessions |

### State Management
| Technology | Version | Purpose |
|------------|---------|---------|
| Redux Toolkit | 2.x | Global state |
| React Query / TanStack Query | 5.x | Server state |
| Zustand | 4.x | Local state (optional) |

### Authentication
| Technology | Version | Purpose |
|------------|---------|---------|
| NextAuth.js | 5.x (beta) | Authentication |
| JSON Web Tokens | Latest | Token handling |
| bcrypt / argon2 | Latest | Password hashing |

### Payment Integration
| Technology | Version | Purpose |
|------------|---------|---------|
| Paystack Node SDK | Latest | Payment processing |
| Paystack Inline JS | Latest | Payment UI |

### Communication
| Technology | Version | Purpose |
|------------|---------|---------|
| Twilio SDK | Latest | SMS notifications |
| Nodemailer | Latest | Email sending |
| Resend | Latest | Transactional email |

### File Storage
| Technology | Version | Purpose |
|------------|---------|---------|
| Cloudinary SDK | Latest | Image hosting |
| AWS SDK (optional) | Latest | S3 backup |

### Real-time
| Technology | Version | Purpose |
|------------|---------|---------|
| Socket.io | 4.x | WebSocket connections |
| Pusher | Latest | Real-time features |

### Testing
| Technology | Version | Purpose |
|------------|---------|---------|
| Vitest | Latest | Unit testing |
| Playwright | Latest | E2E testing |
| React Testing Library | Latest | Component testing |
| MSW | Latest | API mocking |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| ESLint | 9.x | Linting |
| Prettier | 3.x | Code formatting |
| Husky | Latest | Git hooks |
| Commitlint | Latest | Commit conventions |

---

## 5. NIGERIA-SPECIFIC FEATURES

### Payment Solutions
- **Primary:** Paystack integration (cards, bank transfer, USSD, QR)
- **Secondary:** Flutterwave as backup option
- **Mobile Money:** OPay, Paga support
- **Installments:** "Travel Now, Pay Later" partnerships

### Currency & Pricing
- **Primary Currency:** Nigerian Naira (₦) with proper formatting
- **Multi-currency:** USD/EUR display for international rates
- **Price Display:** Comma separators (e.g., ₦150,000)
- **Dynamic Pricing:** Based on exchange rate fluctuations

### Localizations
- **Phone Numbers:** +234 format validation
- **Addresses:** Nigerian address structure (Street, City, LGA, State)
- **Date Format:** DD/MM/YYYY
- **Time Zone:** WAT (West Africa Time)

### Travel-Specific Nigeria Features
- **Domestic Airlines:** Aero, Air Peace, Arik, Dana, Ibom Air, Max Air, Overland
- **Popular Routes:** Lagos-Abuja, Lagos-PH, Abuja-PH, etc.
- **Nigerian Airports:** LOS, ABV, PHC, KAN, etc.
- **Holiday Packages:** Sallah, Christmas, Easter, NYSC Camp
- **Visa Services:** UK, US, Schengen, UAE with Nigerian requirements
- **Travel Insurance:** Nigeria-specific coverage

### Communication
- **SMS Alerts:** Booking confirmations via local providers
- **WhatsApp Integration:** Support and notifications
- **Email:** Local-friendly templates
- **Languages:** English, Pidgin support consideration

### Trust & Security
- **NDPR Compliance:** Nigeria Data Protection Regulation
- **Local Business Registration:** Display CAC number
- **Physical Office Address:** Lagos/Abuja locations
- **Local Customer Support:** Nigerian phone numbers
- **Testimonials:** Nigerian travelers focus

### Content
- **Destinations:** Nigerian destinations (Obudu, Yankari, Ikogosi, etc.)
- **Blog:** Nigeria travel tips, visa guides, local events
- **Partners:** Nigerian hotels, tour operators
- **Social Proof:** Local celebrity/influencer partnerships

---

## 6. FILE NAMING CONVENTIONS

### React Components
- **PascalCase:** `Header.tsx`, `BookingForm.tsx`
- **Multi-word:** `UserProfileCard.tsx`, `FlightSearchResults.tsx`
- **Index files:** `index.ts` for barrel exports

### Custom Hooks
- **camelCase with 'use' prefix:** `useAuth.ts`, `useBooking.ts`
- **Multi-word:** `useLocalStorage.ts`, `useScrollPosition.ts`

### Utility Files
- **camelCase:** `utils.ts`, `helpers.ts`
- **Specific purpose:** `validation.ts`, `constants.ts`

### Type Definitions
- **PascalCase:** `User.ts`, `Booking.ts`
- **Interfaces:** `IUser`, `IBooking` (optional prefix)
- **Types:** `TApiResponse`, `TPaymentStatus`

### Styles
- **kebab-case:** `globals.css`, `animations.css`
- **Module styles:** `ComponentName.module.css` (if used)

### API Routes
- **kebab-case:** `route.ts` in folders like `bookings/`, `payments/`
- **Dynamic routes:** `[id]/`, `[slug]/`

### Database
- **Prisma schema:** `schema.prisma`
- **Migrations:** Auto-generated timestamps
- **Seed files:** `seed.ts`, descriptive JSON files

### Assets
- **kebab-case:** `hero-image.jpg`, `nigeria-flag.svg`
- **Descriptive:** `lagos-city-tour.jpg`, `paystack-logo.png`

### Configuration
- **kebab-case or dotfiles:** `next.config.js`, `.eslintrc.json`
- **Environment:** `.env.local`, `.env.production`

### Test Files
- **Component.test.tsx:** Next to component or in `__tests__/`
- **e2e:** `booking-flow.spec.ts`

---

## 7. DEPENDENCY LIST - INSTALLATION ORDER

### Phase 1: Core Dependencies

```bash
# 1. Initialize Next.js project
npx shadcn@latest init --yes --template next --base-color slate

# 2. Install shadcn/ui base components
echo "button card dialog dropdown-menu form input label select tabs badge avatar skeleton sheet accordion carousel checkbox radio-group slider switch textarea table pagination breadcrumb command separator tooltip alert calendar popover toast" | tr " " "\n" | xargs -I {} npx shadcn add {}

# 3. Core dependencies
npm install @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical
npm install prisma @prisma/client
npm install @reduxjs/toolkit react-redux
npm install next-auth@beta
npm install @auth/prisma-adapter
npm install framer-motion
npm install lucide-react
npm install paystack-api
npm install twilio
npm install nodemailer
npm install cloudinary
npm install ioredis
npm install zod react-hook-form @hookform/resolvers
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install axios
npm install date-fns
npm install clsx tailwind-merge
```

### Phase 2: Development Dependencies

```bash
# Type definitions
npm install -D @types/node @types/react @types/react-dom
npm install -D @types/nodemailer

# Testing
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test msw

# Linting & Formatting
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D eslint-config-next eslint-plugin-react eslint-plugin-react-hooks
npm install -D prettier prettier-plugin-tailwindcss

# Git hooks
npm install -D husky lint-staged commitlint @commitlint/config-conventional

# Utilities
npm install -D typescript
npm install -D ts-node
npm install -D @types/jsonwebtoken
npm install -D dotenv
```

### Phase 3: Feature Dependencies

```bash
# Search & Filters
npm install fuse.js
npm install @algolia/autocomplete-js

# Maps (if needed)
npm install @react-google-maps/api

# Charts & Analytics
npm install recharts

# Rich text editing
npm install @payloadcms/richtext-slate

# File uploads
npm install react-dropzone
npm install multer @types/multer

# PWA
npm install next-pwa

# Real-time
npm install socket.io socket.io-client
npm install pusher pusher-js

# Security
npm install helmet
npm install csrf-csrf
npm install rate-limiter-flexible
```

### Phase 4: Optional Enhancements

```bash
# Analytics
npm install @vercel/analytics
npm install @sentry/nextjs

# Performance
npm install @next/bundle-analyzer

# Utilities
npm install nanoid
npm install slugify
npm install qrcode
npm install jsbarcode
npm install generate-password
npm install validator @types/validator

# Internationalization (future)
npm install next-intl
```

### Complete Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:deploy": "prisma migrate deploy",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "payload": "payload",
    "prepare": "husky install"
  }
}
```

---

## Quick Start Commands

```bash
# 1. Clone and navigate
cd naijatravel-pro

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Set up database
npm run db:migrate
npm run db:seed

# 5. Run development server
npm run dev

# 6. Access Payload CMS
# Navigate to http://localhost:3000/admin
```

---

## Success Metrics

- **Performance:** Lighthouse score > 90
- **Accessibility:** WCAG 2.1 AA compliance
- **Security:** No critical vulnerabilities
- **Uptime:** 99.9% availability
- **Load Time:** < 3 seconds initial load
- **Conversion:** Booking completion rate > 15%

---

*Blueprint Version: 1.0*  
*Created: April 2026*  
*Status: Ready for Implementation*
