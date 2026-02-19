import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        onClose();
      } else {
        // Sign up
        if (!formData.name.trim()) {
          setError('অনুগ্রহ করে আপনার নাম দিন');
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Update profile with name
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });

        onClose();
      }
    } catch (err) {
      console.error('Auth error:', err);
      
      // Bengali error messages
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('এই ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে');
          break;
        case 'auth/invalid-email':
          setError('অবৈধ ইমেইল ঠিকানা');
          break;
        case 'auth/weak-password':
          setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
          break;
        case 'auth/user-not-found':
          setError('এই ইমেইলের কোন ব্যবহারকারী পাওয়া যায়নি');
          break;
        case 'auth/wrong-password':
          setError('ভুল পাসওয়ার্ড');
          break;
        case 'auth/network-request-failed':
          setError('ইন্টারনেট সংযোগ ব্যর্থ হয়েছে');
          break;
        default:
          setError('একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-white max-w-md w-full p-8 slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'লগইন করুন' : 'নিবন্ধন করুন'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field (only for signup) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                আপনার নাম
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="আপনার পুরো নাম লিখুন"
                required={!isLogin}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ইমেইল
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="কমপক্ষে ৬ অক্ষর"
              required
              minLength={6}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>অপেক্ষা করুন...</span>
              </div>
            ) : (
              <span>{isLogin ? 'লগইন করুন' : 'নিবন্ধন করুন'}</span>
            )}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {isLogin ? 'নতুন ব্যবহারকারী?' : 'ইতিমধ্যে অ্যাকাউন্ট আছে?'}
            {' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ name: '', email: '', password: '' });
              }}
              className="text-purple-600 font-semibold hover:underline"
            >
              {isLogin ? 'নিবন্ধন করুন' : 'লগইন করুন'}
            </button>
          </p>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-700 text-center">
            প্রতিদিন ১০টি বিনামূল্যে ব্যাকগ্রাউন্ড রিমুভ করুন
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
