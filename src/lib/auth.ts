import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
    newUser: '/register',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name || '',
          profileImage: profile.picture,
          emailVerified: profile.email_verified ? new Date() : null,
          role: 'USER',
        }
      },
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.role = user.role
      }
      return token
    },
  },
  events: {
    async signIn({ user, isNewUser }: { user: any; isNewUser?: boolean }) {
      if (isNewUser && user.id) {
        try {
          await prisma.wallet.create({
            data: {
              userId: user.id,
              balance: 0,
              currency: 'NGN',
            },
          })

          await prisma.userPreferences.create({
            data: {
              userId: user.id,
              currency: 'NGN',
              language: 'en',
              newsletter: true,
              smsNotifications: true,
              emailNotifications: true,
            },
          })
        } catch (error) {
          console.error('Error creating user data:', error)
        }
      }
    },
  },
}

// For NextAuth v5, we export the handler differently
const handler = NextAuth(authOptions as any)
export { handler as GET, handler as POST }
