import React, { useState, useEffect } from 'react';

const Skiper39 = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple entrance animation using CSS transitions
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div
        className={`text-center transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-8'
        }`}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            Quickeven
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Fast, Modern, and Responsive Web Experience
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors duration-200 font-semibold">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Lightning Fast</h3>
            <p className="text-sm text-gray-600 mt-2">Optimized for speed</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Reliable</h3>
            <p className="text-sm text-gray-600 mt-2">Always available</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Scalable</h3>
            <p className="text-sm text-gray-600 mt-2">Grows with you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skiper39;