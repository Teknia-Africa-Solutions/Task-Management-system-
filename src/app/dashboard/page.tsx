// src/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRouter() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    // Redirect to the main page (your original dashboard)
    router.push('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f7f2ee] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#b35c44] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-[#2d231e]">Loading your dashboard...</p>
      </div>
    </div>
  );
}