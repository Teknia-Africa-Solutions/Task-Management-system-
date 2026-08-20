// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Activity } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  // Validate name
  if (!name || name.trim().length < 2) {
    setError('Please enter your full name');
    return;
  }

  // Validate email
  if (!email || !email.includes('@')) {
    setError('Please enter a valid email address');
    return;
  }

  // Validate password
  if (password.length < 6) {
    setError('Password must be at least 6 characters');
    return;
  }

  // Validate passwords match
  if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  setLoading(true);

  try {
    console.log('📝 Sending signup request for:', email);
    
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: name.trim(), 
        email: email.trim(), 
        password,
        role: role,
      }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        setError('An account with this email already exists. Please login instead.');
      } else if (response.status === 400) {
        setError('Please fill in all fields correctly.');
      } else {
        setError(data.error || data.message || 'Signup failed. Please try again.');
      }
      setLoading(false);
      return;
    }

    console.log('✅ Signup successful, redirecting to dashboard');
    // Signup successful - redirect to dashboard
    router.replace('/dashboard');
  } catch (error) {
    console.error('💥 Signup error:', error);
    setError('Network error. Please check your connection.');
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-md w-full">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="relative p-2 rounded-lg bg-[#0B5E12]/10 border border-[#0B5E12]/30 text-[#0B5E12]">
            <Activity className="w-6 h-6" />
          </div>
          <span className="font-bold text-2xl text-gray-900">TaskFlow</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Create Account</h1>
        <p className="text-sm text-gray-500 text-center mb-8">Join TaskFlow today</p>

        {error && (
          <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-sm mb-4 border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#0B5E12] focus:ring-2 focus:ring-[#0B5E12]/20 transition"
              placeholder="Enter your full name"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Name must be at least 2 characters</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#0B5E12] focus:ring-2 focus:ring-[#0B5E12]/20 transition"
              placeholder="you@example.com"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Enter a valid email address</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base font-medium focus:outline-none focus:border-[#0B5E12] focus:ring-2 focus:ring-[#0B5E12]/20 transition"
            >
              <option value="user">User</option>
              <option value="project_manager">Project Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#0B5E12] focus:ring-2 focus:ring-[#0B5E12]/20 transition"
              placeholder="Create a password"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Password must be at least 6 characters</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#0B5E12] focus:ring-2 focus:ring-[#0B5E12]/20 transition"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-[#0B5E12] hover:bg-[#0B5E12]/90 rounded-xl font-semibold text-base transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#0B5E12] font-semibold hover:underline">
            Sign In
          </Link>
        </p>

        <button
  onClick={async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
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