import { PaymentPayload, PaymentResponse } from '@/types';

const API_TIMEOUT = 6000; 

export const processPayment = async (
  payload: PaymentPayload
): Promise<PaymentResponse> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch('/api/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Network error occurred');
    }

    const data: PaymentResponse = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout. Please try again.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('An unexpected error occurred');
  }
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
