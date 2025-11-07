'use client';

export default function UserProfile() {
  const userStats = {
    name: 'Chioma Okwu',
    school: 'University of Lagos',
    department: 'Computer Science',
    year: '300 Level',
    bio: 'Love exploring Nigeria! Always down for group trips and making new friends along the way 🚌✈️',
    profilePhoto: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20photo%20of%20a%20young%20Nigerian%20female%20university%20student%20smiling%20warmly%20friendly%20expression%20modern%20portrait%20style%20clean%20background%20confident%20and%20approachable&width=300&height=300&seq=userprof1&orientation=squarish',
    tripsCompleted: 24,
    friendsCount: 156,
    safetyRating: 4.9,
    totalDistance: '12,450 km',
    favDestination: 'Abuja'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Cover Photo */}
      <div 
        className="h-32 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20Nigerian%20landscape%20with%20buses%20on%20highway%20scenic%20view%20mountains%20and%20green%20vegetation%20travel%20themed%20background%20clean%20minimal%20modern%20style&width=600&height=200&seq=cover1&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="p-6">
        {/* Profile Photo */}
        <div className="relative -mt-16 mb-4">
          <div 
            className="w-24 h-24 rounded-full border-4 border-white bg-cover bg-center shadow-lg"
            style={{ backgroundImage: `url('${userStats.profilePhoto}')` }}
          ></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        {/* User Info */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{userStats.name}</h2>
          <p className="text-sm text-gray-600 mb-1">{userStats.school}</p>
          <p className="text-sm text-gray-500">{userStats.department} • {userStats.year}</p>
          
          <div className="flex items-center mt-2 mb-3">
            <div className="flex items-center space-x-1">
              {[1,2,3,4,5].map((star) => (
                <div key={star} className="w-4 h-4 flex items-center justify-center">
                  <i className={`ri-star-${star <= Math.floor(userStats.safetyRating) ? 'fill' : 'line'} text-yellow-400 text-sm`}></i>
                </div>
              ))}
              <span className="text-sm text-gray-600 ml-1">{userStats.safetyRating}</span>
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">{userStats.bio}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{userStats.tripsCompleted}</p>
            <p className="text-xs text-gray-600">Trips</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{userStats.friendsCount}</p>
            <p className="text-xs text-gray-600">Friends</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Distance</span>
            <span className="font-medium text-gray-900">{userStats.totalDistance}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Favorite Destination</span>
            <span className="font-medium text-gray-900">{userStats.favDestination}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 cursor-pointer whitespace-nowrap">
            Edit Profile
          </button>
          <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer whitespace-nowrap">
            View Travel History
          </button>
        </div>
      </div>
    </div>
  );
}