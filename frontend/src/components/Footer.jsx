import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Convert year to Bengali numerals
  const toBengaliNumber = (num) => {
    const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).split('').map(digit => bengaliNumerals[digit]).join('');
  };

  return (
    <footer className="glass-white mt-auto py-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">L</span>
              </div>
              <h3 className="text-xl font-bold text-gradient">Lumi Bg Remove</h3>
            </div>
            <p className="text-gray-600 text-sm">
              বাংলাদেশের জন্য তৈরি একটি সহজ ব্যাকগ্রাউন্ড রিমুভ সেবা।
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">দ্রুত লিংক</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  ব্যবহার নীতিমালা
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  গোপনীয়তা নীতি
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  যোগাযোগ
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">আমাদের সাথে যোগ দিন</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-3">
              {/* Social Icons */}
              <a href="#" className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
            <p className="text-gray-600 text-sm">
              প্রতিদিন ১০টি বিনামূল্যে ব্যবহার
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 pt-6">
          <p className="text-center text-gray-600 text-sm">
            © {toBengaliNumber(currentYear)} Lumi Bg Remove. সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
