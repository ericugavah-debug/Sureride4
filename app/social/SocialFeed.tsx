
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { supabase } from '@/lib/supabase'

export default function SocialFeed() {
  const { user } = useAuth()
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showJoinPodModal, setShowJoinPodModal] = useState(false);
  const [selectedPod, setSelectedPod] = useState(null);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [posts, setPosts] = useState<any[]>([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(true)

  const stories = [
    {
      id: 1,
      user: 'Your Story',
      image: 'https://readdy.ai/api/search-image?query=Add%20story%20plus%20icon%20colorful%20gradient%20background%20modern%20social%20media%20interface%20design&width=100&height=100&seq=story0&orientation=squarish',
      isOwn: true
    },
    {
      id: 2,
      user: 'Chioma Okwu',
      image: 'https://readdy.ai/api/search-image?query=Nigerian%20university%20student%20girl%20taking%20selfie%20in%20bus%20during%20travel%20adventure%20happy%20expression%20modern%20portrait&width=100&height=100&seq=story1&orientation=squarish',
      viewed: false
    },
    {
      id: 3,
      user: 'Emeka Tech',
      image: 'https://readdy.ai/api/search-image?query=Nigerian%20male%20student%20at%20tech%20conference%20event%20taking%20selfie%20professional%20modern%20setting&width=100&height=100&seq=story2&orientation=squarish',
      viewed: true
    },
    {
      id: 4,
      user: 'Kemi Travels',
      image: 'https://readdy.ai/api/search-image?query=Nigerian%20female%20student%20at%20airport%20with%20luggage%20travel%20story%20selfie%20modern%20clean%20background&width=100&height=100&seq=story3&orientation=squarish',
      viewed: false
    }
  ];

  const getPostIcon = (type) => {
    switch (type) {
      case 'pod_event': return 'ri-calendar-event-fill text-blue-500';
      case 'trip_story': return 'ri-image-fill text-green-500';
      case 'trip_completion': return 'ri-checkbox-circle-fill text-purple-500';
      default: return 'ri-chat-3-fill text-gray-500';
    }
  };

  const handleJoinPod = (podDetails) => {
    setSelectedPod(podDetails);
    setShowJoinPodModal(true);
  };

  const confirmJoinPod = () => {
    console.log('Joining pod:', selectedPod);
    setJoinSuccess(true);
    setTimeout(() => {
      setShowJoinPodModal(false);
      setJoinSuccess(false);
      setSelectedPod(null);
    }, 2000);
  };

  return (
    <div>
      {/* Stories Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {stories.map((story, index) => (
            <div
              key={story.id}
              onClick={() => setActiveStoryIndex(index)}
              className="flex-shrink-0 cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-full p-0.5 ${
                story.isOwn 
                  ? 'bg-gray-300' 
                  : story.viewed 
                    ? 'bg-gray-300' 
                    : 'bg-gradient-to-tr from-red-500 to-purple-600'
              }`}>
                <div 
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${story.image}')` }}
                >
                  {story.isOwn && (
                    <div className="w-full h-full rounded-full bg-black/20 flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <i className="ri-add-line text-white text-sm font-bold"></i>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-center mt-1 truncate w-16">{story.user}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20headshot%20Nigerian%20university%20student%20smiling%20friendly%20expression%20clean%20modern%20background%20current%20user%20profile&width=100&height=100&seq=currentuser&orientation=squarish')` }}
          ></div>
          <button
            onClick={() => setShowCreatePost(true)}
            className="flex-1 bg-gray-100 text-left px-4 py-3 rounded-full text-gray-500 hover:bg-gray-200 cursor-pointer"
          >
            What's happening on your journey?
          </button>
        </div>
        
        <p className="text-gray-600 text-sm">
          Share what&apos;s on your mind with the SureRide community...
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 cursor-pointer">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-image-line"></i>
            </div>
            <span className="text-sm">Photo/Video</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-500 cursor-pointer">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-calendar-event-line"></i>
            </div>
            <span className="text-sm">Create Pod</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 cursor-pointer">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-map-pin-line"></i>
            </div>
            <span className="text-sm">Check-in</span>
          </button>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Create Post</h3>
              <button 
                onClick={() => setShowCreatePost(false)}
                className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
              >
                <i className="ri-close-line text-gray-500"></i>
              </button>
            </div>

            <div className="flex items-start space-x-3 mb-4">
              <div 
                className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20headshot%20Nigerian%20university%20student%20smiling%20friendly%20expression%20clean%20modern%20background%20current%20user%20profile&width=100&height=100&seq=currentuser&orientation=squarish')` }}
              ></div>
              <div className="flex-1">
                <textarea
                  placeholder="What's happening on your journey?"
                  rows={4}
                  className="w-full resize-none border-none focus:ring-0 text-lg placeholder-gray-500"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <button className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">
                  <i className="ri-image-line text-green-500"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">
                  <i className="ri-video-line text-red-500"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">
                  <i className="ri-map-pin-line text-blue-500"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">
                  <i className="ri-calendar-event-line text-purple-500"></i>
                </button>
              </div>
              <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 cursor-pointer whitespace-nowrap">
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm p-6">
            {/* Post Header */}
            <div className="flex items-start space-x-3 mb-4">
              <div 
                className="w-12 h-12 rounded-full bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url('${post.userPhoto}')` }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">{post.user}</p>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`${getPostIcon(post.type)} text-sm`}></i>
                  </div>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
                <p className="text-gray-600">
                  Just booked a ride to the mall! Anyone else going? Let&apos;s make it a &quot;shopping squad&quot; trip! 🛍️
                </p>
              </div>
            </div>

            {/* Pod Event Details */}
            {post.type === 'pod_event' && post.podDetails && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-blue-900">{post.podDetails.name}</h4>
                    <p className="text-sm text-blue-700">{post.podDetails.route}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-900">{post.podDetails.price}</p>
                    <p className="text-xs text-blue-600">{post.podDetails.spotsLeft} spots left</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">{post.podDetails.date}</span>
                  <button 
                    onClick={() => handleJoinPod(post.podDetails)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 cursor-pointer whitespace-nowrap"
                  >
                    Join Pod
                  </button>
                </div>
              </div>
            )}

            {/* Trip Completion Details */}
            {post.type === 'trip_completion' && post.tripDetails && (
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex items-center space-x-1">
                        {[1,2,3,4,5].map((star) => (
                          <div key={star} className="w-4 h-4 flex items-center justify-center">
                            <i className={`ri-star-${star <= post.tripDetails.rating ? 'fill' : 'line'} text-yellow-400 text-sm`}></i>
                          </div>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-purple-900">Trip Rating</span>
                    </div>
                    <p className="text-sm text-purple-700">{post.tripDetails.route} • {post.tripDetails.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-purple-700">{post.tripDetails.podMembers} members</p>
                  </div>
                </div>
              </div>
            )}

            {/* Post Media */}
            {post.image && (
              <div 
                className="w-full h-64 rounded-lg bg-cover bg-center mb-4"
                style={{ backgroundImage: `url('${post.image}')` }}
              ></div>
            )}

            {/* Multiple Media */}
            {post.media && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {post.media.map((media, index) => (
                  <div
                    key={index}
                    className="h-48 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url('${media.url}')` }}
                  ></div>
                ))}
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-heart-line"></i>
                  </div>
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-chat-3-line"></i>
                  </div>
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-share-line"></i>
                  </div>
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">
          Load More Posts
        </button>
      </div>

      {/* Join Pod Modal */}
      {showJoinPodModal && selectedPod && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            {!joinSuccess ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Join EduPod</h3>
                  <button 
                    onClick={() => setShowJoinPodModal(false)}
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                  >
                    <i className="ri-close-line text-gray-500"></i>
                  </button>
                </div>

                {/* Pod Details */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">{selectedPod.name}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-700">Route:</span>
                      <span className="font-medium text-blue-900">{selectedPod.route}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-700">Date:</span>
                      <span className="font-medium text-blue-900">{selectedPod.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-700">Price:</span>
                      <span className="font-medium text-blue-900">{selectedPod.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-700">Spots Available:</span>
                      <span className="font-medium text-blue-900">{selectedPod.spotsLeft} left</span>
                    </div>
                  </div>
                </div>

                {/* Auto Features Notice */}
                <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 flex items-center justify-center mt-0.5">
                      <i className="ri-checkbox-circle-fill text-green-500"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-900 mb-1">Automatic Features</p>
                      <ul className="text-xs text-green-700 space-y-1">
                        <li>• Added to pod chat room instantly</li>
                        <li>• Trip notifications and updates</li>
                        <li>• Coordinate with other members</li>
                        <li>• Access to real-time location sharing</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Payment & Safety Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-shield-check-line text-green-500"></i>
                      </div>
                      <span className="text-sm text-gray-700">Verified students only</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-secure-payment-line text-blue-500"></i>
                      </div>
                      <span className="text-sm text-gray-700">Secure payment processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-customer-service-2-line text-purple-500"></i>
                      </div>
                      <span className="text-sm text-gray-700">24/7 support available</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowJoinPodModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmJoinPod}
                    className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap"
                  >
                    Join Pod
                  </button>
                </div>

                {/* Alternative Actions */}
                <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                  <Link 
                    href="/social/chat" 
                    className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer"
                  >
                    View Pod Chats
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link 
                    href="/social?tab=pods" 
                    className="text-sm text-purple-500 hover:text-purple-600 cursor-pointer"
                  >
                    Browse All Pods
                  </Link>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-checkbox-circle-fill text-3xl text-green-500"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Successfully Joined!</h3>
                <p className="text-gray-600 mb-4">You've been added to "{selectedPod.name}" and the pod chat room.</p>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center space-x-2 text-blue-700">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-chat-3-fill"></i>
                    </div>
                    <span className="text-sm font-medium">Pod chat is now active</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    href="/social/chat"
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer whitespace-nowrap text-center"
                  >
                    Open Chat
                  </Link>
                  <Link
                    href="/my-trips"
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-6 cursor-pointer whitespace-nowrap text-center"
                  >
                    View Trip
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
