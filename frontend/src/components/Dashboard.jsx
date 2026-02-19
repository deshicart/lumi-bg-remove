import React, { useEffect, useState } from 'react';
import { getUserUsage } from '../services/api';
import { auth } from '../services/firebase';

const Dashboard = ({ user, onShowAdModal }) => {
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUsage();
    }
  }, [user]);

  const loadUsage = async () => {
    try {
      setLoading(true);
      const data = await getUserUsage(user.uid);
      setUsage(data);
    } catch (error) {
      console.error('Error loading usage:', error);
    } finally {
      setLoading(false);
    }
  };

  const maxFree = 10;
  const used = usage?.count || 0;
  const adWatches = usage?.adWatchCount || 0;
  const totalAllowed = maxFree + adWatches;
  const remaining = totalAllowed - used;
  const percentage = (used / totalAllowed) * 100;

  if (!user) {
    return null;
  }

  return (
    <div className="fade-in mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-white p-6 rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              ব্যবহারকারী ড্যাশবোর্ড
            </h2>
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">নাম</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user.displayName || 'ব্যবহারকারী'}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">ইমেইল</p>
                  <p className="text-lg font-semibold text-gray-800 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Usage Stats */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">আজকের ব্যবহার</h3>
                  <span className="text-2xl font-bold text-gradient">
                    {remaining} / {totalAllowed}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>

                <div className="mt-2 flex justify-between text-sm text-gray-600">
                  <span>ব্যবহৃত: {used} টি</span>
                  <span>বাকি: {remaining} টি</span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-lg text-white">
                  <p className="text-sm opacity-90 mb-1">বিনামূল্যে</p>
                  <p className="text-3xl font-bold">{maxFree}</p>
                  <p className="text-xs opacity-75 mt-1">প্রতিদিন</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg text-white">
                  <p className="text-sm opacity-90 mb-1">ব্যবহৃত</p>
                  <p className="text-3xl font-bold">{used}</p>
                  <p className="text-xs opacity-75 mt-1">আজকে</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg text-white col-span-2 md:col-span-1">
                  <p className="text-sm opacity-90 mb-1">বিজ্ঞাপন</p>
                  <p className="text-3xl font-bold">{adWatches}</p>
                  <p className="text-xs opacity-75 mt-1">দেখেছেন</p>
                </div>
              </div>

              {/* Watch Ad Button */}
              {remaining <= 0 && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-2">
                        আজকের বিনামূল্যের সীমা শেষ হয়েছে
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        আরও ব্যবহার করতে একটি বিজ্ঞাপন দেখুন এবং ১টি অতিরিক্ত ব্যবহার পান
                      </p>
                      <button
                        onClick={onShowAdModal}
                        className="btn-primary text-sm"
                      >
                        বিজ্ঞাপন দেখুন
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-700">
                      প্রতিদিন রাত ১২:০০ টায় (বাংলাদেশ সময়) আপনার বিনামূল্যে ব্যবহার রিসেট হবে।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
