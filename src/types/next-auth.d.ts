import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
      role: string
      profileImage?: string | null
    }
  }

  interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
    profileImage?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    firstName?: string
    lastName?: string
    role?: string
  }
}
