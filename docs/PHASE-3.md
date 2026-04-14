# Phase 3: CMS & Advanced Features (Weeks 6-8)

**Objective:** Implement content management and business logic  
**Duration:** 3 Weeks  
**Status:** 🔴 Not Started  
**Prerequisites:** Phase 2 Complete

---

## Week 6: Payload CMS Integration

### Day 36-37: CMS Collections Setup

#### Tasks
- [ ] Create all Payload collections:
  - Users (extend for admin)
  - Destinations
  - TravelPackages
  - Hotels
  - Airlines
  - Bookings
  - Payments
  - BlogPosts
  - Testimonials
  - FAQ
  - Media
- [ ] Configure field types and validation
- [ ] Set up relationships between collections
- [ ] Add access control rules
- [ ] Configure upload options for Media

#### Collection: Destinations

```typescript
// src/payload/collections/Destinations.ts
import { CollectionConfig } from 'payload/types'

const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: ['CITY', 'BEACH', 'MOUNTAIN', 'SAFARI', 'HISTORICAL'],
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'popular',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'keywords', type: 'text' },
      ],
    },
  ],
}

export default Destinations
```

#### Collection: TravelPackages

```typescript
const TravelPackages: CollectionConfig = {
  slug: 'packages',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'destination',
      type: 'relationship',
      relationTo: 'destinations',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: ['HONEYMOON', 'FAMILY', 'ADVENTURE', 'LUXURY', 'BUDGET'],
      required: true,
    },
    {
      name: 'duration',
      type: 'group',
      fields: [
        { name: 'days', type: 'number', required: true },
        { name: 'nights', type: 'number', required: true },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        { name: 'basePrice', type: 'number', required: true },
        { name: 'currency', type: 'text', defaultValue: 'NGN' },
        {
          name: 'inclusions',
          type: 'array',
          fields: [{ name: 'item', type: 'text' }],
        },
      ],
    },
    {
      name: 'itinerary',
      type: 'array',
      fields: [
        { name: 'day', type: 'number' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'richText' },
        { name: 'meals', type: 'text' },
      ],
    },
    {
      name: 'availability',
      type: 'array',
      fields: [
        { name: 'startDate', type: 'date' },
        { name: 'endDate', type: 'date' },
        { name: 'slots', type: 'number' },
        { name: 'booked', type: 'number', defaultValue: 0 },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'published', type: 'checkbox', defaultValue: false },
  ],
}
```

#### Deliverables
- All collections created
- Relationships configured

#### Acceptance Criteria
- [ ] All collections visible in admin
- [ ] Can create/edit/delete items
- [ ] Relationships work correctly
- [ ] Access control enforced

---

### Day 38-39: CMS Hooks & Logic

#### Tasks
- [ ] Create beforeChange hooks:
  - Auto-generate slugs
  - Validate dates
  - Calculate pricing
- [ ] Create afterChange hooks:
  - Send notifications
  - Update search index
  - Clear cache
- [ ] Add validation hooks
- [ ] Implement custom endpoints
- [ ] Set up scheduled jobs

#### Hook Example

```typescript
// Auto-generate slug hook
const generateSlug: FieldHook = async ({ value, data }) => {
  if (value) return value
  return data?.title
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Pricing calculation hook
const calculateTotal: FieldHook = async ({ data }) => {
  const basePrice = data?.pricing?.basePrice || 0
  const taxes = basePrice * 0.075 // 7.5% VAT
  return basePrice + taxes
}
```

#### Deliverables
- Hooks implemented
- Business logic in CMS

#### Acceptance Criteria
- [ ] Slugs auto-generate correctly
- [ ] Pricing calculates automatically
- [ ] Hooks execute without errors

---

### Day 40-42: Content APIs

#### Tasks
- [ ] Configure REST API access
- [ ] Set up GraphQL if needed
- [ ] Create API documentation
- [ ] Implement search endpoints
- [ ] Add pagination support
- [ ] Configure CORS
- [ ] Set up API rate limiting
- [ ] Create API keys for external access

#### Deliverables
- APIs accessible
- Documentation complete

#### Acceptance Criteria
- [ ] REST endpoints return data
- [ ] Pagination works correctly
- [ ] Rate limiting functional

---

## Week 7: Pricing Engine & Packages

### Day 43-44: Dynamic Pricing

#### Tasks
- [ ] Build pricing calculator service
- [ ] Implement seasonal pricing rules
- [ ] Add demand-based pricing
- [ ] Create pricing tiers:
  - Economy
  - Standard
  - Premium
  - Luxury
- [ ] Build bulk discount calculator
- [ ] Add child/senior pricing
- [ ] Implement currency conversion
- [ ] Create pricing dashboard

#### Pricing Service

```typescript
// src/lib/pricing.ts
interface PricingParams {
  basePrice: number
  passengers: Passenger[]
  season: 'PEAK' | 'SHOULDER' | 'LOW'
  demand: number // 0-100
  currency: string
}

export const calculatePrice = (params: PricingParams): PriceBreakdown => {
  let total = params.basePrice

  // Season multiplier
  const seasonMultipliers = { PEAK: 1.3, SHOULDER: 1.1, LOW: 1.0 }
  total *= seasonMultipliers[params.season]

  // Demand adjustment
  if (params.demand > 80) total *= 1.15

  // Passenger calculations
  const passengerTotal = params.passengers.reduce((sum, p) => {
    if (p.type === 'CHILD') return sum + total * 0.7
    if (p.type === 'INFANT') return sum + total * 0.1
    return sum + total
  }, 0)

  // Taxes and fees
  const vat = passengerTotal * 0.075
  const serviceFee = 2500
  const tax = passengerTotal * 0.05

  return {
    subtotal: passengerTotal,
    vat,
    serviceFee,
    tax,
    total: passengerTotal + vat + serviceFee + tax,
  }
}
```

#### Deliverables
- Pricing engine functional
- Dynamic calculations working

#### Acceptance Criteria
- [ ] Prices calculate correctly
- [ ] Season adjustments apply
- [ ] Child discounts work
- [ ] Currency conversion accurate

---

### Day 45-46: Coupon & Discount System

#### Tasks
- [ ] Create Coupon collection in CMS
- [ ] Build coupon validation logic
- [ ] Implement discount types:
  - Percentage off
  - Fixed amount off
  - Buy X get Y
- [ ] Add usage limits
- [ ] Create expiration logic
- [ ] Build coupon application UI
- [ ] Track coupon usage
- [ ] Generate usage reports

#### Coupon Schema

```typescript
interface Coupon {
  code: string
  type: 'PERCENTAGE' | 'FIXED' | 'BUY_X_GET_Y'
  value: number
  minBookingAmount?: number
  maxDiscount?: number
  applicableTo: ('FLIGHT' | 'HOTEL' | 'PACKAGE')[]
  usageLimit: number
  usageCount: number
  validFrom: Date
  validUntil: Date
  active: boolean
}
```

#### Deliverables
- Coupon system complete
- Application UI working

#### Acceptance Criteria
- [ ] Valid coupons apply correctly
- [ ] Invalid coupons rejected
- [ ] Usage limits enforced
- [ ] Expiration checked

---

### Day 47-49: Package Management

#### Tasks
- [ ] Build package builder interface
- [ ] Create package customization UI
- [ ] Implement itinerary builder
- [ ] Add inclusions/exclusions management
- [ ] Build availability calendar
- [ ] Create package comparison tool
- [ ] Add package reviews/ratings
- [ ] Implement package recommendations
- [ ] Create special offers section

#### Deliverables
- Package management complete
- Comparison tools functional

#### Acceptance Criteria
- [ ] Packages display correctly
- [ ] Customization options work
- [ ] Availability shows correctly
- [ ] Comparison displays differences

---

## Week 8: Admin & Management

### Day 50-52: Admin Dashboard

#### Tasks
- [ ] Create admin layout
- [ ] Build dashboard overview page:
  - Booking statistics
  - Revenue charts
  - User metrics
  - Recent activity
- [ ] Add quick action buttons
- [ ] Create notification center
- [ ] Build activity log
- [ ] Add system health checks
- [ ] Implement search across CMS
- [ ] Create export functionality

#### Dashboard Widgets

```typescript
interface DashboardStats {
  totalBookings: number
  totalRevenue: number
  pendingBookings: number
  newUsers: number
  conversionRate: number
  topDestinations: Destination[]
  recentBookings: Booking[]
}
```

#### Deliverables
- Admin dashboard functional
- Statistics displaying

#### Acceptance Criteria
- [ ] Dashboard loads data correctly
- [ ] Charts render properly
- [ ] Quick actions work
- [ ] Exports generate files

---

### Day 53-54: Booking Management

#### Tasks
- [ ] Create bookings list view
- [ ] Build booking detail view
- [ ] Implement status updates:
  - Pending → Confirmed
  - Confirmed → Completed
  - Any → Cancelled
- [ ] Add booking notes
- [ ] Create refund workflow
- [ ] Build booking search/filter
- [ ] Add bulk operations
- [ ] Implement booking export

#### Deliverables
- Booking management complete
- Status workflows functional

#### Acceptance Criteria
- [ ] Can view all bookings
- [ ] Status updates save correctly
- [ ] Refunds process properly
- [ ] Search returns correct results

---

### Day 55-56: Reporting & Analytics

#### Tasks
- [ ] Create reports section
- [ ] Build revenue reports:
  - Daily/Weekly/Monthly
  - By destination
  - By package type
- [ ] Add user analytics:
  - Registration trends
  - Booking behavior
  - Retention metrics
- [ ] Create financial reports
- [ ] Implement report scheduling
- [ ] Add report export (PDF, CSV)
- [ ] Build custom report builder

#### Deliverables
- Reporting system complete
- Analytics functional

#### Acceptance Criteria
- [ ] Reports generate correctly
- [ ] Data accurate and current
- [ ] Exports work for all formats
- [ ] Scheduled reports send

---

## Phase 3 Deliverables Summary

| Deliverable | Status | Location |
|-------------|--------|----------|
| CMS Collections | 🔲 | `src/payload/collections/` |
| CMS Hooks | 🔲 | `src/payload/hooks/` |
| Pricing Engine | 🔲 | `src/lib/pricing.ts` |
| Coupon System | 🔲 | CMS + UI |
| Package Builder | 🔲 | CMS + Frontend |
| Admin Dashboard | 🔲 | `src/app/admin/` |
| Booking Management | 🔲 | Admin panel |
| Reporting System | 🔲 | Admin panel |

---

## Success Criteria

- [ ] All CMS collections functional
- [ ] Pricing calculates dynamically
- [ ] Coupons apply correctly
- [ ] Admin dashboard shows metrics
- [ ] Bookings manageable in admin
- [ ] Reports generate accurately

---

## Testing Checklist

- [ ] CMS collection CRUD tests
- [ ] Pricing calculation tests
- [ ] Coupon validation tests
- [ ] Admin flow E2E tests
- [ ] Report generation tests

---

## Next Phase Handoff

Upon completion of Phase 3:

1. ✅ Fully configured Payload CMS
2. ✅ Dynamic pricing system
3. ✅ Coupon/discount system
4. ✅ Admin management panel
5. ✅ Reporting and analytics

---

*Phase Start Date: After Phase 2*  
*Target Completion: +3 weeks*  
*Last Updated: 2026-04-13*
