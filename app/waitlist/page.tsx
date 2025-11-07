
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(2847);
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 34,
    seconds: 22
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          university,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setWaitlistCount(prev => prev + 1);
        setEmail('');
        setUniversity('');
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-orange-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-4xl text-green-600"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">You're In! 🎉</h1>
          <p className="text-gray-600 mb-6">
            Welcome to the future of student travel. You'll be among the first to experience safe, affordable transport.
          </p>
          <div className="bg-red-50 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-red-800">
              Position #{waitlistCount.toLocaleString()} on the waitlist
            </p>
          </div>
          <Link href="/" className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition cursor-pointer inline-block">
            Explore Platform
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-orange-500 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center text-white mb-12">
            {/* Urgency Timer */}
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">EARLY ACCESS CLOSING IN:</span>
              <div className="flex items-center gap-2 font-mono font-bold">
                <span>{timeLeft.days}d</span>
                <span>{timeLeft.hours}h</span>
                <span>{timeLeft.minutes}m</span>
                <span>{timeLeft.seconds}s</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Don't Get Left Behind
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We&apos;re expanding to more universities! Join our waitlist to be the first to know when SureRide launches at your campus.
            </p>
            <p className="text-lg text-gray-600 mb-12">
              Currently serving Pan-Atlantic University students. Don&apos;t worry - we&apos;re coming to your campus soon!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Social Proof & Features */}
            <div className="text-white space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4">Why Students Are Joining</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line text-sm text-green-900"></i>
                    </div>
                    <div>
                      <p className="font-semibold">70% Cheaper Than Flying</p>
                      <p className="text-sm opacity-80">Save thousands on interstate travel</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line text-sm text-green-900"></i>
                    </div>
                    <div>
                      <p className="font-semibold">100% Safer Than Random Buses</p>
                      <p className="text-sm opacity-80">GPS tracking & verified drivers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line text-sm text-green-900"></i>
                    </div>
                    <div>
                      <p className="font-semibold">Travel With Friends</p>
                      <p className="text-sm opacity-80">Join pods & split costs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Signups */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="font-semibold mb-3">Recent Signups</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Adebayo from University of Lagos just joined</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Fatima from Madonnna University joined</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Chioma from University of Nigeria joined</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Waitlist Form */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Join The Waitlist</h2>
                <p className="text-gray-600">Be first to access when we launch at your university</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu.ng"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="University of Lagos"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition cursor-pointer whitespace-nowrap disabled:opacity-50"
                >
                  {isSubmitting ? 'Joining...' : 'Secure My Spot Now'}
                </button>
              </form>

              {/* Trust Signals */}
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-gray-600">
                  Already have an account? <button onClick={() => setShowAuth(true)} className="text-red-600 hover:text-red-700 font-medium">Sign in</button>
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">University of Lagos</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">Madonnna University</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">University of Nigeria</span>
                </div>
              </div>

              {/* Scarcity */}
              <div className="mt-4 p-4 bg-orange-50 rounded-xl">
                <div className="flex items-center gap-2 text-orange-800">
                  <i className="ri-fire-line"></i>
                  <span className="text-sm font-medium">
                    Limited early access - Only {(5000 - waitlistCount).toLocaleString()} spots remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
