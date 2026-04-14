import type { Metadata } from 'next'
import './globals.css'
import { UserProvider } from '@/contexts/user-context'

export const metadata: Metadata = {
  title: 'Smart Home Security',
  description: 'Smart home security system',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
