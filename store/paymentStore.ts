import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PaymentStatus, Transaction } from '@/types';

interface PaymentStore {
  paymentStatus: PaymentStatus;
  transactionHistory: Transaction[];
  currentTransactionId: string | null;
  retryCount: number;
  selectedTransaction: Transaction | null;
  failureReason: string | null;
  
  setPaymentStatus: (status: PaymentStatus) => void;
  setCurrentTransactionId: (id: string) => void;
  incrementRetryCount: () => void;
  resetRetryCount: () => void;
  addTransaction: (transaction: Transaction) => void;
  setSelectedTransaction: (transaction: Transaction | null) => void;
  setFailureReason: (reason: string | null) => void;
  resetPaymentState: () => void;
}

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set) => ({
      paymentStatus: PaymentStatus.Idle,
      transactionHistory: [],
      currentTransactionId: null,
      retryCount: 0,
      selectedTransaction: null,
      failureReason: null,

      setPaymentStatus: (status) => set({ paymentStatus: status }),
      
      setCurrentTransactionId: (id) => set({ currentTransactionId: id }),
      
      incrementRetryCount: () => set((state) => ({ 
        retryCount: state.retryCount + 1 
      })),
      
      resetRetryCount: () => set({ retryCount: 0 }),
      
      addTransaction: (transaction) => set((state) => ({
        transactionHistory: [transaction, ...state.transactionHistory]
      })),
      
      setSelectedTransaction: (transaction) => set({ selectedTransaction: transaction }),
      
      setFailureReason: (reason) => set({ failureReason: reason }),
      
      resetPaymentState: () => set({
        paymentStatus: PaymentStatus.Idle,
        currentTransactionId: null,
        retryCount: 0,
        failureReason: null,
      }),
    }),
    {
      name: 'payment-storage',
      partialize: (state) => ({
        transactionHistory: state.transactionHistory,
      }),
    }
  )
);
