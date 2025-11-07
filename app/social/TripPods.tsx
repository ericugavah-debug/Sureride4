
'use client';

import { useState } from 'react';

export default function TripPods() {
  const [podFilter, setPodFilter] = useState('all');
  const [showCreatePod, setShowCreatePod] = useState(false);
  const [showFindPods, setShowFindPods] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [newPodData, setNewPodData] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    route: '',
    transportType: 'all',
    dateRange: 'all',
    maxPrice: '',
    spotsNeeded: 1,
    university: '',
    visibility: 'all'
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const pods = [
    {
      id: 1,
      name: 'Lagos to Abuja Express',
      description: 'Weekly trips between Lagos and Abuja for business students',
      members: 8,
      maxMembers: 12,
      nextTrip: '2024-03-15',
      route: 'Lagos → Abuja',
      type: 'road',
      visibility: 'public',
      admin: 'Chioma Okwu',
      image: 'https://readdy.ai/api/search-image?query=Modern%20comfortable%20bus%20on%20Nigerian%20highway%20between%20cities%20blue%20sky%20scenic%20landscape%20travel%20transportation%20students%20group%20trip&width=400&height=250&seq=pod1&orientation=landscape',
      tags: ['Business Students', 'Weekly', 'Reliable'],
      lastActivity: '2 hours ago',
      chatId: 'chat_pod_1',
      hasChatIntegration: true,
      price: 8500,
      university: 'University of Lagos',
      rating: 4.8,
      totalTrips: 24
    },
    {
      id: 2,
      name: 'OAU Weekend Flights',
      description: 'Affordable group flights for OAU students going home on weekends',
      members: 15,
      maxMembers: 20,
      nextTrip: '2024-03-18',
      route: 'Ile-Ife → Lagos',
      type: 'air',
      visibility: 'friends',
      admin: 'Kemi Adebayo',
      image: 'https://readdy.ai/api/search-image?query=Group%20of%20Nigerian%20university%20students%20at%20airport%20terminal%20with%20luggage%20happy%20excited%20about%20flight%20travel%20modern%20clean%20airport%20setting&width=400&height=250&seq=pod2&orientation=landscape',
      tags: ['OAU Students', 'Weekend', 'Flight'],
      lastActivity: '4 hours ago',
      chatId: 'chat_pod_2',
      hasChatIntegration: true,
      price: 25000,
      university: 'Obafemi Awolowo University',
      rating: 4.9,
      totalTrips: 18
    },
    {
      id: 3,
      name: 'Tech Students Connect',
      description: 'Computer Science and Engineering students traveling for internships and tech events',
      members: 6,
      maxMembers: 10,
      nextTrip: '2024-03-20',
      route: 'Multiple Routes',
      type: 'bundle',
      visibility: 'public',
      admin: 'Emeka Nwosu',
      image: 'https://readdy.ai/api/search-image?query=Young%20Nigerian%20tech%20students%20with%20laptops%20and%20bags%20at%20modern%20transport%20hub%20discussing%20travel%20plans%20professional%20clean%20background&width=400&height=250&seq=pod3&orientation=landscape',
      tags: ['Tech Events', 'Internships', 'Flexible'],
      lastActivity: '1 day ago',
      chatId: 'chat_pod_3',
      hasChatIntegration: true,
      price: 12000,
      university: 'Multiple Universities',
      rating: 4.7,
      totalTrips: 12
    }
  ];

  const discoverablePods = [
    {
      id: 4,
      name: 'Ibadan to Lagos Daily Commute',
      description: 'Daily commuter pod for students and young professionals. Safe, reliable, and affordable.',
      members: 5,
      maxMembers: 8,
      nextTrip: '2024-03-16',
      route: 'Ibadan → Lagos',
      type: 'road',
      visibility: 'public',
      admin: 'Folake Adesanya',
      image: 'https://readdy.ai/api/search-image?query=Professional%20modern%20bus%20interior%20with%20Nigerian%20commuters%20students%20clean%20comfortable%20seating%20daily%20transport%20service&width=400&height=250&seq=discover1&orientation=landscape',
      tags: ['Daily Commute', 'Professional', 'Reliable'],
      lastActivity: '30 minutes ago',
      price: 3500,
      university: 'University of Ibadan',
      rating: 4.6,
      totalTrips: 45,
      spotsLeft: 3,
      departureTime: '06:30 AM',
      features: ['WiFi', 'AC', 'Phone Charging']
    },
    {
      id: 5,
      name: 'Abuja Airport Shuttle Pod',
      description: 'Convenient shuttle service to Abuja airport for students with early flights. Group discounts available.',
      members: 12,
      maxMembers: 15,
      nextTrip: '2024-03-17',
      route: 'FCT Universities → Abuja Airport',
      type: 'air',
      visibility: 'public',
      admin: 'Ibrahim Yusuf',
      image: 'https://readdy.ai/api/search-image?query=Airport%20shuttle%20van%20with%20Nigerian%20university%20students%20and%20luggage%20modern%20professional%20transport%20service%20to%20airport%20clean%20setting&width=400&height=250&seq=discover2&orientation=landscape',
      tags: ['Airport Transfer', 'Early Flights', 'Group Discount'],
      lastActivity: '1 hour ago',
      price: 4500,
      university: 'University of Abuja',
      rating: 4.9,
      totalTrips: 32,
      spotsLeft: 3,
      departureTime: '04:00 AM',
      features: ['Luggage Space', '24/7 Service', 'Flight Tracking']
    },
    {
      id: 6,
      name: 'Cross-Country Adventure Pod',
      description: 'Monthly long-distance trips for adventurous students. Explore Nigeria safely with fellow students.',
      members: 8,
      maxMembers: 12,
      nextTrip: '2024-03-22',
      route: 'Lagos → Jos → Kaduna → Kano',
      type: 'bundle',
      visibility: 'public',
      admin: 'Aisha Mohammed',
      image: 'https://readdy.ai/api/search-image?query=Adventure%20travel%20bus%20with%20Nigerian%20students%20exploring%20scenic%20Nigerian%20landscape%20mountains%20hills%20beautiful%20countryside%20multimodal%20transport&width=400&height=250&seq=discover3&orientation=landscape',
      tags: ['Adventure', 'Long Distance', 'Sightseeing'],
      lastActivity: '2 hours ago',
      price: 18500,
      university: 'Multiple Universities',
      rating: 4.8,
      totalTrips: 8,
      spotsLeft: 4,
      departureTime: '05:00 AM',
      features: ['Tour Guide', 'Meals Included', 'Photo Stops']
    },
    {
      id: 7,
      name: 'Weekend Home Visits - Port Harcourt',
      description: 'Weekly trips home for students studying in Port Harcourt. Family-friendly and secure.',
      members: 10,
      maxMembers: 14,
      nextTrip: '2024-03-16',
      route: 'Port Harcourt → Owerri → Enugu',
      type: 'road',
      visibility: 'public',
      admin: 'Chinedu Okonkwo',
      image: 'https://readdy.ai/api/search-image?query=Comfortable%20bus%20with%20Nigerian%20students%20traveling%20home%20weekend%20family%20visits%20safe%20secure%20transport%20Eastern%20Nigeria%20route&width=400&height=250&seq=discover4&orientation=landscape',
      tags: ['Weekend', 'Family Visits', 'Eastern Route'],
      lastActivity: '3 hours ago',
      price: 6500,
      university: 'University of Port Harcourt',
      rating: 4.7,
      totalTrips: 28,
      spotsLeft: 4,
      departureTime: '02:00 PM',
      features: ['Family Safe', 'Weekend Schedule', 'Reliable']
    },
    {
      id: 8,
      name: 'Medical Students Emergency Pod',
      description: 'Quick transport for medical students during emergencies and hospital rotations. Priority service.',
      members: 6,
      maxMembers: 8,
      nextTrip: '2024-03-15',
      route: 'Medical Schools → Teaching Hospitals',
      type: 'road',
      visibility: 'public',
      admin: 'Dr. Sarah Adebayo',
      image: 'https://readdy.ai/api/search-image?query=Medical%20students%20in%20clean%20professional%20van%20transport%20to%20hospital%20emergency%20response%20vehicle%20Nigerian%20healthcare%20students&width=400&height=250&seq=discover5&orientation=landscape',
      tags: ['Medical Students', 'Emergency', 'Priority Service'],
      lastActivity: '45 minutes ago',
      price: 2500,
      university: 'Lagos State University',
      rating: 5.0,
      totalTrips: 15,
      spotsLeft: 2,
      departureTime: 'On Demand',
      features: ['Emergency Response', '24/7 Available', 'Medical Priority']
    }
  ];

  const universities = [
    'All Universities',
    'University of Lagos',
    'Obafemi Awolowo University', 
    'University of Ibadan',
    'University of Abuja',
    'Lagos State University',
    'University of Port Harcourt',
    'Multiple Universities'
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'road': return 'ri-bus-2-line text-blue-500';
      case 'air': return 'ri-plane-line text-green-500';
      case 'bundle': return 'ri-apps-2-line text-purple-500';
      default: return 'ri-map-pin-line text-gray-500';
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'ri-global-line text-green-500';
      case 'friends': return 'ri-group-line text-blue-500';
      case 'private': return 'ri-lock-line text-gray-500';
      default: return 'ri-eye-line text-gray-500';
    }
  };

  const handleFilterChange = (field: string, value: string | number) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFindPods = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(false);
    
    // Simulate API search
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Filter discoverable pods based on search criteria
    let filtered = [...discoverablePods];
    
    if (searchFilters.route) {
      filtered = filtered.filter(pod => 
        pod.route.toLowerCase().includes(searchFilters.route.toLowerCase()) ||
        pod.name.toLowerCase().includes(searchFilters.route.toLowerCase())
      );
    }
    
    if (searchFilters.transportType !== 'all') {
      filtered = filtered.filter(pod => pod.type === searchFilters.transportType);
    }
    
    if (searchFilters.university && searchFilters.university !== 'All Universities') {
      filtered = filtered.filter(pod => pod.university === searchFilters.university);
    }
    
    if (searchFilters.maxPrice) {
      filtered = filtered.filter(pod => pod.price <= parseInt(searchFilters.maxPrice));
    }
    
    if (searchFilters.spotsNeeded > 1) {
      filtered = filtered.filter(pod => pod.spotsLeft >= searchFilters.spotsNeeded);
    }
    
    setSearchResults(filtered);
    setIsSearching(false);
    setHasSearched(true);
  };

  const handleCreatePod = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newPod = {
      id: Date.now(),
      name: formData.get('podName') as string,
      description: formData.get('description') as string,
      type: formData.get('transportType') as string,
      maxMembers: parseInt(formData.get('maxMembers') as string),
      visibility: formData.get('visibility') as string,
      chatId: `chat_pod_${Date.now()}`,
      members: 1,
      admin: 'You',
      nextTrip: formData.get('tripDate') as string || '2024-03-25',
      route: formData.get('route') as string || 'Custom Route',
      hasChatIntegration: true
    };

    setNewPodData(newPod);
    setCreateSuccess(true);
    
    setTimeout(() => {
      setShowCreatePod(false);
      setCreateSuccess(false);
      setNewPodData(null);
    }, 3000);
  };

  const handleJoinPod = (podId: number, chatId: string) => {
    console.log(`Joining pod ${podId} and adding to chat ${chatId}`);
    alert('Successfully joined pod! You have been added to the pod chat.');
  };

  return (
    <div>
      {/* Header with Create Button */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Trip Pods (EduPods)</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowCreatePod(true)}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap text-sm"
            >
              Create Pod
            </button>
            <button 
              onClick={() => setShowFindPods(true)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 cursor-pointer whitespace-nowrap text-sm"
            >
              Find Pods
            </button>
          </div>
        </div>

        {/* New promotional paragraph */}
        <p className="text-gray-600 text-sm">
          Join the "Study Squad" for late-night library sessions! 📚
        </p>

        {/* Filter Tabs */}
        <div className="flex space-x-4">
          {[
            { key: 'all', label: 'All Pods' },
            { key: 'my-pods', label: 'My Pods' },
            { key: 'joined', label: 'Joined' },
            { key: 'public', label: 'Public' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setPodFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap ${
                podFilter === tab.key 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Find Pods Modal */}
      {showFindPods && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Discover EduPods</h3>
                <button 
                  onClick={() => setShowFindPods(false)}
                  className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
                >
                  <i className="ri-close-line text-gray-500"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Search Filters */}
              <form onSubmit={handleFindPods} className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {/* Route Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Route or Destination</label>
                    <input
                      type="text"
                      placeholder="e.g., Lagos to Abuja, Airport shuttle..."
                      value={searchFilters.route}
                      onChange={(e) => handleFilterChange('route', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Transport Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transport Type</label>
                    <select 
                      value={searchFilters.transportType}
                      onChange={(e) => handleFilterChange('transportType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="all">All Types</option>
                      <option value="road">Road Transport</option>
                      <option value="air">Air Travel</option>
                      <option value="bundle">Multi-Modal</option>
                    </select>
                  </div>

                  {/* University */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                    <select 
                      value={searchFilters.university}
                      onChange={(e) => handleFilterChange('university', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                    >
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                  </div>

                  {/* Max Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₦)</label>
                    <input
                      type="number"
                      placeholder="e.g., 10000"
                      value={searchFilters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Spots Needed */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Spots Needed</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={searchFilters.spotsNeeded}
                      onChange={(e) => handleFilterChange('spotsNeeded', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                    <select 
                      value={searchFilters.dateRange}
                      onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="all">Any Date</option>
                      <option value="today">Today</option>
                      <option value="tomorrow">Tomorrow</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                </div>

                {/* Quick Filter Tags */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Quick Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Airport Shuttle', icon: 'ri-plane-line' },
                      { label: 'Daily Commute', icon: 'ri-repeat-line' },
                      { label: 'Weekend Home', icon: 'ri-home-line' },
                      { label: 'Emergency Pod', icon: 'ri-alarm-line' },
                      { label: 'Adventure Trip', icon: 'ri-compass-3-line' },
                      { label: 'Medical Students', icon: 'ri-health-book-line' }
                    ].map((tag) => (
                      <button
                        key={tag.label}
                        type="button"
                        onClick={() => handleFilterChange('route', tag.label)}
                        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer text-sm"
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className={`${tag.icon} text-blue-500`}></i>
                        </div>
                        <span>{tag.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 cursor-pointer whitespace-nowrap disabled:opacity-50"
                >
                  {isSearching ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-loader-4-line animate-spin"></i>
                      </div>
                      <span>Searching Pods...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-search-line"></i>
                      </div>
                      <span>Find Matching Pods</span>
                    </div>
                  )}
                </button>
              </form>

              {/* Search Results */}
              {hasSearched && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Search Results ({searchResults.length} pods found)
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-filter-3-line"></i>
                      </div>
                      <span>Sorted by relevance</span>
                    </div>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="grid gap-4">
                      {searchResults.map((pod) => (
                        <div key={pod.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                          <div className="flex">
                            {/* Pod Image */}
                            <div 
                              className="w-48 h-32 bg-cover bg-center rounded-lg flex-shrink-0"
                              style={{ backgroundImage: `url('${pod.image}')` }}
                            ></div>

                            {/* Pod Content */}
                            <div className="flex-1 ml-6">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h5 className="text-lg font-bold text-gray-900">{pod.name}</h5>
                                    <div className="flex items-center space-x-1">
                                      <div className="w-4 h-4 flex items-center justify-center">
                                        <i className={getTypeIcon(pod.type)}></i>
                                      </div>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{pod.description}</p>
                                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <span>{pod.route}</span>
                                    <span>•</span>
                                    <span>Next: {pod.nextTrip}</span>
                                    <span>•</span>
                                    <span>Departure: {pod.departureTime}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-bold text-blue-600">₦{pod.price.toLocaleString()}</p>
                                  <p className="text-xs text-gray-500">per person</p>
                                </div>
                              </div>

                              {/* Pod Stats */}
                              <div className="flex items-center space-x-6 mb-3 text-sm">
                                <div className="flex items-center space-x-1">
                                  <div className="w-4 h-4 flex items-center justify-center">
                                    <i className="ri-group-line text-gray-500"></i>
                                  </div>
                                  <span className="text-gray-600">{pod.members}/{pod.maxMembers} members</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="w-4 h-4 flex items-center justify-center">
                                    <i className="ri-star-fill text-yellow-400"></i>
                                  </div>
                                  <span className="font-medium">{pod.rating}</span>
                                  <span className="text-gray-500">({pod.totalTrips} trips)</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="w-4 h-4 flex items-center justify-center">
                                    <i className="ri-checkbox-circle-line text-green-500"></i>
                                  </div>
                                  <span className="text-green-600 font-medium">{pod.spotsLeft} spots left</span>
                                </div>
                              </div>

                              {/* Features & Tags */}
                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-2">
                                  {pod.features.map((feature, index) => (
                                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-200 cursor-pointer whitespace-nowrap">
                                    View Details
                                  </button>
                                  <button 
                                    onClick={() => handleJoinPod(pod.id, pod.chatId)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 cursor-pointer whitespace-nowrap"
                                  >
                                    Join Pod
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="ri-search-line text-2xl text-gray-400"></i>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">No pods found</h4>
                      <p className="text-gray-600 mb-4">Try adjusting your search filters or create a new pod for your route.</p>
                      <button 
                        onClick={() => {
                          setShowFindPods(false);
                          setShowCreatePod(true);
                        }}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap"
                      >
                        Create New Pod
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Popular Pods (shown when no search) */}
              {!hasSearched && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-gray-900">Popular Pods Right Now</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-fire-line text-red-500"></i>
                      </div>
                      <span>Trending this week</span>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {discoverablePods.slice(0, 3).map((pod) => (
                      <div key={pod.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                        <div className="flex">
                          <div 
                            className="w-48 h-32 bg-cover bg-center rounded-lg flex-shrink-0"
                            style={{ backgroundImage: `url('${pod.image}')` }}
                          ></div>
                          <div className="flex-1 ml-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h5 className="text-lg font-bold text-gray-900">{pod.name}</h5>
                                  <div className="w-4 h-4 flex items-center justify-center">
                                    <i className={getTypeIcon(pod.type)}></i>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{pod.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {pod.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-blue-600">₦{pod.price.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">per person</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1">
                                  <div className="w-4 h-4 flex items-center justify-center">
                                    <i className="ri-star-fill text-yellow-400"></i>
                                  </div>
                                  <span className="font-medium">{pod.rating}</span>
                                </div>
                                <span className="text-green-600 font-medium">{pod.spotsLeft} spots left</span>
                              </div>
                              <button 
                                onClick={() => handleJoinPod(pod.id, pod.chatId)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 cursor-pointer whitespace-nowrap"
                              >
                                Join Pod
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Pod Modal */}
      {showCreatePod && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            {!createSuccess ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Create New EduPod</h3>
                  <button 
                    onClick={() => setShowCreatePod(false)}
                    className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
                  >
                    <i className="ri-close-line text-gray-500"></i>
                  </button>
                </div>

                <form onSubmit={handleCreatePod} className="space-y-5">
                  {/* Basic Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pod Name *</label>
                    <input
                      name="podName"
                      type="text"
                      placeholder="e.g., Lagos to Ibadan Weekend Express"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Choose a clear, descriptive name for your pod</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      name="description"
                      placeholder="Describe your pod purpose, travel schedule, and what makes it special..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Route & Trip Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
                      <input
                        name="route"
                        type="text"
                        placeholder="Lagos → Abuja"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Next Trip Date</label>
                      <input
                        name="tripDate"
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Transport & Settings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Transport Type</label>
                      <select name="transportType" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8">
                        <option value="road">Road Transport</option>
                        <option value="air">Air Travel</option>
                        <option value="bundle">Multi-Modal Bundle</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Members</label>
                      <input
                        name="maxMembers"
                        type="number"
                        min="2"
                        max="50"
                        defaultValue="10"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Visibility Settings */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Pod Visibility</label>
                    <div className="space-y-3">
                      {[
                        { value: 'public', label: 'Public Pod', icon: 'ri-global-line', desc: 'Anyone can find and join your pod' },
                        { value: 'friends', label: 'Friends Only', icon: 'ri-group-line', desc: 'Only your friends can see and join' },
                        { value: 'private', label: 'Private Pod', icon: 'ri-lock-line', desc: 'Join by invitation only' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="visibility"
                            value={option.value}
                            defaultChecked={option.value === 'public'}
                            className="mt-1 text-red-500 focus:ring-red-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <div className="w-5 h-5 flex items-center justify-center">
                                <i className={`${option.icon} text-gray-500`}></i>
                              </div>
                              <span className="font-medium text-gray-900">{option.label}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{option.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pod Features Notice */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center mt-0.5">
                        <i className="ri-magic-line text-blue-500"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-2">Automatic Pod Features</p>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>• Dedicated chat room created instantly</li>
                          <li>• Member coordination and trip planning</li>
                          <li>• Automatic trip notifications and updates</li>
                          <li>• Real-time location sharing during trips</li>
                          <li>• Group payment and expense splitting</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Safety & Guidelines */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center mt-0.5">
                        <i className="ri-shield-check-line text-green-500"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-900 mb-2">Safety & Trust</p>
                        <ul className="text-xs text-green-700 space-y-1">
                          <li>• All members verified as students</li>
                          <li>• Built-in emergency contact system</li>
                          <li>• Trip tracking and safety monitoring</li>
                          <li>• Community reporting and moderation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <input 
                      type="checkbox" 
                      id="terms-agreement" 
                      required
                      className="mt-1 w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label htmlFor="terms-agreement" className="text-sm text-gray-700 cursor-pointer">
                      I agree to be a responsible pod admin and follow community guidelines for safe student travel
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreatePod(false)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap font-medium"
                    >
                      Create Pod + Chat
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-checkbox-circle-fill text-4xl text-green-500"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pod Created Successfully!</h3>
                <p className="text-gray-600 mb-6">Your EduPod "{newPodData?.name}" is now live with automatic chat integration.</p>
                
                {/* Pod Summary */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-700">Pod Name:</span>
                      <span className="font-medium text-blue-900">{newPodData?.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-700">Transport:</span>
                      <span className="font-medium text-blue-900 capitalize">{newPodData?.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-700">Max Members:</span>
                      <span className="font-medium text-blue-900">{newPodData?.maxMembers} people</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-700">Visibility:</span>
                      <span className="font-medium text-blue-900 capitalize">{newPodData?.visibility}</span>
                    </div>
                  </div>
                </div>

                {/* Features Activated */}
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-green-900 mb-2">Features Activated:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                    <div className="flex items-center space-x-2">
                      <i className="ri-chat-3-fill"></i>
                      <span>Pod Chat Room</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-notification-3-fill"></i>
                      <span>Trip Notifications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-group-2-fill"></i>
                      <span>Member Management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-map-pin-fill"></i>
                      <span>Location Tracking</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 cursor-pointer whitespace-nowrap font-medium">
                    Open Pod Chat
                  </button>
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 cursor-pointer whitespace-nowrap">
                      Invite Members
                    </button>
                    <button className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 cursor-pointer whitespace-nowrap">
                      Plan First Trip
                    </button>
                  </div>
                </div>

                {/* Tips */}
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-900 mb-2">💡 Pro Tips:</p>
                  <ul className="text-xs text-yellow-700 space-y-1 text-left">
                    <li>• Share your pod link to attract members</li>
                    <li>• Set clear trip schedules and guidelines</li>
                    <li>• Use the chat to coordinate pickup points</li>
                    <li>• Enable location sharing for safety</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pods Grid */}
      <div className="grid grid-cols-1 gap-6">
        {pods.map((pod) => (
          <div key={pod.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex">
              {/* Pod Image */}
              <div 
                className="w-1/3 h-48 bg-cover bg-center"
                style={{ backgroundImage: `url('${pod.image}')` }}
              ></div>

              {/* Pod Content */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{pod.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{pod.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className={getTypeIcon(pod.type)}></i>
                        </div>
                        <span>{pod.route}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className={getVisibilityIcon(pod.visibility)}></i>
                        </div>
                        <span className="capitalize">{pod.visibility}</span>
                      </div>
                      {pod.hasChatIntegration && (
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-chat-3-fill text-green-500"></i>
                          </div>
                          <span>Auto Chat</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pod.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-group-line text-gray-500"></i>
                      </div>
                      <span className="text-gray-600">{pod.members}/{pod.maxMembers} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-calendar-line text-gray-500"></i>
                      </div>
                      <span className="text-gray-600">Next: {pod.nextTrip}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 cursor-pointer whitespace-nowrap">
                      View Pod
                    </button>
                    <button 
                      onClick={() => handleJoinPod(pod.id, pod.chatId)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 cursor-pointer whitespace-nowrap"
                    >
                      Join Pod
                    </button>
                    {pod.hasChatIntegration && (
                      <button className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 cursor-pointer whitespace-nowrap">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-chat-3-line"></i>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
