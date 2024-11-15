/**
 * @fileoverview Navigation Bar Component
 * Main application navigation with authentication state handling
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useAuth } from '@/lib/context/auth-context';

/**
 * Navbar Component
 * 
 * Main navigation component that adapts based on authentication state:
 * - Shows login/signup buttons for unauthenticated users
 * - Shows username and logout button for authenticated users
 * - Handles navigation between pages
 * - Provides visual feedback for current section
 * 
 * Features:
 * - Responsive design
 * - Authentication state awareness
 * - Smooth transitions
 * - Fixed positioning with backdrop blur
 * 
 */

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white/50 backdrop-blur-xl fixed top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              href={user ? '/game' : '/'}
              className="text-xl font-bold text-black hover:text-gray-700 transition-colors"
            >
              Tic Tac Toe AI
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {user.username}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Login/Signup Buttons */}
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  onClick={() => router.push('/auth/login')}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  className="bg-black text-white hover:bg-gray-800"
                  onClick={() => router.push('/auth/register')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;