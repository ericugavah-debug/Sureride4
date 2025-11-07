
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  university: string;
  student_id: string;
  profile_image: string;
  created_at: string;
}

interface UserStats {
  totalTrips: number;
  totalSpent: number;
  averageRating: number;
  completedTrips: number;
}

interface UserProfileCardProps {
  userId?: string;
  showEditButton?: boolean;
  onProfileUpdate?: () => void;
}

export default function UserProfileCard({ 
  userId, 
  showEditButton = false, 
  onProfileUpdate 
}: UserProfileCardProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({
    totalTrips: 0,
    totalSpent: 0,
    averageRating: 0,
    completedTrips: 0
  });
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    phone: '',
    student_id: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUserProfile();
    fetchUserStats();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      let query = supabase.from('users').select('*');
      
      if (userId) {
        query = query.eq('id', userId);
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        query = query.eq('id', user.id);
      }

      const { data, error } = await query.single();

      if (error) throw error;

      setProfile(data);
      setEditForm({
        full_name: data.full_name || '',
        phone: data.phone || '',
        student_id: data.student_id || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      let targetUserId = userId;
      
      if (!targetUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        targetUserId = user.id;
      }

      const { data: requests, error } = await supabase
        .from('ride_requests')
        .select('total_amount, status')
        .eq('student_id', targetUserId);

      if (error) throw error;

      const totalTrips = requests.length;
      const completedTrips = requests.filter(r => r.status === 'completed').length;
      const totalSpent = requests
        .filter(r => r.status === 'completed')
        .reduce((sum, r) => sum + r.total_amount, 0);

      setStats({
        totalTrips,
        totalSpent,
        averageRating: 4.8, // Mock rating for now
        completedTrips
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!profile) return;
    
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: editForm.full_name,
          phone: editForm.phone,
          student_id: editForm.student_id
        })
        .eq('id', profile.id);

      if (error) throw error;

      setShowEditModal(false);
      fetchUserProfile();
      
      if (onProfileUpdate) {
        onProfileUpdate();
      }
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <i className="ri-user-line text-gray-400 text-xl"></i>
        </div>
        <p className="text-gray-500">Profile not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-full bg-cover bg-center"
              style={{ 
                backgroundImage: profile.profile_image 
                  ? `url('${profile.profile_image}')` 
                  : `url('https://readdy.ai/api/search-image?query=Professional%20Nigerian%20university%20student%20headshot%20smiling%20friendly%20expression%20clean%20modern%20background&width=150&height=150&seq=profile${profile.id}&orientation=squarish')`
              }}
            ></div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{profile.full_name}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <p className="text-sm text-gray-500">{profile.university}</p>
              <p className="text-sm text-gray-500">Student ID: {profile.student_id}</p>
            </div>
          </div>
          
          {showEditButton && (
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer whitespace-nowrap"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-route-line text-white"></i>
            </div>
            <p className="text-2xl font-bold text-blue-900">{stats.totalTrips}</p>
            <p className="text-sm text-blue-700">Total Trips</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-checkbox-circle-line text-white"></i>
            </div>
            <p className="text-2xl font-bold text-green-900">{stats.completedTrips}</p>
            <p className="text-sm text-green-700">Completed</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-money-naira-circle-line text-white"></i>
            </div>
            <p className="text-2xl font-bold text-purple-900">₦{stats.totalSpent.toLocaleString()}</p>
            <p className="text-sm text-purple-700">Total Spent</p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-star-fill text-white"></i>
            </div>
            <p className="text-2xl font-bold text-yellow-900">{stats.averageRating}</p>
            <p className="text-sm text-yellow-700">Rating</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-calendar-line text-gray-500"></i>
              </div>
              <span className="text-sm text-gray-600">Member since {formatJoinDate(profile.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-phone-line text-gray-500"></i>
              </div>
              <span className="text-sm text-gray-600">{profile.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="w-6 h-6 flex items-center justify-center cursor-pointer"
              >
                <i className="ri-close-line text-gray-500"></i>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  value={editForm.student_id}
                  onChange={(e) => setEditForm(prev => ({ ...prev, student_id: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                disabled={isUpdating}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
