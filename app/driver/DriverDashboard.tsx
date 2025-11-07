
'use client';

import { useState } from 'react';
import DriverAuth from './DriverAuth';

export default function DriverDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [driverData, setDriverData] = useState(null);
  const [activeTab, setActiveTab] = useState('available');
  const [driverStatus, setDriverStatus] = useState('offline');

  // Mock available rides from trip pods
  const availableRides = [
    {
      id: 1,
      podName: 'Lagos to Abuja Express',
      route: 'Lagos → Abuja',
      passengers: 8,
      departureTime: '2024-03-15 06:00',
      estimatedDuration: '6 hours',
      distance: '462 km',
      fare: 68000,
      driverShare: 45000,
      vehicleType: 'Bus (14-seater)',
      pickupPoint: 'University of Lagos Main Gate',
      dropoffPoint: 'University of Abuja',
      contactPerson: 'Chioma Okwu',
      contactPhone: '+234 801 234 5678',
      specialRequests: 'AC required, WiFi preferred',
      urgency: 'high',
      postedTime: '2 hours ago'
    },
    {
      id: 2,
      route: 'Ibadan → Lagos',
      podName: 'Daily Commute Pod',
      passengers: 5,
      departureTime: '2024-03-16 06:30',
      estimatedDuration: '2.5 hours',
      distance: '128 km',
      fare: 17500,
      driverShare: 12000,
      vehicleType: 'Car (7-seater)',
      pickupPoint: 'University of Ibadan',
      dropoffPoint: 'Lagos Island',
      contactPerson: 'Folake Adesanya',
      contactPhone: '+234 802 345 6789',
      specialRequests: 'Professional commuters, punctual departure',
      urgency: 'medium',
      postedTime: '4 hours ago'
    },
    {
      id: 3,
      route: 'Port Harcourt → Owerri → Enugu',
      podName: 'Weekend Home Visits',
      passengers: 10,
      departureTime: '2024-03-16 14:00',
      estimatedDuration: '4 hours',
      distance: '245 km',
      fare: 65000,
      driverShare: 42000,
      vehicleType: 'Bus (14-seater)',
      pickupPoint: 'University of Port Harcourt',
      dropoffPoint: 'Multiple stops in Enugu',
      contactPerson: 'Chinedu Okonkwo',
      contactPhone: '+234 803 456 7890',
      specialRequests: 'Family-friendly, safe driving',
      urgency: 'low',
      postedTime: '6 hours ago'
    }
  ];

  const acceptedRides = [
    {
      id: 4,
      route: 'Lagos → Ibadan',
      podName: 'Tech Students Connect',
      passengers: 6,
      departureTime: '2024-03-20 08:00',
      status: 'confirmed',
      fare: 21000,
      driverShare: 15000,
      pickupPoint: 'Yaba Tech Hub',
      contactPerson: 'Emeka Nwosu',
      contactPhone: '+234 804 567 8901'
    }
  ];

  const handleLogin = (data) => {
    setDriverData(data);
    setIsAuthenticated(true);
  };

  const handleAcceptRide = (rideId) => {
    console.log(`Accepting ride ${rideId}`);
    alert('Ride request sent! The pod admin will contact you shortly.');
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!isAuthenticated) {
    return <DriverAuth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <i className="ri-bus-2-fill text-white"></i>
                </div>
                <span className="text-xl font-bold text-gray-900 font-['Pacifico']">SureRide</span>
              </div>
              <div className="hidden md:block h-6 w-px bg-gray-300"></div>
              <span className="hidden md:block text-sm text-gray-600">Driver Portal</span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Driver Status Toggle */}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Status:</span>
                <button
                  onClick={() => setDriverStatus(driverStatus === 'online' ? 'offline' : 'online')}
                  className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap ${
                    driverStatus === 'online' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      driverStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="capitalize">{driverStatus}</span>
                  </div>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <div 
                  className="w-8 h-8 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20headshot%20photo%20of%20a%20Nigerian%20male%20driver%20in%20uniform%20smiling%20friendly%20expression%20clean%20background%20modern%20portrait%20style&width=200&height=200&seq=driver1&orientation=squarish')` }}
                ></div>
                <span className="text-sm font-medium text-gray-900">{driverData?.name}</span>
              </div>

              <button 
                onClick={() => setIsAuthenticated(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-logout-box-line"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Rides</p>
                <p className="text-2xl font-bold text-gray-900">{availableRides.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-road-map-line text-blue-500 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accepted Rides</p>
                <p className="text-2xl font-bold text-gray-900">{acceptedRides.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-green-500 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week Earnings</p>
                <p className="text-2xl font-bold text-gray-900">₦127,000</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-naira-circle-line text-yellow-500 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.9</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-star-fill text-purple-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'available', label: 'Available Rides', count: availableRides.length },
                { key: 'accepted', label: 'My Rides', count: acceptedRides.length },
                { key: 'history', label: 'Trip History', count: 24 },
                { key: 'earnings', label: 'Earnings', count: null }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.key 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'available' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Available Ride Requests</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-refresh-line"></i>
                </div>
                <span>Auto-refresh every 30 seconds</span>
              </div>
            </div>

            {driverStatus === 'offline' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-information-line text-yellow-600"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">You're currently offline</p>
                    <p className="text-xs text-yellow-700">Set your status to online to receive ride requests</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-6">
              {availableRides.map((ride) => (
                <div key={ride.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{ride.podName}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(ride.urgency)}`}>
                            {ride.urgency} priority
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{ride.route}</p>
                        <p className="text-xs text-gray-500">Posted {ride.postedTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₦{ride.driverShare.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Your share</p>
                        <p className="text-sm text-gray-600">Total: ₦{ride.fare.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-group-line text-gray-500"></i>
                          </div>
                          <span className="text-gray-600">{ride.passengers} passengers</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-time-line text-gray-500"></i>
                          </div>
                          <span className="text-gray-600">{ride.estimatedDuration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-map-pin-distance-line text-gray-500"></i>
                          </div>
                          <span className="text-gray-600">{ride.distance}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-calendar-line text-gray-500"></i>
                          </div>
                          <span className="text-gray-600">{ride.departureTime}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-car-line text-gray-500"></i>
                          </div>
                          <span className="text-gray-600">{ride.vehicleType}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-user-line text-gray-500"></i>
                          </div>
                          <span className="text-gray-600">{ride.contactPerson}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <p className="text-gray-500 mb-1">Pickup:</p>
                          <p className="text-gray-900">{ride.pickupPoint}</p>
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-500 mb-1">Drop-off:</p>
                          <p className="text-gray-900">{ride.dropoffPoint}</p>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    {ride.specialRequests && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium text-blue-900 mb-1">Special Requests:</p>
                        <p className="text-sm text-blue-700">{ride.specialRequests}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 cursor-pointer">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-phone-line"></i>
                          </div>
                          <span className="text-sm">Call</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 cursor-pointer">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-message-3-line"></i>
                          </div>
                          <span className="text-sm">Message</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 cursor-pointer">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-map-line"></i>
                          </div>
                          <span className="text-sm">View Route</span>
                        </button>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button 
                          disabled={driverStatus === 'offline'}
                          className={`px-6 py-2 rounded-lg font-medium cursor-pointer whitespace-nowrap ${
                            driverStatus === 'offline'
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => handleAcceptRide(ride.id)}
                          disabled={driverStatus === 'offline'}
                          className={`px-6 py-2 rounded-lg font-medium cursor-pointer whitespace-nowrap ${
                            driverStatus === 'offline'
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          Accept Ride
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'accepted' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">My Accepted Rides</h2>
            
            {acceptedRides.length > 0 ? (
              <div className="grid gap-6">
                {acceptedRides.map((ride) => (
                  <div key={ride.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{ride.podName}</h3>
                        <p className="text-sm text-gray-600">{ride.route}</p>
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mt-2">
                          {ride.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">₦{ride.driverShare.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Your earnings</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-calendar-line text-gray-500"></i>
                          </div>
                          <span className="text-gray-600">{ride.departureTime}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-group-line text-gray-500"></i>
                          </div>
                          <span className="text-gray-600">{ride.passengers} passengers</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-map-pin-line text-gray-500"></i>
                          </div>
                          <span className="text-gray-600">{ride.pickupPoint}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-user-line text-gray-500"></i>
                          </div>
                          <span className="text-gray-600">{ride.contactPerson}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 cursor-pointer whitespace-nowrap">
                        Contact Passengers
                      </button>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 cursor-pointer whitespace-nowrap">
                        Start Trip
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 cursor-pointer whitespace-nowrap">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-car-line text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No accepted rides yet</h3>
                <p className="text-gray-600">Check the available rides tab to find trips to accept.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-600">
              You haven&apos;t completed any rides yet. Start accepting ride requests to build your reputation!
            </p>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Earnings Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">₦127,000</p>
                <p className="text-sm text-gray-600">8 completed trips</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">₦485,000</p>
                <p className="text-sm text-gray-600">32 completed trips</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Earned</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">₦2,340,000</p>
                <p className="text-sm text-gray-600">156 completed trips</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
