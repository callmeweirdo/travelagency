import { NextResponse } from 'next/server'
import { z } from 'zod'

const searchSchema = z.object({
  origin: z.string().min(3),
  destination: z.string().min(3),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  adults: z.string().default('1'),
  children: z.string().default('0'),
  infants: z.string().default('0'),
  travelClass: z
    .enum(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'])
    .default('ECONOMY'),
  tripType: z.enum(['ONE_WAY', 'ROUND_TRIP']).default('ONE_WAY'),
})

// Mock flight data for Nigerian airlines
const MOCK_AIRLINES = [
  { code: 'P4', name: 'Air Peace', logo: '/images/airlines/air-peace.png' },
  { code: 'W3', name: 'Arik Air', logo: '/images/airlines/arik-air.png' },
  { code: '9J', name: 'Dana Air', logo: '/images/airlines/dana-air.png' },
  { code: 'QI', name: 'Ibom Air', logo: '/images/airlines/ibom-air.png' },
  { code: 'VM', name: 'Max Air', logo: '/images/airlines/max-air.png' },
  {
    code: 'U5',
    name: 'United Nigeria',
    logo: '/images/airlines/united-nigeria.png',
  },
]

const AIRPORTS = {
  LOS: {
    code: 'LOS',
    name: 'Murtala Muhammed International Airport',
    city: 'Lagos',
    state: 'Lagos',
  },
  ABV: {
    code: 'ABV',
    name: 'Nnamdi Azikiwe International Airport',
    city: 'Abuja',
    state: 'FCT',
  },
  PHC: {
    code: 'PHC',
    name: 'Port Harcourt International Airport',
    city: 'Port Harcourt',
    state: 'Rivers',
  },
  KAN: {
    code: 'KAN',
    name: 'Mallam Aminu Kano International Airport',
    city: 'Kano',
    state: 'Kano',
  },
  ENU: {
    code: 'ENU',
    name: 'Akanu Ibiam International Airport',
    city: 'Enugu',
    state: 'Enugu',
  },
  BNI: { code: 'BNI', name: 'Benin Airport', city: 'Benin', state: 'Edo' },
  YOL: { code: 'YOL', name: 'Yola Airport', city: 'Yola', state: 'Adamawa' },
  KAD: { code: 'KAD', name: 'Kaduna Airport', city: 'Kaduna', state: 'Kaduna' },
  ILR: { code: 'ILR', name: 'Ilorin Airport', city: 'Ilorin', state: 'Kwara' },
  UYO: {
    code: 'UYO',
    name: 'Akwa Ibom Airport',
    city: 'Uyo',
    state: 'Akwa Ibom',
  },
  OWR: {
    code: 'OWR',
    name: 'Sam Mbakwe Airport',
    city: 'Owerri',
    state: 'Imo',
  },
  MDI: {
    code: 'MDI',
    name: 'Maiduguri International Airport',
    city: 'Maiduguri',
    state: 'Borno',
  },
}

function generateMockFlights(params: z.infer<typeof searchSchema>) {
  const flights = []
  const departureDate = new Date(params.departureDate)
  const basePrice = calculateBasePrice(params.origin, params.destination)

  // Generate 3-5 flights per airline
  MOCK_AIRLINES.forEach((airline, airlineIndex) => {
    const numFlights = 3 + Math.floor(Math.random() * 3)

    for (let i = 0; i < numFlights; i++) {
      const departureTime = new Date(departureDate)
      departureTime.setHours(
        6 + i * 3 + airlineIndex,
        Math.floor(Math.random() * 60)
      )

      const duration = calculateDuration(params.origin, params.destination)
      const arrivalTime = new Date(departureTime.getTime() + duration * 60000)

      const priceVariation = 0.8 + Math.random() * 0.4 // 0.8x to 1.2x
      const price = Math.round(basePrice * priceVariation)

      flights.push({
        id: `${airline.code}-${Date.now()}-${i}`,
        flightNumber: `${airline.code}${100 + Math.floor(Math.random() * 900)}`,
        airline: airline,
        departure: {
          airport: AIRPORTS[params.origin as keyof typeof AIRPORTS],
          time: departureTime.toISOString(),
          terminal: `T${Math.floor(Math.random() * 2) + 1}`,
        },
        arrival: {
          airport: AIRPORTS[params.destination as keyof typeof AIRPORTS],
          time: arrivalTime.toISOString(),
          terminal: `T${Math.floor(Math.random() * 2) + 1}`,
        },
        duration: duration,
        aircraft: ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A330'][
          Math.floor(Math.random() * 4)
        ],
        class: params.travelClass,
        price: {
          amount: price,
          currency: 'NGN',
        },
        seatsAvailable: Math.floor(Math.random() * 20) + 5,
        baggage: {
          carryOn: '7kg',
          checked: params.travelClass === 'ECONOMY' ? '23kg' : '32kg',
        },
        refundable: Math.random() > 0.5,
        stops: 0,
      })
    }
  })

  // Sort by price
  return flights.sort((a, b) => a.price.amount - b.price.amount)
}

function calculateBasePrice(origin: string, destination: string) {
  const routeKey = `${origin}-${destination}`
  const prices: Record<string, number> = {
    'LOS-ABV': 45000,
    'ABV-LOS': 42000,
    'LOS-PHC': 38000,
    'PHC-LOS': 35000,
    'ABV-PHC': 40000,
    'PHC-ABV': 38000,
    'LOS-KAN': 55000,
    'KAN-LOS': 52000,
    'ABV-KAN': 35000,
    'KAN-ABV': 32000,
    'LOS-ENU': 42000,
    'ENU-LOS': 40000,
  }

  return prices[routeKey] || 35000 + Math.floor(Math.random() * 30000)
}

function calculateDuration(origin: string, destination: string) {
  const routeKey = `${origin}-${destination}`
  const durations: Record<string, number> = {
    'LOS-ABV': 75,
    'ABV-LOS': 75,
    'LOS-PHC': 65,
    'PHC-LOS': 65,
    'ABV-PHC': 80,
    'PHC-ABV': 80,
    'LOS-KAN': 90,
    'KAN-LOS': 90,
    'ABV-KAN': 55,
    'KAN-ABV': 55,
    'LOS-ENU': 70,
    'ENU-LOS': 70,
  }

  return durations[routeKey] || 75
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const params = searchSchema.parse({
      origin: searchParams.get('origin'),
      destination: searchParams.get('destination'),
      departureDate: searchParams.get('departureDate'),
      returnDate: searchParams.get('returnDate'),
      adults: searchParams.get('adults') || '1',
      children: searchParams.get('children') || '0',
      infants: searchParams.get('infants') || '0',
      travelClass: searchParams.get('travelClass') || 'ECONOMY',
      tripType: searchParams.get('tripType') || 'ONE_WAY',
    })

    // Validate airports
    if (!AIRPORTS[params.origin as keyof typeof AIRPORTS]) {
      return NextResponse.json(
        { error: 'Invalid origin airport' },
        { status: 400 }
      )
    }

    if (!AIRPORTS[params.destination as keyof typeof AIRPORTS]) {
      return NextResponse.json(
        { error: 'Invalid destination airport' },
        { status: 400 }
      )
    }

    const flights = generateMockFlights(params)

    return NextResponse.json({
      success: true,
      data: {
        flights,
        searchParams: params,
        totalResults: flights.length,
        airlines: [...new Set(flights.map((f) => f.airline.name))],
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid search parameters', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Flight search error:', error)
    return NextResponse.json(
      { error: 'Failed to search flights' },
      { status: 500 }
    )
  }
}
