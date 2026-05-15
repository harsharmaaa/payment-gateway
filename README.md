# Payment Gateway UI

A production-ready Payment Gateway UI built with Next.js (App Router), TypeScript, Tailwind CSS, and Zustand for state management. This project demonstrates a complete payment flow with real-time validation, card detection, retry logic, and transaction history persistence.

## Features

- **Real-time Form Validation**: Validates cardholder name, card number, expiry, CVV, and amount as user types
- **Card Type Detection**: Automatically detects Visa, Mastercard, and Amex from card number
- **Card Number Formatting**: Auto-formats card number with spaces every 4 digits
- **Live Card Preview**: Visual card preview that updates in real-time
- **Payment Lifecycle**: Supports Idle, Processing, Success, Failed, and Timeout states
- **Mock Payment API**: Server-side randomized responses (60% success, 25% failed, 15% timeout)
- **Timeout Handling**: Frontend cancels requests after 6 seconds using AbortController
- **Retry Logic**: Maximum 3 retry attempts with attempt counter
- **Transaction History**: Persists across page refreshes using localStorage
- **Idempotency**: Uses unique transaction ID for retries to prevent duplicates
- **Responsive Design**: Works on mobile (375px) and desktop (1280px)
- **Accessibility**: Proper ARIA labels, error descriptions, and focus management

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React 19** - UI library

## Project Structure

```
payment-gateway/
├── app/
│   ├── api/
│   │   └── pay/
│   │       └── route.ts          # Mock payment API endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main payment page
│   └── globals.css               # Global styles
├── components/
│   ├── CardInput.tsx             # Reusable input component
│   ├── CardPreview.tsx           # Live card preview
│   ├── PaymentForm.tsx           # Payment form
│   ├── StatusScreen.tsx          # Payment status screens
│   └── TransactionHistory.tsx    # Transaction history list
├── hooks/
│   └── usePaymentForm.ts         # Form validation hook
├── store/
│   └── paymentStore.ts           # Zustand state store
├── types/
│   └── index.ts                  # TypeScript types
├── utils/
│   ├── cardValidation.ts         # Validation functions
│   ├── cardFormatting.ts         # Formatting functions
│   └── api.ts                    # API utilities
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Navigate to the project directory:
```bash
cd payment-gateway
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Making a Payment

1. Fill in the payment form:
   - Cardholder name
   - Card number (auto-formats with spaces)
   - Expiry date (MM/YY format)
   - CVV (3 digits for Visa/Mastercard, 4 for Amex)
   - Amount
   - Currency (INR or USD)

2. The form validates in real-time. Submit button is disabled until form is valid.

3. Click "Pay Now" to submit payment.

4. View the processing state, then success or failure result.

5. On failure/timeout, you can retry (max 3 attempts) or start a new payment.

### Transaction History

- All successful transactions are saved to localStorage
- History persists across page refreshes
- Click any transaction to view detailed information
- Transaction ID, amount, status, and timestamp are displayed

## API Endpoint

### POST /api/pay

Mock payment gateway endpoint that returns randomized responses:

- **Success (60%)**: Payment processed successfully
- **Failed (25%)**: Payment failed with reason (e.g., "Insufficient funds")
- **Timeout (15%)**: Response delayed by 8 seconds (frontend cancels after 6s)

Request body:
```typescript
{
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  amount: number;
  currency: string;
  transactionId: string;
}
```

Response:
```typescript
{
  status: PaymentStatus;
  transactionId: string;
  message?: string;
}
```

## Assumptions

- Card validation uses Luhn algorithm for basic validation
- CVV length is 3 digits for Visa/Mastercard, 4 for Amex
- Expiry dates are validated against current date
- Transaction history is stored in browser localStorage
- Mock API simulates real-world payment gateway behavior
- No actual payment processing occurs (demo only)

## Future Improvements

Given more time, the following could be added:

- Integration with real payment gateway (Stripe, Razorpay, PayPal)
- More comprehensive card validation (BIN lookup)
- Support for more card types (Discover, JCB, etc.)
- Payment method selection (card, UPI, net banking)
- Saved payment methods
- Multi-language support
- Advanced analytics and reporting
- Webhook integration for payment notifications
- Enhanced security features (3D Secure, OTP verification)
- Unit and integration tests
- E2E testing with Playwright
- Performance optimization and lazy loading
- PWA capabilities for offline support

## Deployment

### Vercel (Recommended)

1. Push code to GitHub repository
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Build for Production

```bash
npm run build
npm start
```

## License

This project is for demonstration purposes only.

## Contributing

This is a demo project. For production use, integrate with a real payment gateway provider.
