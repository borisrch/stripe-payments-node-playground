# Stripe Dev Test (Node)

This is a sample Node.js application that implements Stripe Payments using the Stripe Node.js library by way of Setup Intents.

## Requirements

- Git
- Node 16.19.0 or later
- Your own Stripe developer test account

## Quickstart

**Step 1:** Clone the repository
```sh
git clone git@github.com:borisrch/stripe-payments-node-playground.git
```

**Step 2:** Create dot env file in the project root directory
```sh
vi .env
```

Fill the Stripe Secret Key with your own test account keys (Dashboard > Developers > API Keys)
```dotenv
PORT=
STRIPE_SECRET_KEY=
```

**Step 3:** Install dependencies and run the app
```sh
yarn && yarn start
```
