'use client';

import React from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.replace('/');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}