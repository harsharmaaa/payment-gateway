export enum CardType {
  Visa = 'Visa',
  Mastercard = 'Mastercard',
  Amex = 'Amex',
  Unknown = 'Unknown',
}

export enum PaymentStatus {
  Idle = 'Idle',
  Processing = 'Processing',
  Success = 'Success',
  Failed = 'Failed',
  Timeout = 'Timeout',
}

export interface PaymentPayload {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  amount: number;
  currency: string;
  transactionId: string;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  timestamp: string;
  cardType: CardType;
  cardholderName: string;
  lastFourDigits: string;
  failureReason?: string;
}

export interface PaymentResponse {
  status: PaymentStatus;
  transactionId: string;
  message?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
