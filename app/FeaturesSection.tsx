'use client';

export default function FeaturesSection() {
  const features = [
    {
      icon: 'ri-shield-check-line',
      title: 'Student Verified',
      description: 'Secure platform with student ID verification and .edu.ng email authentication'
    },
    {
      icon: 'ri-map-pin-2-line',
      title: 'GPS Tracking',
      description: 'Real-time bus location tracking for complete peace of mind during travel'
    },
    {
      icon: 'ri-group-line',
      title: 'Group Bookings',
      description: 'Book trips with friends or departments with special group discounts'
    },
    {
      icon: 'ri-wallet-line',
      title: 'Secure Payments',
      description: 'Multiple payment options including cards, USSD, and bank transfers'
    },
    {
      icon: 'ri-notification-line',
      title: 'Travel Alerts',
      description: 'Push notifications for delays, arrivals, and cancellations'
    },
    {
      icon: 'ri-customer-service-line',
      title: 'Emergency Support',
      description: 'In-app customer support and live chat for any trip issues'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide safe, reliable, and affordable transportation solutions designed specifically for students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-lg mb-4">
                <i className={`${feature.icon} text-2xl text-red-500`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}