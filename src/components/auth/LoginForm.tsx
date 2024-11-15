/**
 * @fileoverview Login Form Component
 * Handles user authentication with email and password
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import LoadingOverlay from '@/components/ui/loading-overlay';
import Link from 'next/link';

/**
 * LoginForm Component
 * 
 * A form component that handles user login functionality:
 * - Email and password validation
 * - Error handling and display
 * - Loading state management
 * - Successful login redirect
 * - Navigation to registration
 * 
 */

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      setIsLoggingIn(true);
      await login(formData.email, formData.password);
      router.push('/game');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <LoadingOverlay 
        isLoading={isLoggingIn} 
        message="Logging you in..."
      />
      
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md -mt-32">
          <div className="bg-white px-8 py-10 shadow-xl rounded-xl">
            <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-500 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={isLoggingIn}
              >
                Log In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                href="/auth/register"
                className="text-black font-semibold hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;