'use client';

import React from 'react';
import { Transaction, PaymentStatus } from '@/types';
import { formatCurrency } from '@/utils/cardFormatting';

interface TransactionHistoryProps {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  onSelectTransaction: (transaction: Transaction | null) => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions, 
  selectedTransaction,
  onSelectTransaction,
}) => {
  const getStatusColor = (status: PaymentStatus): string => {
    switch (status) {
      case PaymentStatus.Success:
        return 'bg-green-100 text-green-800';
      case PaymentStatus.Failed:
        return 'bg-red-100 text-red-800';
      case PaymentStatus.Timeout:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h3>
        <p className="text-gray-500 text-center py-8">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h3>
      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id || `transaction-${index}`}
            onClick={() => onSelectTransaction(transaction)}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedTransaction?.id === transaction.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-mono text-gray-600">
                    {transaction.id}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {transaction.cardholderName} • •••• {transaction.lastFourDigits}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatDate(transaction.timestamp)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-800">
                  {formatCurrency(transaction.amount, transaction.currency)}
                </div>
                {transaction.cardType && (
                  <div className="text-xs text-gray-500">{transaction.cardType}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTransaction && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Transaction Details</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Transaction ID:</span>
              <p className="font-mono text-gray-800">{selectedTransaction.id}</p>
            </div>
            <div>
              <span className="text-gray-500">Status:</span>
              <p className="text-gray-800">{selectedTransaction.status}</p>
            </div>
            <div>
              <span className="text-gray-500">Amount:</span>
              <p className="text-gray-800">
                {formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Card Type:</span>
              <p className="text-gray-800">{selectedTransaction.cardType}</p>
            </div>
            <div>
              <span className="text-gray-500">Cardholder:</span>
              <p className="text-gray-800">{selectedTransaction.cardholderName}</p>
            </div>
            <div>
              <span className="text-gray-500">Last 4 Digits:</span>
              <p className="text-gray-800">•••• {selectedTransaction.lastFourDigits}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Timestamp:</span>
              <p className="text-gray-800">{formatDate(selectedTransaction.timestamp)}</p>
            </div>
            {selectedTransaction.failureReason && (
              <div className="col-span-2">
                <span className="text-gray-500">Failure Reason:</span>
                <p className="text-red-600">{selectedTransaction.failureReason}</p>
              </div>
            )}
          </div>
          <button
            onClick={() => onSelectTransaction(null)}
            className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
};
