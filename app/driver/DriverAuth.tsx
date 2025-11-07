
'use client';

import { useState } from 'react';

interface DriverAuthProps {
  onLogin: (data: any) => void;
}

export default function DriverAuth({ onLogin }: DriverAuthProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    licenseNumber: '',
    vehicleType: '',
    vehicleModel: '',
    plateNumber: '',
    experience: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    const driverData = {
      id: 1,
      name: formData.fullName || 'John Adebayo',
      email: formData.email || 'john.adebayo@example.com',
      phone: formData.phone || '+234 801 234 5678',
      vehicleType: formData.vehicleType || 'Bus',
      rating: 4.9,
      totalTrips: 156
    };
    onLogin(driverData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <i className="ri-bus-2-fill text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold text-gray-900 font-['Pacifico']">SureRide</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {authMode === 'login' ? 'Driver Login' : 'Join as Driver'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {authMode === 'login' 
              ? 'Access your driver dashboard and manage rides' 
              : 'Partner with us to provide safe student transportation'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {authMode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234 801 234 5678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">License Number *</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      placeholder="ABC123456789"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type *</label>
                    <select 
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                      required
                    >
                      <option value="">Select vehicle type</option>
                      <option value="Car (4-seater)">Car (4-seater)</option>
                      <option value="Car (7-seater)">Car (7-seater)</option>
                      <option value="Bus (14-seater)">Bus (14-seater)</option>
                      <option value="Bus (18-seater)">Bus (18-seater)</option>
                      <option value="Coaster (30-seater)">Coaster (30-seater)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Model</label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleInputChange}
                      placeholder="Toyota Hiace, Honda Pilot..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plate Number *</label>
                    <input
                      type="text"
                      name="plateNumber"
                      value={formData.plateNumber}
                      onChange={handleInputChange}
                      placeholder="ABC-123-XY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Driving Experience</label>
                    <select 
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="">Select experience</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="6-10 years">6-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="driver@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                required
              />
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  required
                />
              </div>
            )}

            {/* Requirements Notice for Registration */}
            {authMode === 'register' && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center mt-0.5">
                    <i className="ri-information-line text-blue-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-2">Driver Requirements</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Valid Nigerian driver's license</li>
                      <li>• Vehicle registration and insurance</li>
                      <li>• Clean driving record</li>
                      <li>• Background verification required</li>
                      <li>• Vehicle safety inspection</li>
                    </ul>
                    <p className="text-xs text-blue-700 mb-2">
                      We&apos;re currently serving Pan-Atlantic University students.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Terms Agreement for Registration */}
            {authMode === 'register' && (
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="driver-terms" 
                  required
                  className="mt-1 w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="driver-terms" className="text-sm text-gray-700 cursor-pointer">
                  I agree to SureRide's driver terms and conditions, and commit to providing safe, reliable transportation for students
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer whitespace-nowrap"
            >
              {authMode === 'login' ? 'Sign In to Dashboard' : 'Apply as Driver'}
            </button>
          </form>

          {/* Switch Auth Mode */}
          <div className="text-center mt-6 pt-6 border-t">
            <p className="text-gray-600">
              {authMode === 'login' ? "New driver?" : "Already registered?"}
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-red-500 hover:text-red-600 font-medium ml-2 cursor-pointer"
              >
                {authMode === 'login' ? 'Apply Now' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Student Button */}
          <div className="flex space-x-2 mt-4">
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
          </div>

          {/* Benefits for Registration */}
          {authMode === 'register' && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-900 mb-2">Driver Benefits</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                <div className="flex items-center space-x-2">
                  <i className="ri-money-naira-circle-line"></i>
                  <span>Competitive earnings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-calendar-check-line"></i>
                  <span>Flexible schedule</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-shield-check-line"></i>
                  <span>Insurance coverage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-customer-service-2-line"></i>
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demo Login Info */}
        {authMode === 'login' && (
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Demo: Use any email and password to access the driver dashboard
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
