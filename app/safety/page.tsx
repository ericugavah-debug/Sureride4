
'use client';

import Link from 'next/link';

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section 
          className="relative py-20 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=Professional%20Nigerian%20security%20personnel%20checking%20modern%20bus%20with%20GPS%20tracking%20system%2C%20safety%20equipment%20and%20emergency%20features%2C%20students%20boarding%20safely%20with%20verification%20process%2C%20clean%20modern%20transport%20facility&width=1920&height=1080&seq=safetyhero&orientation=landscape')`
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Safety is Our Priority
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Comprehensive safety measures designed specifically for Nigerian university students
            </p>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Multi-Layer Safety System</h2>
              <p className="text-lg text-gray-600">Every aspect of your journey is protected</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-shield-check-line text-xl text-red-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Student Verification</h3>
                <p className="text-gray-600">All users verified through .edu.ng emails and student ID cards. Only verified students can book trips.</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-gps-line text-xl text-blue-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-Time GPS Tracking</h3>
                <p className="text-gray-600">Live location tracking for all vehicles. Parents and emergency contacts receive real-time updates.</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-user-star-line text-xl text-green-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Drivers</h3>
                <p className="text-gray-600">All drivers undergo background checks, training, and regular safety assessments.</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-phone-line text-xl text-purple-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Emergency Support</h3>
                <p className="text-gray-600">Round-the-clock emergency hotline with immediate response for any safety concerns.</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-first-aid-kit-line text-xl text-yellow-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Equipment</h3>
                <p className="text-gray-600">All vehicles equipped with first aid kits, fire extinguishers, and emergency communication devices.</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-group-line text-xl text-orange-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Travel Pods</h3>
                <p className="text-gray-600">Group travel with verified students from your university. Safety in numbers with trusted companions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Process */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Keep You Safe</h2>
              <p className="text-lg text-gray-600">From booking to destination - every step is secured</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Pre-Trip Verification</h3>
                    <p className="text-gray-600">Identity verification, emergency contacts, and trip pod formation with background checks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Vehicle Inspection</h3>
                    <p className="text-gray-600">Comprehensive safety checks, GPS activation, and emergency equipment verification before departure.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Monitoring</h3>
                    <p className="text-gray-600">Real-time location tracking, speed monitoring, and route adherence with automatic alerts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe Arrival</h3>
                    <p className="text-gray-600">Arrival confirmation, passenger check-in, and post-trip feedback for continuous improvement.</p>
                  </div>
                </div>
              </div>

              <div 
                className="h-96 bg-cover bg-center rounded-2xl shadow-lg"
                style={{
                  backgroundImage: `url('https://readdy.ai/api/search-image?query=Nigerian%20students%20safely%20boarding%20modern%20bus%20with%20GPS%20tracking%20system%2C%20safety%20officer%20checking%20passengers%2C%20emergency%20equipment%20visible%2C%20professional%20transport%20facility%20with%20security%20measures&width=600&height=400&seq=safetyprocess&orientation=landscape')`
                }}
              ></div>
            </div>
          </div>
        </section>

        {/* Emergency Procedures */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Procedures</h2>
              <p className="text-lg text-gray-600">Know what to do in case of emergencies</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-4">During Trip Emergencies</h3>
                <ul className="space-y-3 text-red-700">
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-line text-sm mt-1"></i>
                    <span>Press the emergency button in the app immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-line text-sm mt-1"></i>
                    <span>Call our 24/7 emergency hotline: +234 (0) 911 URGENT</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-line text-sm mt-1"></i>
                    <span>Alert other passengers and follow driver instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-line text-sm mt-1"></i>
                    <span>Emergency services are automatically notified with your location</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Medical Emergencies</h3>
                <ul className="space-y-3 text-blue-700">
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-line text-sm mt-1"></i>
                    <span>Inform the driver immediately for medical assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-line text-sm mt-1"></i>
                    <span>Use first aid kit available in every vehicle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-line text-sm mt-1"></i>
                    <span>Emergency contacts are notified automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-line text-sm mt-1"></i>
                    <span>Nearest hospital is contacted with your location</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Statistics */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety Track Record</h2>
              <p className="text-lg text-gray-600">Numbers that prove our commitment to safety</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">99.8%</div>
                <p className="text-gray-600">Trip Safety Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">0</div>
                <p className="text-gray-600">Major Incidents</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">24/7</div>
                <p className="text-gray-600">Emergency Support</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-500 mb-2">100%</div>
                <p className="text-gray-600">Verified Drivers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety Tips for Students</h2>
              <p className="text-lg text-gray-600">Simple steps to ensure your safety</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: 'ri-smartphone-line',
                  title: 'Keep Phone Charged',
                  tip: 'Always travel with a fully charged phone and portable charger'
                },
                {
                  icon: 'ri-contacts-line',
                  title: 'Share Trip Details',
                  tip: 'Share your trip details with family and friends before departure'
                },
                {
                  icon: 'ri-money-dollar-circle-line',
                  title: 'Avoid Cash Display',
                  tip: 'Keep valuables secure and avoid displaying cash or expensive items'
                },
                {
                  icon: 'ri-user-voice-line',
                  title: 'Trust Your Instincts',
                  tip: 'If something feels wrong, report it immediately to our support team'
                },
                {
                  icon: 'ri-group-line',
                  title: 'Stay with Your Pod',
                  tip: 'Travel with your assigned pod members and look out for each other'
                },
                {
                  icon: 'ri-map-pin-line',
                  title: 'Know Your Route',
                  tip: 'Familiarize yourself with the planned route and major stops'
                }
              ].map((tip, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <i className={`${tip.icon} text-xl text-red-500`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-red-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Travel Safely?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of students who trust SureRide for safe, reliable transportation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/waitlist"
                className="bg-red-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition cursor-pointer whitespace-nowrap"
              >
                Join Waitlist
              </Link>
              <Link
                href="/support"
                className="bg-white text-red-500 border-2 border-red-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-50 transition cursor-pointer whitespace-nowrap"
              >
                Safety Questions?
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}