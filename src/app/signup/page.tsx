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
  const [role, setRole] = useState('developer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f2ee] to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#e5ddd8] p-8 max-w-md w-full">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="relative p-2 rounded-lg bg-gradient-to-br from-[#b35c44]/20 to-[#8f6b5c]/20 border border-[#b35c44]/30 text-[#d4846a]">
            <Activity className="w-6 h-6" />
          </div>
          <span className="font-bold text-2xl text-[#2d231e]">TaskFlow</span>
        </div>

        <h1 className="text-2xl font-bold text-[#2d231e] text-center mb-2">Create Account</h1>
        <p className="text-sm text-[#b5a69c] text-center mb-8">Join TaskFlow today</p>

        {error && (
          <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#2d231e] mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border-2 border-[#e5ddd8] rounded-xl px-4 py-3 text-[#2d231e] text-base font-medium placeholder:text-[#b5a69c] focus:outline-none focus:border-[#b35c44] focus:ring-2 focus:ring-[#b35c44]/20 transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d231e] mb-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-[#e5ddd8] rounded-xl px-4 py-3 text-[#2d231e] text-base font-medium placeholder:text-[#b5a69c] focus:outline-none focus:border-[#b35c44] focus:ring-2 focus:ring-[#b35c44]/20 transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d231e] mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white border-2 border-[#e5ddd8] rounded-xl px-4 py-3 text-[#2d231e] text-base font-medium focus:outline-none focus:border-[#b35c44] focus:ring-2 focus:ring-[#b35c44]/20 transition"
            >
              <option value="project_manager">Project Manager</option>
              <option value="admin">Admin</option>
              <option value="viewer">User</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d231e] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-[#e5ddd8] rounded-xl px-4 py-3 text-[#2d231e] text-base font-medium placeholder:text-[#b5a69c] focus:outline-none focus:border-[#b35c44] focus:ring-2 focus:ring-[#b35c44]/20 transition"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d231e] mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white border-2 border-[#e5ddd8] rounded-xl px-4 py-3 text-[#2d231e] text-base font-medium placeholder:text-[#b5a69c] focus:outline-none focus:border-[#b35c44] focus:ring-2 focus:ring-[#b35c44]/20 transition"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-gradient-to-r from-[#b35c44] to-[#8f6b5c] rounded-xl font-semibold text-base hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-[#b5a69c] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#b35c44] font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}