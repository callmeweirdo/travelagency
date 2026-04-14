import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Naira currency formatter
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Date formatter for Nigerian format (DD/MM/YYYY)
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-NG', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Phone number formatter for Nigeria (+234)
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')

  // If starts with 0, replace with +234
  if (cleaned.startsWith('0')) {
    return `+234${cleaned.slice(1)}`
  }

  // If doesn't start with +234, add it
  if (!cleaned.startsWith('234')) {
    return `+234${cleaned}`
  }

  return `+${cleaned}`
}
