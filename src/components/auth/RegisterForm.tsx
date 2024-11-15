/**
 * @fileoverview Register Form Component
 * Handles new user registration with form validation
 */

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import LoadingOverlay from '@/components/ui/loading-overlay';
import Link from 'next/link';


/**
 * RegisterForm Component
 * 
 * Handles new user registration with:
 * - Form validation for all fields
 * - Password confirmation
 * - Error handling and display
 * - Loading state management
 * - Successful registration redirect
 * - Navigation to login
 * 
 */

const RegisterForm = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsRegistering(true);
      await register(formData.username, formData.email, formData.password);
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/game');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      <LoadingOverlay 
        isLoading={isRegistering} 
        message="Creating your account..."
      />
      
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md -mt-32">
          <div className="bg-white px-8 py-10 shadow-xl rounded-xl">
            <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-500 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={isRegistering}
              >
                Sign Up
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                href="/auth/login"
                className="text-black font-semibold hover:underline"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;