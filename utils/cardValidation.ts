import { CardType } from '@/types';

export const validateCardNumber = (cardNumber: string, cardType: CardType): string | null => {
  const cleanedNumber = cardNumber.replace(/\s/g, '');
  
  if (!cleanedNumber) {
    return 'Card number is required';
  }

  
  const expectedLength = cardType === CardType.Amex ? 15 : 16;
  if (cleanedNumber.length !== expectedLength) {
    return `Card number must be ${expectedLength} digits`;
  }

  
  if (!luhnCheck(cleanedNumber)) {
    return 'Invalid card number';
  }

  return null;
};

export const validateExpiry = (expiry: string): string | null => {
  if (!expiry) {
    return 'Expiry date is required';
  }

  const cleaned = expiry.replace(/\//g, '');
  
  if (cleaned.length !== 4) {
    return 'Expiry must be in MM/YY format';
  }

  const month = parseInt(cleaned.substring(0, 2), 10);
  const year = parseInt('20' + cleaned.substring(2, 4), 10);

  if (month < 1 || month > 12) {
    return 'Invalid month';
  }

  const now = new Date();
  const expiryDate = new Date(year, month - 1);

  if (expiryDate < now) {
    return 'Card has expired';
  }

  return null;
};

export const validateCVV = (cvv: string, cardType: CardType): string | null => {
  if (!cvv) {
    return 'CVV is required';
  }

  const expectedLength = cardType === CardType.Amex ? 4 : 3;
  
  if (!/^\d+$/.test(cvv)) {
    return 'CVV must contain only digits';
  }

  if (cvv.length !== expectedLength) {
    return `CVV must be ${expectedLength} digits`;
  }

  return null;
};

export const validateAmount = (amount: string): string | null => {
  if (!amount) {
    return 'Amount is required';
  }

  const numAmount = parseFloat(amount);

  if (isNaN(numAmount)) {
    return 'Amount must be a valid number';
  }

  if (numAmount <= 0) {
    return 'Amount must be greater than 0';
  }

  return null;
};

export const validateCardholderName = (name: string): string | null => {
  if (!name.trim()) {
    return 'Cardholder name is required';
  }

  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }

  return null;
};


const luhnCheck = (cardNumber: string): boolean => {
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};
