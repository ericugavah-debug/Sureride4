
'use client';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Adebayo Olakunle',
      university: 'University of Lagos',
      rating: 5,
      text: 'SureRide made my journey from Lagos to Ibadan so smooth and affordable. The GPS tracking gave my parents peace of mind.'
    },
    {
      name: 'Chinelo Okafor',
      university: 'University of Nigeria, Nsukka',
      rating: 5,
      text: 'Group booking with my friends was seamless. We got great discounts and the customer support was excellent throughout our trip.'
    },
    {
      name: 'Ibrahim Musa',
      university: 'Madonnna University',
      rating: 5,
      text: 'The air + ground bundle saved me so much time and money. Perfect for students who need reliable transport from airport to campus.'
    },
    {
      name: 'Blessing Eze',
      university: 'University of Port Harcourt',
      rating: 5,
      text: 'Student verification makes me feel safe traveling with other verified students. The platform is easy to use and very reliable.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Students Say</h2>
          <p className="text-lg text-gray-600">
            Real experiences from students across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-user-line text-xl text-gray-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.university}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <div key={i} className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-star-fill text-yellow-400"></i>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
