'use client';

export default function StatsSection() {
  const stats = [
    { number: '50,000+', label: 'Students Served' },
    { number: '200+', label: 'Universities Connected' },
    { number: '98%', label: 'Safety Rating' },
    { number: '24/7', label: 'Customer Support' }
  ];

  return (
    <section 
      className="py-16 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://readdy.ai/api/search-image?query=Modern%20Nigerian%20transportation%20hub%20with%20buses%20and%20students%2C%20university%20campus%20environment%2C%20busy%20transport%20terminal%20with%20clean%20modern%20buses%2C%20professional%20transport%20service%20setting%2C%20bright%20daylight%20scene&width=1920&height=600&seq=stats1&orientation=landscape')`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Offer</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Trusted by thousands of students across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-lg text-gray-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}