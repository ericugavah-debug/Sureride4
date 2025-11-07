
'use client'

import { useState, useRef } from 'react'

export default function BookingSection() {
  const [tripType, setTripType] = useState('one-way');
  const [transportMode, setTransportMode] = useState('road');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  // Mock location suggestions (in real app, this would use Google Places API)

  const mockSuggestions = [
    { id: 1, name: 'University of Lagos, Lagos', address: 'Akoka, Lagos State, Nigeria', type: 'university' },
    { id: 2, name: 'Lagos Island', address: 'Lagos Island, Lagos State, Nigeria', type: 'area' },
    { id: 3, name: 'Ikeja Bus Terminal', address: 'Ikeja, Lagos State, Nigeria', type: 'transport' },
    { id: 4, name: 'Murtala Muhammed Airport', address: 'Ikeja, Lagos State, Nigeria', type: 'airport' },
    { id: 5, name: 'University of Ibadan', address: 'Ibadan, Oyo State, Nigeria', type: 'university' },
    { id: 6, name: 'Obafemi Awolowo University', address: 'Ile-Ife, Osun State, Nigeria', type: 'university' },
    { id: 7, name: 'Abuja Airport', address: 'Abuja, FCT, Nigeria', type: 'airport' }
  ];

  const handleLocationSearch = (value, type) => {
    if (value.length > 2) {
      const filtered = mockSuggestions.filter(suggestion => 
        suggestion.name.toLowerCase().includes(value.toLowerCase()) ||
        suggestion.address.toLowerCase().includes(value.toLowerCase())
      );
      if (type === 'from') {
        setFromSuggestions(filtered);
        setShowFromSuggestions(true);
      } else {
        setToSuggestions(filtered);
        setShowToSuggestions(true);
      }
    } else {
      if (type === 'from') {
        setShowFromSuggestions(false);
      } else {
        setShowToSuggestions(false);
      }
    }
  };

  const selectLocation = (location, type) => {
    if (type === 'from') {
      setFromValue(location.name);
      setShowFromSuggestions(false);
    } else {
      setToValue(location.name);
      setShowToSuggestions(false);
    }
  };

  const getCurrentLocation = async (type) => {
    setIsLocating(true);
    setTimeout(() => {
      const currentLocation = 'University of Lagos, Lagos';
      if (type === 'from') {
        setFromValue(currentLocation);
      } else {
        setToValue(currentLocation);
      }
      setIsLocating(false);
    }, 1500);
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'university': return 'ri-school-line text-blue-500';
      case 'airport': return 'ri-plane-line text-green-500';
      case 'transport': return 'ri-bus-line text-orange-500';
      default: return 'ri-map-pin-line text-gray-500';
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Find Your Trip</h2>
          <p className="text-base md:text-lg text-gray-600">Smart location search & discover travel pods</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
            <button
              onClick={() => setTripType('one-way')}
              className={`px-3 md:px-4 py-2 rounded-full cursor-pointer whitespace-nowrap text-sm md:text-base ${
                tripType === 'one-way' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              One Way
            </button>
            <button
              onClick={() => setTripType('round-trip')}
              className={`px-3 md:px-4 py-2 rounded-full cursor-pointer whitespace-nowrap text-sm md:text-base ${
                tripType === 'round-trip' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Round Trip
            </button>
            <button
              onClick={() => setTripType('discover-pods')}
              className={`px-3 md:px-4 py-2 rounded-full cursor-pointer whitespace-nowrap text-sm md:text-base ${
                tripType === 'discover-pods' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-compass-3-line"></i>
                </div>
                Discover Pods
              </div>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => setTransportMode('road')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full cursor-pointer whitespace-nowrap text-sm md:text-base ${
                transportMode === 'road' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-bus-2-line"></i>
              </div>
              <span className="hidden sm:inline">Road</span>
            </button>
            <button
              onClick={() => setTransportMode('air')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full cursor-pointer whitespace-nowrap text-sm md:text-base ${
                transportMode === 'air' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-plane-line"></i>
              </div>
              <span className="hidden sm:inline">Air</span>
            </button>
            <button
              onClick={() => setTransportMode('bundle')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full cursor-pointer whitespace-nowrap text-sm md:text-base ${
                transportMode === 'bundle' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-apps-2-line"></i>
              </div>
              <span className="hidden lg:inline">Air + Ground Bundle</span>
              <span className="lg:hidden">Bundle</span>
            </button>
          </div>

          <form className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <div className="relative">
                  <input
                    ref={fromInputRef}
                    type="text"
                    value={fromValue}
                    onChange={(e) => {
                      setFromValue(e.target.value);
                      handleLocationSearch(e.target.value, 'from');
                    }}
                    placeholder="Enter pickup location..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => getCurrentLocation('from')}
                    disabled={isLocating}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded"
                  >
                    <i className={`${isLocating ? 'ri-loader-4-line animate-spin' : 'ri-crosshair-line'} text-red-500`}></i>
                  </button>
                </div>
                
                {showFromSuggestions && fromSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1 max-h-60 overflow-y-auto">
                    {fromSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        onClick={() => selectLocation(suggestion, 'from')}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 flex items-center justify-center">
                            <i className={getLocationIcon(suggestion.type)}></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{suggestion.name}</p>
                            <p className="text-xs text-gray-500">{suggestion.address}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <div className="relative">
                  <input
                    ref={toInputRef}
                    type="text"
                    value={toValue}
                    onChange={(e) => {
                      setToValue(e.target.value);
                      handleLocationSearch(e.target.value, 'to');
                    }}
                    placeholder="Enter destination..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => getCurrentLocation('to')}
                    disabled={isLocating}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded"
                  >
                    <i className={`${isLocating ? 'ri-loader-4-line animate-spin' : 'ri-crosshair-line'} text-red-500`}></i>
                  </button>
                </div>

                {showToSuggestions && toSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1 max-h-60 overflow-y-auto">
                    {toSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        onClick={() => selectLocation(suggestion, 'to')}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 flex items-center justify-center">
                            <i className={getLocationIcon(suggestion.type)}></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{suggestion.name}</p>
                            <p className="text-xs text-gray-500">{suggestion.address}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                <div className="relative">
                  <input
                    type="date"
                    defaultValue="2024-06-22"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base pr-8"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="1"
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                    <i className="ri-user-line text-gray-400"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="group-booking" 
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="group-booking" className="text-sm text-gray-700 cursor-pointer">
                  Group booking (3+ people)
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="campus-pickup" 
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="campus-pickup" className="text-sm text-gray-700 cursor-pointer">
                  Campus pickup required
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 bg-red-500 text-white py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-red-600 transition cursor-pointer whitespace-nowrap"
              >
                {tripType === 'discover-pods' ? 'Discover Pods' : 'Search Trips'}
              </button>
              {tripType !== 'discover-pods' && (
                <button
                  type="button"
                  className="bg-purple-500 text-white px-6 py-3 md:py-4 rounded-lg font-semibold hover:bg-purple-600 transition cursor-pointer whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-group-2-line"></i>
                    </div>
                    Join Pod
                  </div>
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-map-pin-time-line text-blue-500"></i>
                </div>
                <span>Real-time location tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-group-line text-purple-500"></i>
                </div>
                <span>Auto-match with pods</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-shield-check-line text-green-500"></i>
                </div>
                <span>Verified students only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
