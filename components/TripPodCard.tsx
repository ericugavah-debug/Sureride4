
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface TripPod {
  id: string;
  driver_id: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  departure_time: string;
  price_per_seat: number;
  total_seats: number;
  available_seats: number;
  vehicle_type: string;
  vehicle_plate: string;
  status: string;
  driver_profiles: {
    full_name: string;
    phone: string;
    rating: number;
    profile_image: string;
  };
}

interface TripPodCardProps {
  tripPod: TripPod;
  onBookingSuccess?: () => void;
  showBookButton?: boolean;
}

export default function TripPodCard({ tripPod, onBookingSuccess, showBookButton = true }: TripPodCardProps) {
  const [isBooking, setIsBooking] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('');

  const handleBookRide = async () => {
    if (!pickupLocation.trim()) {
      alert('Please enter your pickup location');
      return;
    }

    setIsBooking(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Please login to book a ride');
        return;
      }

      const { error } = await supabase
        .from('ride_requests')
        .insert({
          trip_pod_id: tripPod.id,
          student_id: user.id,
          pickup_location: pickupLocation,
          seats_requested: seatsToBook,
          total_amount: tripPod.price_per_seat * seatsToBook,
          status: 'pending'
        });

      if (error) throw error;

      setShowBookingModal(false);
      setPickupLocation('');
      setSeatsToBook(1);
      
      if (onBookingSuccess) {
        onBookingSuccess();
      }
      
      alert('Booking request sent successfully! The driver will be notified.');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book ride. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-12 h-12 rounded-full bg-cover bg-center"
                style={{ 
                  backgroundImage: tripPod.driver_profiles.profile_image 
                    ? `url('${tripPod.driver_profiles.profile_image}')` 
                    : `url('https://readdy.ai/api/search-image?query=Professional%20Nigerian%20driver%20headshot%20smiling%20friendly%20expression%20clean%20modern%20background&width=100&height=100&seq=driver${tripPod.id}&orientation=squarish')`
                }}
              ></div>
              <div>
                <h3 className="font-semibold text-gray-900">{tripPod.driver_profiles.full_name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-star-fill text-yellow-400 text-sm"></i>
                    </div>
                    <span className="text-sm text-gray-600">{tripPod.driver_profiles.rating}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{tripPod.vehicle_type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-red-500">₦{tripPod.price_per_seat.toLocaleString()}</p>
            <p className="text-sm text-gray-500">per seat</p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-map-pin-line text-green-500"></i>
            </div>
            <span className="text-gray-700">{tripPod.from_location}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-map-pin-fill text-red-500"></i>
            </div>
            <span className="text-gray-700">{tripPod.to_location}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-calendar-line text-blue-500"></i>
            </div>
            <span className="text-sm text-gray-600">{formatDate(tripPod.departure_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-time-line text-purple-500"></i>
            </div>
            <span className="text-sm text-gray-600">{formatTime(tripPod.departure_time)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-group-line text-orange-500"></i>
            </div>
            <span className="text-sm text-gray-600">{tripPod.available_seats} seats left</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-car-line text-gray-500"></i>
            </div>
            <span className="text-sm text-gray-600">{tripPod.vehicle_plate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            tripPod.status === 'active' ? 'bg-green-100 text-green-700' :
            tripPod.status === 'full' ? 'bg-orange-100 text-orange-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {tripPod.status.charAt(0).toUpperCase() + tripPod.status.slice(1)}
          </span>
        </div>

        {showBookButton && tripPod.status === 'active' && tripPod.available_seats > 0 && (
          <button
            onClick={() => setShowBookingModal(true)}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition cursor-pointer whitespace-nowrap font-medium"
          >
            Book Ride
          </button>
        )}

        {tripPod.status === 'full' && (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg cursor-not-allowed whitespace-nowrap font-medium"
          >
            Fully Booked
          </button>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Book Your Ride</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="w-6 h-6 flex items-center justify-center cursor-pointer"
              >
                <i className="ri-close-line text-gray-500"></i>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Seats
                </label>
                <select
                  value={seatsToBook}
                  onChange={(e) => setSeatsToBook(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                >
                  {Array.from({ length: Math.min(tripPod.available_seats, 4) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} seat{i > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Enter your pickup location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Price per seat:</span>
                  <span className="font-medium">₦{tripPod.price_per_seat.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Seats:</span>
                  <span className="font-medium">{seatsToBook}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-red-500">₦{(tripPod.price_per_seat * seatsToBook).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleBookRide}
                disabled={isBooking}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {isBooking ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
