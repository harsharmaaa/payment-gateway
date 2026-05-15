'use client';

import React from 'react';
import { PaymentStatus } from '@/types';

interface StatusScreenProps {
  status: PaymentStatus;
  transactionId?: string;
  amount?: number;
  currency?: string;
  failureReason?: string;
  retryCount: number;
  maxRetries: number;
  onRetry: () => void;
  onNewPayment: () => void;
}

export const StatusScreen: React.FC<StatusScreenProps> = ({
  status,
  transactionId,
  amount,
  currency,
  failureReason,
  retryCount,
  maxRetries,
  onRetry,
  onNewPayment,
}) => {
  const canRetry = retryCount < maxRetries;

  if (status === PaymentStatus.Processing) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Processing Payment</h2>
        <p className="text-gray-600">Please wait while we process your payment...</p>
      </div>
    );
  }

  if (status === PaymentStatus.Success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Payment Successful!</h2>
        <div className="text-center space-y-2">
          <p className="text-gray-600">
            Transaction ID: <span className="font-mono font-medium">{transactionId}</span>
          </p>
          {amount && currency && (
            <p className="text-2xl font-bold text-green-600">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency,
              }).format(amount)}
            </p>
          )}
        </div>
        <button
          onClick={onNewPayment}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Make Another Payment
        </button>
      </div>
    );
  }

  if (status === PaymentStatus.Failed) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Payment Failed</h2>
        <p className="text-red-600 font-medium">{failureReason || 'Transaction declined'}</p>
        <p className="text-gray-600">
          Attempt {retryCount + 1} of {maxRetries}
        </p>
        <div className="flex gap-3 mt-4">
          {canRetry ? (
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Retry Payment
            </button>
          ) : (
            <button
              disabled
              className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
            >
              Retry Limit Reached
            </button>
          )}
          <button
            onClick={onNewPayment}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            New Payment
          </button>
        </div>
        {!canRetry && (
          <p className="text-sm text-gray-500 mt-2">
            Maximum retry attempts reached. Please try with a different payment method.
          </p>
        )}
      </div>
    );
  }

  if (status === PaymentStatus.Timeout) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Payment Timeout</h2>
        <p className="text-gray-600">The payment request took too long to complete.</p>
        <p className="text-gray-600">
          Attempt {retryCount + 1} of {maxRetries}
        </p>
        <div className="flex gap-3 mt-4">
          {canRetry ? (
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Retry Payment
            </button>
          ) : (
            <button
              disabled
              className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
            >
              Retry Limit Reached
            </button>
          )}
          <button
            onClick={onNewPayment}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            New Payment
          </button>
        </div>
        {!canRetry && (
          <p className="text-sm text-gray-500 mt-2">
            Maximum retry attempts reached. Please try again later.
          </p>
        )}
      </div>
    );
  }

  return null;
};
