'use client';

import { useEffect, useState, useRef } from 'react';
import { CardPreview } from '@/components/CardPreview';
import { PaymentForm } from '@/components/PaymentForm';
import { StatusScreen } from '@/components/StatusScreen';
import { TransactionHistory } from '@/components/TransactionHistory';
import { usePaymentForm } from '@/hooks/usePaymentForm';
import { usePaymentStore } from '@/store/paymentStore';
import { PaymentStatus, Transaction, CardType } from '@/types';
import { processPayment } from '@/utils/api';
import { getLastFourDigits } from '@/utils/cardFormatting';

export default function Home() {
  const {
    cardholderName,
    cardNumber,
    expiry,
    cvv,
    amount,
    currency,
    cardType,
    errors,
    isValid,
    setCardholderName,
    setCardNumber,
    setExpiry,
    setCVV,
    setAmount,
    setCurrency,
    handleBlur,
    resetForm,
  } = usePaymentForm();

  const {
    paymentStatus,
    transactionHistory,
    currentTransactionId,
    retryCount,
    selectedTransaction,
    failureReason,
    setPaymentStatus,
    setCurrentTransactionId,
    incrementRetryCount,
    resetRetryCount,
    addTransaction,
    setSelectedTransaction,
    setFailureReason,
    resetPaymentState,
  } = usePaymentStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const statusScreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paymentStatus !== PaymentStatus.Idle && statusScreenRef.current) {
      statusScreenRef.current.focus();
      statusScreenRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [paymentStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

   
    if (!currentTransactionId) {
      const transactionId = crypto.randomUUID();
      setCurrentTransactionId(transactionId);
    }

    setPaymentStatus(PaymentStatus.Processing);

    
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const response = await processPayment({
        cardholderName,
        cardNumber: cardNumber.replace(/\s/g, ''),
        expiry,
        cvv,
        amount: parseFloat(amount),
        currency,
        transactionId: currentTransactionId!,
      });

      setPaymentStatus(response.status);

      if (response.status === PaymentStatus.Success) {
        const transaction: Transaction = {
          id: currentTransactionId!,
          amount: parseFloat(amount),
          currency,
          status: PaymentStatus.Success,
          timestamp: new Date().toISOString(),
          cardType,
          cardholderName,
          lastFourDigits: getLastFourDigits(cardNumber),
        };

        addTransaction(transaction);
        resetRetryCount();
        resetForm();
      } else if (response.status === PaymentStatus.Failed) {
        const transaction: Transaction = {
          id: currentTransactionId!,
          amount: parseFloat(amount),
          currency,
          status: PaymentStatus.Failed,
          timestamp: new Date().toISOString(),
          cardType,
          cardholderName,
          lastFourDigits: getLastFourDigits(cardNumber),
          failureReason: response.message || 'Transaction failed',
        };

        addTransaction(transaction);
        setFailureReason(response.message || 'Transaction failed');
      }
    } catch (error) {
      setPaymentStatus(PaymentStatus.Timeout);
      setFailureReason('Request timeout. Please try again.');
      
      const transaction: Transaction = {
        id: currentTransactionId!,
        amount: parseFloat(amount),
        currency,
        status: PaymentStatus.Timeout,
        timestamp: new Date().toISOString(),
        cardType,
        cardholderName,
        lastFourDigits: getLastFourDigits(cardNumber),
        failureReason: 'Request timeout. Please try again.',
      };

      addTransaction(transaction);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    incrementRetryCount();
    handleSubmit(new Event('submit') as any);
  };

  const handleNewPayment = () => {
    resetPaymentState();
    resetForm();
  };

  const isPaymentInProgress = paymentStatus !== PaymentStatus.Idle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Gateway</h1>
          <p className="text-gray-600">Secure payment processing with real-time validation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
         
          <div className="order-2 lg:order-1">
            <CardPreview
              cardNumber={cardNumber}
              cardholderName={cardholderName}
              expiry={expiry}
              cardType={cardType}
            />
          </div>

          
          <div className="order-1 lg:order-2">
            {isPaymentInProgress ? (
              <div ref={statusScreenRef} tabIndex={-1}>
                <StatusScreen
                  status={paymentStatus}
                  transactionId={currentTransactionId || undefined}
                  amount={amount ? parseFloat(amount) : undefined}
                  currency={currency}
                  failureReason={failureReason || undefined}
                  retryCount={retryCount}
                  maxRetries={3}
                  onRetry={handleRetry}
                  onNewPayment={handleNewPayment}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Details</h2>
                <PaymentForm
                  cardholderName={cardholderName}
                  cardNumber={cardNumber}
                  expiry={expiry}
                  cvv={cvv}
                  amount={amount}
                  currency={currency}
                  cardType={cardType}
                  errors={errors}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  onCardholderNameChange={setCardholderName}
                  onCardNumberChange={setCardNumber}
                  onExpiryChange={setExpiry}
                  onCVVChange={setCVV}
                  onAmountChange={setAmount}
                  onCurrencyChange={setCurrency}
                  onBlur={handleBlur}
                  onSubmit={handleSubmit}
                />
              </div>
            )}
          </div>
        </div>

        
        <TransactionHistory
          transactions={transactionHistory}
          selectedTransaction={selectedTransaction}
          onSelectTransaction={setSelectedTransaction}
        />
      </div>
    </div>
  );
}
