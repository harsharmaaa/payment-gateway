import React from 'react';
import { CardType } from '@/types';

interface CardPreviewProps {
  cardNumber: string;
  cardholderName: string;
  expiry: string;
  cardType: CardType;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  cardNumber,
  cardholderName,
  expiry,
  cardType,
}) => {
  const getCardGradient = (): string => {
    switch (cardType) {
      case CardType.Visa:
        return 'from-blue-600 to-blue-800';
      case CardType.Mastercard:
        return 'from-red-600 to-orange-600';
      case CardType.Amex:
        return 'from-gray-700 to-gray-900';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  const getCardIcon = (): string => {
    switch (cardType) {
      case CardType.Visa:
        return 'VISA';
      case CardType.Mastercard:
        return 'MC';
      case CardType.Amex:
        return 'AMEX';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`relative w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-br ${getCardGradient()} p-6 shadow-2xl text-white overflow-hidden`}
      >
       
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

       
        <div className="relative z-10 w-12 h-9 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md mb-8" />

       
        <div className="relative z-10 text-2xl font-mono tracking-widest mb-6">
          {cardNumber || '•••• •••• •••• ••••'}
        </div>

      
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <div className="text-xs uppercase opacity-70 mb-1">Card Holder</div>
            <div className="text-sm font-medium uppercase tracking-wide">
              {cardholderName || 'YOUR NAME'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase opacity-70 mb-1">Expires</div>
            <div className="text-sm font-medium">
              {expiry || 'MM/YY'}
            </div>
          </div>
        </div>

       
        {cardType !== CardType.Unknown && (
          <div className="absolute top-6 right-6 z-10">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
              {getCardIcon()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
