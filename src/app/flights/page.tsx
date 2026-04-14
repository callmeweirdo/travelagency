'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Plane,
  ArrowRight,
  Clock,
  Luggage,
  RotateCcw,
  Filter,
  ChevronDown,
  Loader2,
  Check,
} from 'lucide-react'
import { formatNaira } from '@/lib/utils'

// Loading component for Suspense
function FlightsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-naija-green" />
        <p className="text-muted-foreground">Searching for flights...</p>
      </div>
    </div>
  )
}

// Main content component
function FlightsContent() {
  const searchParams = useSearchParams()
  const [flights, setFlights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('price')

  const origin = searchParams.get('origin') || 'LOS'
  const destination = searchParams.get('destination') || 'ABV'
  const departureDate =
    searchParams.get('departureDate') || new Date().toISOString().split('T')[0]
  const adults = searchParams.get('adults') || '1'

  useEffect(() => {
    async function searchFlights() {
      try {
        setLoading(true)
        const params = new URLSearchParams(searchParams)
        const response = await fetch(`/api/flights/search?${params}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to search flights')
        }

        setFlights(data.data.flights)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    searchFlights()
  }, [searchParams])

  // Filter flights
  const filteredFlights = flights.filter((flight) => {
    if (selectedAirlines.length === 0) return true
    return selectedAirlines.includes(flight.airline.name)
  })

  // Sort flights
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price.amount - b.price.amount
      case 'duration':
        return a.duration - b.duration
      case 'departure':
        return (
          new Date(a.departure.time).getTime() -
          new Date(b.departure.time).getTime()
        )
      default:
        return 0
    }
  })

  // Get unique airlines
  const airlines = [...new Set(flights.map((f) => f.airline.name))]

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('en-NG', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  if (loading) {
    return <FlightsLoading />
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-500">{error}</p>
          <Link href="/">
            <Button>Go Back</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-naija-green">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              Naija<span className="text-naija-green">Travel</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Search Summary */}
      <div className="bg-naija-green py-4 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{origin}</p>
                <p className="text-sm text-white/80">{departureDate}</p>
              </div>
              <ArrowRight className="h-6 w-6" />
              <div className="text-center">
                <p className="text-2xl font-bold">{destination}</p>
                <p className="text-sm text-white/80">{adults} Passenger(s)</p>
              </div>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Modify Search
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  <h3 className="font-semibold">Filters</h3>
                </div>

                {/* Airline Filter */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-medium">Airlines</h4>
                  <div className="space-y-2">
                    {airlines.map((airline) => (
                      <div
                        key={airline}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={airline}
                          checked={selectedAirlines.includes(airline)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAirlines([
                                ...selectedAirlines,
                                airline,
                              ])
                            } else {
                              setSelectedAirlines(
                                selectedAirlines.filter((a) => a !== airline)
                              )
                            }
                          }}
                        />
                        <label
                          htmlFor={airline}
                          className="cursor-pointer text-sm text-muted-foreground"
                        >
                          {airline}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Stops Filter */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-medium">Stops</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nonstop" defaultChecked />
                      <label
                        htmlFor="nonstop"
                        className="text-sm text-muted-foreground"
                      >
                        Non-stop
                      </label>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedAirlines([])}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                {sortedFlights.length} flights found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price (Lowest)</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="departure">Departure Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Flight Cards */}
            <div className="space-y-4">
              {sortedFlights.map((flight) => (
                <Card
                  key={flight.id}
                  className="transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                      {/* Airline Info */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                          <Plane className="h-6 w-6 text-naija-green" />
                        </div>
                        <div>
                          <p className="font-semibold">{flight.airline.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {flight.flightNumber} • {flight.aircraft}
                          </p>
                        </div>
                      </div>

                      {/* Flight Times */}
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold">
                            {formatTime(flight.departure.time)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {flight.departure.airport.code}
                          </p>
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm text-muted-foreground">
                            {formatDuration(flight.duration)}
                          </p>
                          <div className="relative my-2 h-px w-24 bg-border">
                            <Plane className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            Direct
                          </Badge>
                        </div>

                        <div className="text-center">
                          <p className="text-2xl font-bold">
                            {formatTime(flight.arrival.time)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {flight.arrival.airport.code}
                          </p>
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-naija-green">
                            {formatNaira(flight.price.amount)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            per person
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Luggage className="h-4 w-4" />
                          <span>{flight.baggage.checked}</span>
                        </div>
                        <Button className="mt-2 bg-naija-green hover:bg-naija-green-dark">
                          Select
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main page component with Suspense
export default function FlightsPage() {
  return (
    <Suspense fallback={<FlightsLoading />}>
      <FlightsContent />
    </Suspense>
  )
}
