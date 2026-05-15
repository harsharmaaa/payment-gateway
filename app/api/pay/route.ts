import { NextRequest, NextResponse } from 'next/server';
import { PaymentStatus, PaymentResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transactionId } = body;

    
    const random = Math.random();
    
    if (random < 0.15) {
     
      await new Promise(resolve => setTimeout(resolve, 8000));
      
      const response: PaymentResponse = {
        status: PaymentStatus.Timeout,
        transactionId,
        message: 'Payment timeout',
      };
      
      return NextResponse.json(response, { status: 408 });
    } else if (random < 0.40) {
      
      const failureReasons = [
        'Insufficient funds',
        'Card declined',
        'Invalid card details',
        'Transaction declined by bank',
      ];
      const randomReason = failureReasons[Math.floor(Math.random() * failureReasons.length)];
      
      const response: PaymentResponse = {
        status: PaymentStatus.Failed,
        transactionId,
        message: randomReason,
      };
      
      return NextResponse.json(response, { status: 400 });
    } else {
      
      const response: PaymentResponse = {
        status: PaymentStatus.Success,
        transactionId,
      };
      
      return NextResponse.json(response, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { status: PaymentStatus.Failed, message: 'Invalid request' },
      { status: 400 }
    );
  }
}
