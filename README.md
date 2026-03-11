# Support Co

Production-ready Next.js App Router starter with Supabase auth, Creem billing, webhook-driven subscription sync, protected routes, and a credits wallet. The existing `Support Co` landing/pricing/legal pages remain intact; the new infrastructure lives behind them in the authenticated app.

## Included

- Next.js App Router + Server Components
- Supabase auth with email/password and Google OAuth
- Creem checkout, portal, subscription changes, and webhook handling
- Supabase SQL migrations for users, subscriptions, credit balances, credit ledger, and webhook events
- Protected routes based on local subscription entitlement state
- Customer dashboard, billing page, credits wallet, account page, and admin billing tools
- Credits top-up packs plus subscription renewal credit grants
- Upgrade, downgrade, customer portal, and cancel-at-period-end flows
- Strict TypeScript, Tailwind CSS, MIT license, and Vercel-ready deployment

## Stack

- Next.js 16 with App Router
- React 19
- Supabase SSR auth
- Creem via `@creem_io/nextjs` and `creem_io`
- Tailwind CSS 4
- TypeScript strict mode

## Security Model

- Auth checks happen server-side in layouts, actions, and route handlers.
- Protected routes require Supabase `getUser()` and local entitlement verification.
- Subscription and credit state are never trusted from the client.
- Billing writes and webhook reconciliation run through the Supabase service role only.
- Creem webhooks are signature-verified by the Next.js adapter.
- Webhook processing is idempotent via the `webhook_events` table.
- Row Level Security limits users to their own profile, subscription, balance, and ledger data.
- Credits use SQL functions for atomic grant/debit operations.

## Route Map

Public:

- `/`
- `/pricing`
- `/about`
- `/privacy`
- `/terms`
- `/cookies`

Auth:

- `/login`
- `/signup`
- `/forgot-password`
- `/reset-password`
- `/auth/callback`

Protected app:

- `/dashboard`
- `/billing`
- `/credits`
- `/account`
- `/admin/billing`

Billing endpoints:

- `/checkout`
- `/portal`
- `/api/webhooks/creem`

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CREEM_API_KEY`
- `CREEM_WEBHOOK_SECRET`
- `NEXT_PUBLIC_CREEM_TEST_MODE`
- Creem product IDs for all plans and credit packs
- `ADMIN_EMAILS`

## Supabase Setup

1. Create a Supabase project.
2. Enable Email auth.
3. Enable Google OAuth in Supabase Auth.
4. Set auth redirect URLs:
   - `http://localhost:4000/auth/callback`
   - `https://your-domain.com/auth/callback`
5. Run the SQL migration in [`supabase/migrations/20260311_000001_starter_core.sql`](./supabase/migrations/20260311_000001_starter_core.sql).
6. Copy the project URL, anon key, and service role key into `.env.local`.

## Creem Setup

1. Create Creem products for:
   - Starter monthly / yearly
   - Pro monthly / yearly
   - Scale monthly / yearly
   - Small / medium / large credit top-up packs
2. Paste those product IDs into `.env.local`.
3. Set your Creem webhook endpoint to:
   - `https://your-domain.com/api/webhooks/creem`
4. Copy the Creem API key and webhook secret into `.env.local`.

## Local Development

```bash
npm install
npm run lint
npm run build
npm run dev
```

Open [http://localhost:4000](http://localhost:4000).

## Billing Behavior

- New subscriptions go through Creem checkout.
- Logged-in users can switch plans from `/billing`.
- Upgrades use immediate proration charge.
- Downgrades use Creem plan change handling.
- Cancellation is scheduled for period end.
- `/portal` creates a secure Creem customer portal redirect for the authenticated user only.
- Successful renewal and top-up events credit the user wallet through webhook processing.

## Credits System

- `credit_balances` stores fast current balances.
- `credit_ledger` is append-only for grants, renewals, top-ups, debits, and admin adjustments.
- `grant_credits(...)` and `consume_credits(...)` SQL functions keep mutations atomic.
- The sample debit flow lives on `/credits`.

## Admin Tools

`/admin/billing` is restricted to users whose email appears in `ADMIN_EMAILS` and supports:

- recent webhook visibility
- recent local subscription visibility
- manual credit grants and reversals

## Vercel Deploy

Use a standard Next.js deployment on Vercel and add the same environment variables there.

One-click deploy button template:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/your-repo)

Before deploying:

1. Add all environment variables in Vercel.
2. Add your production auth callback URL in Supabase.
3. Set the production Creem webhook URL.
4. Redeploy after adding the variables.

## Verification

Current verification run in this repo:

- `npm run lint`
- `npm run build`

## Notes

- Dashboard and auth routes are forced dynamic because they depend on runtime auth and billing state.
- The existing `Support Co` marketing pages were intentionally preserved while the billing/auth starter infrastructure was added around them.
