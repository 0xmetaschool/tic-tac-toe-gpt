'use client';

import Navbar from '@/components/layout/Navbar';
import LandingPage from '@/components/layout/LandingPage';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <LandingPage />
    </div>
  );
}