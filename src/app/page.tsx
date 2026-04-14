import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Plane,
  Hotel,
  MapPin,
  Shield,
  Phone,
  Star,
  ChevronRight,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-naija-green">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              Naija<span className="text-naija-green">Travel</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/flights"
              className="text-sm font-medium transition-colors hover:text-naija-green"
            >
              Flights
            </Link>
            <Link
              href="/hotels"
              className="text-sm font-medium transition-colors hover:text-naija-green"
            >
              Hotels
            </Link>
            <Link
              href="/packages"
              className="text-sm font-medium transition-colors hover:text-naija-green"
            >
              Packages
            </Link>
            <Link
              href="/visa-services"
              className="text-sm font-medium transition-colors hover:text-naija-green"
            >
              Visa
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-naija-green hover:bg-naija-green-dark"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-naija-green via-naija-green to-naija-green-dark py-20 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center text-white">
            <Badge className="mb-6 border-white/30 bg-white/20 text-white hover:bg-white/30">
              🇳🇬 Nigeria&apos;s #1 Travel Platform
            </Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Your Gateway to Seamless{' '}
              <span className="text-naira-gold">Nigerian</span> & International
              Travel
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 md:text-xl">
              Book flights, hotels, and tour packages at the best prices.
              Supporting all Nigerian airlines and international destinations.
            </p>
          </div>

          {/* Search Widget */}
          <Card className="mx-auto max-w-4xl shadow-2xl">
            <CardContent className="p-6">
              {/* Tabs */}
              <div className="mb-6 flex gap-2">
                <Button
                  variant="default"
                  className="gap-2 bg-naija-green hover:bg-naija-green-dark"
                >
                  <Plane className="h-4 w-4" />
                  Flights
                </Button>
                <Button variant="outline" className="gap-2">
                  <Hotel className="h-4 w-4" />
                  Hotels
                </Button>
                <Button variant="outline" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Packages
                </Button>
              </div>

              {/* Search Form */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    From
                  </label>
                  <Input placeholder="Lagos (LOS)" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    To
                  </label>
                  <Input placeholder="Abuja (ABV)" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Departure
                  </label>
                  <Input type="date" className="h-12" />
                </div>
                <div className="flex items-end">
                  <Button className="h-12 w-full bg-naija-green text-base font-semibold hover:bg-naija-green-dark">
                    Search Flights
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Why Choose NaijaTravel Pro?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              We make travel booking simple, affordable, and reliable for
              Nigerians
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-none shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-naija-green/10">
                    <feature.icon className="h-6 w-6 text-naija-green" />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Popular Destinations</h2>
              <p className="text-muted-foreground">
                Explore top destinations from Nigeria
              </p>
            </div>
            <Link href="/destinations">
              <Button variant="outline" className="gap-2">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination) => (
              <Card
                key={destination.name}
                className="group cursor-pointer overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{destination.name}</h3>
                    <p className="text-sm text-white/80">
                      From {destination.price}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nigerian Airlines */}
      <section className="bg-naija-green/5 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Nigerian Airlines We Support
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Book flights with all major domestic carriers
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {airlines.map((airline) => (
              <div
                key={airline}
                className="rounded-lg bg-white px-6 py-3 shadow-sm"
              >
                <span className="font-semibold text-muted-foreground">
                  {airline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            What Travelers Say
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="fill-naira-gold text-naira-gold h-4 w-4"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-naija-green py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/90">
            Join thousands of Nigerian travelers who trust us for their travel
            bookings. Sign up now and get exclusive deals.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-naija-green hover:bg-white/90"
              >
                Create Free Account
              </Button>
            </Link>
            <Link href="/flights">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Search Flights
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-naija-green">
                  <Plane className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">
                  Naija<span className="text-naija-green">Travel</span>
                </span>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Your trusted partner for flights, hotels, and tour packages
                across Nigeria and beyond.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+234 800 123 4567</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/flights" className="hover:text-naija-green">
                    Flights
                  </Link>
                </li>
                <li>
                  <Link href="/hotels" className="hover:text-naija-green">
                    Hotels
                  </Link>
                </li>
                <li>
                  <Link href="/packages" className="hover:text-naija-green">
                    Tour Packages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/visa-services"
                    className="hover:text-naija-green"
                  >
                    Visa Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/faq" className="hover:text-naija-green">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-naija-green">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-naija-green">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-naija-green">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Trust Badges */}
            <div>
              <h4 className="mb-4 font-semibold">Trust & Safety</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-naija-green" />
                  <span>NDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-naija-green" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-naija-green" />
                  <span>CAC Registered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 NaijaTravel Pro. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-naija-green"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-naija-green"
              >
                Privacy
              </Link>
              <Link
                href="/sitemap"
                className="text-sm text-muted-foreground hover:text-naija-green"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Data
const features = [
  {
    icon: Plane,
    title: 'Best Flight Deals',
    description:
      'Compare prices across all Nigerian airlines and international carriers',
  },
  {
    icon: Hotel,
    title: 'Handpicked Hotels',
    description:
      'Curated selection of quality hotels across Nigeria and worldwide',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description:
      'Pay with Paystack, bank transfer, USSD, or card - 100% secure',
  },
  {
    icon: Phone,
    title: '24/7 Support',
    description: 'Round-the-clock customer service for all your travel needs',
  },
]

const destinations = [
  { name: 'Lagos', price: '₦45,000' },
  { name: 'Abuja', price: '₦52,000' },
  { name: 'Port Harcourt', price: '₦48,000' },
  { name: 'Kano', price: '₦55,000' },
]

const airlines = [
  'Air Peace',
  'Arik Air',
  'Dana Air',
  'Ibom Air',
  'Max Air',
  'United Nigeria',
  'Overland',
]

const testimonials = [
  {
    text: 'Booking my Lagos to Abuja flight was seamless. Got the best price and the customer service was excellent!',
    name: 'Chidinma O.',
    location: 'Lagos, Nigeria',
  },
  {
    text: 'I use NaijaTravel for all my business trips. The Paystack integration makes payment so easy.',
    name: 'Emmanuel K.',
    location: 'Abuja, Nigeria',
  },
  {
    text: 'Found an amazing Dubai package deal. Everything was well organized from flights to hotel.',
    name: 'Amina B.',
    location: 'Kano, Nigeria',
  },
]
