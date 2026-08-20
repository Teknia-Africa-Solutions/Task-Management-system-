// src/app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Activity } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });
        
        if (response.ok) {
          setShouldRedirect(true);
        }
      } catch (error) {
        console.log('Not authenticated, showing login page');
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Separate useEffect for redirect to avoid loop
  useEffect(() => {
    if (shouldRedirect && !checkingAuth) {
      router.replace(redirect);
    }
  }, [shouldRedirect, checkingAuth, router, redirect]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  // ✅ Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    setError('Please enter a valid email address');
    setLoading(false);
    return;
  }

  // ✅ Password validation
  if (!password || password.length < 6) {
    setError('Password must be at least 6 characters');
    setLoading(false);
    return;
  }

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else if (response.status === 400) {
        setError('Please fill in all fields.');
      } else {
        setError(data.error || data.message || 'Login failed. Please try again.');
      }
      setLoading(false);
      return;
    }

    // Login successful - redirect
    router.replace(redirect);
  } catch (error) {
    setError('Network error. Please check your connection.');
    setLoading(false);
  }
};
  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B5E12] mx-auto"></div>
          <p className="mt-4 text-gray-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated and we're not forcing login, redirect
  if (shouldRedirect) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B5E12] mx-auto"></div>
          <p className="mt-4 text-gray-500">You are already logged in. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-md w-full">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="relative p-2 rounded-lg bg-[#0B5E12]/10 border border-[#0B5E12]/30 text-[#0B5E12]">
            <Activity className="w-6 h-6" />
          </div>
          <span className="font-bold text-2xl text-gray-900">TaskFlow</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Welcome Back!</h1>
        <p className="text-sm text-gray-500 text-center mb-8">Login to your account</p>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#0B5E12] focus:ring-2 focus:ring-[#0B5E12]/20 transition"
              placeholder="admin@taskflow.io"
              required
              disabled={loading}
            />
             <p className="text-xs text-gray-400 mt-1">Enter a valid email address</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#0B5E12] focus:ring-2 focus:ring-[#0B5E12]/20 transition"
              placeholder="••••••••"
              required
              disabled={loading}
            />
            <p className="text-xs text-gray-400 mt-1">Password must be at least 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-[#0B5E12] hover:bg-[#0B5E12]/90 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#0B5E12] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
         
<button
  onClick={async () => {
    try {
      // ✅ Step 1: Call logout API
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      // ✅ Step 2: Force clear cookie on client side (backup)
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      
      // ✅ Step 3: ADD SMALL DELAY HERE (100ms)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // ✅ Step 4: Redirect to landing page
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Force clear cookie even if API fails
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      router.replace('/');
    }
  }}
  className="text-[#0B5E12] font-semibold hover:underline"
>
  Logout
</button>
      
      </div>
    </div>
  );
}