// src/app/debug/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token') || 'No token');
    setUser(localStorage.getItem('user') || 'No user');
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Debug Info</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p><strong>Token:</strong> {token.substring(0, 50)}...</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p><strong>User:</strong> {user}</p>
      </div>
      <div className="mt-4 flex gap-4">
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Go to Dashboard
        </button>
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Clear Storage & Logout
        </button>
      </div>
    </div>
  );
}