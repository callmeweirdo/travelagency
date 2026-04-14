// Auth API - Using simplified JWT approach for deployment
// TODO: Re-enable full NextAuth when v5 stabilizes or downgrade to v4

import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { sign } from 'jsonwebtoken'

const JWT_SECRET =
  process.env.NEXTAUTH_SECRET || 'dev-secret-change-in-production'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing credentials' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        image: user.profileImage,
      },
      token,
    })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Auth endpoint active' })
}
