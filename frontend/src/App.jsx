import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import { removeBackground, getUserUsage, trackAdWatch } from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadSection from './components/UploadSection';
import ImageComparison from './components/ImageComparison';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [error, setError] = useState('');

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        loadUserUsage(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // Load user usage data
  const loadUserUsage = async (userId) => {
    try {
      const usage = await getUserUsage(userId);
      const maxFree = 10;
      const totalAllowed = maxFree + (usage.adWatchCount || 0);
      const used = usage.count || 0;
      setRemaining(totalAllowed - used);
    } catch (error) {
      console.error('Error loading usage:', error);
    }
  };

  // Handle image upload and processing
  const handleImageUpload = async (file) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setError('');
    setIsProcessing(true);

    try {
      // Create preview of original image
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target.result);
      };
      reader.readAsDataURL(file);

      // Process the image
      const result = await removeBackground(file);
      
      if (result.success) {
        setProcessedImage(result.imageUrl);
        setRemaining(result.remaining);
      } else {
        throw new Error('প্রসেসিং ব্যর্থ হয়েছে');
      }
    } catch (err) {
      console.error('Error processing image:', err);
      setError(err.message || 'ছবি প্রসেস করতে ব্যর্থ হয়েছে');
      
      // Show ad modal if limit reached
      if (err.message.includes('সীমা শেষ')) {
        setShowAdModal(true);
      } else {
        alert(err.message);
      }
      
      setOriginalImage(null);
      setProcessedImage(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRemaining(null);
      setOriginalImage(null);
      setProcessedImage(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Handle new image
  const handleNewImage = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError('');
  };

  // Handle ad watch
  const handleAdWatch = async () => {
    try {
      await trackAdWatch();
      setShowAdModal(false);
      
      // Reload usage
      if (user) {
        await loadUserUsage(user.uid);
      }
      
      alert('বিজ্ঞাপন সফলভাবে দেখা হয়েছে! আপনি আরও ১টি ব্যবহার পেয়েছেন।');
    } catch (error) {
      console.error('Error tracking ad:', error);
      alert('বিজ্ঞাপন ট্র্যাক করতে সমস্যা হয়েছে');
    }
  };

  // Simulate ad watch (for demo purposes)
  const simulateAdWatch = () => {
    setTimeout(() => {
      handleAdWatch();
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header
        user={user}
        onLoginClick={() => setShowAuthModal(true)}
        onLogoutClick={handleLogout}
        remaining={remaining}
      />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Dashboard (only if logged in) */}
        {user && !processedImage && (
          <Dashboard
            user={user}
            onShowAdModal={() => setShowAdModal(true)}
          />
        )}

        {/* Upload Section or Image Comparison */}
        {processedImage && originalImage ? (
          <ImageComparison
            originalImage={originalImage}
            processedImage={processedImage}
            onNewImage={handleNewImage}
          />
        ) : (
          <UploadSection
            onImageUpload={handleImageUpload}
            isProcessing={isProcessing}
            user={user}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}

      {/* Ad Modal */}
      {showAdModal && (
        <div className="modal-overlay" onClick={() => setShowAdModal(false)}>
          <div
            className="glass-white max-w-md w-full p-8 slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                বিজ্ঞাপন দেখুন
              </h3>

              <p className="text-gray-600 mb-6">
                আজকের বিনামূল্যের সীমা শেষ হয়েছে। আরও ব্যবহার করতে একটি বিজ্ঞাপন দেখুন এবং ১টি অতিরিক্ত ব্যবহার পান।
              </p>

              {/* Simulated Ad Space */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
                <p className="text-gray-500 text-sm mb-4">বিজ্ঞাপন এখানে দেখানো হবে</p>
                <div className="w-full h-32 bg-gradient-primary rounded flex items-center justify-center">
                  <span className="text-white font-semibold">Google AdSense</span>
                </div>
              </div>

              <button
                onClick={simulateAdWatch}
                className="btn-primary w-full mb-3"
              >
                বিজ্ঞাপন দেখুন (৩ সেকেন্ড)
              </button>

              <button
                onClick={() => setShowAdModal(false)}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                বাতিল করুন
              </button>

              <p className="text-xs text-gray-500 mt-4">
                বিজ্ঞাপন দেখার পর আপনি আরও ১টি ব্যবহার পাবেন
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
