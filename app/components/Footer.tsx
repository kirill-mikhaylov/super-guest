'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(loginStatus === 'true');
    };

    // Check on mount
    checkLoginStatus();

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-tab login/logout
    window.addEventListener('loginStateChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('loginStateChange', handleStorageChange);
    };
  }, []);

  return (
    <footer className="bg-purple-50 border-t border-purple-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="text-xl font-bold text-gray-900">SuperGuest</span>
              <span className="text-sm text-purple-600 font-medium">for Fairy Tales</span>
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              Your magical event management platform trusted across all realms. Host legendary gatherings, 
              manage fairy tale characters seamlessly, and discover enchanted attendees to grow your magical community. 
              <span className="text-purple-600 font-medium"> Now with 100% fewer dragon incidents!</span> 🐉
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-purple-900 tracking-wider uppercase">
              🏰 Magical Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link 
                  href={isLoggedIn ? "/dashboard" : "/"} 
                  className="text-base text-gray-500 hover:text-purple-700"
                >
                  🏠 {isLoggedIn ? "Realm Home" : "Castle Home"}
                </Link>
              </li>
              {!isLoggedIn && (
                <li>
                  <Link href="/login" className="text-base text-gray-500 hover:text-purple-700">
                    ✨ Join the Realm
                  </Link>
                </li>
              )}
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-purple-700">
                  📜 Event Spellbooks
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-purple-700">
                  🧙‍♀️ Magical Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-purple-900 tracking-wider uppercase">
              🌟 Connect Across Realms
            </h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-purple-400 hover:text-purple-600">
                <span className="sr-only">Crystal Ball Network</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-purple-400 hover:text-purple-600">
                <span className="sr-only">Enchanted Messages</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-purple-400 hover:text-purple-600">
                <span className="sr-only">Royal Professional Network</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              📮 Also accepting messages via carrier pigeon, dragon mail, and enchanted mirrors
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-purple-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} SuperGuest for Fairy Tales. All rights reserved across all realms and dimensions. ✨
          </p>
          <p className="text-xs text-center text-purple-500 mt-2">
            Disclaimer: Not responsible for uninvited fairy godmothers, time-traveling incidents, or magical transformations at midnight. 
            Dragons welcome but must be house-trained. 🐉👑
          </p>
          <p className="text-xs text-center text-purple-600 mt-3 font-medium">
            🪄 This magical experience was conjured by the Royal Council of Wizards: Adam Burgh, Kirill Mikhaylov, and Steve Nielsen 🧙‍♂️✨
          </p>
          <p className="text-xs text-center text-purple-500 mt-1">
            🏔️ Forged during the legendary 2025 #CascadiaJS Hackathon enchantment gathering in the mystical realm of Seattle, WA ⚡
          </p>
        </div>
      </div>
    </footer>
  );
}