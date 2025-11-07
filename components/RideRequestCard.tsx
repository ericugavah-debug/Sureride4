
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface RideRequest {
  id: string;
  trip_pod_id: string;
  student_id: string;
  pickup_location: string;
  seats_requested: number;
  total_amount: number;
  status: string;
  created_at: string;
  users: {
    full_name: string;
    email: string;
    phone: string;
    profile_image: string;
  };
  trip_pods: {
    from_location: string;
    to_location: string;
    departure_date: string;
    departure_time: string;
    price_per_seat: number;
  };
}

interface RideRequestCardProps {
  request: RideRequest;
  onStatusUpdate?: () => void;
  showActions?: boolean;
  isDriverView?: boolean;
}

export default function RideRequestCard({ 
  request, 
  onStatusUpdate, 
  showActions = true, 
  isDriverView = false 
}: RideRequestCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAcceptRequest = async () => {
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('ride_requests')
        .update({ status: 'accepted' })
        .eq('id', request.id);

      if (error) throw error;

      if (onStatusUpdate) {
        onStatusUpdate();
      }
      
      alert('Ride request accepted successfully!');
    } catch (error) {
      console.error('Accept error:', error);
      alert('Failed to accept request. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRejectRequest = async () => {
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('ride_requests')
        .update({ status: 'rejected' })
        .eq('id', request.id);

      if (error) throw error;

      if (onStatusUpdate) {
        onStatusUpdate();
      }
      
      alert('Ride request rejected.');
    } catch (error) {
      console.error('Reject error:', error);
      alert('Failed to reject request. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return 'ri-time-line text-yellow-500';
      case 'accepted': return 'ri-checkbox-circle-line text-green-500';
      case 'rejected': return 'ri-close-circle-line text-red-500';
      case 'completed': return 'ri-check-double-line text-blue-500';
      default: return 'ri-question-line text-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-full bg-cover bg-center"
            style={{ 
              backgroundImage: request.users.profile_image 
                ? `url('${request.users.profile_image}')` 
                : `url('https://readdy.ai/api/search-image?query=Professional%20Nigerian%20student%20headshot%20smiling%20friendly%20expression%20clean%20modern%20background&width=100&height=100&seq=student${request.id}&orientation=squarish')`
            }}
          ></div>
          <div>
            <h3 className="font-semibold text-gray-900">{request.users.full_name}</h3>
            <p className="text-sm text-gray-600">{request.users.email}</p>
            <p className="text-sm text-gray-600">{request.users.phone}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
          <p className="text-sm text-gray-500 mt-1">{formatDate(request.created_at)}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-map-pin-line text-green-500"></i>
          </div>
          <div>
            <span className="text-sm text-gray-500">From:</span>
            <span className="text-gray-700 ml-2">{request.trip_pods.from_location}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-map-pin-fill text-red-500"></i>
          </div>
          <div>
            <span className="text-sm text-gray-500">To:</span>
            <span className="text-gray-700 ml-2">{request.trip_pods.to_location}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-map-pin-2-line text-blue-500"></i>
          </div>
          <div>
            <span className="text-sm text-gray-500">Pickup:</span>
            <span className="text-gray-700 ml-2">{request.pickup_location}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-group-line text-orange-500"></i>
            </div>
            <span className="text-sm text-gray-600">Seats</span>
          </div>
          <p className="font-semibold text-gray-900">{request.seats_requested}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-money-naira-circle-line text-green-500"></i>
            </div>
            <span className="text-sm text-gray-600">Total</span>
          </div>
          <p className="font-semibold text-green-600">₦{request.total_amount.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 flex items-center justify-center">
          <i className={getStatusIcon(request.status)}></i>
        </div>
        <span className="text-sm text-gray-600">
          {request.status === 'pending' && 'Waiting for driver response'}
          {request.status === 'accepted' && 'Booking confirmed'}
          {request.status === 'rejected' && 'Request declined'}
          {request.status === 'completed' && 'Trip completed'}
        </span>
      </div>

      {showActions && isDriverView && request.status === 'pending' && (
        <div className="flex space-x-3">
          <button
            onClick={handleRejectRequest}
            disabled={isUpdating}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Decline'}
          </button>
          <button
            onClick={handleAcceptRequest}
            disabled={isUpdating}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Accept'}
          </button>
        </div>
      )}

      {!isDriverView && (
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-information-line text-blue-500"></i>
            </div>
            <span className="text-sm text-blue-700">
              {request.status === 'pending' && 'Your request is being reviewed by the driver'}
              {request.status === 'accepted' && 'Great! Your booking is confirmed. Check your notifications for trip details.'}
              {request.status === 'rejected' && 'This request was declined. Try booking another trip.'}
              {request.status === 'completed' && 'Trip completed successfully. Thanks for riding with SureRide!'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
