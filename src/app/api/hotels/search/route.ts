import { NextResponse } from 'next/server'
import { z } from 'zod'

const searchSchema = z.object({
  location: z.string().min(2),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.string().default('1'),
  children: z.string().default('0'),
  rooms: z.string().default('1'),
})

const NIGERIAN_HOTELS = [
  {
    id: 'h1',
    name: 'Eko Hotel & Suites',
    location: 'Victoria Island, Lagos',
    rating: 4.5,
    starRating: 5,
    pricePerNight: 75000,
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym'],
    images: ['/images/hotels/eko-hotel.jpg'],
    reviews: 1250,
    coordinates: { lat: 6.4281, lng: 3.4219 },
  },
  {
    id: 'h2',
    name: 'Transcorp Hilton Abuja',
    location: 'Maitama, Abuja',
    rating: 4.7,
    starRating: 5,
    pricePerNight: 95000,
    amenities: [
      'Free WiFi',
      'Pool',
      'Spa',
      'Restaurant',
      'Bar',
      'Gym',
      'Business Center',
    ],
    images: ['/images/hotels/transcorp.jpg'],
    reviews: 980,
    coordinates: { lat: 9.0765, lng: 7.3986 },
  },
  {
    id: 'h3',
    name: 'Sheraton Lagos Hotel',
    location: 'Ikeja, Lagos',
    rating: 4.3,
    starRating: 5,
    pricePerNight: 68000,
    amenities: [
      'Free WiFi',
      'Pool',
      'Restaurant',
      'Bar',
      'Gym',
      'Airport Shuttle',
    ],
    images: ['/images/hotels/sheraton.jpg'],
    reviews: 850,
    coordinates: { lat: 6.5244, lng: 3.3792 },
  },
  {
    id: 'h4',
    name: 'Protea Hotel by Marriott',
    location: 'Victoria Island, Lagos',
    rating: 4.2,
    starRating: 4,
    pricePerNight: 55000,
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Bar', 'Gym'],
    images: ['/images/hotels/protea.jpg'],
    reviews: 720,
    coordinates: { lat: 6.4281, lng: 3.4219 },
  },
  {
    id: 'h5',
    name: 'Radisson Blu Anchorage',
    location: 'Victoria Island, Lagos',
    rating: 4.4,
    starRating: 5,
    pricePerNight: 82000,
    amenities: [
      'Free WiFi',
      'Pool',
      'Spa',
      'Restaurant',
      'Bar',
      'Gym',
      'Waterfront',
    ],
    images: ['/images/hotels/radisson.jpg'],
    reviews: 640,
    coordinates: { lat: 6.4281, lng: 3.4219 },
  },
  {
    id: 'h6',
    name: 'Four Points by Sheraton',
    location: 'Lekki, Lagos',
    rating: 4.1,
    starRating: 4,
    pricePerNight: 48000,
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Bar', 'Gym'],
    images: ['/images/hotels/four-points.jpg'],
    reviews: 580,
    coordinates: { lat: 6.4698, lng: 3.5852 },
  },
  {
    id: 'h7',
    name: 'Nike Art Gallery & Hotel',
    location: 'Lekki, Lagos',
    rating: 4.6,
    starRating: 3,
    pricePerNight: 35000,
    amenities: ['Free WiFi', 'Restaurant', 'Art Gallery', 'Cultural Tours'],
    images: ['/images/hotels/nike-art.jpg'],
    reviews: 420,
    coordinates: { lat: 6.4698, lng: 3.5852 },
  },
  {
    id: 'h8',
    name: 'Grand Ibro Hotel',
    location: 'Wuse, Abuja',
    rating: 3.9,
    starRating: 4,
    pricePerNight: 32000,
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Conference Rooms'],
    images: ['/images/hotels/ibro.jpg'],
    reviews: 380,
    coordinates: { lat: 9.0765, lng: 7.3986 },
  },
  {
    id: 'h9',
    name: 'Azman Hotels',
    location: 'Kano',
    rating: 4.0,
    starRating: 4,
    pricePerNight: 28000,
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Bar'],
    images: ['/images/hotels/azman.jpg'],
    reviews: 290,
    coordinates: { lat: 12.0022, lng: 8.592 },
  },
  {
    id: 'h10',
    name: 'Hotel Presidential',
    location: 'Port Harcourt',
    rating: 4.2,
    starRating: 4,
    pricePerNight: 45000,
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Bar', 'Gym'],
    images: ['/images/hotels/presidential.jpg'],
    reviews: 510,
    coordinates: { lat: 4.8156, lng: 7.0498 },
  },
]

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const params = searchSchema.parse({
      location: searchParams.get('location'),
      checkIn: searchParams.get('checkIn'),
      checkOut: searchParams.get('checkOut'),
      adults: searchParams.get('adults') || '1',
      children: searchParams.get('children') || '0',
      rooms: searchParams.get('rooms') || '1',
    })

    // Filter hotels by location (case-insensitive partial match)
    const locationLower = params.location.toLowerCase()
    let hotels = NIGERIAN_HOTELS.filter(
      (hotel) =>
        hotel.location.toLowerCase().includes(locationLower) ||
        hotel.name.toLowerCase().includes(locationLower)
    )

    // If no exact match, return all hotels
    if (hotels.length === 0) {
      hotels = NIGERIAN_HOTELS
    }

    // Calculate nights
    const checkIn = new Date(params.checkIn)
    const checkOut = new Date(params.checkOut)
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    )

    // Add calculated fields
    const hotelsWithTotals = hotels.map((hotel) => ({
      ...hotel,
      totalPrice: hotel.pricePerNight * Math.max(1, nights),
      nights: Math.max(1, nights),
    }))

    return NextResponse.json({
      success: true,
      data: {
        hotels: hotelsWithTotals,
        searchParams: {
          ...params,
          nights: Math.max(1, nights),
        },
        totalResults: hotelsWithTotals.length,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid search parameters', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Hotel search error:', error)
    return NextResponse.json(
      { error: 'Failed to search hotels' },
      { status: 500 }
    )
  }
}
