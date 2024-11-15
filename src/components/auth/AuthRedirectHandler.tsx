/**
 * @fileoverview Auth Redirect Handler Component
 * Handles authentication-based route protection and redirects
 */

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';

/**
 * AuthRedirectHandler Component
 * 
 * Manages authentication-based navigation control:
 * - Redirects authenticated users away from auth pages to game
 * - Redirects unauthenticated users away from protected pages to login
 * - Handles initial landing page redirects based on auth status
 * 
 * @returns null - Component doesn't render anything, only handles redirects
 */

const AuthRedirectHandler = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user && (pathname === '/auth/login' || pathname === '/auth/register' || pathname === '/')) {
        router.push('/game');
      }
      
      if (!user && pathname.startsWith('/game')) {
        router.push('/auth/login');
      }
    }
  }, [user, loading, pathname, router]);

  return null;
};

export default AuthRedirectHandler;