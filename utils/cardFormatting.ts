import { CardType } from '@/types';

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(' ').substring(0, 19);
};

export const formatExpiry = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length >= 2) {
    return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
  }
  
  return cleaned;
};

export const formatAmount = (amount: string): string => {
  const cleaned = amount.replace(/[^\d.]/g, '');
  
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  
  if (parts[1] && parts[1].length > 2) {
    return parts[0] + '.' + parts[1].substring(0, 2);
  }
  
  return cleaned;
};

export const detectCardType = (cardNumber: string): CardType => {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!cleaned) {
    return CardType.Unknown;
  }

  // Visa: Starts with 4
  if (/^4/.test(cleaned)) {
    return CardType.Visa;
  }

  // Mastercard: Starts with 5 or 2 (and is 16 digits)
  if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) {
    return CardType.Mastercard;
  }

  // Amex: Starts with 34 or 37
  if (/^3[47]/.test(cleaned)) {
    return CardType.Amex;
  }

  return CardType.Unknown;
};

export const getLastFourDigits = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '');
  return cleaned.substring(cleaned.length - 4);
};

export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};
