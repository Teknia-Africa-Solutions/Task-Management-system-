'use client';

import { useEffect, useState } from 'react';

export default function DashboardRouter() {
  const [debug, setDebug] = useState('Loading...');

  useEffect(() => {
    const checkUser = async () => {
      try {
        setDebug('1. Fetching /api/auth/me...');
        console.log('🔍 1. Fetching user...');
        
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
          headers: { 'Cache-Control': 'no-cache' }
        });

        setDebug(`2. Response status: ${response.status}`);
        console.log(`📡 2. Status: ${response.status}`);

        if (!response.ok) {
          setDebug('3. Not authenticated, going to login');
          console.log('❌ 3. Not authenticated');
          window.location.href = '/login';
          return;
        }

        const data = await response.json();
        setDebug(`4. User: ${data.user?.email}, Role: ${data.user?.role}`);
        console.log('👤 4. User:', data.user);

        const role = data.user?.role?.toUpperCase() || '';

        if (role === 'ADMIN') {
          setDebug('5. ADMIN - going to /dashboard/admin');
          console.log('👑 5. ADMIN');
          window.location.href = '/dashboard/admin';
        } else if (role === 'PROJECT_MANAGER') {
          setDebug('5. PM - going to /dashboard/pm');
          console.log('📋 5. PM');
          window.location.href = '/dashboard/pm';
        } else {
          setDebug('5. USER - going to /dashboard/user');
          console.log('👤 5. USER');
          window.location.href = '/dashboard/user';
        }
      } catch (error) {
        console.error('💥 Error:', error);
        setDebug(`ERROR: ${error}`);
        window.location.href = '/login';
      }
    };

    checkUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#0B5E12] mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Redirecting...</p>
        <p className="mt-2 text-sm text-gray-700">{debug}</p>
      </div>
    </div>
  );
}