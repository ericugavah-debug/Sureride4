
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: number;
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  vehicle: string;
  rating: number;
  seatsLeft: number;
  amenities: string[];
  route: string;
  image: string;
}

export default function BookPage() {
  const [tripType, setTripType] = useState('one-way');
  const [transportMode, setTransportMode] = useState('road');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
    groupBooking: false,
    campusPickup: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(false);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock search results
    const mockResults = [
      {
        id: 1,
        operator: 'SafeTransit Express',
        departureTime: '06:00 AM',
        arrivalTime: '09:30 AM',
        duration: '3h 30m',
        price: 8500,
        vehicle: 'Luxury Coach',
        rating: 4.8,
        seatsLeft: 12,
        amenities: ['WiFi', 'AC', 'Charging Port', 'Snacks'],
        route: `${formData.from} → ${formData.to}`,
        image: 'https://readdy.ai/api/search-image?query=Modern%20luxury%20bus%20interior%20with%20comfortable%20seats%20AC%20and%20Nigerian%20students%20traveling%20safely%20clean%20professional%20transport&width=300&height=200&seq=bus1&orientation=landscape'
      },
      {
        id: 2,
        operator: 'StudentLink Transport',
        departureTime: '08:00 AM',
        arrivalTime: '11:45 AM',
        duration: '3h 45m',
        price: 7500,
        vehicle: 'Standard Bus',
        rating: 4.6,
        seatsLeft: 8,
        amenities: ['AC', 'Charging Port', 'Water'],
        route: `${formData.from} → ${formData.to}`,
        image: 'https://readdy.ai/api/search-image?query=Clean%20modern%20bus%20with%20Nigerian%20students%20comfortable%20seating%20air%20conditioning%20professional%20transport%20service&width=300&height=200&seq=bus2&orientation=landscape'
      },
      {
        id: 3,
        operator: 'EduFly Airways',
        departureTime: '10:30 AM',
        arrivalTime: '11:45 AM',
        duration: '1h 15m',
        price: 25000,
        vehicle: 'Aircraft',
        rating: 4.9,
        seatsLeft: 24,
        amenities: ['In-flight Meal', 'Baggage', 'Priority Boarding'],
        route: `${formData.from} → ${formData.to}`,
        image: 'https://readdy.ai/api/search-image?query=Modern%20aircraft%20interior%20with%20Nigerian%20students%20comfortable%20airline%20seats%20professional%20aviation%20service&width=300&height=200&seq=plane1&orientation=landscape'
      }
    ];

    setSearchResults(mockResults);
    setIsSearching(false);
    setHasSearched(true);
  };

  const handleBooking = (tripId: number) => {
    // Simulate booking
    alert(`Booking trip ${tripId}! This would redirect to payment page.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Your Trip</h1>
            <p className="text-lg text-gray-600">Find safe, affordable transport with fellow students</p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setTripType('one-way')}
                className={`px-4 py-2 rounded-full cursor-pointer whitespace-nowrap ${
                  tripType === 'one-way' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                One Way
              </button>
              <button
                onClick={() => setTripType('round-trip')}
                className={`px-4 py-2 rounded-full cursor-pointer whitespace-nowrap ${
                  tripType === 'round-trip' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Round Trip
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setTransportMode('road')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer whitespace-nowrap ${
                  transportMode === 'road' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <i className="ri-bus-2-line"></i>
                Road
              </button>
              <button
                onClick={() => setTransportMode('air')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer whitespace-nowrap ${
                  transportMode === 'air' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <i className="ri-plane-line"></i>
                Air
              </button>
            </div>

            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <input
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    placeholder="Lagos"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                    placeholder="Abuja"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                  <input
                    type="number"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="groupBooking"
                    checked={formData.groupBooking}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Group booking (3+ people)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="campusPickup"
                    checked={formData.campusPickup}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Campus pickup required</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full bg-red-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-red-600 transition cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {isSearching ? 'Searching...' : 'Search Trips'}
              </button>
            </form>
          </div>

          {/* Search Results */}
          {hasSearched && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Trips ({searchResults.length})
                </h2>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <i className="ri-filter-line"></i>
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <i className="ri-sort-desc"></i>
                    Sort
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {searchResults.map((trip) => (
                  <div key={trip.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div 
                        className="w-full lg:w-48 h-32 bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url('${trip.image}')` }}
                      ></div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{trip.operator}</h3>
                            <p className="text-gray-600">{trip.route}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <i className="ri-star-fill text-yellow-400 text-sm"></i>
                                <span className="text-sm font-medium">{trip.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{trip.seatsLeft} seats left</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-red-500">₦{trip.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">per person</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <i className="ri-time-line text-gray-400"></i>
                            <div>
                              <p className="text-sm font-medium">Departure</p>
                              <p className="text-sm text-gray-600">{trip.departureTime}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-time-line text-gray-400"></i>
                            <div>
                              <p className="text-sm font-medium">Arrival</p>
                              <p className="text-sm text-gray-600">{trip.arrivalTime}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-timer-line text-gray-400"></i>
                            <div>
                              <p className="text-sm font-medium">Duration</p>
                              <p className="text-sm text-gray-600">{trip.duration}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {trip.amenities.map((amenity, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => handleBooking(trip.id)}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer whitespace-nowrap"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasSearched && searchResults.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-search-line text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}