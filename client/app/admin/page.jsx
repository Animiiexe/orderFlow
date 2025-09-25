'use client';

import React, { useEffect, useState } from 'react';
import AdminOrdersTable from '../../components/AdminOrderTable';
import API from '../../utils/api';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(null);

  useEffect(() => {

    (async () => {
      try {
        await API.get('/orders'); 
        setAuthed(true);
      } catch {
        setAuthed(false);
        router.push('/admin/login');
      }
    })();
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          {/* Main Loader */}
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-gray-200 rounded-full animate-spin mx-auto">
              <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute top-2 left-2 w-20 h-20 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            
            {/* Floating dots */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-1/2 -right-4 w-2 h-2 bg-indigo-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Text with typing animation */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900 animate-pulse">
              Authenticating
            </h2>
            <div className="flex items-center justify-center space-x-1">
              <span className="text-gray-600">Verifying your access</span>
              <div className="flex space-x-1 ml-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8 w-64 mx-auto">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Additional visual elements */}
          <div className="mt-12 grid grid-cols-3 gap-4 w-32 mx-auto opacity-30">
            <div className="h-2 bg-blue-200 rounded animate-pulse"></div>
            <div className="h-2 bg-purple-200 rounded animate-pulse" style={{animationDelay: '0.3s'}}></div>
            <div className="h-2 bg-indigo-200 rounded animate-pulse" style={{animationDelay: '0.6s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AdminOrdersTable />
    </div>
  );
}