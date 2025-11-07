
import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RealTimeNotifications from '@/components/RealTimeNotifications'

export const metadata: Metadata = {
  title: 'SureRide - Safe Campus Transportation',
  description: 'Connect with fellow students for safe, affordable rides around campus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <RealTimeNotifications />
        </AuthProvider>
      </body>
    </html>
  )
}
