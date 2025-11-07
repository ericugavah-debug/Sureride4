
'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=Authentic%20candid%20photo%20of%20Nigerian%20university%20students%20with%20backpacks%20waiting%20at%20a%20modern%20bus%20terminal%2C%20real%20documentary%20style%20photography%20showing%20genuine%20emotions%20and%20interactions%2C%20students%20chatting%20and%20laughing%20naturally%20while%20boarding%20a%20clean%20modern%20bus%2C%20bright%20natural%20daylight%20with%20realistic%20lighting%2C%20no%20artificial%20or%20staged%20poses%2C%20photojournalistic%20style%20capturing%20real%20moments%20of%20student%20life%20and%20travel%2C%20contemporary%20Nigerian%20youth%20culture%2C%20bustling%20transport%20hub%20atmosphere%20with%20authentic%20details%20and%20textures&width=1920&height=1080&seq=heroreal3&orientation=landscape')`
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Safe, Affordable Transport for <span className="text-red-400">Students</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Providing transportation services for university students travelling between states, by air or by road.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/waitlist" className="bg-red-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-600 transition whitespace-nowrap cursor-pointer">
              Join Waitlist
            </Link>
            <Link href="/about" className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/30 transition whitespace-nowrap cursor-pointer">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
