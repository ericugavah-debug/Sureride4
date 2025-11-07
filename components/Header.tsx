
'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthModal from '@/app/auth/AuthModal'
import { useAuth } from '@/components/AuthProvider'

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<'student' | 'driver'>('student')
  const { user, signOut, loading } = useAuth()

  const handleAuthClick = (userType: 'student' | 'driver') => {
    setAuthModalTab(userType)
    setIsAuthModalOpen(true)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-bus-line text-2xl text-red-600"></i>
              </div>
              <span className="text-2xl font-['Pacifico'] text-gray-900">SureRide</span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-red-500 transition cursor-pointer">
                Home
              </Link>
              <Link href="/book" className="text-gray-700 hover:text-red-500 transition cursor-pointer">
                Book Trip
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-red-500 transition cursor-pointer">
                Dashboard
              </Link>
              <Link href="/driver" className="text-gray-700 hover:text-red-500 transition cursor-pointer">
                Drive
              </Link>
              <Link href="/social" className="text-gray-700 hover:text-red-500 transition cursor-pointer">
                Social
              </Link>
              <Link href="/safety" className="text-gray-700 hover:text-red-500 transition cursor-pointer">
                Safety
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-500 transition cursor-pointer">
                About
              </Link>
              <Link href="/support" className="text-gray-700 hover:text-red-500 transition cursor-pointer">
                Support
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-red-600">
                        {user.full_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.user_type}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="text-gray-700 hover:text-red-600 transition-colors disabled:opacity-50"
                  >
                    <i className="ri-logout-box-line text-lg"></i>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick('student')}
                    className="text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap"
                  >
                    Student Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('driver')}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-7
                    transition-colors whitespace-nowrap"
                  >
                    Driver Portal
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </>
  )
}
