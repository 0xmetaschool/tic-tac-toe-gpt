/**
 * @fileoverview Landing Page Component
 * Main entry point of the application showcasing core features
 */

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Layers, Grid3X3, Shield } from 'lucide-react';
import AnimatedBoard from './AnimatedBoard';
import Footer from './Footer';
import { useRouter } from 'next/navigation';

/**
 * LandingPage Component
 * 
 * The main landing page of the application featuring:
 * - Hero section with call-to-action
 * - Interactive game board preview
 * - Feature highlights
 * - Visual demonstrations
 * 
 * Features:
 * - Responsive design
 * - Animated game preview
 * - Feature showcase
 * - Clear call-to-action
 */

const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Play Tic Tac Toe Against AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Challenge our advanced AI in a game of Tic Tac Toe. Choose your difficulty
              level and board size for an engaging experience.
            </p>
            <div className="mt-10 flex justify-center">
              <Button 
                className="rounded-md bg-black px-6 py-2.5"
                onClick={() => router.push('/auth/login')}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Animated Board */}
          <div className="mt-16 flex justify-center">
            <AnimatedBoard />
          </div>

          {/* Features Section */}
          <div className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg bg-gray-100 p-3">
                <Layers className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold">Multiple Difficulties</h2>
              <p className="mt-2 text-gray-600">
                Choose from easy, medium, or hard difficulty levels to match your skill.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg bg-gray-100 p-3">
                <Grid3X3 className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold">Customizable Board</h2>
              <p className="mt-2 text-gray-600">
                Play on different board sizes from 3×3 up to 5×5 for varied challenges.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg bg-gray-100 p-3">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold">Smart AI</h2>
              <p className="mt-2 text-gray-600">
                Face off against our advanced AI powered by machine learning.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;