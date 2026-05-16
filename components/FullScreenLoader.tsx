'use client';

import React from 'react';

interface FullScreenLoaderProps {
  isVisible: boolean;
}

export const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 max-w-sm mx-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment...</h3>
          <p className="text-gray-600 text-sm">Please wait while we process your transaction securely.</p>
        </div>
      </div>
    </div>
  );
};
