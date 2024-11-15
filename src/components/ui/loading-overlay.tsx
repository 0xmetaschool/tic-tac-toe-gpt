'use client';
// src/components/ui/loading-overlay.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
  isLoading: boolean;
}

const LoadingOverlay = ({ message = 'Loading...', isLoading }: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3 min-w-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-black" />
        <p className="text-gray-800 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;