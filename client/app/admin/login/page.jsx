'use client';
import React, { useState } from 'react';
import API from '../../../utils/api';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff, Package } from 'lucide-react';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [err, setErr] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault(); 
    setErr(null);
    setIsLoading(true);
    
    try {
      await API.post('/auth/login', form);
      router.push('/admin'); 
    } catch (e) {
      setErr(e.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-md">
        {/* Background Decorations */}

        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm rounded-2xl"></div>
        
        <form onSubmit={submit} className="relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-700 rounded-2xl shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold ">
              Admin Portal
            </h2>
            <p className="text-gray-400 mt-2">Sign in to access the dashboard</p>
          </div>

          {/* Error Message */}
          {err && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-red-600 text-sm">{err}</span>
            </div>
          )}

          {/* Username Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Username</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input 
                className="w-full pl-10 pr-4 py-4 bg-white/5 border border-gray-400 rounded-xl placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all
                         hover:border-white/20 backdrop-blur-sm"
                placeholder="Enter your username"
                value={form.username}
                onChange={e => setForm({...form, username: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-12 py-4 bg-white/5 border border-gray-400 rounded-xl placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all
                         hover:border-white/20 backdrop-blur-sm"
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold 
                     rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Sign In</span>
              </span>
            )}
          </button>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Secure access • Admin privileges required
            </p>
          </div>
        </form>

        {/* Additional decorative elements */}
      
      </div>
    </div>
  );
}