# Phase 4: Real-time & Experience (Weeks 9-11)

**Objective:** Animations, real-time features, and UX enhancements  
**Duration:** 3 Weeks  
**Status:** 🔴 Not Started  
**Prerequisites:** Phase 3 Complete

---

## Week 9: Animations & Interactions

### Day 57-58: Page Transitions

#### Tasks
- [ ] Set up Framer Motion AnimatePresence
- [ ] Create page transition wrapper
- [ ] Implement fade transitions
- [ ] Add slide transitions
- [ ] Create scale transitions
- [ ] Build custom transition variants
- [ ] Add transition preferences (reduced motion)
- [ ] Test on different browsers

#### Page Transition Component

```tsx
// src/components/animations/PageTransition.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

#### Deliverables
- Page transitions working
- Smooth navigation experience

#### Acceptance Criteria
- [ ] Transitions are smooth (60fps)
- [ ] No layout shift during transition
- [ ] Reduced motion respected
- [ ] Works on all pages

---

### Day 59-60: Scroll Animations

#### Tasks
- [ ] Create ScrollReveal component
- [ ] Build useScrollPosition hook
- [ ] Implement scroll-triggered animations:
  - Fade in on scroll
  - Slide in from sides
  - Scale on scroll
  - Parallax effects
- [ ] Add intersection observer integration
- [ ] Create stagger animations for lists
- [ ] Build progress indicators
- [ ] Implement scroll-to-top button

#### Animation Components

```tsx
// Scroll reveal component
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
}: ScrollRevealProps) {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Stagger container
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
```

#### Deliverables
- Scroll animations implemented
- Reveal effects working

#### Acceptance Criteria
- [ ] Elements animate on scroll
- [ ] Stagger effects work correctly
- [ ] Performance remains smooth
- [ ] No animation jank

---

### Day 61-63: Micro-interactions

#### Tasks
- [ ] Add button hover effects
- [ ] Create loading spinners
- [ ] Build skeleton loaders
- [ ] Implement card hover animations
- [ ] Add form field focus animations
- [ ] Create success/error animations
- [ ] Build notification animations
- [ ] Add number counter animations
- [ ] Implement image hover zoom
- [ ] Create toggle animations

#### Micro-interaction Examples

```tsx
// Animated button
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  whileFocus={{ boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' }}
  transition={{ duration: 0.2 }}
>
  Book Now
</motion.button>

// Animated counter
export function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return <motion.span>{count.toLocaleString()}</motion.span>
}
```

#### Deliverables
- Micro-interactions throughout app
- Smooth feedback on actions

#### Acceptance Criteria
- [ ] Hover effects are noticeable but subtle
- [ ] Loading states clear
- [ ] Success/error feedback visible
- [ ] Animations feel natural

---

## Week 10: Real-time Features

### Day 64-65: WebSocket Setup

#### Tasks
- [ ] Choose WebSocket solution (Socket.io vs Pusher)
- [ ] Set up Socket.io server
- [ ] Configure client connection
- [ ] Implement connection management
- [ ] Add reconnection logic
- [ ] Create room/channel structure
- [ ] Set up authentication for sockets
- [ ] Add error handling

#### WebSocket Implementation

```typescript
// Server setup
import { Server } from 'socket.io'

const io = new Server(server)

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  // Join user-specific room
  socket.on('join', (userId: string) => {
    socket.join(`user:${userId}`)
  })

  // Join booking room
  socket.on('subscribe-booking', (bookingId: string) => {
    socket.join(`booking:${bookingId}`)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Client hook
export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL)
    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  return socket
}
```

#### Deliverables
- WebSocket connection established
- Rooms configured

#### Acceptance Criteria
- [ ] Connection establishes reliably
- [ ] Reconnection works automatically
- [ ] Rooms isolate correctly
- [ ] Auth validates socket connections

---

### Day 66-67: Real-time Updates

#### Tasks
- [ ] Implement booking status updates
- [ ] Add live availability changes
- [ ] Create price update broadcasts
- [ ] Build typing indicators (chat)
- [ ] Implement live notifications
- [ ] Add collaborative editing (if applicable)
- [ ] Create activity feed
- [ ] Build presence indicators

#### Booking Updates

```typescript
// Server: Broadcast booking update
export function broadcastBookingUpdate(bookingId: string, update: BookingUpdate) {
  io.to(`booking:${bookingId}`).emit('booking-updated', update)
}

// Client: Listen for updates
export function useBookingUpdates(bookingId: string) {
  const socket = useSocket()
  const [booking, setBooking] = useState<Booking | null>(null)

  useEffect(() => {
    if (!socket) return

    socket.emit('subscribe-booking', bookingId)

    socket.on('booking-updated', (update: BookingUpdate) => {
      setBooking(prev => ({ ...prev, ...update }))
      toast.info(`Booking ${bookingId} has been updated`)
    })

    return () => {
      socket.off('booking-updated')
    }
  }, [socket, bookingId])

  return booking
}
```

#### Deliverables
- Real-time updates functional
- Live data synchronization

#### Acceptance Criteria
- [ ] Updates reflect immediately
- [ ] Multiple tabs stay in sync
- [ ] Notifications display correctly
- [ ] No memory leaks

---

### Day 68-70: Notification System

#### Tasks
- [ ] Build notification infrastructure
- [ ] Create notification types:
  - Booking confirmations
  - Payment receipts
  - Status changes
  - Promotional offers
  - System alerts
- [ ] Implement notification storage
- [ ] Build notification center UI
- [ ] Add notification preferences
- [ ] Create push notification support
- [ ] Implement email fallbacks
- [ ] Add notification analytics

#### Notification System

```typescript
interface Notification {
  id: string
  userId: string
  type: 'BOOKING' | 'PAYMENT' | 'SYSTEM' | 'PROMO'
  title: string
  message: string
  data?: Record<string, any>
  read: boolean
  createdAt: Date
}

// Notification center component
export function NotificationCenter() {
  const { notifications, markAsRead, clearAll } = useNotifications()
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between">
          Notifications
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={() => markAsRead()}>
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          {notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={() => markAsRead(notification.id)}
            />
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

#### Deliverables
- Notification system complete
- Real-time delivery working

#### Acceptance Criteria
- [ ] Notifications display correctly
- [ ] Unread count updates in real-time
- [ ] Mark as read works
- [ ] Persistence across sessions

---

## Week 11: Advanced UX

### Day 71-73: PWA Features

#### Tasks
- [ ] Generate app manifest
- [ ] Create service worker
- [ ] Implement offline support:
  - Cache static assets
  - Cache API responses
  - Offline fallback page
- [ ] Add install prompt
- [ ] Implement background sync
- [ ] Create app icons for all sizes
- [ ] Add splash screens
- [ ] Test on mobile devices

#### PWA Configuration

```typescript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  // ... other config
})

// manifest.json
{
  "name": "NaijaTravel Pro",
  "short_name": "NaijaTravel",
  "description": "Your Gateway to Seamless Nigerian & International Travel",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#006400",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192" },
    { "src": "/icon-512.png", "sizes": "512x512" }
  ]
}
```

#### Deliverables
- PWA installable
- Offline functionality works

#### Acceptance Criteria
- [ ] Can install as PWA
- [ ] Works offline
- [ ] Caches update correctly
- [ ] Icons display properly

---

### Day 74-75: Advanced Features

#### Tasks
- [ ] Build comparison tool:
  - Flight comparison
  - Hotel comparison
  - Package comparison
- [ ] Create wishlist/favorites system
- [ ] Implement share functionality:
  - Native share API
  - Copy link
  - Social sharing
- [ ] Add print styles for bookings
- [ ] Create calendar integration
- [ ] Build trip planner tool
- [ ] Implement guest checkout

#### Comparison Tool

```tsx
export function ComparisonTool({ items, type }: ComparisonProps) {
  const features = getComparisonFeatures(type)

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Feature</th>
            {items.map(item => (
              <th key={item.id} className="text-center">
                <Image src={item.image} alt={item.name} />
                <div>{item.name}</div>
                <Button size="sm">Select</Button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map(feature => (
            <tr key={feature.key}>
              <td className="font-medium">{feature.label}</td>
              {items.map(item => (
                <td key={item.id} className="text-center">
                  {feature.render ? feature.render(item) : item[feature.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

#### Deliverables
- Comparison tool functional
- Wishlist system working

#### Acceptance Criteria
- [ ] Can compare up to 3 items
- [ ] Differences highlighted
- [ ] Wishlist persists
- [ ] Sharing works correctly

---

### Day 76-77: Personalization

#### Tasks
- [ ] Implement user preferences
- [ ] Build recommendation engine:
  - Based on search history
  - Based on bookings
  - Based on favorites
- [ ] Create personalized homepage
- [ ] Add "Recently Viewed" section
- [ ] Implement price alerts
- [ ] Build personalized offers
- [ ] Create user segments
- [ ] Add A/B testing framework

#### Recommendation Engine

```typescript
export function getRecommendations(userId: string): Recommendation[] {
  const user = getUser(userId)
  const searchHistory = getSearchHistory(userId)
  const bookings = getBookings(userId)

  // Collaborative filtering
  const similarUsers = findSimilarUsers(user)
  const popularWithSimilar = getPopularAmongUsers(similarUsers)

  // Content-based filtering
  const preferredDestinations = getPreferredDestinations(searchHistory, bookings)
  const similarDestinations = findSimilarDestinations(preferredDestinations)

  // Combine and rank
  return rankRecommendations([
    ...popularWithSimilar,
    ...similarDestinations,
  ])
}
```

#### Deliverables
- Personalization working
- Recommendations displaying

#### Acceptance Criteria
- [ ] Recommendations relevant
- [ ] Performance acceptable
- [ ] Privacy respected
- [ ] Can opt out

---

## Phase 4 Deliverables Summary

| Deliverable | Status | Location |
|-------------|--------|----------|
| Page Transitions | 🔲 | `src/components/animations/` |
| Scroll Animations | 🔲 | `src/components/animations/` |
| Micro-interactions | 🔲 | Various components |
| WebSocket Setup | 🔲 | `src/lib/socket.ts` |
| Real-time Updates | 🔲 | Hooks + API |
| Notification System | 🔲 | `src/components/notifications/` |
| PWA Features | 🔲 | `public/`, `next.config.js` |
| Comparison Tool | 🔲 | `src/components/comparison/` |
| Wishlist System | 🔲 | `src/store/slices/` |
| Personalization | 🔲 | `src/lib/recommendations.ts` |

---

## Success Criteria

- [ ] All page transitions are smooth
- [ ] Real-time updates work reliably
- [ ] Notification system functional
- [ ] PWA is installable
- [ ] Animations enhance UX without hurting performance
- [ ] Personalization increases engagement

---

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Animation FPS | 60 | Chrome DevTools |
| First Contentful Paint | <1.5s | Lighthouse |
| Time to Interactive | <3.5s | Lighthouse |
| Cumulative Layout Shift | <0.1 | Lighthouse |

---

## Next Phase Handoff

Upon completion of Phase 4:

1. ✅ Smooth animations throughout
2. ✅ Real-time update system
3. ✅ PWA capabilities
4. ✅ Advanced UX features
5. ✅ Personalization engine

---

*Phase Start Date: After Phase 3*  
*Target Completion: +3 weeks*  
*Last Updated: 2026-04-13*
