'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Simulate successful login/signup
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      if (name) {
        localStorage.setItem('userName', name);
      }
      
      // Dispatch custom event to notify header component
      window.dispatchEvent(new Event('loginStatusChanged'));
      
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center mb-6">
            <span className="text-6xl">✨</span>
            <h1 className="text-2xl font-bold text-purple-900 mt-2">SuperGuest</h1>
            <p className="text-sm text-purple-600">for Fairy Tales</p>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? '🏰 Join the Royal Registry' : '👑 Welcome Back, Noble Host'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSignUp ? 'Already granted access to the realm? ' : "New to the magical kingdom? "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer"
            >
              {isSignUp ? '✨ Enter your castle' : '🏰 Request royal invitation'}
            </button>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Royal name or character title
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={isSignUp}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-purple-300 placeholder-purple-400 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="👑 Your royal name or character title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Magical correspondence address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-purple-300 placeholder-purple-400 text-gray-900 ${
                  !isSignUp ? 'rounded-t-md' : ''
                } focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                placeholder="📧 Your magical correspondence address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Secret spell or incantation
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-purple-300 placeholder-purple-400 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="🔮 Your secret spell or incantation"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                  🔮 Remember my magical essence
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                  🧙‍♀️ Forgot your spell?
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? '✨ Casting spell...' : (isSignUp ? '🏰 Join the royal court' : '👑 Enter your kingdom')}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              🏠 ← Return to the enchanted realm
            </Link>
          </div>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-pink-50 border border-pink-200 rounded-md">
          <h3 className="text-sm font-medium text-pink-800">🎭 Royal Demo Access</h3>
          <p className="text-sm text-pink-700 mt-1">
            Use any magical correspondence address and secret spell to access the royal event organizer&apos;s chamber. 
            No actual magic required! ✨
          </p>
        </div>
      </div>
    </div>
  );
}