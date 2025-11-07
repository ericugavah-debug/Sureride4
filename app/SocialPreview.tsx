
'use client';

import Link from 'next/link';

export default function SocialPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Connect with Fellow Students
          </h2>
          <p className="text-gray-600">
            Join the &quot;Study Squad&quot; for late-night library sessions! 📚
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trip Pods Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
              <i className="ri-group-fill text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Join Trip Pods</h3>
            <p className="text-gray-600 mb-6">
              Create or join travel groups with students going to the same destination. Share costs, make friends, and travel together safely.
            </p>
            <div className="space-y-3 mb-6">
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Lagos to Abuja Express</p>
                    <p className="text-xs text-gray-500">8/12 members • Next trip: Tomorrow</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">OAU Weekend Flights</p>
                    <p className="text-xs text-gray-500">15/20 members • Next trip: Weekend</p>
                  </div>
                </div>
              </div>
            </div>
            <Link 
              href="/social" 
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer whitespace-nowrap"
            >
              Explore Pods
            </Link>
          </div>

          {/* Group Chat Preview */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
              <i className="ri-chat-3-fill text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Trip Group Chat</h3>
            <p className="text-gray-600 mb-6">
              Stay connected with your travel pod through real-time chat. Share updates, coordinate meetups, and get support during your journey.
            </p>
            <div className="bg-white rounded-lg p-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="bg-gray-100 rounded-lg px-3 py-2 flex-1">
                    <p className="text-sm text-gray-900">Bus will arrive at 6:30 AM tomorrow!</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 justify-end">
                  <div className="bg-green-500 text-white rounded-lg px-3 py-2">
                    <p className="text-sm">Perfect! See you all there 🚌</p>
                  </div>
                </div>
              </div>
            </div>
            <Link 
              href="/social/chat" 
              className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer whitespace-nowrap"
            >
              Join Chats
            </Link>
          </div>

          {/* Social Features Preview */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
              <i className="ri-user-heart-fill text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Build Your Network</h3>
            <p className="text-gray-600 mb-6">
              Connect with students from your school and beyond. Rate fellow travelers, share experiences, and build a trusted travel network.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between bg-white rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Adunni Okafor</p>
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[1,2,3,4,5].map((star) => (
                          <div key={star} className="w-3 h-3 flex items-center justify-center">
                            <i className="ri-star-fill text-yellow-400 text-xs"></i>
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">4.9</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm text-gray-700 italic">"Great travel companion! Very punctual and friendly."</p>
              </div>
            </div>
            <Link 
              href="/social" 
              className="inline-block bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 cursor-pointer whitespace-nowrap"
            >
              Join Community
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Make Travel Social?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of students who are making their journeys safer, cheaper, and more fun
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/social" 
                className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 cursor-pointer whitespace-nowrap"
              >
                Explore Social Features
              </Link>
              <Link 
                href="/book" 
                className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 cursor-pointer whitespace-nowrap"
              >
                Book Your First Trip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
