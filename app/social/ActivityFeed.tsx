'use client';

import { useState } from 'react';

export default function ActivityFeed() {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'trip_completed',
      user: 'Adunni Okafor',
      userPhoto: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20photo%20of%20a%20young%20Nigerian%20female%20university%20student%20smiling%20friendly%20expression%20clean%20background%20modern%20portrait%20style&width=200&height=200&seq=feed1&orientation=squarish',
      action: 'completed a trip from Lagos to Ibadan',
      time: '2 hours ago',
      details: 'Great experience with EduPod "Lagos Explorers" - 5 star trip!',
      image: 'https://readdy.ai/api/search-image?query=Happy%20Nigerian%20university%20students%20inside%20a%20comfortable%20modern%20bus%20taking%20selfie%20together%20during%20travel%20road%20trip%20adventure%20clean%20bright%20interior&width=400&height=300&seq=trip1&orientation=landscape',
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      type: 'pod_created',
      user: 'Kemi Adebayo',
      userPhoto: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20photo%20of%20a%20young%20Nigerian%20female%20university%20student%20smiling%20friendly%20expression%20clean%20background%20modern%20portrait%20style&width=200&height=200&seq=feed2&orientation=squarish',
      action: 'created a new EduPod "OAU Weekend Flight"',
      time: '4 hours ago',
      details: 'Looking for 8 OAU students for weekend flight to Lagos - cheaper together!',
      podMembers: 5,
      spotsLeft: 3,
      likes: 8,
      comments: 7
    },
    {
      id: 3,
      type: 'friend_joined',
      user: 'Emeka Nwosu',
      userPhoto: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20photo%20of%20a%20young%20Nigerian%20male%20university%20student%20smiling%20friendly%20expression%20clean%20background%20modern%20portrait%20style&width=200&height=200&seq=feed3&orientation=squarish',
      action: 'joined your EduPod "Abuja Business Students"',
      time: '6 hours ago',
      details: 'Ready for the trip next week! 🚌',
      likes: 15,
      comments: 2
    },
    {
      id: 4,
      type: 'review_posted',
      user: 'Fatima Ibrahim',
      userPhoto: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20photo%20of%20a%20young%20Nigerian%20female%20university%20student%20wearing%20hijab%20smiling%20friendly%20expression%20clean%20background%20modern%20portrait%20style&width=200&height=200&seq=feed4&orientation=squarish',
      action: 'rated fellow travelers in "Kano Express Pod"',
      time: '1 day ago',
      details: 'Amazing group! Everyone was punctual and friendly. Would travel with them again 💫',
      rating: 5,
      likes: 20,
      comments: 8
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'trip_completed': return 'ri-checkbox-circle-fill text-green-500';
      case 'pod_created': return 'ri-group-fill text-blue-500';
      case 'friend_joined': return 'ri-user-add-fill text-purple-500';
      case 'review_posted': return 'ri-star-fill text-yellow-500';
      default: return 'ri-notification-fill text-gray-500';
    }
  };

  return (
    <div>
      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex space-x-4">
          {[
            { key: 'all', label: 'All Activity' },
            { key: 'friends', label: 'Friends' },
            { key: 'pods', label: 'My Pods' },
            { key: 'trips', label: 'Trips' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap ${
                filter === tab.key 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-xl shadow-sm p-6">
            {/* Header */}
            <div className="flex items-start space-x-3 mb-4">
              <div 
                className="w-12 h-12 rounded-full bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url('${activity.userPhoto}')` }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`${getActivityIcon(activity.type)} text-sm`}></i>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-3">{activity.details}</p>
              
              {/* Special content based on activity type */}
              {activity.type === 'trip_completed' && activity.image && (
                <div 
                  className="w-full h-48 rounded-lg bg-cover bg-center mb-3"
                  style={{ backgroundImage: `url('${activity.image}')` }}
                ></div>
              )}

              {activity.type === 'pod_created' && (
                <div className="bg-blue-50 rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">Pod Members</p>
                      <p className="text-xs text-blue-700">{activity.podMembers}/8 joined</p>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 cursor-pointer whitespace-nowrap">
                      Join Pod
                    </button>
                  </div>
                </div>
              )}

              {activity.type === 'review_posted' && activity.rating && (
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map((star) => (
                      <div key={star} className="w-4 h-4 flex items-center justify-center">
                        <i className={`ri-star-${star <= activity.rating ? 'fill' : 'line'} text-yellow-400 text-sm`}></i>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Excellent Trip</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-heart-line text-sm"></i>
                  </div>
                  <span className="text-sm">{activity.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-chat-3-line text-sm"></i>
                  </div>
                  <span className="text-sm">{activity.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-share-line text-sm"></i>
                  </div>
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">
          Load More Activities
        </button>
      </div>
    </div>
  );
}