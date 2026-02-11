# Wekabets

Production-oriented sports prediction platform built with Next.js + Firebase.

## Features
- App Router pages for Home, History, Pricing, Auth, and Admin.
- Premium paywall logic in reusable `MatchRow` component.
- Firebase email/password + Google authentication helper methods.
- Paystack integration with server verification callback.
- Firebase Realtime Database rules in `rules.json`.

## Project Structure
- `src/app` - routes and API handlers
- `src/components` - UI components (tables, row paywall, badges, navbar)
- `src/lib` - Firebase setup and helper modules
- `src/types` - TypeScript interfaces matching DB schema
- `rules.json` - Firebase Realtime Database security rules

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
