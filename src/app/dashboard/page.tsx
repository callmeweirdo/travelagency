'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Plane,
  Hotel,
  Wallet,
  Heart,
  Settings,
  Calendar,
  Loader2,
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    // Mock user data - replace with actual token verification
    setUser({ name: 'User', email: 'user@example.com' })
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-naija-green" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-naija-green">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              Naija<span className="text-naija-green">Travel</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.name}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                localStorage.removeItem('token')
                router.push('/')
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <span className="text-2xl font-bold text-naija-green">
                      {user?.name?.[0] || 'U'}
                    </span>
                  </div>
                  <h3 className="font-semibold">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>

                <nav className="space-y-2">
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      <Plane className="mr-2 h-4 w-4" />
                      My Bookings
                    </Button>
                  </Link>
                  <Link href="/dashboard/wallet">
                    <Button variant="ghost" className="w-full justify-start">
                      <Wallet className="mr-2 h-4 w-4" />
                      Wallet
                    </Button>
                  </Link>
                  <Link href="/dashboard/saved">
                    <Button variant="ghost" className="w-full justify-start">
                      <Heart className="mr-2 h-4 w-4" />
                      Saved Items
                    </Button>
                  </Link>
                  <Link href="/dashboard/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Button>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

            {/* Stats Cards */}
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-naija-green/10">
                      <Plane className="h-6 w-6 text-naija-green" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">
                        Flight Bookings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <Hotel className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">
                        Hotel Bookings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                      <Wallet className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">₦0</p>
                      <p className="text-sm text-muted-foreground">
                        Wallet Balance
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bookings Tabs */}
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-6">
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">
                      No upcoming bookings
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      Start planning your next trip with NaijaTravel
                    </p>
                    <div className="flex justify-center gap-4">
                      <Link href="/flights?origin=LOS&destination=ABV">
                        <Button className="bg-naija-green hover:bg-naija-green-dark">
                          <Plane className="mr-2 h-4 w-4" />
                          Book Flight
                        </Button>
                      </Link>
                      <Link href="/hotels?location=Lagos">
                        <Button variant="outline">
                          <Hotel className="mr-2 h-4 w-4" />
                          Book Hotel
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="past" className="mt-6">
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">
                      No past bookings found
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cancelled" className="mt-6">
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">
                      No cancelled bookings
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
