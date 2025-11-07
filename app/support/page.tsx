
'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'

export default function SupportPage() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });

  const faqData = [
    {
      question: 'How do I verify my student status?',
      answer: 'You can verify your student status by registering with your university email address ending in .edu.ng and providing your student ID number. We also accept valid student ID cards for verification.'
    },
    {
      question: 'Is it safe to travel with other students?',
      answer: 'Yes! All users are verified students from accredited universities. Our vehicles have GPS tracking, emergency contacts, and safety protocols. Trip pods allow you to travel with students from your school or trusted connections.'
    },
    {
      question: 'How do trip pods work?',
      answer: 'Trip pods are groups of students traveling the same route. You can create a pod or join existing ones. Pods help share costs, ensure safety in numbers, and let you make friends while traveling.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfers, debit cards, mobile money (GTBank, Opay, Palmpay), and student-friendly payment plans. Group bookings get additional discounts.'
    },
    {
      question: 'What happens if my trip is cancelled?',
      answer: 'If we cancel your trip, you get a full refund within 24 hours. If you cancel 24+ hours before departure, you get 90% refund. Less than 24 hours: 50% refund.'
    },
    {
      question: 'Can I track my trip in real-time?',
      answer: 'Yes! All our vehicles have GPS tracking. You and your emergency contacts will receive real-time location updates throughout your journey.'
    },
    {
      question: 'Do you offer campus pickup?',
      answer: 'Yes, we offer campus pickup at partner universities. Select this option when booking. Additional fees may apply depending on location.'
    },
    {
      question: 'How do I join a trip pod?',
      answer: 'Browse available pods on your route, check member profiles, and send a join request. Pod creators can accept or decline based on compatibility and safety preferences.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSupportForm({
      ...supportForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Support request submitted! We\'ll get back to you within 24 hours.');
    setSupportForm({ name: '', email: '', category: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How Can We Help You?</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Get quick answers to common questions or contact our student support team
            </p>
          </div>
        </section>

        {/* Quick Help Cards */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-question-line text-2xl text-blue-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">FAQs</h3>
                <p className="text-gray-600">Quick answers to common questions</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition cursor-pointer">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-chat-3-line text-2xl text-green-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600">Chat with our support team</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition cursor-pointer">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-phone-line text-2xl text-red-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Line</h3>
                <p className="text-gray-600">24/7 emergency support</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">Everything you need to know about SureRide</p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition cursor-pointer"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <i className={`ri-${selectedFaq === index ? 'subtract' : 'add'}-line text-red-500`}></i>
                  </button>
                  {selectedFaq === index && (
                    <div className="px-6 pb-4 text-gray-600">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
              <p className="text-gray-600">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={supportForm.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-5
0 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={supportForm.email}
                      onChange={handleInputChange}
                      placeholder="student@university.edu.ng"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-
500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={supportForm.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-
500 focus:border-transparent pr-8"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="booking">Booking Issues</option>
                    <option value="payment">Payment Problems</option>
                    <option value="security">Safety Concerns</option>
                    <option value="account">Account Issues</option>
                    <option value="pods">Trip Pods</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={supportForm.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Describe your issue or question..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-
500 focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer whitespace-nowrap"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-mail-line text-2xl text-red-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600">support@edutransconnect.ng</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-phone-line text-2xl text-blue-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600">+234 (0) 800 STUDENT</p>
                <p className="text-sm text-gray-500">Mon-Fri 8AM-8PM</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-time-line text-2xl text-green-500"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Line</h3>
                <p className="text-gray-600">+234 (0) 911 URGENT</p>
                <p className="text-sm text-gray-500">24/7 for trip emergencies</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
