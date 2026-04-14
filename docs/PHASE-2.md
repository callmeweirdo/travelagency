# Phase 2: Core Features Development (Weeks 3-5)

**Objective:** Build essential platform features for user interaction  
**Duration:** 3 Weeks  
**Status:** 🔴 Not Started  
**Prerequisites:** Phase 1 Complete

---

## Week 3: Authentication & User Management

### Day 15-16: NextAuth Setup

#### Tasks
- [ ] Install NextAuth.js v5 beta
  ```bash
  npm install next-auth@beta @auth/prisma-adapter
  ```
- [ ] Configure NextAuth with Prisma adapter
- [ ] Set up credentials provider (email/password)
- [ ] Configure Google OAuth provider
- [ ] Create auth configuration file
- [ ] Set up JWT session strategy
- [ ] Configure session callbacks

#### Auth Configuration

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Implementation
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if (token) session.user.role = token.role
      return session
    }
  }
}
```

#### Deliverables
- NextAuth configured
- OAuth providers working

#### Acceptance Criteria
- [ ] Can sign up with email/password
- [ ] Can log in with email/password
- [ ] Can log in with Google
- [ ] Sessions persist correctly

---

### Day 17-18: Auth UI Components

#### Tasks
- [ ] Create LoginForm component
- [ ] Create RegisterForm component
- [ ] Create ForgotPasswordForm component
- [ ] Create PasswordInput with visibility toggle
- [ ] Add form validation with Zod
- [ ] Create auth pages:
  - `/login`
  - `/register`
  - `/forgot-password`
  - `/reset-password`
- [ ] Add loading states
- [ ] Implement error handling

#### Form Schema Example

```typescript
// src/lib/validation.ts
import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+234[0-9]{10}$/, "Invalid Nigerian phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
```

#### Deliverables
- All auth forms functional
- Validation working

#### Acceptance Criteria
- [ ] Forms validate on submit
- [ ] Error messages display correctly
- [ ] Success redirects work
- [ ] Password toggle functional

---

### Day 19-21: User Profile & Protection

#### Tasks
- [ ] Create AuthGuard HOC/component
- [ ] Build user profile page (`/dashboard/profile`)
- [ ] Create profile update form
- [ ] Implement password change functionality
- [ ] Add profile image upload
- [ ] Create protected route middleware
- [ ] Add role-based access control
- [ ] Build user menu dropdown
- [ ] Add logout functionality

#### Deliverables
- Protected routes working
- Profile management complete

#### Acceptance Criteria
- [ ] Unauthenticated users redirected to login
- [ ] Profile updates save correctly
- [ ] Profile image uploads and displays
- [ ] Role-based access working

---

## Week 4: Search & Discovery

### Day 22-23: Search Forms

#### Tasks
- [ ] Build FlightSearchForm component
  - Origin/Destination (airport autocomplete)
  - Departure/Return dates
  - Passenger count
  - Cabin class selector
- [ ] Build HotelSearchForm component
  - Location input
  - Check-in/Check-out dates
  - Room/guest configuration
- [ ] Build PackageSearchForm component
  - Destination selector
  - Date range
  - Package type filter
- [ ] Add form validation
- [ ] Create search state management
- [ ] Implement search history (localStorage)

#### Search Form Features

```typescript
// Flight search parameters
interface FlightSearchParams {
  origin: string          // Airport code (e.g., "LOS")
  destination: string     // Airport code (e.g., "ABV")
  departureDate: Date
  returnDate?: Date
  passengers: {
    adults: number
    children: number
    infants: number
  }
  cabinClass: 'ECONOMY' | 'BUSINESS' | 'FIRST'
  tripType: 'ONE_WAY' | 'ROUND_TRIP'
}
```

#### Deliverables
- All search forms functional
- State management for search

#### Acceptance Criteria
- [ ] All forms validate inputs
- [ ] Date pickers prevent invalid ranges
- [ ] Passenger counts validate (max 9)
- [ ] Search parameters persist

---

### Day 24-25: Search Results

#### Tasks
- [ ] Create SearchResults page/component
- [ ] Build result cards for each type:
  - FlightResultCard
  - HotelResultCard
  - PackageResultCard
- [ ] Implement sorting options
- [ ] Add filter sidebar:
  - Price range slider
  - Rating filter
  - Amenities filter (hotels)
  - Airlines filter (flights)
- [ ] Create pagination component
- [ ] Add loading skeletons
- [ ] Implement empty states

#### Filter State

```typescript
interface SearchFilters {
  priceRange: [number, number]
  rating: number | null
  airlines?: string[]
  amenities?: string[]
  sortBy: 'PRICE_ASC' | 'PRICE_DESC' | 'RATING' | 'POPULARITY'
}
```

#### Deliverables
- Results display working
- Filters functional

#### Acceptance Criteria
- [ ] Results display correctly
- [ ] Filters update results in real-time
- [ ] Sorting works for all options
- [ ] Pagination functional

---

### Day 26-28: Search API & Integration

#### Tasks
- [ ] Create search API routes:
  - `/api/search/flights`
  - `/api/search/hotels`
  - `/api/search/packages`
- [ ] Implement mock data for development
- [ ] Add search caching with React Query
- [ ] Create search hooks:
  - `useFlightSearch`
  - `useHotelSearch`
  - `usePackageSearch`
- [ ] Integrate with frontend forms
- [ ] Add URL state synchronization
- [ ] Implement deep linking

#### Deliverables
- Search API functional
- Frontend integration complete

#### Acceptance Criteria
- [ ] API returns formatted results
- [ ] Search from UI works end-to-end
- [ ] URL updates with search params
- [ ] Back button works correctly

---

## Week 5: Booking Flow

### Day 29-30: Booking Form

#### Tasks
- [ ] Create BookingForm component
- [ ] Build passenger information form:
  - Title (Mr/Mrs/Ms/Dr)
  - Full name (as on passport)
  - Date of birth
  - Nationality
  - Passport details (for international)
  - Contact information
- [ ] Support multiple passengers
- [ ] Add form validation
- [ ] Create booking summary sidebar
- [ ] Implement price breakdown

#### Passenger Schema

```typescript
interface Passenger {
  id: string
  type: 'ADULT' | 'CHILD' | 'INFANT'
  title: 'MR' | 'MRS' | 'MS' | 'DR'
  firstName: string
  lastName: string
  dateOfBirth: Date
  nationality: string
  passportNumber?: string
  passportExpiry?: Date
  specialRequests?: string
}
```

#### Deliverables
- Booking form complete
- Multi-passenger support

#### Acceptance Criteria
- [ ] Can add multiple passengers
- [ ] All required fields validated
- [ ] Passport fields show for international
- [ ] Form state persists during navigation

---

### Day 31-33: Payment Integration

#### Tasks
- [ ] Set up Paystack account
- [ ] Install Paystack SDK
  ```bash
  npm install paystack-api
  ```
- [ ] Create payment initialization API
- [ ] Build payment form component
- [ ] Implement Paystack inline JS
- [ ] Handle payment callbacks
- [ ] Create payment verification
- [ ] Add payment methods:
  - Card
  - Bank transfer
  - USSD
  - QR code
- [ ] Implement webhook handler
- [ ] Add payment confirmation page

#### Paystack Integration

```typescript
// Initialize payment
const initializePayment = async (bookingId: string, amount: number) => {
  const response = await fetch('/api/payments/initialize', {
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      amount: amount * 100, // Convert to kobo
      reference: `BOOK-${bookingId}`,
      metadata: { bookingId }
    })
  })
  return response.json()
}

// Paystack inline
const payWithPaystack = () => {
  const handler = window.PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
    email: user.email,
    amount: total * 100,
    currency: 'NGN',
    ref: reference,
    callback: (response) => verifyPayment(response.reference),
    onClose: () => console.log('Payment cancelled'),
  })
  handler.openIframe()
}
```

#### Deliverables
- Paystack integration complete
- Payment flow functional

#### Acceptance Criteria
- [ ] Payment initializes correctly
- [ ] All Paystack methods work
- [ ] Webhooks verify payments
- [ ] Failed payments handled gracefully

---

### Day 34-35: Booking Confirmation

#### Tasks
- [ ] Create confirmation page
- [ ] Build BookingConfirmationCard
- [ ] Generate booking reference
- [ ] Create booking receipt (PDF option)
- [ ] Send confirmation email
- [ ] Send SMS confirmation (Twilio)
- [ ] Update booking status
- [ ] Show booking details
- [ ] Add to calendar option

#### Deliverables
- Confirmation flow complete
- Notifications sent

#### Acceptance Criteria
- [ ] Unique booking reference generated
- [ ] Confirmation email sent
- [ ] SMS delivered
- [ ] Receipt downloadable

---

## Phase 2 Deliverables Summary

| Deliverable | Status | Location |
|-------------|--------|----------|
| Authentication System | 🔲 | `src/app/(auth)/`, `src/lib/auth.ts` |
| User Profile | 🔲 | `src/app/(dashboard)/profile/` |
| Search Forms | 🔲 | `src/components/booking/` |
| Search Results | 🔲 | `src/app/(main)/**/search/` |
| Booking Flow | 🔲 | `src/components/booking/` |
| Payment Integration | 🔲 | `src/lib/paystack.ts` |
| Confirmation System | 🔲 | `src/app/(main)/confirmation/` |

---

## Success Criteria

- [ ] Users can register and login
- [ ] All three search types functional
- [ ] Complete booking flow works
- [ ] Payment processes successfully
- [ ] Confirmation sent via email/SMS
- [ ] Booking history accessible

---

## Testing Checklist

- [ ] Unit tests for auth forms
- [ ] Integration tests for booking flow
- [ ] E2E test: complete booking journey
- [ ] Payment webhook tests
- [ ] Form validation tests

---

## Next Phase Handoff

Upon completion of Phase 2:

1. ✅ User authentication system
2. ✅ Multi-type search functionality
3. ✅ Complete booking flow
4. ✅ Payment processing
5. ✅ Basic user dashboard

---

*Phase Start Date: After Phase 1*  
*Target Completion: +3 weeks*  
*Last Updated: 2026-04-13*
