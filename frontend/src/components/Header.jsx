import React from 'react';
import { auth } from '../services/firebase';

const Header = ({ user, onLoginClick, onLogoutClick, remaining }) => {
  return (
    <header className="glass-white sticky top-0 z-50 mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">L</span>
            </div>
            <h1 className="text-2xl font-bold text-gradient">Lumi Bg Remove</h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Remaining Count Badge */}
                {remaining !== null && (
                  <div className="hidden sm:flex items-center space-x-2 glass px-4 py-2 rounded-lg">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white font-semibold">বাকি: {remaining} টি</span>
                  </div>
                )}

                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.displayName || user.email}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={onLogoutClick}
                  className="btn-secondary text-sm"
                >
                  লগ আউট
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="btn-primary"
              >
                লগইন করুন
              </button>
            )}
          </nav>
        </div>

        {/* Mobile Remaining Count */}
        {user && remaining !== null && (
          <div className="sm:hidden mt-3 flex items-center justify-center space-x-2 glass px-4 py-2 rounded-lg">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-semibold">আজকে বাকি আছে: {remaining} টি</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
