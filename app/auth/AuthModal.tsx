'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'student' | 'driver'
}

const universities = [
  'Pan-Atlantic University'
]

const comingSoonUniversities = [
  'University of Lagos',
  'University of Ibadan', 
  'Ahmadu Bello University',
  'University of Nigeria, Nsukka',
  'Obafemi Awolowo University',
  'University of Benin',
  'Lagos State University',
  'Covenant University',
  'Babcock University'
]

export default function AuthModal({ isOpen, onClose, defaultTab = 'student' }: AuthModalProps) {
  const { signUp, signIn, loading, createDriverProfile } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [userType, setUserType] = useState<'student' | 'driver'>(defaultTab)
  const [showDriverForm, setShowDriverForm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    university: '',
    department: '',
    student_id: '',
    license_number: '',
    vehicle_make: '',
    vehicle_model: '',
    vehicle_year: new Date().getFullYear(),
    vehicle_plate: '',
    vehicle_color: '',
    vehicle_capacity: 4
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      if (mode === 'login') {
        await signIn(formData.email, formData.password)
        setSuccess('Successfully logged in!')
        setTimeout(() => onClose(), 1500)
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          return
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters')
          return
        }

        if (userType === 'student' && formData.university !== 'Pan-Atlantic University') {
          setError('Currently only available for Pan-Atlantic University students. We are coming soon to other universities!')
          return
        }

        const userData = {
          full_name: formData.full_name,
          user_type: userType,
          phone: formData.phone || undefined,
          university: userType === 'student' ? formData.university : undefined,
          department: userType === 'student' ? formData.department : undefined,
          student_id: userType === 'student' ? formData.student_id : undefined,
        }

        const result = await signUp(formData.email, formData.password, userData)
        
        if (userType === 'driver' && result.user) {
          setShowDriverForm(true)
          setSuccess('Account created! Please complete your driver profile.')
        } else {
          setSuccess('Account created successfully! Please check your email to verify your account.')
          setTimeout(() => onClose(), 2000)
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    }
  }

  const handleDriverProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await createDriverProfile({
        license_number: formData.license_number,
        vehicle_make: formData.vehicle_make,
        vehicle_model: formData.vehicle_model,
        vehicle_year: formData.vehicle_year,
        vehicle_plate: formData.vehicle_plate,
        vehicle_color: formData.vehicle_color,
        vehicle_capacity: formData.vehicle_capacity,
      })

      setSuccess('Driver profile created successfully! Your account is pending approval.')
      setTimeout(() => onClose(), 2000)
    } catch (err: any) {
      setError(err.message || 'Failed to create driver profile')
    }
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      full_name: '',
      phone: '',
      university: '',
      department: '',
      student_id: '',
      license_number: '',
      vehicle_make: '',
      vehicle_model: '',
      vehicle_year: new Date().getFullYear(),
      vehicle_plate: '',
      vehicle_color: '',
      vehicle_capacity: 4
    })
    setError('')
    setSuccess('')
    setShowDriverForm(false)
  }

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode)
    resetForm()
  }

  if (showDriverForm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Complete Driver Profile</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded">
                {success}
              </div>
            )}

            <form onSubmit={handleDriverProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Driver&apos;s License Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.license_number}
                  onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Make *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Toyota"
                    value={formData.vehicle_make}
                    onChange={(e) => setFormData({ ...formData, vehicle_make: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Model *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Camry"
                    value={formData.vehicle_model}
                    onChange={(e) => setFormData({ ...formData, vehicle_model: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year *
                  </label>
                  <input
                    type="number"
                    required
                    min="2000"
                    max={new Date().getFullYear()}
                    value={formData.vehicle_year}
                    onChange={(e) => setFormData({ ...formData, vehicle_year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Plate *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., ABC123DE"
                    value={formData.vehicle_plate}
                    onChange={(e) => setFormData({ ...formData, vehicle_plate: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Color *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., White"
                    value={formData.vehicle_color}
                    onChange={(e) => setFormData({ ...formData, vehicle_color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passenger Capacity *
                  </label>
                  <select
                    required
                    value={formData.vehicle_capacity}
                    onChange={(e) => setFormData({ ...formData, vehicle_capacity: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value={4}>4 passengers</option>
                    <option value={6}>6 passengers</option>
                    <option value={8}>8 passengers</option>
                    <option value={14}>14 passengers</option>
                    <option value={18}>18 passengers</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? 'Creating Profile...' : 'Complete Registration'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome Back to SureRide' : 'Join SureRide'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {mode === 'register' && (
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setUserType('student')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  userType === 'student'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                I&apos;m a Student
              </button>
              <button
                type="button"
                onClick={() => setUserType('driver')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  userType === 'driver'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                I&apos;m a Driver
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-
              none focus:ring-2 focus:ring-red-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-
            none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-
            none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-
                none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-
                none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {userType === 'student' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        University *
                      </label>
                      <select
                        required
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-
                none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="">Select your university</option>
                        {universities.map((uni) => (
                          <option key={uni} value={uni}>{uni}</option>
                        ))}
                      </select>
                      <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-800 font-medium mb-2">
                          <i className="ri-information-line mr-1"></i>
                          Currently Available
                        </p>
                        <p className="text-xs text-blue-700 mb-2">
                          We&apos;re currently serving Pan-Atlantic University students.
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          Coming Soon: {comingSoonUniversities.slice(0, 3).join(', ')} and more!
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department/Faculty
                      </label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-
                none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Student ID
                      </label>
                      <input
                        type="text"
                        value={formData.student_id}
                        onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-
                none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </>
                )}
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-
        none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 whitespace-nowrap"
            >
              {loading 
                ? (mode === 'login' ? 'Signing In...' : 'Creating Account...') 
                : (mode === 'login' ? 'Sign In' : 'Create Account')
              }
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login' ? "Don&apos;t have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                className="ml-1 text-red-600 hover:text-red-700 font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
