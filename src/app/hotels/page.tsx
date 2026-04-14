'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  Loader2,
} from 'lucide-react'
import { formatNaira } from '@/lib/utils'

function HotelsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-naija-green" />
        <p className="text-muted-foreground">Searching for hotels...</p>
      </div>
    </div>
  )
}

function HotelsContent() {
  const searchParams = useSearchParams()
  const [hotels, setHotels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStars, setSelectedStars] = useState<number[]>([])

  const location = searchParams.get('location') || 'Lagos'
  const checkIn =
    searchParams.get('checkIn') || new Date().toISOString().split('T')[0]
  const checkOut =
    searchParams.get('checkOut') ||
    new Date(Date.now() + 86400000).toISOString().split('T')[0]

  useEffect(() => {
    async function searchHotels() {
      try {
        setLoading(true)
        const params = new URLSearchParams(searchParams)
        const response = await fetch(`/api/hotels/search?${params}`)
        const data = await response.json()
        if (response.ok) setHotels(data.data.hotels)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    searchHotels()
  }, [searchParams])

  const filteredHotels = hotels.filter(
    (h) => selectedStars.length === 0 || selectedStars.includes(h.starRating)
  )

  if (loading) return <HotelsLoading />

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-naija-green py-4 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Hotels in {location}</h1>
              <p className="text-white/80">
                {checkIn} - {checkOut}
              </p>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Modify
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <Card className="h-fit lg:col-span-1">
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold">Filters</h3>
              <div className="space-y-2">
                {[5, 4, 3].map((stars) => (
                  <div key={stars} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedStars.includes(stars)}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedStars([...selectedStars, stars])
                        else
                          setSelectedStars(
                            selectedStars.filter((s) => s !== stars)
                          )
                      }}
                    />
                    <span className="text-sm">{stars} Stars</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 lg:col-span-3">
            {filteredHotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="h-48 w-full bg-gradient-to-br from-muted to-muted/50 md:w-64" />
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">
                            {hotel.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {hotel.location}
                          </div>
                          <div className="mt-2 flex items-center gap-1">
                            {[...Array(hotel.starRating)].map((_, i) => (
                              <Star
                                key={i}
                                className="fill-naira-gold text-naira-gold h-4 w-4"
                              />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">
                              ({hotel.reviews} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-naija-green">
                            {formatNaira(hotel.pricePerNight)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            per night
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {hotel.amenities.slice(0, 4).map((amenity: string) => (
                          <Badge
                            key={amenity}
                            variant="secondary"
                            className="text-xs"
                          >
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Total: {formatNaira(hotel.totalPrice)} for{' '}
                          {hotel.nights} nights
                        </p>
                        <Button className="bg-naija-green hover:bg-naija-green-dark">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<HotelsLoading />}>
      <HotelsContent />
    </Suspense>
  )
}
