import { useState, useCallback } from 'react';
import { CardType } from '@/types';
import { 
  validateCardNumber, 
  validateExpiry, 
  validateCVV, 
  validateAmount, 
  validateCardholderName 
} from '@/utils/cardValidation';
import { formatCardNumber, formatExpiry, formatAmount, detectCardType } from '@/utils/cardFormatting';

interface UsePaymentFormReturn {
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
  touched: {
    cardholderName: boolean;
    cardNumber: boolean;
    expiry: boolean;
    cvv: boolean;
    amount: boolean;
  };
  isValid: boolean;
  setCardholderName: (value: string) => void;
  setCardNumber: (value: string) => void;
  setExpiry: (value: string) => void;
  setCVV: (value: string) => void;
  setAmount: (value: string) => void;
  setCurrency: (value: string) => void;
  handleBlur: (field: string) => void;
  resetForm: () => void;
}

export const usePaymentForm = (): UsePaymentFormReturn => {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [cardType, setCardType] = useState<CardType>(CardType.Unknown);
  const [errors, setErrors] = useState({
    cardholderName: null as string | null,
    cardNumber: null as string | null,
    expiry: null as string | null,
    cvv: null as string | null,
    amount: null as string | null,
  });
  const [touched, setTouched] = useState({
    cardholderName: false,
    cardNumber: false,
    expiry: false,
    cvv: false,
    amount: false,
  });

  const validateField = useCallback((field: string, value: string): string | null => {
    switch (field) {
      case 'cardholderName':
        return validateCardholderName(value);
      case 'cardNumber':
        return validateCardNumber(value, cardType);
      case 'expiry':
        return validateExpiry(value);
      case 'cvv':
        return validateCVV(value, cardType);
      case 'amount':
        return validateAmount(value);
      default:
        return null;
    }
  }, [cardType]);

  const handleCardholderNameChange = useCallback((value: string) => {
    setCardholderName(value);
    if (touched.cardholderName) {
      setErrors((prev) => ({
        ...prev,
        cardholderName: validateField('cardholderName', value),
      }));
    }
  }, [touched.cardholderName, validateField]);

  const handleCardNumberChange = useCallback((value: string) => {
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
    const detectedType = detectCardType(formatted);
    setCardType(detectedType);
    
    if (touched.cardNumber) {
      setErrors((prev) => ({
        ...prev,
        cardNumber: validateCardNumber(formatted, detectedType),
      }));
    }
  }, [touched.cardNumber]);

  const handleExpiryChange = useCallback((value: string) => {
    const formatted = formatExpiry(value);
    setExpiry(formatted);
    
    if (touched.expiry) {
      setErrors((prev) => ({
        ...prev,
        expiry: validateExpiry(formatted),
      }));
    }
  }, [touched.expiry]);

  const handleCVVChange = useCallback((value: string) => {
    setCVV(value);
    
    if (touched.cvv) {
      setErrors((prev) => ({
        ...prev,
        cvv: validateCVV(value, cardType),
      }));
    }
  }, [touched.cvv, cardType]);

  const handleAmountChange = useCallback((value: string) => {
    const formatted = formatAmount(value);
    setAmount(formatted);
    
    if (touched.amount) {
      setErrors((prev) => ({
        ...prev,
        amount: validateAmount(formatted),
      }));
    }
  }, [touched.amount]);

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    let value = '';
    switch (field) {
      case 'cardholderName':
        value = cardholderName;
        break;
      case 'cardNumber':
        value = cardNumber;
        break;
      case 'expiry':
        value = expiry;
        break;
      case 'cvv':
        value = cvv;
        break;
      case 'amount':
        value = amount;
        break;
    }
    
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  }, [cardholderName, cardNumber, expiry, cvv, amount, validateField]);

  const resetForm = useCallback(() => {
    setCardholderName('');
    setCardNumber('');
    setExpiry('');
    setCVV('');
    setAmount('');
    setCurrency('INR');
    setCardType(CardType.Unknown);
    setErrors({
      cardholderName: null,
      cardNumber: null,
      expiry: null,
      cvv: null,
      amount: null,
    });
    setTouched({
      cardholderName: false,
      cardNumber: false,
      expiry: false,
      cvv: false,
      amount: false,
    });
  }, []);

  const isValid = Boolean(
    !errors.cardholderName &&
    !errors.cardNumber &&
    !errors.expiry &&
    !errors.cvv &&
    !errors.amount &&
    cardholderName &&
    cardNumber &&
    expiry &&
    cvv &&
    amount
  );

  return {
    cardholderName,
    cardNumber,
    expiry,
    cvv,
    amount,
    currency,
    cardType,
    errors,
    touched,
    isValid,
    setCardholderName: handleCardholderNameChange,
    setCardNumber: handleCardNumberChange,
    setExpiry: handleExpiryChange,
    setCVV: handleCVVChange,
    setAmount: handleAmountChange,
    setCurrency,
    handleBlur,
    resetForm,
  };
};
