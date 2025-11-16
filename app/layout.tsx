import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Awareness Agent',
  description: 'Discover AI tools and learn how to use advanced technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
