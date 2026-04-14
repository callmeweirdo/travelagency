# TravelAgency - NaijaTravel Pro 🇳🇬

**Your Gateway to Seamless Nigerian & International Travel**

A full-featured travel agency platform (travelagency) tailored for the Nigerian market, offering flight bookings, hotel reservations, tour packages, visa services, and travel insurance with Nigeria-specific payment solutions and localizations.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations (requires PostgreSQL)
npm run db:migrate

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## ✨ Features

### Core Functionality

- ✈️ **Flight Booking** - Search and book flights across all Nigerian airlines
- 🏨 **Hotel Reservations** - Handpicked hotels across Nigeria and worldwide
- 🎒 **Tour Packages** - Curated travel packages for domestic and international destinations
- 🛂 **Visa Services** - Hassle-free visa application assistance
- 🛡️ **Travel Insurance** - Comprehensive travel protection plans

### Nigeria-Specific Features

- 💳 **Paystack Integration** - Card, bank transfer, USSD, and QR payments
- 📱 **Nigerian Phone Format** - +234 validation and formatting
- 💰 **Naira Currency** - ₦ formatting and dynamic pricing
- 🏢 **Domestic Airlines** - Air Peace, Arik, Dana, Ibom Air, Max Air, United Nigeria
- 📍 **Popular Routes** - Lagos-Abuja, Lagos-PH, Abuja-PH, and more

### Technical Features

- 🔐 **Authentication** - NextAuth.js with Google OAuth and credentials
- 📱 **Responsive Design** - Mobile-first approach for Nigerian market
- 🎨 **Nigeria Theme** - Custom colors based on Nigerian flag
- ⚡ **Performance** - Optimized for slow network conditions
- 🌙 **Dark Mode** - Full dark mode support

---

## 📁 Project Structure

```
naijatravel-pro/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API Routes
│   │   ├── login/          # Authentication pages
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── page.tsx        # Landing page
│   │   └── layout.tsx      # Root layout
│   ├── components/
│   │   └── ui/             # shadcn/ui components
│   ├── lib/
│   │   ├── utils.ts        # Utility functions
│   │   ├── prisma.ts       # Prisma client
│   │   └── auth.ts         # NextAuth config
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   └── app/globals.css     # Global styles
├── prisma/
│   └── schema.prisma       # Database schema
├── docs/                    # Project documentation
│   ├── PROJECT_STATE.json  # Current state tracking
│   ├── PHASE-1.md          # Phase 1 documentation
│   └── PROGRESS.md         # Progress tracking
└── public/                  # Static assets
```

---

## 🛠️ Technology Stack

| Category       | Technology              |
| -------------- | ----------------------- |
| **Framework**  | Next.js 15 (App Router) |
| **Language**   | TypeScript 5            |
| **Styling**    | Tailwind CSS            |
| **Components** | shadcn/ui               |
| **Database**   | PostgreSQL + Prisma     |
| **Auth**       | NextAuth.js v5          |
| **Payments**   | Paystack                |
| **Animations** | Framer Motion           |

---

## 📊 Project Phases

### ✅ Phase 1: Foundation (COMPLETE)

- [x] Next.js 15 setup with TypeScript
- [x] Tailwind CSS with Nigerian theme
- [x] shadcn/ui components
- [x] Prisma schema design
- [x] NextAuth.js authentication
- [x] Landing page with search widget
- [x] Login/Register pages

### 🚧 Phase 2: Core Features (IN PROGRESS)

- [ ] Flight search and booking
- [ ] Hotel search and booking
- [ ] User dashboard
- [ ] Booking management
- [ ] Paystack integration

### ⏳ Phase 3: CMS & Advanced

- [ ] Payload CMS integration
- [ ] Admin dashboard
- [ ] Tour package management
- [ ] Dynamic pricing engine

### ⏳ Phase 4: Real-time & Experience

- [ ] Framer Motion animations
- [ ] Real-time booking updates
- [ ] Notification system
- [ ] PWA features

### ⏳ Phase 5: Polish & Deployment

- [ ] Performance optimization
- [ ] Security hardening
- [ ] SEO optimization
- [ ] Production deployment

---

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/naijatravel_db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Paystack
PAYSTACK_PUBLIC_KEY=""
PAYSTACK_SECRET_KEY=""
```

See `.env.example` for complete list.

---

## 🧪 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
npm run format       # Format with Prettier

# Database
npm run db:migrate   # Run Prisma migrations
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio
```

---

## 🤝 Contributing

1. Check `docs/PROJECT_STATE.json` for current status
2. Pick a task from the current phase
3. Create a feature branch
4. Follow the existing code style
5. Submit a pull request

---

## 📄 License

This project is private and proprietary.

---

## 📞 Support

- Email: support@naijatravel.pro
- Phone: +234 800 123 4567
- WhatsApp: +234 800 123 4567

---

Made with ❤️ in Nigeria 🇳🇬
