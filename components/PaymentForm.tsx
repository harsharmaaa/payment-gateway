'use client';

import React from 'react';
import { CardInput } from './CardInput';
import { CardType } from '@/types';

interface PaymentFormProps {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  amount: string;
  currency: string;
  cardType: CardType;
  errors: {
    cardholderName: string | null;
    cardNumber: string | null;
    expiry: string | null;
    cvv: string | null;
    amount: string | null;
  };
  isValid: boolean;
  isSubmitting: boolean;
  onCardholderNameChange: (value: string) => void;
  onCardNumberChange: (value: string) => void;
  onExpiryChange: (value: string) => void;
  onCVVChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  onBlur: (field: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  cardholderName,
  cardNumber,
  expiry,
  cvv,
  amount,
  currency,
  cardType,
  errors,
  isValid,
  isSubmitting,
  onCardholderNameChange,
  onCardNumberChange,
  onExpiryChange,
  onCVVChange,
  onAmountChange,
  onCurrencyChange,
  onBlur,
  onSubmit,
}) => {
  const cvvMaxLength = cardType === CardType.Amex ? 4 : 3;
  const cardNumberMaxLength = cardType === CardType.Amex ? 15 : 16;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <CardInput
        id="cardholderName"
        label="Cardholder Name"
        value={cardholderName}
        onChange={onCardholderNameChange}
        onBlur={() => onBlur('cardholderName')}
        error={errors.cardholderName}
        placeholder="Enter your Name"
        disabled={isSubmitting}
      />

      <CardInput
        id="cardNumber"
        label="Card Number"
        value={cardNumber}
        onChange={onCardNumberChange}
        onBlur={() => onBlur('cardNumber')}
        error={errors.cardNumber}
        placeholder="4242 4242 4242 4242"
        maxLength={19}
        disabled={isSubmitting}
      />

      <div className="grid grid-cols-2 gap-4">
        <CardInput
          id="expiry"
          label="Expiry Date"
          value={expiry}
          onChange={onExpiryChange}
          onBlur={() => onBlur('expiry')}
          error={errors.expiry}
          placeholder="MM/YY"
          maxLength={5}
          disabled={isSubmitting}
        />

        <CardInput
          id="cvv"
          label="CVV"
          value={cvv}
          onChange={onCVVChange}
          onBlur={() => onBlur('cvv')}
          error={errors.cvv}
          placeholder={cardType === CardType.Amex ? '1234' : '123'}
          maxLength={cvvMaxLength}
          type="password"
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CardInput
          id="amount"
          label="Amount"
          value={amount}
          onChange={onAmountChange}
          onBlur={() => onBlur('amount')}
          error={errors.amount}
          placeholder="0.00"
          type="text"
          disabled={isSubmitting}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="currency" className="text-sm font-medium text-gray-700">
            Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};
