
'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section 
          className="relative py-20 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=Nigerian%20university%20students%20with%20backpacks%20walking%20together%20on%20modern%20campus%20with%20buses%20and%20transportation%20facilities%20in%20background%2C%20bright%20sunny%20day%2C%20diverse%20group%20of%20happy%20students%2C%20modern%20educational%20infrastructure&width=1920&height=1080&seq=abouthero&orientation=landscape')`
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connecting Students, Ensuring Safety
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              We're revolutioning how Nigerian university students travel between states with safe, affordable, and social transport solutions.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Every year, thousands of Nigerian students travel between states for education, internships, and family visits. 
                  Traditional transport options are often unsafe, expensive, or unreliable.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  SureRide bridges this gap by providing verified, student-only transport services that prioritize safety, 
                  affordability, and social connection.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-white text-sm"></i>
                    </div>
                    <span className="text-gray-700">100% Student-verified community</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-white text-sm"></i>
                    </div>
                    <span className="text-gray-700">GPS-tracked vehicles with safety protocols</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-white text-sm"></i>
                    </div>
                    <span className="text-gray-700">Social pods for cost-sharing and connections</span>
                  </div>
                </div>
              </div>
              <div 
                className="h-96 bg-cover bg-center rounded-2xl shadow-lg"
                style={{
                  backgroundImage: `url('https://readdy.ai/api/search-image?query=Dynamic%20aerial%20view%20of%20modern%20luxury%20bus%20convoy%20traveling%20through%20scenic%20Nigerian%20landscape%20with%20young%20university%20students%20visible%20through%20large%20windows%2C%20golden%20hour%20lighting%20creating%20dramatic%20shadows%20and%20highlights%2C%20rolling%20hills%20and%20modern%20infrastructure%20in%20background%2C%20sense%20of%20adventure%20and%20journey%2C%20cinematic%20composition%20with%20vibrant%20colors%20and%20contemporary%20travel%20aesthetics%2C%20professional%20transport%20fleet&width=600&height=400&seq=missioncool&orientation=landscape')`
                }}
              ></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SureRide?</h2>
              <p className="text-lg text-gray-600">Built specifically for Nigerian university students</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-check-line text-2xl text-red-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Student Safety First</h3>
                <p className="text-gray-600">
                  All users verified through university emails. GPS tracking, emergency contacts, and safety protocols on every trip.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-group-line text-2xl text-blue-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Trip Pods</h3>
                <p className="text-gray-600">
                  Join or create travel pods with fellow students. Share costs, make friends, and travel together safely.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-money-dollar-circle-line text-2xl text-green-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Affordable Rates</h3>
                <p className="text-gray-600">
                  Up to 70% cheaper than flying. Group bookings and student discounts make travel accessible for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-red-500 mb-2">10,000+</div>
                <p className="text-gray-600">Students on Waitlist</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500 mb-2">25+</div>
                <p className="text-gray-600">Partner Universities</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500 mb-2">50+</div>
                <p className="text-gray-600">Verified Transport Partners</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500 mb-2">99.8%</div>
                <p className="text-gray-600">Safety Record</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-red-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join the Future of Student Travel?</h2>
            <p className="text-lg text-gray-600 mb-8">
              We&apos;re revolutionizing campus transportation by connecting students who need rides with fellow students who have cars. Our platform makes commuting safer, more affordable, and more social.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/waitlist"
                className="bg-red-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition cursor-pointer whitespace-nowrap"
              >
                Join Waitlist
              </Link>
              <Link
                href="/book"
                className="bg-white text-red-500 border-2 border-red-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-50 transition cursor-pointer whitespace-nowrap"
              >
                Book a Trip
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
