
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import TripPodCard from '@/components/TripPodCard';
import RideRequestCard from '@/components/RideRequestCard';
import NotificationCard from '@/components/NotificationCard';
import UserProfileCard from '@/components/UserProfileCard';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [tripPods, setTripPods] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [recentRides, setRecentRides] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const [ridesResponse, podsResponse, notificationsResponse] = await Promise.all([
        supabase
          .from('ride_requests')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5),

        supabase
          .from('trip_pods')
          .select('*')
          .eq('created_by', user.id)
          .order('created_at', { ascending: false })
          .limit(5),

        supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .eq('read', false)
          .order('created_at', { ascending: false })
          .limit(10)
      ]);

      if (ridesResponse.error) throw ridesResponse.error;
      if (podsResponse.error) throw podsResponse.error;
      if (notificationsResponse.error) throw notificationsResponse.error;

      setRecentRides(ridesResponse.data || []);
      setTripPods(podsResponse.data || []);
      setNotifications(notificationsResponse.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleBookingSuccess = () => {
    fetchDashboardData();
  };

  const handleNotificationUpdate = () => {
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-line text-2xl text-gray-400"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
            <p className="text-gray-600">You need to be logged in to view your dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your trips and bookings</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-1 mb-8">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
              { id: 'trips', label: 'Available Trips', icon: 'ri-route-line' },
              { id: 'bookings', label: 'My Bookings', icon: 'ri-calendar-event-line' },
              { id: 'notifications', label: `Notifications ${unreadNotifications > 0 ? `(${unreadNotifications})` : ''}`, icon: 'ri-notification-line' },
              { id: 'profile', label: 'Profile', icon: 'ri-user-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-red-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={tab.icon}></i>
                </div>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-route-line text-blue-500 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{tripPods.length}</p>
                    <p className="text-sm text-gray-600">Available Trips</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-calendar-event-line text-green-500 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{myRequests.length}</p>
                    <p className="text-sm text-gray-600">My Bookings</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-notification-line text-purple-500 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{unreadNotifications}</p>
                    <p className="text-sm text-gray-600">New Notifications</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <i className="ri-checkbox-circle-line text-orange-500 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {myRequests.filter(r => r.status === 'completed').length}
                    </p>
                    <p className="text-sm text-gray-600">Completed Trips</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
                <div className="space-y-4">
                  {myRequests.slice(0, 3).map((request) => (
                    <RideRequestCard
                      key={request.id}
                      request={request}
                      showActions={false}
                      isDriverView={false}
                    />
                  ))}
                  {myRequests.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="ri-calendar-event-line text-gray-400 text-xl"></i>
                      </div>
                      <p className="text-gray-500">No bookings yet</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Notifications</h2>
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={handleNotificationUpdate}
                    />
                  ))}
                  {notifications.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="ri-notification-line text-gray-400 text-xl"></i>
                      </div>
                      <p className="text-gray-500">No notifications</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trips' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Trips</h2>
              <button
                onClick={fetchDashboardData}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap"
              >
                Refresh
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tripPods.map((pod) => (
                <TripPodCard
                  key={pod.id}
                  tripPod={pod}
                  onBookingSuccess={handleBookingSuccess}
                />
              ))}
            </div>
            {tripPods.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-route-line text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips available</h3>
                <p className="text-sm text-gray-600">
                  You haven&apos;t created any trip pods yet. Start by creating your first trip pod!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
            <div className="space-y-6">
              {myRequests.map((request) => (
                <RideRequestCard
                  key={request.id}
                  request={request}
                  showActions={false}
                  isDriverView={false}
                />
              ))}
            </div>
            {myRequests.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-calendar-event-line text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600">Start by booking your first trip!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleNotificationUpdate}
                />
              ))}
            </div>
            {notifications.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-notification-line text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-600">You're all caught up!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
            <UserProfileCard
              showEditButton={true}
              onProfileUpdate={fetchDashboardData}
            />
          </div>
        )}
      </div>
    </div>
  );
}
