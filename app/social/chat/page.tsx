
'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import Link from 'next/link';

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const chatRooms = [
    {
      id: 1,
      name: 'Lagos to Abuja Express',
      members: 8,
      lastMessage: 'Bus will arrive at 6:30 AM tomorrow',
      lastTime: '5 min ago',
      unread: 3,
      tripDate: '2024-03-15',
      podId: 1,
      type: 'pod_chat',
      image: 'https://readdy.ai/api/search-image?query=Modern%20comfortable%20bus%20on%20Nigerian%20highway%20scenic%20background%20travel%20group%20students&width=100&height=100&seq=chat1&orientation=squarish'
    },
    {
      id: 2,
      name: 'OAU Weekend Flights',
      members: 15,
      lastMessage: 'Flight confirmation received!',
      lastTime: '1 hour ago',
      unread: 0,
      tripDate: '2024-03-18',
      podId: 2,
      type: 'pod_chat',
      image: 'https://readdy.ai/api/search-image?query=Nigerian%20university%20students%20at%20airport%20with%20luggage%20happy%20group%20flight%20travel&width=100&height=100&seq=chat2&orientation=squarish'
    },
    {
      id: 3,
      name: 'Tech Students Connect',
      members: 6,
      lastMessage: 'Anyone knows good accommodation in Lagos?',
      lastTime: '2 hours ago',
      unread: 1,
      tripDate: '2024-03-20',
      podId: 3,
      type: 'pod_chat',
      image: 'https://readdy.ai/api/search-image?query=Young%20Nigerian%20tech%20students%20with%20laptops%20and%20bags%20modern%20professional%20setting&width=100&height=100&seq=chat3&orientation=squarish'
    },
    {
      id: 4,
      name: 'UI/UX Study Group',
      members: 12,
      lastMessage: 'Let\'s meet at the library tomorrow',
      lastTime: '3 hours ago',
      unread: 2,
      tripDate: null,
      podId: null,
      type: 'group_chat',
      image: 'https://readdy.ai/api/search-image?query=Nigerian%20university%20students%20studying%20design%20UX%20UI%20modern%20laptop%20workspace%20group%20collaboration&width=100&height=100&seq=chat4&orientation=squarish'
    }
  ];

  const messages = [
    {
      id: 1,
      user: 'Chioma Okwu',
      userPhoto: 'https://readdy.ai/api/search-image?query=Nigerian%20female%20university%20student%20professional%20headshot%20smiling%20friendly%20expression&width=50&height=50&seq=user1&orientation=squarish',
      message: 'Hey everyone! Looking forward to our trip tomorrow 🚌',
      time: '10:30 AM',
      isOwn: true,
      type: 'text'
    },
    {
      id: 2,
      user: 'Adunni Okafor',
      userPhoto: 'https://readdy.ai/api/search-image?query=Nigerian%20female%20university%20student%20professional%20headshot%20smiling%20friendly%20expression&width=50&height=50&seq=user2&orientation=squarish',
      message: 'Same here! What time should we meet at the pickup point?',
      time: '10:32 AM',
      isOwn: false,
      type: 'text'
    },
    {
      id: 3,
      user: 'System',
      message: 'Pod Admin updated trip details: Departure time changed to 6:30 AM',
      time: '10:33 AM',
      isOwn: false,
      type: 'system',
      systemType: 'trip_update'
    },
    {
      id: 4,
      user: 'Kemi Adebayo',
      userPhoto: 'https://readdy.ai/api/search-image?query=Nigerian%20female%20university%20student%20professional%20headshot%20smiling%20friendly%20expression&width=50&height=50&seq=user3&orientation=squarish',
      message: 'Driver said 6:30 AM sharp. Don\'t be late guys! 😄',
      time: '10:35 AM',
      isOwn: false,
      type: 'text'
    },
    {
      id: 5,
      user: 'System',
      message: 'Emeka Nwosu joined the pod',
      time: '10:40 AM',
      isOwn: false,
      type: 'system',
      systemType: 'member_joined',
      newMember: 'Emeka Nwosu'
    },
    {
      id: 6,
      user: 'Chioma Okwu',
      userPhoto: 'https://readdy.ai/api/search-image?query=Nigerian%20female%20university%20student%20professional%20headshot%20smiling%20friendly%20expression&width=50&height=50&seq=user1&orientation=squarish',
      message: 'Perfect! I\'ll be there at 6:15 AM',
      time: '10:36 AM',
      isOwn: true,
      type: 'text'
    },
    {
      id: 7,
      user: 'Emeka Nwosu',
      userPhoto: 'https://readdy.ai/api/search-image?query=Nigerian%20male%20university%20student%20professional%20headshot%20smiling%20friendly%20expression&width=50&height=50&seq=user4&orientation=squarish',
      message: 'Bus will arrive at 6:30 AM tomorrow',
      time: '10:45 AM',
      isOwn: false,
      type: 'text'
    }
  ];

  const selectedChatData = chatRooms.find(chat => chat.id === selectedChat);

  const getChatTypeIcon = (type: string) => {
    switch (type) {
      case 'pod_chat': return 'ri-bus-2-line text-blue-500';
      case 'group_chat': return 'ri-group-2-line text-purple-500';
      default: return 'ri-chat-3-line text-gray-500';
    }
  };

  const renderSystemMessage = (message: any) => {
    switch (message.systemType) {
      case 'trip_update':
        return (
          <div className="flex items-center justify-center">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm flex items-center space-x-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-information-line"></i>
              </div>
              <span>{message.message}</span>
            </div>
          </div>
        );
      case 'member_joined':
        return (
          <div className="flex items-center justify-center">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm flex items-center space-x-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-user-add-line"></i>
              </div>
              <span>{message.message}</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center">
            <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm">
              {message.message}
            </div>
          </div>
        );
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In real app, send message to chat
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Trip Chats</h1>
              <p className="text-gray-600">Coordinate with your pod members</p>
            </div>
            <Link href="/social" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap">
              Back to Social
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[600px] flex">
            {/* Chat List Sidebar */}
            <div className="w-1/3 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search chats..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto">
                {chatRooms.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedChat === chat.id ? 'bg-red-50 border-r-2 border-r-red-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div 
                          className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url('${chat.image}')` }}
                        ></div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center">
                          <i className={`${getChatTypeIcon(chat.type)} text-xs`}></i>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                          <div className="flex items-center space-x-1">
                            {chat.unread > 0 && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {chat.unread}
                              </span>
                            )}
                            <span className="text-xs text-gray-500">{chat.lastTime}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">{chat.members} members</span>
                          {chat.tripDate && (
                            <span className="text-xs text-blue-500">Trip: {chat.tripDate}</span>
                          )}
                          {chat.type === 'pod_chat' && (
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Pod Chat</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-gray-200">
                <div className="space-y-2">
                  <Link href="/social" className="w-full bg-blue-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-600 cursor-pointer whitespace-nowrap text-center block">
                    View All Pods
                  </Link>
                  <button className="w-full bg-purple-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-purple-600 cursor-pointer whitespace-nowrap">
                    Create Group Chat
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div 
                        className="w-10 h-10 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url('${selectedChatData?.image}')` }}
                      ></div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 flex items-center justify-center">
                        <i className={`${getChatTypeIcon(selectedChatData?.type)} text-xs`}></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedChatData?.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{selectedChatData?.members} members</span>
                        {selectedChatData?.tripDate && (
                          <>
                            <span>•</span>
                            <span>Trip: {selectedChatData?.tripDate}</span>
                          </>
                        )}
                        {selectedChatData?.type === 'pod_chat' && (
                          <>
                            <span>•</span>
                            <span className="text-blue-500">Pod Chat</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedChatData?.podId && (
                      <Link href="/social" className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 cursor-pointer whitespace-nowrap">
                        View Pod
                      </Link>
                    )}
                    <button className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">
                      <i className="ri-phone-line text-gray-600"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">
                      <i className="ri-video-line text-gray-600"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">
                      <i className="ri-more-line text-gray-600"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    {message.type === 'system' ? (
                      <div className="py-2">
                        {renderSystemMessage(message)}
                      </div>
                    ) : (
                      <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                          {!message.isOwn && (
                            <div className="flex items-center space-x-2 mb-1">
                              <div 
                                className="w-6 h-6 rounded-full bg-cover bg-center"
                                style={{ backgroundImage: `url('${message.userPhoto}')` }}
                              ></div>
                              <p className="text-xs font-medium text-gray-600">{message.user}</p>
                            </div>
                          )}
                          <div className={`px-4 py-2 rounded-lg ${
                            message.isOwn 
                              ? 'bg-red-500 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${message.isOwn ? 'text-red-100' : 'text-gray-500'}`}>
                              {message.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                  <button type="button" className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">
                    <i className="ri-attachment-line text-gray-600"></i>
                  </button>
                  <button type="button" className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">
                    <i className="ri-image-line text-gray-600"></i>
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                    <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer">
                      <i className="ri-emotion-line text-gray-600"></i>
                    </button>
                  </div>
                  <button type="submit" className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 cursor-pointer">
                    <i className="ri-send-plane-fill text-sm"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
