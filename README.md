# Payment Gateway UI

A simple payment gateway UI built with Next.js, TypeScript, Tailwind CSS, and Zustand.  
This project simulates a real payment flow with validation, transaction handling, retry logic, and transaction history.

---

## Features

- Real-time form validation
- Card type detection (Visa, Mastercard, Amex)
- Auto card number formatting
- Live card preview
- Payment status handling (Success, Failed, Timeout)
- Retry payment support (up to 3 attempts)
- Transaction history with localStorage
- Responsive UI for mobile and desktop
- Mock payment API with random responses

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand

---

## Project Structure

```bash
payment-gateway/
├── app/
├── components/
├── hooks/
├── store/
├── types/
├── utils/
└── package.json
```

---

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## Payment API

### POST `/api/pay`

Mock payment API that returns random responses:

- 60% Success
- 25% Failed
- 15% Timeout

Example request:

```ts
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

---

## Test Cards

### Visa

```text
4242 4242 4242 4242
```

### Mastercard

```text
5555 5555 5555 4444
```

### Amex

```text
3782 822463 10005
```

---

## Main Functionalities

- Luhn algorithm based card validation
- Expiry date validation
- CVV validation based on card type
- Timeout handling using AbortController
- Persistent transaction history

---

## Run Production Build

```bash
npm run build
npm start
```

---

## Note

This project is made for learning/demo purposes only. No real payment processing is implemented.
