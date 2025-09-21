'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Check login status from localStorage and listen for changes
  useEffect(() => {
    setIsClient(true);
    
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(loginStatus === 'true');
    };

    // Check initial status
    checkLoginStatus();

    // Listen for storage changes (when localStorage is updated from another tab/window)
    window.addEventListener('storage', checkLoginStatus);

    // Listen for custom events (when localStorage is updated in the same tab)
    window.addEventListener('loginStatusChanged', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 10);
    };

    // Check initial scroll position on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('loginStatusChanged'));
    router.push('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link href={isLoggedIn ? "/dashboard" : "/"} className="text-xl font-bold text-gray-900 hover:text-purple-700 cursor-pointer transition-colors duration-200 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              SuperGuest
              <span className="text-sm text-gray-500 font-normal">for Fairy Tales</span>
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            {isClient && isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200"
              >
                Leave the Realm 🚪
              </button>
            ) : isClient ? (
              <button
                onClick={handleSignIn}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200"
              >
                Enter the Realm ✨
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}