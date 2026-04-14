// ============================================
// NAIJATRAVEL PRO - TYPE DEFINITIONS
// ============================================

// Base Types
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// ============================================
// USER & AUTH TYPES
// ============================================

export interface User extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  phone: string
  dateOfBirth?: Date
  nationality: string
  gender?: 'male' | 'female' | 'other'
  address?: Address
  profileImage?: string
  role: 'user' | 'admin' | 'agent'
  emailVerified: boolean
  phoneVerified: boolean
  preferences: UserPreferences
}

export interface Address {
  street: string
  city: string
  lga?: string // Local Government Area (Nigeria-specific)
  state: string
  country: string
  postalCode?: string
}

export interface UserPreferences {
  currency: 'NGN' | 'USD' | 'EUR' | 'GBP'
  language: 'en' | 'ig' | 'yo' | 'ha'
  newsletter: boolean
  smsNotifications: boolean
  emailNotifications: boolean
  whatsappNotifications: boolean
}

// ============================================
// BOOKING TYPES
// ============================================

export type BookingType = 'flight' | 'hotel' | 'package' | 'visa' | 'insurance'
export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'refunded'
export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'

export interface Booking extends BaseEntity {
  bookingNumber: string
  userId: string
  type: BookingType
  status: BookingStatus
  paymentStatus: PaymentStatus
  totalAmount: number
  currency: string
  items: BookingItem[]
  passengers?: Passenger[]
  contactInfo: ContactInfo
  specialRequests?: string
  metadata?: Record<string, unknown>
}

export interface BookingItem {
  id: string
  type: BookingType
  name: string
  description?: string
  quantity: number
  unitPrice: number
  totalPrice: number
  startDate?: Date
  endDate?: Date
  details: Record<string, unknown>
}

export interface Passenger {
  id: string
  type: 'adult' | 'child' | 'infant'
  title: 'mr' | 'mrs' | 'ms' | 'dr' | 'prof'
  firstName: string
  lastName: string
  dateOfBirth: Date
  nationality: string
  passportNumber?: string
  passportExpiry?: Date
  specialRequests?: string
}

export interface ContactInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  alternativePhone?: string
}

// ============================================
// FLIGHT TYPES
// ============================================

export interface Flight {
  id: string
  flightNumber: string
  airline: Airline
  departure: FlightLeg
  arrival: FlightLeg
  duration: number // in minutes
  aircraft?: string
  baggage: BaggageInfo
  amenities: string[]
  price: number
  seatsAvailable: number
  class: 'economy' | 'premium_economy' | 'business' | 'first'
}

export interface FlightLeg {
  airport: Airport
  terminal?: string
  gate?: string
  time: Date
}

export interface Airport {
  code: string // e.g., 'LOS', 'ABV'
  name: string
  city: string
  country: string
  timezone: string
}

export interface Airline {
  code: string // e.g., 'P4' for Air Peace
  name: string
  logo?: string
  isDomestic: boolean
}

export interface BaggageInfo {
  carryOn: string
  checked: string
  excessFee?: number
}

export interface FlightSearchParams {
  origin: string
  destination: string
  departureDate: Date
  returnDate?: Date
  passengers: {
    adults: number
    children: number
    infants: number
  }
  class: 'economy' | 'premium_economy' | 'business' | 'first'
  tripType: 'one_way' | 'round_trip' | 'multi_city'
}

// ============================================
// HOTEL TYPES
// ============================================

export interface Hotel {
  id: string
  name: string
  description: string
  address: Address
  rating: number
  starRating: 1 | 2 | 3 | 4 | 5
  images: string[]
  amenities: string[]
  roomTypes: RoomType[]
  policies: HotelPolicy
  reviews: Review[]
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export interface RoomType {
  id: string
  name: string
  description: string
  maxOccupancy: number
  bedType: string
  size?: string
  images: string[]
  amenities: string[]
  pricePerNight: number
  availableRooms: number
}

export interface HotelPolicy {
  checkIn: string
  checkOut: string
  cancellation: string
  children: string
  pets: string
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: Date
  verified: boolean
}

// ============================================
// TOUR PACKAGE TYPES
// ============================================

export interface TourPackage extends BaseEntity {
  title: string
  slug: string
  description: string
  summary: string
  destination: Destination
  duration: {
    days: number
    nights: number
  }
  images: string[]
  highlights: string[]
  itinerary: ItineraryDay[]
  inclusions: string[]
  exclusions: string[]
  price: {
    amount: number
    currency: string
    perPerson: boolean
  }
  maxGroupSize: number
  availableDates: PackageDate[]
  category:
    | 'domestic'
    | 'international'
    | 'honeymoon'
    | 'adventure'
    | 'pilgrimage'
  tags: string[]
  rating: number
  reviews: number
}

export interface Destination {
  id: string
  name: string
  country: string
  region?: string
  description: string
  images: string[]
  highlights: string[]
  bestTimeToVisit: string
  weatherInfo: string
  popular: boolean
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
  meals: {
    breakfast?: boolean
    lunch?: boolean
    dinner?: boolean
  }
  accommodation?: string
}

export interface PackageDate {
  startDate: Date
  endDate: Date
  availableSlots: number
  priceModifier: number // percentage
}

// ============================================
// PAYMENT TYPES
// ============================================

export interface Payment {
  id: string
  bookingId: string
  userId: string
  amount: number
  currency: string
  status: PaymentStatus
  method: PaymentMethod
  provider: 'paystack' | 'flutterwave'
  providerRef?: string
  paidAt?: Date
  metadata?: Record<string, unknown>
}

export type PaymentMethod =
  | 'card'
  | 'bank_transfer'
  | 'ussd'
  | 'mobile_money'
  | 'qr'
  | 'bank'

export interface PaystackConfig {
  publicKey: string
  email: string
  amount: number // in kobo
  reference: string
  metadata: Record<string, unknown>
  callback_url?: string
}

// ============================================
// VISA SERVICE TYPES
// ============================================

export interface VisaService extends BaseEntity {
  country: string
  countryCode: string
  visaType: string
  description: string
  requirements: string[]
  processingTime: string
  validity: string
  stayDuration: string
  price: {
    serviceFee: number
    embassyFee: number
    total: number
  }
  documents: RequiredDocument[]
  faqs: FAQ[]
}

export interface RequiredDocument {
  name: string
  description: string
  required: boolean
  multiple: boolean
}

export interface FAQ {
  question: string
  answer: string
}

// ============================================
// TRAVEL INSURANCE TYPES
// ============================================

export interface InsurancePlan extends BaseEntity {
  name: string
  provider: string
  coverage: string[]
  medicalCoverage: number
  tripCancellation: number
  baggageLoss: number
  flightDelay: number
  pricePerDay: number
  minDays: number
  maxDays: number
  destinations: ('schengen' | 'worldwide' | 'africa' | 'domestic')[]
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// ============================================
// UI/UX TYPES
// ============================================

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
  duration?: number
}

export interface NavItem {
  title: string
  href: string
  icon?: string
  children?: NavItem[]
}

export interface SearchFilters {
  priceRange?: [number, number]
  rating?: number
  amenities?: string[]
  airlines?: string[]
  stops?: ('nonstop' | '1_stop' | '2_plus_stops')[]
  sortBy?: 'price' | 'duration' | 'rating' | 'recommended'
}
