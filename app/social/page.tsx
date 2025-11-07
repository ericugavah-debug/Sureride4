
'use client';

import { useState } from 'react';
import SocialNav from './SocialNav';
import ActivityFeed from './ActivityFeed';
import TripPods from './TripPods';
import SocialFeed from './SocialFeed';
import UserProfile from './UserProfile';

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState('feed');

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <SocialFeed />;
      case 'activity':
        return <ActivityFeed />;
      case 'pods':
        return <TripPods />;
      case 'profile':
        return <UserProfile />;
      default:
        return <SocialFeed />;
    }
  };

  // Simple fallback image in case a friend's image URL fails or is undefined
  const fallbackImage =
    'https://via.placeholder.com/100?text=User';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <SocialNav activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Friends Suggestions */}
                <div className="bg-white rounded-xl shadow-sm p-4 mt-6">
                  <h3 className="font-bold text-gray-900 mb-4">Suggested Friends</h3>
                  <div className="space-y-3">
                    {[
                      {
                        name: 'Sarah Okon',
                        school: 'University of Lagos',
                        image:
                          'https://readdy.ai/api/search-image?query=Nigerian%20female%20university%20student%20professional%20headshot%20smiling%20friendly%20expression%20clean%20modern%20background&width=100&height=100&seq=friend1&orientation=squarish',
                      },
                      {
                        name: 'David Eze',
                        school: 'Covenant University',
                        image:
                          'https://readdy.ai/api/search-image?query=Nigerian%20male%20university%20student%20professional%20headshot%20smiling%20friendly%20expression%20clean%20modern%20background&width=100&height=100&seq=friend2&orientation=squarish',
                      },
                    ].map((friend, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${
                              friend.image || fallbackImage
                            })`,
                          }}
                          aria-label={`Friend ${friend.name} avatar`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {friend.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {friend.school}
                          </p>
                        </div>
                        <button className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 cursor-pointer whitespace-nowrap">
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Groups */}
                <div className="bg-white rounded-xl shadow-sm p-4 mt-6">
                  <h3 className="font-bold text-gray-900 mb-4">Your Groups</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Lagos Tech Students', members: 124 },
                      { name: 'UI/UX Travelers', members: 89 },
                      { name: 'Weekend Warriors', members: 67 },
                    ].map((group, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 flex items-center justify-center">
                            <i className="ri-group-2-fill text-white"></i>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {group.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {group.members} members
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">{renderContent()}</div>

            {/* Right Sidebar - Trending & Quick Actions */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Trending Destinations */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Trending Destinations
                  </h3>
                  <div className="space-y-3">
                    {[
                      { place: 'Lagos', trips: 24 },
                      { place: 'Abuja', trips: 18 },
                      { place: 'Ibadan', trips: 12 },
                      { place: 'Port Harcourt', trips: 9 },
                    ].map((destination, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {destination.place}
                          </p>
                          <p className="text-xs text-gray-500">
                            {destination.trips} active pods
                          </p>
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center">
                          <i className="ri-fire-line text-red-500"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap text-sm">
                      Create Pod
                    </button>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer whitespace-nowrap text-sm">
                      Find Pods
                    </button>
                    <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 cursor-pointer whitespace-nowrap text-sm">
                      Start Chat
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-user-add-line text-blue-500"></i>
                      </div>
                      <span className="text-gray-600">
                        3 new friend requests
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-calendar-event-line text-purple-500"></i>
                      </div>
                      <span className="text-gray-600">
                        2 new pod invitations
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-chat-3-line text-green-500"></i>
                      </div>
                      <span className="text-gray-600">
                        5 unread messages
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
