'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface RideStatus {
  id: string;
  status: 'pending' | 'accepted' | 'driver_arriving' | 'in_progress' | 'completed' | 'cancelled';
  driver_name?: string;
  driver_phone?: string;
  pickup_location: string;
  destination: string;
  estimated_arrival?: string;
  actual_pickup_time?: string;
  completion_time?: string;
  fare_amount?: number;
  created_at: string;
  updated_at: string;
}

interface RideStatusTrackerProps {
  rideRequestId: string;
  onStatusChange?: (status: string) => void;
}

export default function RideStatusTracker({ rideRequestId, onStatusChange }: RideStatusTrackerProps) {
  const { user } = useAuth();
  const [rideStatus, setRideStatus] = useState<RideStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rideRequestId) return;

    // Load initial ride status
    loadRideStatus();

    // Subscribe to real-time status updates
    const subscription = supabase
      .channel(`ride_status_${rideRequestId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'ride_requests',
          filter: `id=eq.${rideRequestId}`
        },
        (payload) => {
          const updatedRide = payload.new as RideStatus;
          setRideStatus(updatedRide);
          onStatusChange?.(updatedRide.status);
          
          // Show notification for status changes
          if (Notification.permission === 'granted') {
            const statusMessages = {
              accepted: 'Your ride has been accepted!',
              driver_arriving: 'Driver is on the way to pick you up',
              in_progress: 'Your ride is in progress',
              completed: 'Ride completed successfully',
              cancelled: 'Your ride has been cancelled'
            };
            
            const message = statusMessages[updatedRide.status as keyof typeof statusMessages];
            if (message) {
              new Notification('Ride Update', {
                body: message,
                icon: '/favicon.ico'
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [rideRequestId, onStatusChange]);

  const loadRideStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('ride_requests')
        .select(`
          *,
          driver:driver_profiles(
            full_name,
            phone_number
          )
        `)
        .eq('id', rideRequestId)
        .single();

      if (error) throw error;
      
      const rideData = {
        ...data,
        driver_name: data.driver?.full_name,
        driver_phone: data.driver?.phone_number
      };
      
      setRideStatus(rideData);
    } catch (error) {
      console.error('Error loading ride status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return 'ri-time-line text-yellow-500';
      case 'accepted': return 'ri-check-line text-green-500';
      case 'driver_arriving': return 'ri-car-line text-blue-500';
      case 'in_progress': return 'ri-road-map-line text-purple-500';
      case 'completed': return 'ri-check-double-line text-green-600';
      case 'cancelled': return 'ri-close-line text-red-500';
      default: return 'ri-question-line text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Looking for driver...';
      case 'accepted': return 'Driver assigned';
      case 'driver_arriving': return 'Driver arriving';
      case 'in_progress': return 'Trip in progress';
      case 'completed': return 'Trip completed';
      case 'cancelled': return 'Trip cancelled';
      default: return 'Unknown status';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'driver_arriving': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!rideStatus) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Ride not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Ride Status</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rideStatus.status)}`}>
          {getStatusText(rideStatus.status)}
        </span>
      </div>

      <div className="space-y-4">
        {/* Status Timeline */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <i className={getStatusIcon(rideStatus.status)}></i>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{getStatusText(rideStatus.status)}</p>
            <p className="text-xs text-gray-500">
              Last updated: {formatTime(rideStatus.updated_at)}
            </p>
          </div>
        </div>

        {/* Trip Details */}
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">From</p>
              <p className="text-sm text-gray-900">{rideStatus.pickup_location}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">To</p>
              <p className="text-sm text-gray-900">{rideStatus.destination}</p>
            </div>
          </div>
        </div>

        {/* Driver Information */}
        {rideStatus.driver_name && (
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500 mb-2">Driver</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{rideStatus.driver_name}</p>
                {rideStatus.driver_phone && (
                  <p className="text-xs text-gray-500">{rideStatus.driver_phone}</p>
                )}
              </div>
              {rideStatus.driver_phone && (
                <a
                  href={`tel:${rideStatus.driver_phone}`}
                  className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer"
                >
                  <i className="ri-phone-line text-sm"></i>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Estimated Arrival */}
        {rideStatus.estimated_arrival && rideStatus.status === 'driver_arriving' && (
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500 mb-1">Estimated Arrival</p>
            <p className="text-sm font-medium text-gray-900">
              {formatTime(rideStatus.estimated_arrival)}
            </p>
          </div>
        )}

        {/* Fare Amount */}
        {rideStatus.fare_amount && rideStatus.status === 'completed' && (
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500 mb-1">Fare</p>
            <p className="text-lg font-semibold text-gray-900">
              ₦{rideStatus.fare_amount.toLocaleString()}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {rideStatus.status === 'pending' && (
          <div className="border-t border-gray-200 pt-4">
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap">
              Cancel Ride
            </button>
          </div>
        )}

        {(rideStatus.status === 'accepted' || rideStatus.status === 'driver_arriving') && (
          <div className="border-t border-gray-200 pt-4 flex space-x-3">
            <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 cursor-pointer whitespace-nowrap">
              <i className="ri-message-line mr-2"></i>
              Chat
            </button>
            <button className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 cursor-pointer whitespace-nowrap">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}